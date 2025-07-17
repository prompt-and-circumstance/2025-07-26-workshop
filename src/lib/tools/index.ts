import { calculatorTool } from "./calculator";
import { webSearchTool } from "./web-search";
import { clientLookupTool } from "./client-lookup";
import { viewPortfolioTool, getClientNotesTool, listTasksTool } from "./portfolio-read";
import { addInvestmentTool, addClientNoteTool, updateClientNoteTool, createTaskTool, completeTaskTool } from "./portfolio-write";

export const TOOL_REGISTRY = {
  calculator: calculatorTool,
  "web-search": webSearchTool,
  "client-lookup": clientLookupTool,
  "view-portfolio": viewPortfolioTool,
  "get-client-notes": getClientNotesTool,
  "list-tasks": listTasksTool,
  "add-investment": addInvestmentTool,
  "add-client-note": addClientNoteTool,
  "update-client-note": updateClientNoteTool,
  "create-task": createTaskTool,
  "complete-task": completeTaskTool,
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
