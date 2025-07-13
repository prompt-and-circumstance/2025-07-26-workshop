export type ToolName = 
  | "calculator"
  | "web-search" 
  | "knowledge-base"
  | "code-executor"
  | "file-reader";

export type ToolCategory = "math" | "search" | "reasoning" | "coding";

export interface ToolConfig {
  name: ToolName;
  description: string;
  category: ToolCategory;
}

export const TOOL_CONFIGS: Record<ToolName, ToolConfig> = {
  calculator: {
    name: "calculator",
    description: "Perform precise mathematical calculations",
    category: "math",
  },
  "web-search": {
    name: "web-search", 
    description: "Search the web for current information",
    category: "search",
  },
  "knowledge-base": {
    name: "knowledge-base",
    description: "Query internal knowledge base",
    category: "reasoning", 
  },
  "code-executor": {
    name: "code-executor",
    description: "Execute code snippets safely",
    category: "coding",
  },
  "file-reader": {
    name: "file-reader",
    description: "Read and analyze files",
    category: "coding",
  },
} as const;

export function getToolConfig(toolName: ToolName): ToolConfig {
  return TOOL_CONFIGS[toolName];
}

export function getToolsByCategory(category: ToolCategory): ToolName[] {
  return Object.values(TOOL_CONFIGS)
    .filter(config => config.category === category)
    .map(config => config.name);
}

export function getAllToolNames(): ToolName[] {
  return Object.keys(TOOL_CONFIGS) as ToolName[];
}