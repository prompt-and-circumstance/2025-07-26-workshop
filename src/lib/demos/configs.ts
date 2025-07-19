import {
  KNOWLEDGE_DEMO_PROMPTS,
  KNOWLEDGE_DEMO_SUGGESTIONS,
  KNOWLEDGE_DEMO_TOOLS,
} from "../prompts/demo-knowledge";
import {
  MATH_DEMO_PROMPTS,
  MATH_DEMO_SUGGESTIONS,
  MATH_DEMO_TOOLS,
} from "../prompts/demo-math";
import {
  PORTFOLIO_DEMO_PROMPTS,
  PORTFOLIO_DEMO_SUGGESTIONS,
  PORTFOLIO_DEMO_TOOLS,
} from "../prompts/demo-portfolio";
import {
  TOOL_CONFUSION_DEMO_PROMPTS,
  TOOL_CONFUSION_DEMO_SUGGESTIONS,
  TOOL_CONFUSION_DEMO_TOOLS,
} from "../prompts/demo-tool-confusion";
import type { DemoConfig } from "./types";

export const DEMO_CONFIGS: Record<string, DemoConfig> = {
  "math-basic": {
    id: "math-basic",
    name: "Demo 1A: LLM Math Capabilities",
    category: "Mathematical Reasoning",
    systemPrompt: MATH_DEMO_PROMPTS["math-basic"],
    tools: MATH_DEMO_TOOLS["math-basic"],
    model: "gpt-4.1",
    suggestions: MATH_DEMO_SUGGESTIONS,
  },
  "math-enhanced": {
    id: "math-enhanced",
    name: "Demo 1B: LLM with Calculator Tools",
    category: "Mathematical Reasoning",
    systemPrompt: MATH_DEMO_PROMPTS["math-enhanced"],
    tools: MATH_DEMO_TOOLS["math-enhanced"],
    model: "gpt-4.1",
    suggestions: MATH_DEMO_SUGGESTIONS,
  },
  "knowledge-basic": {
    id: "knowledge-basic",
    name: "Demo 2A: Base Model Knowledge Limits",
    category: "Knowledge and Knowledge",
    systemPrompt: KNOWLEDGE_DEMO_PROMPTS["knowledge-basic"],
    tools: KNOWLEDGE_DEMO_TOOLS["knowledge-basic"],
    model: "gpt-4.1",
    suggestions: KNOWLEDGE_DEMO_SUGGESTIONS,
  },
  "knowledge-enhanced": {
    id: "knowledge-enhanced",
    name: "Demo 2B: Tool-Enhanced Information Access",
    category: "Knowledge and Knowledge",
    systemPrompt: KNOWLEDGE_DEMO_PROMPTS["knowledge-enhanced"],
    tools: KNOWLEDGE_DEMO_TOOLS["knowledge-enhanced"],
    model: "gpt-4.1",
    maxTokens: 16000,
    temperature: 0.7,
    suggestions: KNOWLEDGE_DEMO_SUGGESTIONS,
  },
  "portfolio-read": {
    id: "portfolio-read",
    name: "Demo 3A: Read-Only Portfolio Access",
    category: "Write Operations",
    systemPrompt: PORTFOLIO_DEMO_PROMPTS["portfolio-read"],
    tools: PORTFOLIO_DEMO_TOOLS["portfolio-read"],
    model: "gpt-4.1",
    suggestions: PORTFOLIO_DEMO_SUGGESTIONS,
  },
  "portfolio-write": {
    id: "portfolio-write",
    name: "Demo 3B: Full Read-Write Portfolio Management",
    category: "Write Operations",
    systemPrompt: PORTFOLIO_DEMO_PROMPTS["portfolio-write"],
    tools: PORTFOLIO_DEMO_TOOLS["portfolio-write"],
    model: "gpt-4.1",
    suggestions: PORTFOLIO_DEMO_SUGGESTIONS,
  },
  "tools-focused": {
    id: "tools-focused",
    name: "Demo 4A: Focused Tool Selection",
    category: "Tool Selection",
    systemPrompt: TOOL_CONFUSION_DEMO_PROMPTS["tools-focused"],
    tools: TOOL_CONFUSION_DEMO_TOOLS["tools-focused"],
    model: "gpt-3.5-turbo",
    suggestions: TOOL_CONFUSION_DEMO_SUGGESTIONS,
  },
  "tools-overload": {
    id: "tools-overload",
    name: "Demo 4B: Tool Overload",
    category: "Tool Selection",
    systemPrompt: TOOL_CONFUSION_DEMO_PROMPTS["tools-overload"],
    tools: TOOL_CONFUSION_DEMO_TOOLS["tools-overload"],
    model: "gpt-3.5-turbo",
    suggestions: TOOL_CONFUSION_DEMO_SUGGESTIONS,
  },
};

export function getDemoConfig(demoId: string): DemoConfig | null {
  return DEMO_CONFIGS[demoId] || null;
}
