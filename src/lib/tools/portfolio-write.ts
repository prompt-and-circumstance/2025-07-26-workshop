import { tool } from "ai";
import { z } from "zod";
import { addBackendInvestment, addBackendClientNote, addBackendTask, completeBackendTask } from "../portfolio-backend";

export const addInvestmentTool = tool({
  description: "Add a new investment position to the portfolio",
  parameters: z.object({
    symbol: z.string().describe("Stock symbol (e.g. AAPL, MSFT)"),
    shares: z.number().positive().describe("Number of shares to purchase"),
    purchasePrice: z.number().positive().describe("Price per share at purchase"),
    purchaseDate: z.string().describe("Purchase date in YYYY-MM-DD format")
  }),
  execute: async ({ symbol, shares, purchasePrice, purchaseDate }) => {
    try {
      const investment = addBackendInvestment({
        symbol: symbol.toUpperCase(),
        shares,
        purchasePrice,
        purchaseDate
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
          totalValue: investment.shares * (investment.currentPrice || investment.purchasePrice),
          costBasis: investment.shares * investment.purchasePrice
        }
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add investment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        investment: null
      };
    }
  }
});

export const addClientNoteTool = tool({
  description: "Add a new note about a client meeting or interaction",
  parameters: z.object({
    clientName: z.string().describe("Name of the client or company"),
    content: z.string().describe("Content of the note or meeting summary")
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
          createdDate: new Date(note.createdAt).toLocaleDateString()
        }
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add client note: ${error instanceof Error ? error.message : 'Unknown error'}`,
        note: null
      };
    }
  }
});

export const updateClientNoteTool = tool({
  description: "Update an existing client note",
  parameters: z.object({
    noteId: z.string().describe("ID of the note to update"),
    content: z.string().describe("New content for the note")
  }),
  execute: async ({ noteId, content }) => {
    try {
      // For now, we'll skip update operations as they're more complex
      return {
        success: false,
        message: "Update operations not yet implemented",
        note: null
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update client note: ${error instanceof Error ? error.message : 'Unknown error'}`,
        note: null
      };
    }
  }
});

export const createTaskTool = tool({
  description: "Create a new task or action item",
  parameters: z.object({
    description: z.string().describe("Description of the task to be completed"),
    priority: z.enum(['low', 'medium', 'high']).default('medium').describe("Priority level of the task")
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
          createdDate: new Date(task.createdAt).toLocaleDateString()
        }
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`,
        task: null
      };
    }
  }
});

export const completeTaskTool = tool({
  description: "Mark a task as completed",
  parameters: z.object({
    taskId: z.string().describe("ID of the task to mark as completed")
  }),
  execute: async ({ taskId }) => {
    try {
      const completedTask = completeBackendTask(taskId);
      
      if (!completedTask) {
        return {
          success: false,
          message: `Task with ID ${taskId} not found`,
          task: null
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
          createdDate: new Date(completedTask.createdAt).toLocaleDateString()
        }
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to complete task: ${error instanceof Error ? error.message : 'Unknown error'}`,
        task: null
      };
    }
  }
});