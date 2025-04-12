import { GraphqlAgentTool } from "graphql-agent-tool";

export const invoke = async () => {
  const graphqlCapitalTool = new GraphqlAgentTool({
    name: "getCountryCapital",
    purpose:
      "Retrieves the capital city of a country using its ISO country code. The tool expects a country code in ISO format (e.g., 'IN' for India, 'US' for United States). Input should be provided in the format {variables: {countryCode: <countryCode>}}.",
    url: "https://countries.trevorblades.com",
    query: `
    query GetCountryCapital($countryCode: ID!) {
      country(code: $countryCode) {
        capital
      }
    }
    `,
  }).getTool();

  const response = await graphqlCapitalTool.invoke({
    variables: {
      countryCode: "IN",
    },
  });

  return response;
};
