import { describe, it, expect } from "vitest";
import { graphData } from "../data";

describe("graphData", () => {
  it("should be defined", () => {
    expect(graphData).toBeDefined();
  });

  it("should be an array", () => {
    expect(Array.isArray(graphData)).toBe(true);
  });

  it("should not be empty", () => {
    expect(graphData.length).toBeGreaterThan(0);
  });

  it("should have valid graph node structure", () => {
    graphData.forEach((node) => {
      expect(node).toHaveProperty("name");
      expect(node).toHaveProperty("description");
      expect(node).toHaveProperty("parent");

      expect(typeof node.name).toBe("string");
      expect(typeof node.description).toBe("string");
      expect(typeof node.parent).toBe("string");
    });
  });

  it("should contain a root node", () => {
    const rootNode = graphData.find((node) => node.parent === "");
    expect(rootNode).toBeDefined();
  });
});
