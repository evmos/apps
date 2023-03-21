import { getPercentage } from "./style";

describe("Test For Helpers", () => {
  it("getPercentage", () => {
    const arr = [
      "119599582764872677106141560",
      "264024224557345144444429",
      "18676536804484183279348970",
      "2263301217153781448738",
    ];
    const msg = getPercentage(arr);
    expect(msg).toStrictEqual(["86.33", "0.19", "13.48", "0.00"]);
  });
});
