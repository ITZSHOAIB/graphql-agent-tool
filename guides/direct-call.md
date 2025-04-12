# 🚀 Direct GraphQL API Calls

Welcome to the world of direct GraphQL API calls! This guide will show you how to make direct calls to a GraphQL API using the `graphql-agent-tool`. It's like having a direct line to your favorite GraphQL endpoint! 🎯

## What's This All About?

The GraphQL Agent Tool provides a simple and type-safe way to make direct GraphQL API calls from your application. Whether you're building a web app, mobile app, or backend service, this tool makes it easy to interact with any GraphQL API. 🌟

## Direct Usage ✨

Here's how you can use the tool directly in your application:

```typescript
import { GraphqlAgentTool } from "graphql-agent-tool";

const graphqlCapitalTool = new GraphqlAgentTool({
  name: "getCountryCapital",
  purpose: "Retrieves the capital city of a country using its ISO country code...",
  url: "https://countries.trevorblades.com",
  query: `
    query GetCountryCapital($countryCode: ID!) {
      country(code: $countryCode) {
        capital
      }
    }
  `,
}).getTool();

// Direct invocation
const response = await graphqlCapitalTool.invoke({
  variables: {
    countryCode: "IN", // Try "US", "GB", "FR" for other countries!
  },
});
```

## Breaking It Down 🧐

1. **Name**: We give our tool a friendly name (`getCountryCapital`) so we know what it does
2. **Purpose**: We describe what the tool does in plain English
3. **URL**: We tell it where to find the GraphQL API
4. **Query**: We write the GraphQL query that will fetch our data

## What's Next? 🚀

Ready to level up? Check out our other guides on:
- [Using with LLM Models](./with-llm-model.md)
- [Custom Response Parsing](./response-parser.md)

Happy coding! 🎉 