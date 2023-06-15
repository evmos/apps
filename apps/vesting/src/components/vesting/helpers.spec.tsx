import { Duration, getEndDate, getEvmosAddress } from "./helpers";

describe("Vesting UI helpers", () => {
  it("should return true and the end date formatted", () => {
    const date = "2023-05-01";
    const vestingDuration = Duration.FourYears;
    const msg = getEndDate(date, vestingDuration);
    expect(msg).toStrictEqual([true, "05/01/2027"]);
  });

  it("should return false and the end date formatted", () => {
    const date = undefined;
    const vestingDuration = Duration.FourYears;
    const msg = getEndDate(date, vestingDuration);
    expect(msg).toStrictEqual([false, ""]);
  });

  it("should return the formatted evmos address", () => {
    // eslint-disable-next-line no-secrets/no-secrets
    const address = getEvmosAddress(
      "0xaF3219826Cb708463B3AA3B73c6640A21497AE49"
    );
    // eslint-disable-next-line no-secrets/no-secrets
    expect(address).toBe("evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65");
  });

  it("should return the same hex address", () => {
    const address = getEvmosAddress("0xaF3219826Cb70846");
    expect(address).toBe("0xaF3219826Cb70846");
  });

  it("should return the same evmos address", () => {
    const address = getEvmosAddress(
      // eslint-disable-next-line no-secrets/no-secrets
      "evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65"
    );
    // eslint-disable-next-line no-secrets/no-secrets
    expect(address).toBe("evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65");
  });

  it("should return the same empty address", () => {
    const address = getEvmosAddress("");
    expect(address).toBe("");
  });
});
