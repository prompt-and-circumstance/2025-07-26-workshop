import { calculatorTool } from "./calculator";
import { webSearchTool } from "./web-search";
import type { ToolName } from "./types";

export const TOOL_REGISTRY = {
  calculator: calculatorTool,
  "web-search": webSearchTool,
  // TODO: Add more tools as they're implemented
  "knowledge-base": null, // Placeholder
  "code-executor": null, // Placeholder
  "file-reader": null, // Placeholder
} as const;

export function getWorkshopTools(toolNames: ToolName[]) {
  const tools: Record<string, any> = {};

  for (const toolName of toolNames) {
    const tool = TOOL_REGISTRY[toolName];
    if (tool) {
      tools[toolName] = tool;
    } else {
      console.warn(
        `Tool '${toolName}' not found in registry or not implemented yet`
      );
    }
  }

  return tools;
}

// Type-safe tool getters for specific suites
export function getMathTools() {
  return {
    calculator: TOOL_REGISTRY.calculator,
  };
}

export function getSearchTools() {
  return {
    "web-search": TOOL_REGISTRY["web-search"],
  };
}

export function getReasoningTools() {
  const tools: Record<string, any> = {};

  if (TOOL_REGISTRY["web-search"]) {
    tools["web-search"] = TOOL_REGISTRY["web-search"];
  }
  if (TOOL_REGISTRY["knowledge-base"]) {
    tools["knowledge-base"] = TOOL_REGISTRY["knowledge-base"];
  }

  return tools;
}

// Export individual tools for direct use
export { calculatorTool } from "./calculator";
export { webSearchTool } from "./web-search";

// Export types
export type { ToolName, ToolCategory, ToolConfig } from "./types";
export { getToolConfig, getToolsByCategory, getAllToolNames } from "./types";
