import type { ModelName } from "../models";
import type { ToolName } from "../tools/index";

export interface DemoConfig {
  id: string;
  name: string;
  category: string;
  systemPrompt: string;
  tools: ToolName[];
  model: ModelName;
  maxTokens?: number;
  temperature?: number;
  suggestions: string[];
}

export interface DemoVariant {
  basic: {
    title: string;
    description: string;
    demoId: string;
  };
  enhanced: {
    title: string;
    description: string;
    demoId: string;
  };
}

export interface WorkshopDemo {
  id: string;
  name: string;
  description: string;
  variants: DemoVariant;
}
