import type { AxiosRequestConfig } from "axios";

/**
 * The default configuration for the GraphQL agent tool.
 */
export const defaultConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
