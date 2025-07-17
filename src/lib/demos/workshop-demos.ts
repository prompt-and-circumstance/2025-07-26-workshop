import type { WorkshopDemo } from "./types";

const WORKSHOP_DEMOS: WorkshopDemo[] = [
  {
    id: "tokenizers",
    name: "Tokenizers",
    description:
      "Explore how AI models break down text into tokens and understand the implications.",
    variants: {
      basic: {
        title: "Basic Tokenization",
        description: "Interactive tokenizer showing how text becomes tokens",
        demoId: "tokenizers-basic",
      },
      enhanced: {
        title: "Model Comparison",
        description: "Compare tokenization across different model vocabularies",
        demoId: "tokenizers-comparison",
      },
    },
  },
  {
    id: "math",
    name: "LLMs and Math",
    description:
      "Discover the difference between raw LLM capabilities and tool-enhanced AI performance.",
    variants: {
      basic: {
        title: "Base Model",
        description: "Raw LLM mathematical capabilities",
        demoId: "math-basic",
      },
      enhanced: {
        title: "Tool-Enhanced",
        description: "AI with calculator tool integration",
        demoId: "math-enhanced",
      },
    },
  },
  {
    id: "knowledge",
    name: "LLMs and Knowledge",
    description:
      "Understand how LLMs handle knowledge gaps and the power of external tools for recent events and proprietary data.",
    variants: {
      basic: {
        title: "Base Model",
        description: "LLM with only training data knowledge",
        demoId: "knowledge-basic",
      },
      enhanced: {
        title: "Tool-Enhanced",
        description: "LLM with web search and proprietary data access",
        demoId: "knowledge-enhanced",
      },
    },
  },
];

export function getAllWorkshopDemos(): WorkshopDemo[] {
  return WORKSHOP_DEMOS;
}
