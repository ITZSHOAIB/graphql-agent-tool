import { describe, expect, it } from "vitest";
import { GraphqlAgentTool } from "../src";

describe("index", () => {
  it("should export GraphqlAgentTool", () => {
    expect(GraphqlAgentTool).toBeDefined();
    expect(typeof GraphqlAgentTool).toBe("function");
  });
});
