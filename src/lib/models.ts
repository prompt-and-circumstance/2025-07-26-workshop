import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

export const MODEL_REGISTRY = {
  // OpenAI Models
  "gpt-4o": openai("gpt-4o"),
  "gpt-4o-mini": openai("gpt-4o-mini"),
  "gpt-4-turbo": openai("gpt-4-turbo"),
  "gpt-3.5-turbo": openai("gpt-3.5-turbo"),

  // Anthropic Models
  "claude-3-5-sonnet-20241022": anthropic("claude-3-5-sonnet-20241022"),
  "claude-3-5-haiku-20241022": anthropic("claude-3-5-haiku-20241022"),
  "claude-3-opus-20240229": anthropic("claude-3-opus-20240229"),
  "claude-3-sonnet-20240229": anthropic("claude-3-sonnet-20240229"),
  "claude-3-haiku-20240307": anthropic("claude-3-haiku-20240307"),

  // TODO: Add Kimi K2 when available in ai-sdk
  // Kimi K2 is available through OpenRouter (model: "moonshotai/kimi-k2")
  // Can be added using createOpenAI({ baseURL: "https://openrouter.ai/api/v1" })
  // "kimi-k2": createOpenAI({ baseURL: "https://openrouter.ai/api/v1" })("moonshotai/kimi-k2")
} as const;

// Extract ModelName type from MODEL_REGISTRY keys
export type ModelName = keyof typeof MODEL_REGISTRY;

// Predefined model instances for convenience
export const smallQuickModel = MODEL_REGISTRY["gpt-4o-mini"];
export const workhorseModel = MODEL_REGISTRY["gpt-4o"];
export const claudeModel = MODEL_REGISTRY["claude-3-5-sonnet-20241022"];

// Helper function to get model by name
export function getModel(modelName: ModelName) {
  return MODEL_REGISTRY[modelName];
}
