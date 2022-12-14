import { truncateAddress } from "./format";

describe("Test format", () => {
  const address = "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak";
  const hexAddress = '0xC1dC8C6c0dCd24226c721a7E109E4A7C20F7bF0f'

  it("truncateAddress greater than 11 and with information", () => {
    // expect(address.length).toBeGreaterThanOrEqual(11)
    // expect(address).not.toBe("")
    let truncate = truncateAddress(address)
    expect(truncate).not.toBe("")
    console.log(truncate)

  });
  it("truncate evmos address", () => {
    let truncate = truncateAddress(address)
    expect(truncate).toBe("evmos1c8wgcmq...0zd0ak")
  });

  it("truncate Hex address", () => {
    let truncate = truncateAddress(hexAddress)
    expect(truncate).toBe("0xC1d...bF0f")
  });
});

// Remove isolatedModule warning
export default undefined;
