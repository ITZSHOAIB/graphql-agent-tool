# Getting Started with GraphQL Agent Tool

This guide will help you get started with using the GraphQL Agent Tool in your AI agent applications.

## Installation

You can install the GraphQL Agent Tool using npm, yarn, or pnpm:

```bash
# Using npm
npm install graphql-agent-tool

# Using yarn
yarn add graphql-agent-tool

# Using pnpm
pnpm add graphql-agent-tool
```

## Quick Start

Here's a simple example of how to integrate the GraphQL Agent Tool with your LLM model:

```typescript
import { GraphqlAgentTool } from "graphql-agent-tool";

// Create a tool for your AI agent to use
const countryTool = new GraphqlAgentTool({
  name: "getCountryInfo",
  purpose: "Retrieves information about a country using its ISO country code",
  url: "https://countries.trevorblades.com",
  query: `
    query GetCountryInfo($countryCode: ID!) {
      country(code: $countryCode) {
        capital
        name
        currency
        languages {
          name
        }
      }
    }
  `,
}).getTool();

// Bind the tool to your LLM model
const agent = yourLLMModel.bindTools([countryTool]);

// The agent can now autonomously decide when to use the tool
const response = await agent.invoke("Tell me about France's capital and official languages");
// The agent will automatically:
// 1. Determine it needs country information
// 2. Use the appropriate GraphQL query
// 3. Parse and utilize the response
```

## Advanced Usage

### Multiple GraphQL Operations

Your AI agent can handle multiple GraphQL operations and choose the appropriate one based on the task:

```typescript
const tools = [
  new GraphqlAgentTool({
    name: "getUserInfo",
    purpose: "Retrieves user information",
    url: "your-api-url",
    query: "your-user-query",
  }).getTool(),
  new GraphqlAgentTool({
    name: "updateUserProfile",
    purpose: "Updates user profile information",
    url: "your-api-url",
    query: "your-mutation-query",
  }).getTool(),
];

const agent = yourLLMModel.bindTools(tools);
// The agent will intelligently choose between getUserInfo and updateUserProfile
// based on the task at hand
```

### Custom Response Parsing

You can provide a custom response parser to transform the GraphQL response:

```typescript
const tool = new GraphqlAgentTool({
  name: "customParserExample",
  purpose: "Example with custom response parsing",
  url: "your-api-url",
  query: "your-query",
  responseParser: (response) => {
    // Custom parsing logic here
    return response.data.yourField;
  },
}).getTool();
```

### Custom Configuration

You can provide custom Axios configuration:

```typescript
const tool = new GraphqlAgentTool({
  name: "customConfigExample",
  purpose: "Example with custom configuration",
  url: "your-api-url",
  query: "your-query",
  config: {
    headers: {
      Authorization: "Bearer your-token",
    },
    timeout: 5000,
  },
}).getTool();
``` 