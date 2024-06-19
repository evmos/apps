// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { beforeEach, describe, test, expect, expectTypeOf, vi, Mock } from "vitest";
import {
  UserWithWalletInputSchema,
  deleteAllUsers,
  DappStoreAPI,
  Permission,
} from "./api";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { Chance } from "chance";
import { z } from "zod";
const chance = new Chance();

const makeRandomAccount = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return account;
};

const makeRandomUser = (): z.input<typeof UserWithWalletInputSchema> => ({
  displayName: chance.name(),
  profilePictureUrl: chance.url({ extensions: ["gif", "jpg", "png"] }),
  walletAccount: {
    address: makeRandomAccount().address,
    authorizationMethod: "ETHEREUM" as const,
  },
});

const client = new DappStoreAPI(() => true);
describe("user api", () => {
  beforeEach(async () => {
    await deleteAllUsers();
  });

  test("createUser", async () => {
    const user = await client.createUser(makeRandomUser());

    expectTypeOf(user.id).toBeString();
  });

  test("deleteUserById", async () => {
    const user = await client.createUser({
      displayName: chance.name(),
      profilePictureUrl: chance.url({ extensions: ["gif", "jpg", "png"] }),
      walletAccount: {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      },
    });

    expect(await client.getUserById(user.id)).toEqual(user);

    await client.deleteUserById(user.id);

    await expect(client.getUserById(user.id)).rejects.toThrow("No User found");
  });

  test("getUserById", async () => {
    const user = await client.createUser(makeRandomUser());
    const foundUser = await client.getUserById(user.id);
    expect(foundUser).toEqual(user);
  });

  test("getUserByAddress", async () => {
    const user = await client.createUser(makeRandomUser());
    const foundUser = await client.getUserByAddress(
      user.walletAccount[0]!.address,
    );
    expect(foundUser).toEqual(user);
  });

  test("createWalletAccount", async () => {
    const user = await client.createUser(makeRandomUser());
    const updatedUser = await client.createUserWalletAccount(user.id, {
      address: makeRandomAccount().address,
      authorizationMethod: "ETHEREUM",
    });

    expect(updatedUser?.walletAccount.length).toBe(2);
  });

  test("deleteWalletAccount", async () => {
    let user = await client.createUser(makeRandomUser());
    const primaryAddress = user.walletAccount[0]!.address;
    const secondaryAddress = makeRandomAccount().address;
    user = await client.createUserWalletAccount(user.id, {
      address: secondaryAddress,
      authorizationMethod: "ETHEREUM",
    });
    await client.verifyWalletAccount(primaryAddress);

    await client.deleteWalletAccount(secondaryAddress);

    user = (await client.getUserById(user.id))!;
    expect(user.walletAccount.length).toBe(1);
  });

  test("prevent deleting accounts if user would then have less than 1 verified account", async () => {
    let user = await client.createUser(makeRandomUser());
    const primaryAddress = user.walletAccount[0]!.address;
    const secondaryAddress = makeRandomAccount().address;

    user = await client.createUserWalletAccount(user.id, {
      address: secondaryAddress,
      authorizationMethod: "ETHEREUM",
    });
    await client.verifyWalletAccount(primaryAddress);

    await expect(client.deleteWalletAccount(primaryAddress)).rejects.toThrow(
      "Cannot delete last verified account",
    );

    await client.verifyWalletAccount(secondaryAddress);

    await client.deleteWalletAccount(primaryAddress);

    user = (await client.getUserById(user.id))!;
    expect(user.walletAccount.length).toBe(1);
  });

  test("throws when user already has 100 wallet accounts", async () => {
    const user = await client.createUser(makeRandomUser());

    for (let i = 0; i < 99; i++) {
      await client.createUserWalletAccount(user.id, {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      });
    }

    await expect(
      client.createUserWalletAccount(user.id, {
        address: makeRandomAccount().address,
        authorizationMethod: "ETHEREUM",
      }),
    ).rejects.toThrow("User already has too many accounts");
  });

  test("require proper authorization", async () => {
    // eslint-disable-next-line 
    const fn:Mock<[{ permission: string }], boolean> = vi.fn((_: { permission: string }) => false);
    const client = new DappStoreAPI(fn);
    const user = makeRandomUser();
    await client.createUser(user);
    type TestCase<T extends keyof typeof client> = [
      T,
      expectedPermission: Permission,
      Parameters<(typeof client)[T]>,
    ];
    const cases = [
      [
        "createUserWalletAccount",
        "user:write",
        ["123", user.walletAccount],
      ] satisfies TestCase<"createUserWalletAccount">,
      [
        "deleteUserById",
        "user:write",
        ["123"],
      ] satisfies TestCase<"deleteUserById">,
      ["getUserById", "user:read", ["123"]] satisfies TestCase<"getUserById">,
      [
        "getUserByAddress",
        "user:read",
        [user.walletAccount.address],
      ] satisfies TestCase<"getUserByAddress">,
      [
        "createUserWalletAccount",
        "user:write",
        ["123", user.walletAccount],
      ] satisfies TestCase<"createUserWalletAccount">,
      [
        "deleteWalletAccount",
        "user:write",
        [user.walletAccount.address],
      ] satisfies TestCase<"deleteWalletAccount">,
      [
        "verifyWalletAccount",
        "user:write",
        [user.walletAccount.address],
      ] satisfies TestCase<"verifyWalletAccount">,
    ];

    for (const [method, permission, args] of cases) {
      const clientFn = client[method] as (...args: unknown[]) => unknown;
      await expect(clientFn(...args)).rejects.toThrow("Unauthorized");
      expect(fn.mock.lastCall?.[0]!.permission).toBe(permission);
    }
  });
});
