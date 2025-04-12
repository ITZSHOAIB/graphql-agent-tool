# 🤖 GraphQL + LLM: A Match Made in AI Heaven

Welcome to the world of AI-powered GraphQL! This guide will show you how to bind the GraphQL Agent Tool with your LLM models. It's like giving your GraphQL tools a brain! 🧠

## The Big Picture 🎨

The GraphQL Agent Tool can be bound with any LLM that supports tool calling. This enables your LLM to:
- Understand when to use GraphQL operations
- Construct appropriate queries and mutations
- Handle responses intelligently
- Chain multiple operations together

## Binding the Tool with Your LLM 🤝

Here's how to bind the GraphQL Agent Tool with your LLM:

```typescript
import { GraphqlAgentTool } from "graphql-agent-tool";
import { YourLLM } from "your-llm-package";

// Create a GraphQL tool for country information
const countryInfoTool = new GraphqlAgentTool({
  name: "getCountryInfo",
  purpose: "Retrieves information about countries including capital, population, and languages...",
  url: "https://countries.trevorblades.com",
  query: `
    query GetCountryInfo($countryCode: ID!) {
      country(code: $countryCode) {
        capital
        population
        languages {
          name
        }
      }
    }
  `,
}).getTool();

// Create a GraphQL tool for space information
const spaceInfoTool = new GraphqlAgentTool({
  name: "getSpaceInfo",
  purpose: "Retrieves information about space missions and launches...",
  url: "https://api.spacex.land/graphql",
  query: `
    query GetLaunches($limit: Int!) {
      launches(limit: $limit) {
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
      }
    }
  `,
}).getTool();

// Create a GraphQL tool for movie information
const movieInfoTool = new GraphqlAgentTool({
  name: "getMovieInfo",
  purpose: "Retrieves information about movies including title, release date, and cast...",
  url: "https://tmdb.sandbox.zoosh.ie/graphql",
  query: `
    query GetMovie($id: ID!) {
      movie(id: $id) {
        title
        releaseDate
        cast {
          name
          character
        }
      }
    }
  `,
}).getTool();

// Bind the tools with your LLM
const llm = new YourLLM({
  tools: [countryInfoTool, spaceInfoTool, movieInfoTool],
});

// The LLM can now use these tools autonomously
const response = await llm.chat("What's the capital of India and when was the last SpaceX launch?");
```

## Available Open GraphQL APIs 🌐

Here are some free, open GraphQL APIs you can use with the tool:

1. **Countries API**
   - URL: `https://countries.trevorblades.com`
   - Purpose: Country information, capitals, languages, etc.
   - Example Query: Get country details by code

2. **SpaceX API**
   - URL: `https://api.spacex.land/graphql`
   - Purpose: Space missions, launches, rockets
   - Example Query: Get recent launches

3. **TMDB GraphQL**
   - URL: `https://tmdb.sandbox.zoosh.ie/graphql`
   - Purpose: Movie information, actors, reviews
   - Example Query: Get movie details

4. **Rick and Morty API**
   - URL: `https://rickandmortyapi.com/graphql`
   - Purpose: Character information, episodes, locations
   - Example Query: Get character details

5. **AniList API**
   - URL: `https://graphql.anilist.co`
   - Purpose: Anime and manga information
   - Example Query: Get anime details

## How It Works 🧐

1. You create GraphQL tools with specific purposes
2. Bind these tools with your LLM
3. The LLM understands when to use each tool
4. The LLM constructs appropriate queries
5. The tools execute the queries
6. The LLM processes the responses

## Why This Is Amazing 🌟

- **Autonomous Operations**: LLMs can determine when to use GraphQL
- **Multiple APIs**: Support for various GraphQL endpoints
- **Type Safety**: TypeScript keeps everything type-safe
- **Flexible**: Works with any LLM that supports tool calling
- **Extensible**: Easy to add new GraphQL tools

## Pro Tips 💡

- **Clear Purpose**: Write clear purpose descriptions for each tool
- **Response Parsing**: Use response parsers to help LLMs understand the data
- **Error Handling**: Implement proper error handling in your tools
- **Rate Limits**: Be mindful of API rate limits
- **Tool Selection**: Choose tools that complement each other

## What's Next? 📚

Ready to explore more? Check out:
- [Direct GraphQL Calls](./direct-call.md)
- [Response Parsing](./response-parser.md)

Happy AI-powered querying! 🎉 