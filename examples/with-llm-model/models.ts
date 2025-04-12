import { ChatMistralAI } from "@langchain/mistralai";

// Mistral model
export const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY || "",
  temperature: 0.0,
});
