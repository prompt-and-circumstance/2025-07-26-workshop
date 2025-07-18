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
  {
    id: "portfolio",
    name: "Write Operations",
    description: "Experience AI's ability to modify data, not just read it.",
    variants: {
      basic: {
        title: "Read-Only",
        description: "AI can only view portfolio data",
        demoId: "portfolio-read",
      },
      enhanced: {
        title: "Read-Write",
        description: "AI can modify investments, notes, and tasks",
        demoId: "portfolio-write",
      },
    },
  },
  {
    id: "tool-confusion",
    name: "Tool Confusion",
    description:
      "Explore how AI can get confused by too many tools and how to avoid it.",
    variants: {
      basic: {
        title: "Focused Tools",
        description: "AI with carefully selected relevant tools",
        demoId: "tools-focused",
      },
      enhanced: {
        title: "Tool Overload",
        description: "AI with many tools, including irrelevant ones",
        demoId: "tools-overload",
      },
    },
  },
];

export function getAllWorkshopDemos(): WorkshopDemo[] {
  return WORKSHOP_DEMOS;
}
