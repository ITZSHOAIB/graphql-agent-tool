import type { AxiosRequestConfig } from "axios";
import { z } from "zod";

/**
 * The schema for the execute function.
 */
export const executeSchema = z.object({
  variables: z.record(z.string(), z.unknown()),
});

/**
 * The type for the execute function.
 * @property {Record<string, unknown>} variables - The variables for the GraphQL query or mutation.
 */
export type ExecuteInput = z.infer<typeof executeSchema>;

/**
 * The type for the response parser.
 * The response parser is a function that takes the response from the GraphQL query or mutation and returns the parsed response.
 */
export type ResponseParser = (response: unknown) => unknown;

/**
 * The schema for the constructor options.
 */
export const optionsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  purpose: z.string().min(1, "Purpose is required"),
  url: z.string().url("Invalid URL"),
  query: z.string().min(1, "Query is required"),
  config: z.custom<AxiosRequestConfig>().optional(),
  responseParser: z
    .function()
    .args(z.unknown())
    .returns(z.unknown())
    .optional(),
});

/**
 * @interface GraphqlAgentToolOptions - The options for creating a GraphQL agent tool.
 * @property {string} name - The name of the tool. Name can be the functionality of the graphql operation.
 * @property {string} purpose - The purpose of the tool. Purpose should be well defined and should be able to be used by the LLM to understand the functionality of the tool.
 * @property {string} url - The URL of the GraphQL endpoint to query.
 * @property {string} query - The GraphQL query or mutation to execute. Must be a valid GraphQL operation.
 * @property {AxiosRequestConfig} [config] - Optional Axios configuration for the HTTP request. Can be used to add headers, authentication, etc. See {@link AxiosRequestConfig} for more details.
 * @property {ResponseParser} [responseParser] - Optional function to parse the GraphQL response. If not provided, the raw response will be returned.
 */
export type GraphqlAgentToolOptions = z.infer<typeof optionsSchema>;
