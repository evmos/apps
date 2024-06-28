// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import {
  deleteAllUsers,
  createUser,
  getUserById,
  createUserWalletAccount,
  verifyWalletAccount,
  deleteWalletAccount,
  getUserByAddress,
} from "./api";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { Chance } from "chance";
const chance = new Chance();

const makeRandomAccount = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return account;
};

// const makeRandomUser = (): z.input<typeof UserWithWalletInputSchema> => ({
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
    const user = await createUser(makeRandomUser());

    expectTypeOf(user.id).toBeString();
  });

  test("deleteUserById", async () => {
    const user = await createUser({
      displayName: chance.name(),
      profilePictureUrl: chance.url({ extensions: ["gif", "jpg", "png"] }),
      walletAccount: {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      },
    });

    expect(await getUserById(user.id)).toEqual(user);

    await getUserById(user.id);

    await expect(getUserById(user.id)).rejects.toThrow("No User found");
  });

  test("getUserById", async () => {
    const user = await createUser(makeRandomUser());
    const foundUser = await getUserById(user.id);
    expect(foundUser).toEqual(user);
  });

  test("getUserByAddress", async () => {
    const user = await createUser(makeRandomUser());
    const foundUser = await getUserByAddress(user.walletAccount[0]!.address);
    expect(foundUser).toEqual(user);
  });

  test("createWalletAccount", async () => {
    const user = await createUser(makeRandomUser());
    const updatedUser = await createUserWalletAccount(user.id, {
      address: makeRandomAccount().address,
      authorizationMethod: "ETHEREUM",
    });

    expect(updatedUser?.walletAccount.length).toBe(2);
  });

  test("deleteWalletAccount", async () => {
    let user = await createUser(makeRandomUser());
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
    let user = await createUser(makeRandomUser());
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
    const user = await createUser(makeRandomUser());

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
