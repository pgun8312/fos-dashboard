import emptyModule from "../empty-module";

describe("Empty Module", () => {
  it("should export an empty object", () => {
    expect(typeof emptyModule).toBe("object");
    expect(Object.keys(emptyModule).length).toBe(0);
  });
});
