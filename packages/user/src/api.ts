// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { dAppStorePrisma as prisma } from "./client";
import { Hex, isAddress } from "viem";
import { bech32 } from "bech32";
import { Prisma } from "./prisma/generated/client";
import { z } from "zod";
import { $Enums } from "./prisma/generated/client";
import { getUserSession } from "./auth/get-user-session";
import { cache } from "react";

// Validation
const isWalletAccountSignable = (
  value: Prisma.WalletAccountGetPayload<{
    select: {
      authorizationMethod: true;
      verified: true;
    };
  }>,
) => {
  return value.verified && value.authorizationMethod === "ETHEREUM";
};

// Schemas
const HexAddress = z
  .string()
  .pipe(
    z.custom<Hex>(
      (value) => typeof value === "string" && isAddress(value),
      "Invalid hex address",
    ),
  );

const Bech32Address = z
  .string()
  .pipe(
    z.custom<`${string}1${string}`>(
      (value) => typeof value === "string" && bech32.decode(value),
      "Invalid bech32 address",
    ),
  );

const AccountAddress = z.union([HexAddress, Bech32Address]);

const AuthorizationMethod = z.enum([
  "ETHEREUM",
  "COSMOS",
]) satisfies z.Schema<$Enums.AuthorizationMethod>;

const WalletInputSchema = z.discriminatedUnion("authorizationMethod", [
  z.object({
    address: HexAddress,
    authorizationMethod: AuthorizationMethod.extract(["ETHEREUM"]),
    verified: z.boolean().default(false),
  }),
  z.object({
    address: Bech32Address,
    authorizationMethod: AuthorizationMethod.extract(["COSMOS"]),
    verified: z.boolean().default(false),
  }),
]) satisfies z.Schema<
  Prisma.WalletAccountCreateNestedManyWithoutUserInput["create"]
>;

const DisplayNameSchema = z.string().min(1).max(255);

const ProfilePictureUrlSchema = z
  .string()
  .url()
  .refine((url) => /\.(png|jpg|jpeg|gif)$/.test(url));

const UserInputSchema = z.object({
  displayName: DisplayNameSchema.optional(),
  profilePictureUrl: ProfilePictureUrlSchema.optional(),
}) satisfies z.Schema<Prisma.UserUpdateInput, z.ZodTypeDef, unknown>;

const UserWithWalletInputSchema = UserInputSchema.extend({
  walletAccount: WalletInputSchema.transform((create) => ({ create })),
}) satisfies z.Schema<Prisma.UserCreateInput, z.ZodTypeDef, unknown>;

export type Permission = "user:read" | "user:write";

export type User = Awaited<ReturnType<typeof getUserById>>;
export type WalletAccount = Prisma.WalletAccountGetPayload<{}>;

export const authorize = cache(
  async (
    permission: Permission,
    details: { id: string } | { address: string },
  ) => {
    try {
      switch (permission) {
        case "user:read":
        case "user:write": {
          const session = await getUserSession();
          if (!session) return false;
          const id =
            "id" in details
              ? details.id
              : await unprotected_getUserByAddress(details.address).then(
                (user) => user.id,
              );
          return session.user.id === id;
        }
        default:
          return false;
      }
    } catch (e) {
      return false;
    }
  },
);

export const assertPermission = async (
  permission: Permission,
  details: { id: string } | { address: string },
) => {
  if (await authorize(permission, details)) {
    return;
  }
  throw new Error("Unauthorized");
};

export async function createUserWalletAccount(
  userId: string,
  data: z.input<typeof WalletInputSchema>,
) {
  await assertPermission("user:write", { id: userId });
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      walletAccount: true,
    },
  });

  if (user.walletAccount.length >= 100) {
    throw new Error("User already has too many accounts");
  }

  return prisma.walletAccount
    .create({
      data: {
        ...WalletInputSchema.parse(data),
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        user: {
          include: {
            walletAccount: true,
          },
        },
      },
    })
    .then((walletAccount) => walletAccount.user ?? null);
}

export const verifyWalletAccount = async (address: string) => {
  await assertPermission("user:write", { address });
  return prisma.walletAccount
    .update({
      where: {
        address: AccountAddress.parse(address),
      },
      data: {
        verified: true,
      },
      select: {
        user: {
          include: {
            walletAccount: true,
          },
        },
      },
    })
    .then((walletAccount) => walletAccount.user ?? null);
};

export const deleteWalletAccount = async (address: string) => {
  await assertPermission("user:write", { address });
  AccountAddress.parse(address);

  const wallets = await prisma.walletAccount
    .findUniqueOrThrow({
      where: {
        address,
      },
      select: {
        user: {
          include: {
            walletAccount: true,
          },
        },
      },
    })
    .then(({ user }) => user.walletAccount);

  if (
    !wallets.some(
      (account) =>
        account.address !== address && isWalletAccountSignable(account),
    )
  ) {
    throw new Error("Cannot delete last verified account");
  }

  return prisma.walletAccount
    .delete({
      where: {
        address,
      },

      select: {
        user: {
          include: {
            walletAccount: true,
          },
        },
      },
    })
    .then((walletAccount) => walletAccount.user ?? null);
};

export const unprotected_createUser = (
  data: z.input<typeof UserWithWalletInputSchema>,
) => {
  return prisma.user.create({
    data: UserWithWalletInputSchema.parse(data),
    include: {
      walletAccount: true,
    },
  });
};

export const updateUserById = async (
  id: string,
  data: z.input<typeof UserInputSchema>,
) => {
  await assertPermission("user:write", { id });
  return await prisma.user.update({
    where: {
      id,
    },
    data: UserInputSchema.parse(data),
    include: {
      walletAccount: true,
    },
  });
};

export const unprotected_getUserById = async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      walletAccount: true,
    },
  });
};

export const getUserById = async (id: string) => {
  await assertPermission("user:read", { id });
  return unprotected_getUserById(id);
};

export const unprotected_getUserByAddress = async (address: string) => {
  return await prisma.walletAccount
    .findUniqueOrThrow({
      where: {
        address: AccountAddress.parse(address),
      },
      select: {
        user: {
          include: {
            walletAccount: true,
          },
        },
      },
    })
    .then((walletAccount) => walletAccount?.user ?? null);
};

export const getUserByAddress = async (address: string) => {
  await assertPermission("user:read", { address });
  return unprotected_getUserByAddress(address);
};

export const deleteUserById = async (id: string) => {
  await assertPermission("user:write", { id });
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

/**
 * mostly for reseting db for testing purposes
 */
export const deleteAllUsers = async (options?: {
  __DANGEROUSLY_CLEAR_ALL_USERS__: boolean;
}) => {
  if (
    options?.__DANGEROUSLY_CLEAR_ALL_USERS__ === true ||
    process.env.DAPPSTORE_DATABASE_URL?.includes("localhost")
  ) {
    return prisma.user.deleteMany();
  }
  throw new Error(
    [
      `You're trying to clear all users from '${process.env.DAPPSTORE_DATABASE_URL}'`,
      "This doesn't look like a local database",
    ].join("\n"),
  );
};
