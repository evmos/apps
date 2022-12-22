import { BigNumber } from "ethers";
import {
  createBigNumber,
  getReservedForFeeText,
  safeSubstraction,
} from "./format";

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
