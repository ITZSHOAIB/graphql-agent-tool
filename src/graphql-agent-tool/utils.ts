export const operationType = (query: string): "query" | "mutation" => {
  return query.trim().toLowerCase().startsWith("mutation")
    ? "mutation"
    : "query";
};

export const generateDescription = (
  operation: "query" | "mutation",
  purpose: string,
  url: string,
): string => {
  const operationDescription =
    operation === "query"
      ? "A query operation is used to fetch or read data from the GraphQL API without making any modifications."
      : "A mutation operation is used to modify, create, update, or delete data on the GraphQL API.";

  return `A GraphQL ${operation} tool that ${purpose.toLowerCase()}. ${operationDescription} This tool executes a pre-defined GraphQL ${operation} operation against the endpoint at ${url}. Use this tool when you need to ${purpose.toLowerCase()}`;
};
