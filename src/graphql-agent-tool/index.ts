import { tool } from "@langchain/core/tools";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { defaultConfig } from "./config.js";
import type {
  ExecuteInput,
  GraphqlAgentToolOptions,
  ResponseParser,
} from "./types.js";
import { executeSchema, optionsSchema } from "./types.js";
import { generateDescription, operationType } from "./utils.js";

export type { ExecuteInput, GraphqlAgentToolOptions, ResponseParser };
export { executeSchema, optionsSchema };

/**
 * A tool that LLM models can use to execute GraphQL queries and mutations.
 * This tool is useful for agents that need to execute GraphQL queries and mutations.
 *
 * @example
 * ```typescript
 * import { GraphqlAgentTool } from "graphql-agent-tool";
 *
 * const graphqlCapitalTool = new GraphqlAgentTool({
 *   name: "getCountryCapital",
 *   purpose:
 *     "Retrieves the capital city of a country using its ISO country code. The tool expects a country code in ISO format (e.g., 'IN' for India, 'US' for United States). Input should be provided in the format {variables: {countryCode: <countryCode>}}.",
 *   url: "https://countries.trevorblades.com",
 *   query: `
 *     query GetCountryCapital($countryCode: ID!) {
 *       country(code: $countryCode) {
 *         capital
 *       }
 *     }
 *   `,
 * }).getTool();
 *
 * const modelWithTools = mistralModel.bindTools([graphqlCapitalTool]);
 * const response = await modelWithTools.invoke(prompt);
 *
 * console.log(response);
 * ```
 *
 * For more examples, see the [examples](https://github.com/ITZSHOAIB/graphql-agent-tool/tree/main/examples) directory.
 */
export class GraphqlAgentTool {
  #name!: string;
  #description!: string;
  #url!: string;
  #query!: string;
  #config!: AxiosRequestConfig;
  #responseParser!: ResponseParser;

  /**
   * The constructor for the GraphqlAgentTool class.
   * @param options - The options for the GraphqlAgentTool class. See {@link GraphqlAgentToolOptions} for more details.
   */
  constructor(options: GraphqlAgentToolOptions) {
    const validatedOptions = optionsSchema.parse(options);
    const { name, purpose, url, query, config, responseParser } =
      validatedOptions;

    const opType = operationType(query);
    this.#name = `graphql-${opType}-${name}-tool`;
    this.#description = generateDescription(opType, purpose, url);
    this.#url = url;
    this.#query = query;
    this.#config = {
      ...defaultConfig,
      ...config,
      headers: { ...defaultConfig.headers, ...config?.headers },
    };
    this.#responseParser = responseParser ?? ((response: unknown) => response);
  }

  /**
   * The name of the tool.
   */
  get name() {
    return this.#name;
  }

  /**
   * The description of the tool.
   */
  get description() {
    return this.#description;
  }

  /**
   * Returns the tool object that can be used by the LLM.
   * See [examples](https://github.com/ITZSHOAIB/graphql-agent-tool/tree/main/examples) for more details.
   */
  getTool() {
    return tool(this.#execute.bind(this), {
      name: this.#name,
      description: this.#description,
      schema: executeSchema,
    });
  }

  async #execute({ variables }: ExecuteInput) {
    const response = await axios.post(
      this.#url,
      {
        query: this.#query,
        variables: variables,
      },
      this.#config,
    );

    return this.#responseParser(response.data);
  }
}
