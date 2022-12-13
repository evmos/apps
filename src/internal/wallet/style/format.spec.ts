describe("test", () => {
  it("fail", () => {
    expect(false).toBe(true);
  });
  it("pass", () => {
    expect(true).toBe(true);
  });
});

// Remove isolatedModule warning
export default undefined;
