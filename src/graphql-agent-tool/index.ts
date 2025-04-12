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

export class GraphqlAgentTool {
  #name!: string;
  #description!: string;
  #url!: string;
  #query!: string;
  #config!: AxiosRequestConfig;
  #responseParser!: ResponseParser;

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

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

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
