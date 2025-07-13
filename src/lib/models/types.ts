export type ModelName =
  | "gpt-4o"
  | "gpt-4o-mini"
  | "gpt-3.5-turbo"
  | "claude-3-5-sonnet-20241022";

export interface ModelConfig {
  provider: "openai" | "anthropic";
  model: string;
  maxTokens: number;
  temperature: number;
}

export const MODEL_REGISTRY: Record<ModelName, ModelConfig> = {
  "gpt-4o": {
    provider: "openai",
    model: "gpt-4o",
    maxTokens: 4000,
    temperature: 0.7,
  },
  "gpt-4o-mini": {
    provider: "openai",
    model: "gpt-4o-mini",
    maxTokens: 2000,
    temperature: 0.7,
  },
  "gpt-3.5-turbo": {
    provider: "openai",
    model: "gpt-3.5-turbo",
    maxTokens: 2000,
    temperature: 0.7,
  },
  "claude-3-5-sonnet-20241022": {
    provider: "anthropic",
    model: "claude-3-5-sonnet-20241022",
    maxTokens: 4000,
    temperature: 0.7,
  },
} as const;

export function getModelConfig(modelName: ModelName): ModelConfig {
  return MODEL_REGISTRY[modelName];
}

export function getAllModelNames(): ModelName[] {
  return Object.keys(MODEL_REGISTRY) as ModelName[];
}
