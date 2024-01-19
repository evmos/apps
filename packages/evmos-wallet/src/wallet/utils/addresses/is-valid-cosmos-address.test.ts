// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/* eslint-disable no-secrets/no-secrets */
import { describe, expect, test } from "vitest";
import { isValidCosmosAddress } from "./is-valid-cosmos-address";

/**
 * Real address extracted from https://www.mintscan.io/
 */
const REAL_EVMOS_ADDRESSES = [
  "evmos1z3t55m0l9h0eupuz3dp5t5cypyv674jj7mz2jw",
  "evmos1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3h6cprl",
  "evmos1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8974jnh",
  "evmos1krxwf5e308jmclyhfd9u92kp369l083wn67k4q",
  "evmos12aqyq9d4k7a8hzh5av2xgxp0njan48498dvj2s",
  "evmos1sgjgup7wz3qyfcqqpr66jlm9qpk3j63ajupc9l",
  "evmos19mqtl7pyvtazl85jlre9jltpuff9enjdn9m7hz",
  "evmos1d67tx0zekagfhw6chhgza6qmhyad5qprru0nwazpx5s85ld0wh2sdhhznd",
  "evmos12t43mfvszgdmj8gv7fkzxqtl6pagal4ltqu5yy",
  "evmos1z8ynrnhdn4l69mu6v6ckjr4wukcacd0e7j0akn",
  "evmos1u48k2un865scs53e7juza9gac4shze0dxh46xc",
];
const REAL_OSMOS_ADDRESSES = [
  "osmo1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3aq6l09",
  "osmo1vqy8rqqlydj9wkcyvct9zxl3hc4eqgu3d7hd9k",
  "osmo1ugku28hwyexpljrrmtet05nd6kjlrvr9jz6z00",
  "osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t",
  "osmo1gw445ta0aqn26suz2rg3tkqfpxnq2hs224d7gq",
  "osmo1des8hpaqnxgdjahelvhgecctpnq7gm04344cdf",
  "osmo10venxtvdglryxkdmvjr8wa6n3ugja40rewddlxtg0pr30vmkf47sllgslg",
  "osmo1tygms3xhhs3yv487phx3dw4a95jn7t7lfqxwe3",
  "osmo1cyr9a2ytlpp6ru9fqnvx56wcumqhpy26s2saxc",
  "osmo1kk5u4zkqh9ye7y7uw4c950ug0z4jhh5yz4uz7u",
];
const REAL_AXELAR_ADDRESSES = [
  "axelar1fl48vsnmsdzcv85q5d2q4z5ajdha8yu334l8jk",
  "axelar14frs4mpggrww86h2n0ykqjstwypcllsz077e50",
  "axelar14k7jpx6u0fj4yl273yu5glzdedaw5wzkkdzzmj",
  "axelar1ren608jc4cnslzsxs08memmmda2djncxcudhh7",
  "axelar1am2yc4lvyp27q8a6ehmscyv29u4qhfjx6a4jvs",
  "axelar1ph0qnh7u2fhuqrx0w27mpg338np6uhqhrqh7qs",
  "axelar15366t0hk23wz8rrz92yw8trvperwr3nehc52m0",
  "axelar1jesak80ju7yw09pncdz7r2myg3jwz8a66yhm7dwrvqz7xhmvdndqx095sm",
  "axelar1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8r3j5z7",
  "axelar1j0annpmn5qyfsw466a78skjssdlnhq7z2rpw8s",
];
const REAL_INJ_ADDRESSES = [
  "inj1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3lj7tt0",
  "inj1l9mczn5smfztlgpmv226qct2396yrt8vrtdnwp",
  "inj1zaw6duj85ntnue9jmyxte2mlahl3ysw57yrcpx",
  "inj10nlfns24xa6ndqk77qtdzl2t9xnu4d8wdcpnql",
  "inj12nmfx4a40n9z8wq9w4qrvc45d7kzrg2rmkdd2w",
  "inj1cktpjwkrl09e9wc634n9099pgyzlyav2aq9vae",
  "inj1xmdfy2cvjuynhf74lfna6qn3k2qfq7afjehd8h",
  "inj1cjkfqfymr6m8auykw8ta2pe0ppdagel59qt5kh",
  "inj1tygms3xhhs3yv487phx3dw4a95jn7t7ltjz6am",
  "inj1nm0rrq86ucezaf8uj35pq9fpwr5r82clde06nv",
];

const REAL_ACCOUNTS = [
  ...REAL_EVMOS_ADDRESSES,
  ...REAL_OSMOS_ADDRESSES,
  ...REAL_AXELAR_ADDRESSES,
  ...REAL_INJ_ADDRESSES,
];
describe("isValidCosmosAddress", () => {
  test("check valid addresses", () => {
    REAL_ACCOUNTS.forEach((address) => {
      expect(isValidCosmosAddress(address)).toBe(true);
    });
  });
  test("check invalid addresses", () => {
    REAL_ACCOUNTS.forEach((address) => {
      // swap random digit
      address = address.replace(/[123]/g, "r");

      expect(isValidCosmosAddress(address)).toBe(false);
    });
    REAL_ACCOUNTS.forEach((address) => {
      // slice first character
      address = address.slice(1);
      expect(isValidCosmosAddress(address)).toBe(false);
    });
    REAL_ACCOUNTS.forEach((address) => {
      // slice last character
      address = address.slice(0, -1);
      expect(isValidCosmosAddress(address)).toBe(false);
    });
  });
});
