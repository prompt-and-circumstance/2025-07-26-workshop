import { tool } from "ai";
import { z } from "zod";

import {
  addBackendClientNote,
  addBackendInvestment,
  addBackendTask,
  completeBackendTask,
} from "../portfolio-backend";
import {
  PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS,
  PORTFOLIO_DEMO_TOOL_DESCRIPTIONS,
} from "../prompts/demo-portfolio";

export const addInvestmentTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["add-investment"],
  parameters: z.object({
    symbol: z
      .string()
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["add-investment"].symbol),
    shares: z
      .number()
      .positive()
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["add-investment"].shares),
    purchasePrice: z
      .number()
      .positive()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["add-investment"].purchasePrice,
      ),
    purchaseDate: z
      .string()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["add-investment"].purchaseDate,
      ),
  }),
  execute: async ({ symbol, shares, purchasePrice, purchaseDate }) => {
    try {
      const investment = addBackendInvestment({
        symbol: symbol.toUpperCase(),
        shares,
        purchasePrice,
        purchaseDate,
      });

      return {
        success: true,
        message: `Successfully added ${shares} shares of ${investment.symbol} at $${purchasePrice} per share`,
        investment: {
          symbol: investment.symbol,
          shares: investment.shares,
          purchasePrice: investment.purchasePrice,
          purchaseDate: investment.purchaseDate,
          currentPrice: investment.currentPrice,
          totalValue:
            investment.shares *
            (investment.currentPrice || investment.purchasePrice),
          costBasis: investment.shares * investment.purchasePrice,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add investment: ${error instanceof Error ? error.message : "Unknown error"}`,
        investment: null,
      };
    }
  },
});

export const addClientNoteTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["add-client-note"],
  parameters: z.object({
    clientName: z
      .string()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["add-client-note"].clientName,
      ),
    content: z
      .string()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["add-client-note"].content,
      ),
  }),
  execute: async ({ clientName, content }) => {
    try {
      const note = addBackendClientNote(clientName, content);

      return {
        success: true,
        message: `Successfully added note for ${clientName}`,
        note: {
          id: note.id,
          clientName: note.clientName,
          content: note.content,
          createdAt: note.createdAt,
          createdDate: new Date(note.createdAt).toLocaleDateString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add client note: ${error instanceof Error ? error.message : "Unknown error"}`,
        note: null,
      };
    }
  },
});

export const updateClientNoteTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["update-client-note"],
  parameters: z.object({
    noteId: z
      .string()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["update-client-note"].noteId,
      ),
    content: z
      .string()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["update-client-note"].content,
      ),
  }),
  execute: async ({ noteId, content }) => {
    try {
      // For now, we'll skip update operations as they're more complex
      return {
        success: false,
        message: "Update operations not yet implemented",
        note: null,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update client note: ${error instanceof Error ? error.message : "Unknown error"}`,
        note: null,
      };
    }
  },
});

export const createTaskTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["create-task"],
  parameters: z.object({
    description: z
      .string()
      .describe(
        PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["create-task"].description,
      ),
    priority: z
      .enum(["low", "medium", "high"])
      .default("medium")
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["create-task"].priority),
  }),
  execute: async ({ description, priority }) => {
    try {
      const task = addBackendTask(description, priority);

      return {
        success: true,
        message: `Successfully created ${priority} priority task`,
        task: {
          id: task.id,
          description: task.description,
          priority: task.priority,
          completed: task.completed,
          createdAt: task.createdAt,
          createdDate: new Date(task.createdAt).toLocaleDateString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create task: ${error instanceof Error ? error.message : "Unknown error"}`,
        task: null,
      };
    }
  },
});

export const completeTaskTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["complete-task"],
  parameters: z.object({
    taskId: z
      .string()
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["complete-task"].taskId),
  }),
  execute: async ({ taskId }) => {
    try {
      const completedTask = completeBackendTask(taskId);

      if (!completedTask) {
        return {
          success: false,
          message: `Task with ID ${taskId} not found`,
          task: null,
        };
      }

      return {
        success: true,
        message: `Successfully completed task: ${completedTask.description}`,
        task: {
          id: completedTask.id,
          description: completedTask.description,
          priority: completedTask.priority,
          completed: completedTask.completed,
          createdAt: completedTask.createdAt,
          createdDate: new Date(completedTask.createdAt).toLocaleDateString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to complete task: ${error instanceof Error ? error.message : "Unknown error"}`,
        task: null,
      };
    }
  },
});
