import { tool } from "ai";
import { z } from "zod";
import { getBackendPortfolioState } from "../portfolio-backend";
import { PORTFOLIO_DEMO_TOOL_DESCRIPTIONS, PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS } from "../prompts/demo-portfolio";

export const viewPortfolioTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["view-portfolio"],
  parameters: z.object({
    symbol: z
      .string()
      .optional()
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["view-portfolio"].symbol),
  }),
  execute: async ({ symbol }) => {
    const state = getBackendPortfolioState();
    let investments = state.investments;

    if (symbol) {
      investments = investments.filter(
        (inv) => inv.symbol.toLowerCase() === symbol.toLowerCase()
      );
    }

    if (investments.length === 0) {
      return {
        message: symbol
          ? `No investments found for symbol: ${symbol}`
          : "Portfolio is currently empty",
        investments: [],
        totalValue: 0,
      };
    }

    const totalValue = investments.reduce(
      (sum, inv) => sum + inv.shares * (inv.currentPrice || inv.purchasePrice),
      0
    );

    const totalCost = investments.reduce(
      (sum, inv) => sum + inv.shares * inv.purchasePrice,
      0
    );

    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent =
      totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return {
      message: `Portfolio contains ${investments.length} position(s)`,
      investments: investments.map((inv) => ({
        symbol: inv.symbol,
        shares: inv.shares,
        purchasePrice: inv.purchasePrice,
        currentPrice: inv.currentPrice || inv.purchasePrice,
        purchaseDate: inv.purchaseDate,
        currentValue: inv.shares * (inv.currentPrice || inv.purchasePrice),
        costBasis: inv.shares * inv.purchasePrice,
        gainLoss:
          inv.shares *
          ((inv.currentPrice || inv.purchasePrice) - inv.purchasePrice),
        gainLossPercent:
          (((inv.currentPrice || inv.purchasePrice) - inv.purchasePrice) /
            inv.purchasePrice) *
          100,
      })),
      summary: {
        totalValue: Math.round(totalValue * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        totalGainLoss: Math.round(totalGainLoss * 100) / 100,
        totalGainLossPercent: Math.round(totalGainLossPercent * 100) / 100,
      },
    };
  },
});

export const getClientNotesTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["get-client-notes"],
  parameters: z.object({
    clientName: z
      .string()
      .optional()
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["get-client-notes"].clientName),
  }),
  execute: async ({ clientName }) => {
    const state = getBackendPortfolioState();
    let notes = state.clientNotes;

    if (clientName) {
      notes = notes.filter((note) =>
        note.clientName.toLowerCase().includes(clientName.toLowerCase())
      );
    }

    if (notes.length === 0) {
      return {
        message: clientName
          ? `No notes found for client: ${clientName}`
          : "No client notes available",
        notes: [],
      };
    }

    return {
      message: `Found ${notes.length} note(s)${
        clientName ? ` for ${clientName}` : ""
      }`,
      notes: notes.map((note) => ({
        id: note.id,
        clientName: note.clientName,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        lastModified: new Date(note.updatedAt).toLocaleDateString(),
      })),
    };
  },
});

export const listTasksTool = tool({
  description: PORTFOLIO_DEMO_TOOL_DESCRIPTIONS["list-tasks"],
  parameters: z.object({
    showCompleted: z
      .boolean()
      .optional()
      .default(false)
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["list-tasks"].showCompleted),
    priority: z
      .enum(["low", "medium", "high"])
      .optional()
      .describe(PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS["list-tasks"].priority),
  }),
  execute: async ({ showCompleted, priority }) => {
    const state = getBackendPortfolioState();
    let tasks = state.tasks;

    if (!showCompleted) {
      tasks = tasks.filter((task) => !task.completed);
    }

    if (priority) {
      tasks = tasks.filter((task) => task.priority === priority);
    }

    if (tasks.length === 0) {
      return {
        message: "No tasks found matching criteria",
        tasks: [],
      };
    }

    const pendingTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);

    return {
      message: `Found ${tasks.length} task(s) - ${pendingTasks.length} pending, ${completedTasks.length} completed`,
      tasks: tasks.map((task) => ({
        id: task.id,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
        createdAt: task.createdAt,
        createdDate: new Date(task.createdAt).toLocaleDateString(),
      })),
      summary: {
        total: tasks.length,
        pending: pendingTasks.length,
        completed: completedTasks.length,
        highPriority: tasks.filter((t) => t.priority === "high" && !t.completed)
          .length,
      },
    };
  },
});
