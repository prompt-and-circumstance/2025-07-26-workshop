import { calculatorTool } from "./calculator";
import { webSearchTool } from "./web-search";
import { clientLookupTool } from "./client-lookup";

export const TOOL_REGISTRY = {
  calculator: calculatorTool,
  "web-search": webSearchTool,
  "client-lookup": clientLookupTool,
} as const;

export type ToolName = keyof typeof TOOL_REGISTRY;

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
