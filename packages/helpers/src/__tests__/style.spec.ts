import { getPercentage } from "../index"; // temporary fix, this test need to be moved to helpers package

describe("Test For Helpers", () => {
  it("getPercentage", () => {
    const arr = [
      "119599582764872677106141560",
      "264024224557345144444429",
      "18676536804484183279348970",
      "2263301217153781448738",
    ];
    const msg = getPercentage(arr);
    expect(msg).toStrictEqual([
      86.3270570163752, 0.1905728578658595, 13.480736473460993,
      0.0016336522979564414,
    ]);
  });
});