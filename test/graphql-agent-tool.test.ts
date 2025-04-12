import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { GraphqlAgentTool } from "../src/graphql-agent-tool";
import type { ResponseParser } from "../src/graphql-agent-tool/types";

// Mock axios
vi.mock("axios");

describe("GraphqlAgentTool", () => {
  const validOptions = {
    name: "get-user",
    purpose: "Fetch user details",
    url: "https://api.example.com/graphql",
    query: "query { user(id: $id) { name } }",
  };

  describe("constructor validation", () => {
    it("should throw error when name is empty", () => {
      expect(() => new GraphqlAgentTool({ ...validOptions, name: "" })).toThrow(
        "Name is required",
      );
    });

    it("should throw error when purpose is empty", () => {
      expect(
        () => new GraphqlAgentTool({ ...validOptions, purpose: "" }),
      ).toThrow("Purpose is required");
    });

    it("should throw error when URL is invalid", () => {
      expect(
        () => new GraphqlAgentTool({ ...validOptions, url: "not-a-url" }),
      ).toThrow("Invalid URL");
    });

    it("should throw error when query is empty", () => {
      expect(
        () => new GraphqlAgentTool({ ...validOptions, query: "" }),
      ).toThrow("Query is required");
    });

    it("should accept valid options", () => {
      expect(() => new GraphqlAgentTool(validOptions)).not.toThrow();
    });
  });

  describe("initialization", () => {
    it("should initialize with correct properties", () => {
      const tool = new GraphqlAgentTool(validOptions);

      expect(tool.name).toBe("graphql-query-get-user-tool");
      expect(tool.description).toContain("query");
      expect(tool.description).toContain(validOptions.purpose.toLowerCase());
      expect(tool.description).toContain(validOptions.url);
    });

    it("should merge config with default config", () => {
      const customConfig = {
        headers: {
          "X-Custom-Header": "value",
        },
        timeout: 5000,
      };

      const tool = new GraphqlAgentTool({
        ...validOptions,
        config: customConfig,
      });
      const toolInstance = tool.getTool();

      expect(toolInstance.schema).toBeDefined();
    });
  });

  describe("query execution", () => {
    it("should execute GraphQL query with variables", async () => {
      const mockResponse = {
        data: {
          user: {
            name: "John Doe",
          },
        },
      };

      (axios.post as Mock).mockResolvedValue(mockResponse);

      const tool = new GraphqlAgentTool(validOptions);
      const result = await tool.getTool().func({ variables: { id: "123" } });

      expect(axios.post).toHaveBeenCalledWith(
        validOptions.url,
        {
          query: validOptions.query,
          variables: { id: "123" },
        },
        expect.any(Object),
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should use custom response parser when provided", async () => {
      const mockResponse = {
        data: {
          user: {
            name: "John Doe",
          },
        },
      };

      const customParser: ResponseParser = (response) => {
        if (response && typeof response === "object") {
          const data = response as { user: { name: string } };
          return data.user.name;
        }
        return response;
      };

      (axios.post as Mock).mockResolvedValue(mockResponse);

      const tool = new GraphqlAgentTool({
        ...validOptions,
        responseParser: customParser,
      });

      const result = await tool.getTool().func({ variables: { id: "123" } });

      expect(result).toEqual("John Doe");
    });
  });

  describe("operation types", () => {
    it("should handle GraphQL mutation operations", () => {
      const mutationQuery = "mutation { createUser(input: $input) { id } }";
      const tool = new GraphqlAgentTool({
        ...validOptions,
        query: mutationQuery,
      });

      expect(tool.name).toBe("graphql-mutation-get-user-tool");
      expect(tool.description).toContain("mutation");
    });

    it("should handle GraphQL query operations", () => {
      const tool = new GraphqlAgentTool(validOptions);
      expect(tool.name).toBe("graphql-query-get-user-tool");
      expect(tool.description).toContain("query");
    });
  });
});
