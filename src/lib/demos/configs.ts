import type { DemoConfig } from "./types";
import { DEMO_PROMPTS } from "../prompts/demo-prompts";

export const DEMO_CONFIGS: Record<string, DemoConfig> = {
  "math-basic": {
    id: "math-basic",
    name: "Demo 1A: LLM Math Capabilities",
    category: "Mathematical Reasoning",
    systemPrompt: DEMO_PROMPTS["math-basic"],
    tools: [],
    model: "gpt-4.1",
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
    model: "gpt-4.1",
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
    model: "gpt-4.1",
    suggestions: [
      "What's the current Bitcoin price?",
      "What are Tesla's Q4 2024 delivery numbers?",
      "Tell me about our client Venture Capital Partners",
      "Can you provide information about our client ACME Corp?",
    ],
  },
  "knowledge-enhanced": {
    id: "knowledge-enhanced",
    name: "Demo 2B: Tool-Enhanced Information Access",
    category: "Knowledge and Knowledge",
    systemPrompt: DEMO_PROMPTS["knowledge-enhanced"],
    tools: ["web-search", "client-lookup", "web-fetch"],
    model: "gpt-4.1",
    maxTokens: 16000,
    temperature: 0.7,
    suggestions: [
      "What's the current Bitcoin price?",
      "What are Tesla's Q4 2024 delivery numbers?",
      "Tell me about our client Venture Capital Partners",
      "Can you provide information about our client ACME Corp?",
    ],
  },
  "portfolio-read": {
    id: "portfolio-read",
    name: "Demo 3A: Read-Only Portfolio Access",
    category: "Write Operations",
    systemPrompt: DEMO_PROMPTS["portfolio-read"],
    tools: ["view-portfolio", "get-client-notes", "list-tasks"],
    model: "gpt-4.1",
    suggestions: [
      "Show me the current portfolio",
      "Add 100 shares of GOOGL at $150",
      "Create a task to review Tesla position",
      "Add note: Client wants ESG investments",
      "List all pending tasks",
    ],
  },
  "portfolio-write": {
    id: "portfolio-write",
    name: "Demo 3B: Full Read-Write Portfolio Management",
    category: "Write Operations",
    systemPrompt: DEMO_PROMPTS["portfolio-write"],
    tools: [
      "view-portfolio",
      "get-client-notes",
      "list-tasks",
      "add-investment",
      "add-client-note",
      "update-client-note",
      "create-task",
      "complete-task",
    ],
    model: "gpt-4.1",
    suggestions: [
      "Show me the current portfolio",
      "Add 100 shares of GOOGL at $150",
      "Create a task to review Tesla position",
      "Add note: Client wants ESG investments",
      "List all pending tasks",
    ],
  },
};

export function getDemoConfig(demoId: string): DemoConfig | null {
  return DEMO_CONFIGS[demoId] || null;
}
