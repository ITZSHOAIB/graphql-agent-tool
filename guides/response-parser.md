# 🎯 Response Parsing for LLM Agents

Welcome to the world of response parsing for LLM agents! This guide will show you how to help your LLM agents get exactly the data they need from GraphQL responses. It's like giving your AI agents a data extraction superpower! 🤖

## Why Response Parsing Matters for LLMs 💡

When LLM agents interact with GraphQL APIs, they need clean, structured data to:
- Make informed decisions
- Generate accurate responses
- Chain multiple operations together
- Handle complex data transformations

Without proper parsing, LLMs might struggle with:
- Nested response structures
- Unnecessary data fields
- Complex data types
- Inconsistent response formats

## The Code Magic ✨

Here's how we can help our LLM agents get exactly what they need:

```typescript
import { GraphqlAgentTool } from "graphql-agent-tool";

const graphqlCapitalTool = new GraphqlAgentTool({
  name: "getCountryCapital",
  purpose: "Retrieves the capital city of a country...",
  url: "https://countries.trevorblades.com",
  query: `
    query GetCountryCapital($countryCode: ID!) {
      country(code: $countryCode) {
        capital
      }
    }
  `,
  responseParser: (response: unknown) => {
    const { data } = response as { data: { country: { capital: string } } };
    return {
      capital: data.country.capital,
      // Add metadata to help LLM understand the context
      context: "This is the capital city of the requested country",
      type: "string"
    };
  },
}).getTool();
```

## Breaking It Down 🧐

1. **Raw Response**: The GraphQL API returns data in a nested structure
2. **Type Safety**: We use TypeScript to ensure type safety
3. **LLM-Friendly Format**: We structure the response to be easily consumable by LLMs
4. **Context Addition**: We add metadata to help LLMs understand the data

## Why This Rocks for LLMs 🤘

- **Structured Data**: LLMs get clean, predictable data structures
- **Context Awareness**: Added metadata helps LLMs understand the data
- **Type Information**: LLMs know what kind of data to expect
- **Error Prevention**: Parsing helps catch and handle errors before LLMs see them

## Real-World Example: Complex Data Transformation 🌍

Let's say your LLM needs to make decisions based on country information:

```typescript
responseParser: (response: unknown) => {
  const { data } = response as { 
    data: { 
      country: { 
        capital: string,
        population: number,
        languages: { name: string }[]
      } 
    } 
  };
  
  return {
    capital: data.country.capital,
    population: data.country.population,
    languages: data.country.languages.map(lang => lang.name),
    // Add decision-making context for the LLM
    context: {
      type: "country_information",
      purpose: "Use this data to answer questions about the country",
      fields: {
        capital: "The capital city of the country",
        population: "Total population count",
        languages: "List of official languages"
      }
    }
  };
}
```

## Pro Tips for LLM Response Parsing 💡

- **Structure Matters**: Always return consistent, predictable structures
- **Add Context**: Include metadata to help LLMs understand the data
- **Type Safety**: Use TypeScript to prevent runtime errors
- **Error Handling**: Provide clear error messages for LLMs to handle
- **Chain Support**: Consider how the parsed data will be used in LLM chains

## Common LLM Use Cases 🎯

- **Decision Making**: Help LLMs make informed choices
- **Data Transformation**: Convert complex data into LLM-friendly formats
- **Error Recovery**: Provide clear error states for LLMs to handle
- **Chain Operations**: Support multi-step LLM operations
- **Context Building**: Help LLMs maintain conversation context

## What's Next? 📚

Ready to explore more? Check out:
- [Direct GraphQL Calls](./direct-call.md)
- [Using with LLM Models](./with-llm-model.md)

Happy LLM-powered parsing! 🎉 