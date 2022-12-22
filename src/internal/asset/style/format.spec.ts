import { BigNumber } from "ethers";
import { getReservedForFeeText } from "./format";

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
