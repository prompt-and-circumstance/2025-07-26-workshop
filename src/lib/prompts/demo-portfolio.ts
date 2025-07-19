/**
 * 💼 PORTFOLIO DEMO PROMPTS & TOOLS
 *
 * This file contains ALL prompts and tool configurations for the Portfolio demonstration.
 * Students can modify these prompts to change how the AI behaves in the portfolio demo.
 *
 * 📝 DEMO PURPOSE: Compare read-only vs. read-write AI capabilities for portfolio management
 *
 * 🚨 WHAT TO MODIFY: Edit the text between backticks (`) to change AI behavior
 * 🚨 DON'T CHANGE: The structure with { } brackets and "quotes"
 */

import dedent from "dedent";

import type { ToolName } from "../tools/index";

export const PORTFOLIO_DEMO_PROMPTS = {
  "portfolio-read": dedent`
    You are a financial AI assistant demonstrating read-only data access capabilities.

    Your goal is to showcase how AI can analyze and understand existing data but cannot make modifications.

    Important constraints:
    - You can ONLY read and analyze data - no modifications allowed
    - You cannot add investments, create notes, or update any information
    - Focus on providing insights and analysis based on existing data
    - Suggest actions but explain you cannot perform them

    Instructions:
    - Use read tools to gather information for analysis
    - Provide detailed insights about portfolio performance and client needs
    - Suggest improvements or actions but clarify you cannot implement them
    - Demonstrate thorough data analysis capabilities
    - Show how read-only access limits your effectiveness for action-oriented requests

    This demonstrates the limitations of read-only AI systems.
  `,

  "portfolio-write": dedent`
    You are a financial AI assistant with full read-write access to portfolio management systems.

    Your goal is to showcase how write operations transform AI from passive analyzer to active portfolio manager.

    Instructions:
    - Use write tools to actively manage the portfolio and client relationships
    - Add investments when requested with proper validation
    - Create detailed client notes after interactions
    - Manage task lists and follow-up items
    - Explain what you're doing and why before making changes
    - Show the real-time impact of your modifications
    - Demonstrate proactive portfolio management capabilities

    Focus on:
    - Adding new investment positions with proper documentation
    - Creating comprehensive client interaction records
    - Managing workflows and action items
    - Maintaining data integrity and audit trails
    - Showing immediate feedback from write operations

    Demonstrate the power of AI with write access for active portfolio management.
  `,
};

export const PORTFOLIO_DEMO_TOOLS: Record<string, ToolName[]> = {
  "portfolio-read": ["view-portfolio", "get-client-notes", "list-tasks"],
  "portfolio-write": [
    "view-portfolio",
    "get-client-notes",
    "list-tasks",
    "add-investment",
    "add-client-note",
    "update-client-note",
    "create-task",
    "complete-task",
  ],
};

export const PORTFOLIO_DEMO_SUGGESTIONS = [
  "Show me the current portfolio",
  "Add 100 shares of GOOGL at $150",
  "Create a task to review Tesla position",
  "Add note: Client wants ESG investments",
  "List all pending tasks",
];

/**
 * 🔧 PORTFOLIO DEMO TOOL DESCRIPTIONS
 *
 * These descriptions control how the AI understands and uses portfolio management tools.
 * Students can modify these to change how the AI approaches portfolio operations.
 */
export const PORTFOLIO_DEMO_TOOL_DESCRIPTIONS = {
  "view-portfolio": "View current portfolio holdings and investment positions",
  "get-client-notes": "Retrieve client meeting notes and interaction history",
  "list-tasks": "List all tasks and action items for portfolio management",
  "add-investment": "Add a new investment position to the portfolio",
  "add-client-note": "Add a new note about a client meeting or interaction",
  "update-client-note":
    "Update an existing client note with additional information",
  "create-task": "Create a new task or action item for portfolio management",
  "complete-task": "Mark a task as completed",
};

export const PORTFOLIO_DEMO_PARAMETER_DESCRIPTIONS = {
  "view-portfolio": {
    symbol: "Optional: Filter by specific stock symbol",
  },
  "get-client-notes": {
    clientName: "Optional: Filter notes for specific client",
  },
  "list-tasks": {
    showCompleted: "Include completed tasks in results",
    priority: "Filter by task priority",
  },
  "add-investment": {
    symbol: "Stock symbol (e.g. AAPL, MSFT)",
    shares: "Number of shares to purchase",
    purchasePrice: "Price per share at purchase",
    purchaseDate: "Purchase date in YYYY-MM-DD format",
  },
  "add-client-note": {
    clientName: "Name of the client or company",
    content: "Content of the note or meeting summary",
  },
  "update-client-note": {
    noteId: "ID of the note to update",
    content: "New content for the note",
  },
  "create-task": {
    description: "Description of the task to be completed",
    priority: "Priority level of the task",
  },
  "complete-task": {
    taskId: "ID of the task to mark as completed",
  },
};
