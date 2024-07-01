// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { beforeEach, describe, test, expect, expectTypeOf, vi } from "vitest";
import {
  deleteAllUsers,
  unprotected_createUser,
  getUserById,
  createUserWalletAccount,
  verifyWalletAccount,
  deleteWalletAccount,
  getUserByAddress,
  deleteUserById,
} from "./api";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { Chance } from "chance";
import * as mod from "./auth/get-user-session";

const getUserSessionMock = vi.spyOn(mod, "getUserSession");
const mockSession = (id: string | null) => {
  // @ts-expect-error just a mock
  if (id) getUserSessionMock.mockReturnValue(Promise.resolve({ user: { id } }));
  else getUserSessionMock.mockReturnValue(Promise.resolve(null));
};
mockSession(null);

const chance = new Chance();
const stringify = JSON.stringify;
const makeRandomAccount = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return account;
};

const makeRandomUser = () => ({
  displayName: chance.name(),
  profilePictureUrl: chance.url({ extensions: ["gif", "jpg", "png"] }),
  walletAccount: {
    address: makeRandomAccount().address,
    authorizationMethod: "ETHEREUM" as const,
  },
});
describe("user api", () => {
  beforeEach(async () => {
    await deleteAllUsers();
  });

  test("createUser", async () => {
    const user = await unprotected_createUser(makeRandomUser());

    expectTypeOf(user.id).toBeString();
  });

  test("deleteUserById", async () => {
    const user = await unprotected_createUser({
      displayName: chance.name(),
      profilePictureUrl: chance.url({ extensions: ["gif", "jpg", "png"] }),
      walletAccount: {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      },
    });
    mockSession(user.id);
    expect(stringify(await getUserById(user.id))).toEqual(stringify(user));

    await deleteUserById(user.id);

    await expect(getUserById(user.id)).rejects.toThrow("No User found");
  });

  test("getUserById", async () => {
    const user = await unprotected_createUser(makeRandomUser());
    mockSession(user.id);
    const foundUser = await getUserById(user.id);
    expect(stringify(foundUser)).toEqual(stringify(user));
  });

  test("getUserByAddress", async () => {
    const user = await unprotected_createUser(makeRandomUser());
    mockSession(user.id);
    const foundUser = await getUserByAddress(user.walletAccount[0]!.address);
    expect(stringify(foundUser)).toEqual(stringify(user));
  });

  test("createWalletAccount", async () => {
    const user = await unprotected_createUser(makeRandomUser());
    mockSession(user.id);
    const updatedUser = await createUserWalletAccount(user.id, {
      address: makeRandomAccount().address,
      authorizationMethod: "ETHEREUM",
    });

    expect(updatedUser?.walletAccount.length).toBe(2);
  });

  test("deleteWalletAccount", async () => {
    let user = await unprotected_createUser(makeRandomUser());
    mockSession(user.id);
    const primaryAddress = user.walletAccount[0]!.address;
    const secondaryAddress = makeRandomAccount().address;
    user = await createUserWalletAccount(user.id, {
      address: secondaryAddress,
      authorizationMethod: "ETHEREUM",
    });
    await verifyWalletAccount(primaryAddress);

    await deleteWalletAccount(secondaryAddress);

    user = (await getUserById(user.id))!;
    expect(user.walletAccount.length).toBe(1);
  });

  test("prevent deleting accounts if user would then have less than 1 verified account", async () => {
    let user = await unprotected_createUser(makeRandomUser());
    mockSession(user.id);
    const primaryAddress = user.walletAccount[0]!.address;
    const secondaryAddress = makeRandomAccount().address;

    user = await createUserWalletAccount(user.id, {
      address: secondaryAddress,
      authorizationMethod: "ETHEREUM",
    });
    await verifyWalletAccount(primaryAddress);

    await expect(deleteWalletAccount(primaryAddress)).rejects.toThrow(
      "Cannot delete last verified account",
    );

    await verifyWalletAccount(secondaryAddress);

    await deleteWalletAccount(primaryAddress);

    user = (await getUserById(user.id))!;
    expect(user.walletAccount.length).toBe(1);
  });

  test("throws when user already has 100 wallet accounts", async () => {
    const user = await unprotected_createUser(makeRandomUser());
    mockSession(user.id);

    for (let i = 0; i < 99; i++) {
      await createUserWalletAccount(user.id, {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      });
    }

    await expect(
      createUserWalletAccount(user.id, {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      }),
    ).rejects.toThrow("User already has too many accounts");
  });
});
