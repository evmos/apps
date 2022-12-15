import { getReservedForFee } from "./format";

describe("Test Styles for Asset", () => {
  it("getReserverdForFee function", () => {
    const msg = getReservedForFee(5, "EVMOS", "EVMOS")
    expect(msg).toBe("5 EVMOS is reserved for transaction fees on the EVMOS network.")
  });
});

// Remove isolatedModule warning
export default undefined;
