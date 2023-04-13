import { BigNumber } from "ethers";
import { parseUnits } from "@ethersproject/units";

import {
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
} from "helpers";

describe("Test Styles for Asset", () => {
  it("getReserverdForFee function", () => {
    const msg = getReservedForFeeText(
      BigNumber.from("300000000000000000"),
      "EVMOS",
      "EVMOS"
    );
    expect(msg).toBe(
      "0.3 EVMOS is reserved for transaction fees on the EVMOS network."
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
      createBigNumber("300000000000000000")
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
      0.407541
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
      "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak",
      "EVMOS"
    );
    expect(value).toBe(true);
  });

  it("Case format address is false by address", () => {
    const value = checkFormatAddress(
      "osmo1j30xhsxcqss0n662wrma0vqw4zcx285munun8a",
      "EVMOS"
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
