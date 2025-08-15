import stringUtils from "@/utils/stringUtils.js";

describe("stringUtils.js", function () {
  it("cleanString method", function () {
    expect(stringUtils.methods.cleanString("snake_case")).toBe("snake case");
    expect(stringUtils.methods.cleanString("snakeCase")).toBe("snakeCase");
    expect(stringUtils.methods.cleanString(123)).toBe(123);
  });
});
