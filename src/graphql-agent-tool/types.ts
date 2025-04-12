import type { AxiosRequestConfig } from "axios";
import { z } from "zod";

export const executeSchema = z.object({
  variables: z.record(z.string(), z.unknown()),
});

export type ExecuteInput = z.infer<typeof executeSchema>;

export type ResponseParser = (response: unknown) => unknown;

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

export type GraphqlAgentToolOptions = z.infer<typeof optionsSchema>;
