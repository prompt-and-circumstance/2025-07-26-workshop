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
  "tools-focused": {
    id: "tools-focused",
    name: "Demo 4A: Focused Tool Selection",
    category: "Tool Selection",
    systemPrompt: DEMO_PROMPTS["tools-focused"],
    tools: [
      // Just the essential tools
      "get-stock-price",
      "convert-currency",
    ],
    model: "gpt-3.5-turbo",
    suggestions: [
      "What's Apple's stock price and how much is $1000 in EUR?",
      "Get Tesla stock price and convert 5000 USD to GBP",
      "Check Microsoft price and convert $2500 to Japanese Yen",
      "Find Google's current price and convert 750 USD to EUR",
      "What's Amazon trading at? Also convert $10,000 to British Pounds",
    ],
  },
  "tools-overload": {
    id: "tools-overload",
    name: "Demo 4B: Tool Overload",
    category: "Tool Selection",
    systemPrompt: DEMO_PROMPTS["tools-overload"],
    tools: [
      // MAXIMALLY CONFUSING - Working tools with completely misleading names
      "portfolio-risk-assessment", // Actually gets stock price
      "tax-liability-calculator", // Actually converts currency
      // Similar sounding tools that don't do what we need
      "get-currency-rate", // Just returns rate, doesn't convert
      "calculate-exchange", // Calculator that needs rate input
      "fetch-stock-data", // Historical data, not current price
      "lookup-stock", // Company info, not price
      "exchange-rate-history", // Historical rates
      "format-currency", // Just formats, doesn't convert
      "get-quote", // Delayed quotes
      "currency-calculator", // Basic math, no conversion
      "get-market-data", // General market data
      "perform-exchange", // Only for crypto
      "check-price", // Historical prices
      "forex-convert", // Only EUR/GBP
      "analyze-stock", // Analysis without price
    ],
    model: "gpt-3.5-turbo",
    suggestions: [
      "What's Apple's stock price and how much is $1000 in EUR?",
      "Get Tesla stock price and convert 5000 USD to GBP",
      "Check Microsoft price and convert $2500 to Japanese Yen",
      "Find Google's current price and convert 750 USD to EUR",
      "What's Amazon trading at? Also convert $10,000 to British Pounds",
    ],
  },
};

export function getDemoConfig(demoId: string): DemoConfig | null {
  return DEMO_CONFIGS[demoId] || null;
}
