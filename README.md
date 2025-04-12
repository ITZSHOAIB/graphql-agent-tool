# GraphQL Agent Tool

A powerful LangChain tool that enables LLM models and AI agents to autonomously execute GraphQL queries and mutations. This package allows AI agents to intelligently interact with GraphQL APIs, making decisions about when and how to fetch or modify data through GraphQL endpoints without explicit human intervention.

[![npm version](https://badge.fury.io/js/graphql-agent-tool.svg)](https://badge.fury.io/js/graphql-agent-tool)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Features

- 🤖 Autonomous GraphQL operation execution by AI agents
- 🔄 Intelligent query/mutation selection based on agent's needs
- 🛠️ Type-safe implementation with TypeScript
- 🔌 Seamless integration with LangChain/Langgraph/LLM Models
- 🎯 Customizable response parsing for agent consumption
- 🔒 Secure configuration options
- 📝 Comprehensive documentation
- 🧪 Test coverage - 100%

## Installation

```bash
# Using npm
npm install graphql-agent-tool

# Using yarn
yarn add graphql-agent-tool

# Using pnpm
pnpm add graphql-agent-tool
```

## Prerequisites

- Node.js >= 20.0.0
- TypeScript >= 5.0.4 (optional but recommended)

## Documentation

For detailed documentation and examples, please refer to our guides:

- [Getting Started Guide](./guides/getting-started.md) - Learn how to integrate the GraphQL Agent Tool with your LLM model
- [API Documentation](./docs/README.md) - Complete API reference

## Development

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Available Scripts

- `pnpm build` - Build the package
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Run linter
- `pnpm format` - Format code
- `pnpm typecheck` - Type check the codebase

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Sohab Sk - [GitHub](https://github.com/ITZSHOAIB)

## Acknowledgments

- [LangChain](https://github.com/langchain-ai/langchain) for the amazing framework
- [Axios](https://axios-http.com/) for the HTTP client
- [Zod](https://zod.dev/) for runtime type checking
