import { GraphqlAgentTool } from "graphql-agent-tool";
import { mistralModel } from "./models.js";

export const invoke = async (prompt: string) => {
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

  const modelWithTools = mistralModel.bindTools([graphqlCapitalTool]);
  const response = await modelWithTools.invoke(prompt);

  return response;
};
