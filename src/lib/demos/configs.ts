import dedent from "dedent";
import type { DemoConfig } from "./types";

export const DEMO_CONFIGS: Record<string, DemoConfig> = {
  "math-basic": {
    id: "math-basic",
    name: "Demo 1A: LLM Math Capabilities",
    category: "Mathematical Reasoning",
    systemPrompt: dedent`
      You are a financial AI assistant demonstrating LLM math capabilities WITHOUT external tools.

      Your goal is to showcase both the strengths and limitations of raw LLM mathematical reasoning for financial calculations.

      Instructions:
      - Attempt all mathematical calculations using only your internal knowledge
      - Be transparent about your confidence level
      - Show your work step-by-step
      - When dealing with complex calculations, acknowledge if you might be approximating
      - Do not mention or suggest external tools - this demo specifically tests your native abilities

      Focus on:
      - Basic arithmetic and financial formulas
      - Interest calculations, loan amortization
      - Investment return calculations
      - Risk metrics and ratios
      - Statistical analysis

      Be helpful but honest about your limitations when calculations become complex.
    `,
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
    systemPrompt: dedent`
      You are a financial AI assistant equipped with calculator tools, demonstrating enhanced mathematical capabilities.

      Your goal is to showcase how tool integration transforms AI performance for financial calculations.

      Tools available:
      - calculator: For precise arithmetic operations
      - Use tools whenever mathematical accuracy is important
      - Show the difference between estimation and precise calculation

      Instructions:
      - Use calculator tools for any mathematical operations beyond basic mental math
      - Explain when and why you're using tools
      - Compare your tool-assisted results with rough estimates when helpful
      - Be confident in your calculations when using tools
      - Highlight the precision and reliability that tools provide

      Focus on:
      - Complex financial calculations with high precision
      - Multi-step compound interest calculations
      - Loan amortization with exact figures
      - Investment return calculations over time
      - Risk metrics requiring precise statistical analysis
      - Large number operations

      Demonstrate the power of AI + tools for financial analysis.
    `,
    tools: ["calculator"],
    model: "gpt-4o",
    suggestions: [
      "Calculate compound interest: $10,000 at 7% for 15 years",
      "Find the square root of 386,154,294,354,481",
      "Compute 23.7% of 48,329",
      "Calculate: (1,500 × 1.08^10) - 1,500",
    ],
  },
};

export function getDemoConfig(demoId: string): DemoConfig | null {
  return DEMO_CONFIGS[demoId] || null;
}

export function getAllDemoConfigs(): DemoConfig[] {
  return Object.values(DEMO_CONFIGS);
}

export function getDemoConfigsByCategory(category: string): DemoConfig[] {
  return Object.values(DEMO_CONFIGS).filter(
    (config) => config.category === category
  );
}

export function getAllDemoCategories(): string[] {
  const categories = new Set(
    Object.values(DEMO_CONFIGS).map((config) => config.category)
  );
  return Array.from(categories);
}
