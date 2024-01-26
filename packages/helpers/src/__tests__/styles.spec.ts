// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, expect, it } from "vitest";
import {
  getPercentage,
  convertFromAtto,
  amountToDollars,
  checkFormatAddress,
  createBigNumber,
  formatNumber,
  getReservedForFeeText,
  getTotalAssets,
  numericOnly,
  safeSubstraction,
  truncateNumber,
  getFormattedDate,
} from "../index";

import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

describe("Test Styles for Asset", () => {
  it("getReserverdForFee function", () => {
    const msg = getReservedForFeeText(
      BigNumber.from("300000000000000000"),
      "EVMOS",
      "EVMOS",
    );
    expect(msg).toBe(
      "0.3 EVMOS is reserved for transaction fees on the EVMOS network.",
    );
  });
});

describe("createBigNumber function", () => {
  it("Create big number", () => {
    const value = createBigNumber("18008145312597981734");
    expect(value._isBigNumber).toBe(true);
    expect(value._hex).toBe("0xf9e9c8c02504ba26");
  });

  it("Create big number with string", () => {
    const value = createBigNumber("a");
    expect(value._isBigNumber).toBe(true);
    expect(value._hex).toBe("0x00");
  });
});

describe("safeSubstraction function", () => {
  it("Substraction greater than 0", () => {
    const value = safeSubstraction(
      createBigNumber("18008145312597981734"),
      createBigNumber("300000000000000000"),
    );
    expect(value._isBigNumber).toBe(true);
    expect(value._hex).toBe("0xf5bff8570c66ba26");
  });

  it("Substraction lower than 0", () => {
    const value = safeSubstraction(createBigNumber("0"), createBigNumber("3"));
    expect(value._isBigNumber).toBe(true);
    expect(value._hex).toBe("0x00");
  });

  it("Substraction equal to 0", () => {
    const value = safeSubstraction(createBigNumber("3"), createBigNumber("3"));
    expect(value._isBigNumber).toBe(true);
    expect(value._hex).toBe("0x00");
  });
});

describe("convertFromAtto function", () => {
  it("Convert big number: 2", () => {
    const value = convertFromAtto(BigNumber.from("2"));
    expect(value).toBe("0.000000000000000002");
  });

  it("Convert big number: 200000000000000000", () => {
    const value = convertFromAtto(BigNumber.from("200000000000000000"));
    expect(value).toBe("0.2");
  });

  it("Convert big number: 2 with exponent", () => {
    const value = convertFromAtto(BigNumber.from("2"), 6);
    expect(value).toBe("0.000002");
  });
});

describe("FormatNumber function", () => {
  it("Format undefined", () => {
    const value = formatNumber(undefined);
    expect(value).toBe("--");
  });

  it("Format number", () => {
    const value = formatNumber(8);
    expect(value).toBe("8");
  });

  it("Format number with decimals", () => {
    const value = formatNumber(0.000008, 6);
    expect(value).toBe("0.000008");
  });

  it("Format string with decimals", () => {
    const value = formatNumber("0.000008");
    expect(value).toBe("0");
  });
});

describe("amountToDollars function", () => {
  it("dollars Price for amount 0", () => {
    const value = amountToDollars(BigNumber.from("0"), 18, 0.407541);
    expect(value).toBe("0.00");
  });

  it("dollars Price for amount 3608489735347276767", () => {
    const value = amountToDollars(
      BigNumber.from("3608489735347276767"),
      18,
      0.407541,
    );
    expect(value).toBe("1.47");
  });
});

const dataTable = {
  table: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: BigNumber.from("0"),
      cosmosBalance: BigNumber.from("3502239735347276767"),
      tokenName: "EVMOS",
      tokenIdentifier: "EVMOS",
      description: "EVMOS",
      coingeckoPrice: 0.399167,
      chainId: "evmos_9001-2",
      chainIdentifier: "Evmos",
      handledByExternalUI: null,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
      prefix: "evmos",
    },
  ],
  feeBalance: BigNumber.from("1"),
};

describe("getTotalAssets function", () => {
  it("total assets with total staked different than 0", () => {
    const staked = {
      total: "89000000000000000",
      decimals: 18,
      coingeckoPrice: 0.399167,
    };

    const msg = getTotalAssets(dataTable, staked);
    expect(msg).toBe("1.44");
  });

  it("total assets with total staked equal to 0", () => {
    const staked = {
      total: "0",
      decimals: 18,
      coingeckoPrice: 0.399167,
    };

    const msg = getTotalAssets(dataTable, staked);
    expect(msg).toBe("1.40");
  });

  it("total assets with decimals staked equal to undefined", () => {
    const staked = {
      total: "89000000000000000",
      decimals: undefined,
      coingeckoPrice: 0.399167,
    };

    const msg = getTotalAssets(dataTable, staked);
    expect(msg).toBe("1.40");
  });

  it("total assets with total staked equal to undefined", () => {
    const staked = {
      total: undefined,
      decimals: 18,
      coingeckoPrice: 0.399167,
    };

    const msg = getTotalAssets(dataTable, staked);
    expect(msg).toBe("1.40");
  });

  it("total assets with coingeckoPrice staked equal to undefined", () => {
    const staked = {
      total: "89000000000000000",
      decimals: 18,
      coingeckoPrice: undefined,
    };

    const msg = getTotalAssets(dataTable, staked);
    expect(msg).toBe("1.40");
  });

  it("total assets with bit amount of staked", () => {
    const staked = {
      total: "89000000000000000000000",
      decimals: 18,
      coingeckoPrice: 0.399167,
    };

    const msg = getTotalAssets(dataTable, staked);
    expect(msg).toBe("35527.26");
  });
});

describe("checkFormatAddress function", () => {
  it("Case format address is true", () => {
    const value = checkFormatAddress(
      // eslint-disable-next-line no-secrets/no-secrets
      "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak",
      "EVMOS",
    );
    expect(value).toBe(true);
  });

  it("Case format address is false by address", () => {
    const value = checkFormatAddress(
      // eslint-disable-next-line no-secrets/no-secrets
      "osmo1j30xhsxcqss0n662wrma0vqw4zcx285munun8a",
      "EVMOS",
    );
    expect(value).toBe(false);
  });
});

describe("truncateNumber function", () => {
  it("Keep the number as it is", () => {
    const value = truncateNumber("123456789");
    expect(value).toBe(123456789);
  });

  it("Keep the float as it is", () => {
    const value = truncateNumber("1234.56789");
    expect(value).toBe(1234.56789);
  });

  it("Truncate float: leave 5 numbers after .", () => {
    const value = truncateNumber("1234.5678910");
    expect(value).toBe(1234.56789);
  });

  it("Truncate float: leave 5 numbers afte2 .", () => {
    const value = truncateNumber("0.469495");
    expect(value).toBe(0.46949);
  });
});

describe("numeric function", () => {
  it("numeric only", () => {
    const value = numericOnly("10000000000000000000");
    expect(value).toBe("10000000000000000000");
    const truncate = truncateNumber(value);
    expect(truncate).toBe(10000000000000000000);
  });
});

describe("parseUnits function", () => {
  it("parse float", () => {
    const value = parseUnits("10.1");

    expect(value.toString()).toBe("10100000000000000000");
  });
});

describe("Test For Helpers", () => {
  it("getPercentage", () => {
    const counts = {
      yes: "119599582764872677106141560",
      no: "264024224557345144444429",
      abstain: "18676536804484183279348970",
      noWithVeto: "2263301217153781448738",
    };

    const msg = getPercentage(counts);
    expect(msg).toStrictEqual({
      yes: 0.86327057,
      no: 0.00190572,
      abstain: 0.13480736,
      noWithVeto: 0.00001633,
    });
  });
});

describe("getFormattedDate", () => {
  it("should format the date correctly in 12-hour format", () => {
    const date = new Date("2023-10-13T15:30:00"); // October 13, 2023, 3:30 PM
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).to.equal("Oct 13,2023 3:30PM");
  });

  it("should format the date correctly in 12-hour format with midnight (12:00 AM)", () => {
    const date = new Date("2023-10-13T00:00:00"); // October 13, 2023, 12:00 AM
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).to.equal("Oct 13,2023 12:00AM");
  });

  it("should format the date correctly in 12-hour format with noon (12:00 PM)", () => {
    const date = new Date("2023-10-13T12:00:00"); // October 13, 2023, 12:00 PM
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).to.equal("Oct 13,2023 12:00PM");
  });

  it("should format the date correctly in 12-hour format for January", () => {
    const date = new Date("2023-01-15T09:45:00"); // January 15, 2023, 9:45 AM
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).to.equal("Jan 15,2023 9:45AM");
  });

  it("should format the date correctly in 12-hour format for December", () => {
    const date = new Date("2023-12-07T18:15:00"); // December 7, 2023, 6:15 PM
    const formattedDate = getFormattedDate(date);
    expect(formattedDate).to.equal("Dec 7,2023 6:15PM");
  });
});
