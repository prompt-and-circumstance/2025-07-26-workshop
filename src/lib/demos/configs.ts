import type { DemoConfig } from "./types";
import { DEMO_PROMPTS } from "../prompts";

export const DEMO_CONFIGS: Record<string, DemoConfig> = {
  "math-basic": {
    id: "math-basic",
    name: "Demo 1A: LLM Math Capabilities",
    category: "Mathematical Reasoning",
    systemPrompt: DEMO_PROMPTS["math-basic"],
    tools: [],
    model: "gpt-4o",
    suggestions: [
      "Calculate compound interest: $10,000 at 7% for 15 years",
      "Find the square root of 386,154,294,354,481",
      "Compute 23.7% of 48,329",
      "Calculate: (1,500 × 1.08^10) - 1,500",
    ],
  },
  "math-enhanced": {
    id: "math-enhanced",
    name: "Demo 1B: LLM with Calculator Tools",
    category: "Mathematical Reasoning",
    systemPrompt: DEMO_PROMPTS["math-enhanced"],
    tools: ["calculator"],
    model: "gpt-4o",
    suggestions: [
      "Calculate compound interest: $10,000 at 7% for 15 years",
      "Find the square root of 386,154,294,354,481",
      "Compute 23.7% of 48,329",
      "Calculate: (1,500 × 1.08^10) - 1,500",
    ],
  },
  "knowledge-basic": {
    id: "knowledge-basic",
    name: "Demo 2A: Base Model Knowledge Limits",
    category: "Knowledge and Knowledge",
    systemPrompt: DEMO_PROMPTS["knowledge-basic"],
    tools: [],
    model: "gpt-4o",
    suggestions: [
      "What's the current Bitcoin price?",
      "How did TSMC's latest earnings report perform?",
      "What are Tesla's Q4 2024 delivery numbers?",
      "Can you provide information about our client ACME Corp?",
    ],
  },
  "knowledge-enhanced": {
    id: "knowledge-enhanced",
    name: "Demo 2B: Tool-Enhanced Information Access",
    category: "Knowledge and Knowledge",
    systemPrompt: DEMO_PROMPTS["knowledge-enhanced"],
    tools: ["web-search", "client-lookup"],
    model: "gpt-4o",
    suggestions: [
      "What's the current Bitcoin price?",
      "How did TSMC's latest earnings report perform?",
      "What are Tesla's Q4 2024 delivery numbers?",
      "Can you provide information about our client ACME Corp?",
    ],
  },
};

export function getDemoConfig(demoId: string): DemoConfig | null {
  return DEMO_CONFIGS[demoId] || null;
}
