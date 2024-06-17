import { dAppStorePrisma as prisma } from "./client";
import { Hex, isAddress } from "viem";
import { bech32 } from "bech32";
import { Prisma } from "./prisma/generated/client";
import { z } from "zod";
import { $Enums } from "./prisma/generated/client";

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
export const HexAddress = z.custom<Hex>(
  (value) => typeof value === "string" && isAddress(value),
  "Invalid hex address",
);

export const Bech32Address = z.custom<`${string}1${string}`>(
  (value) => typeof value === "string" && bech32.decode(value),
  "Invalid bech32 address",
);

export const AccountAddress = z.union([HexAddress, Bech32Address]);

const AuthorizationMethod = z.enum([
  "ETHEREUM",
  "COSMOS",
]) satisfies z.Schema<$Enums.AuthorizationMethod>;

export const WalletInputSchema = z.discriminatedUnion("authorizationMethod", [
  z.object({
    address: HexAddress,
    authorizationMethod: AuthorizationMethod.extract(["ETHEREUM"]),
  }),
  z.object({
    address: Bech32Address,
    authorizationMethod: AuthorizationMethod.extract(["COSMOS"]),
  }),
]) satisfies z.Schema<
  Prisma.WalletAccountCreateNestedManyWithoutUserInput["create"]
>;

const DisplayNameSchema = z.string().min(1).max(255);

const ProfilePictureUrlSchema = z
  .string()
  .url()
  .refine((url) => /\.(png|jpg|jpeg|gif)$/.test(url));

export const UserInputSchema = z.object({
  displayName: DisplayNameSchema.optional(),
  profilePictureUrl: ProfilePictureUrlSchema.optional(),
}) satisfies z.Schema<Prisma.UserUpdateInput, z.ZodTypeDef, unknown>;

export const UserWithWalletInputSchema = UserInputSchema.extend({
  walletAccount: WalletInputSchema.transform((create) => ({ create })),
}) satisfies z.Schema<Prisma.UserCreateInput, z.ZodTypeDef, unknown>;

// API
export const createUserWalletAccount = async (
  userId: string,
  data: z.input<typeof WalletInputSchema>,
) => {
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
};

export const verifyWalletAccount = async (address: string) => {
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

export const createUser = (data: z.input<typeof UserWithWalletInputSchema>) =>
  prisma.user.create({
    data: UserWithWalletInputSchema.parse(data),
    include: {
      walletAccount: true,
    },
  });

export const updateUserById = (
  id: string,
  data: z.input<typeof UserInputSchema>,
) =>
  prisma.user.update({
    where: {
      id,
    },
    data: UserInputSchema.parse(data),
    include: {
      walletAccount: true,
    },
  });

export const getUserById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      walletAccount: true,
    },
  });
};

export const getUserByAddress = (address: string) =>
  prisma.walletAccount
    .findUnique({
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

export const deleteUserById = (id: string) =>
  prisma.user.delete({
    where: {
      id,
    },
  });

/**
 * mostly for reseting db for testing purposes
 */
export const deleteAllUsers = (options?: {
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
