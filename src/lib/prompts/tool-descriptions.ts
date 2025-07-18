/**
 * 🔧 TOOL DESCRIPTIONS - These appear when the AI describes what tools it can use
 *
 * This file contains all the tool descriptions that define what each tool does
 * and how it should be used. Non-technical users can safely modify these
 * descriptions to change how tools are presented to the AI.
 *
 * 📝 HOW TO USE:
 * 1. Find the tool you want to change
 * 2. Edit the text between the backticks (``)
 * 3. Save the file and refresh your browser
 *
 * 🚨 IMPORTANT: Don't change the structure (the { } brackets or the "quotes")
 */

import dedent from "dedent";

export const TOOL_DESCRIPTIONS = {
  calculator: {
    // This is what the AI sees when it can use the calculator tool
    description: dedent`
      Evaluate JavaScript arithmetic expressions, including Math functions.

      Examples of what you can calculate:
      - Compound interest: (1500 * Math.pow(1.08,10)) - 1500
      - Square roots: Math.sqrt(16) + 5
      - Trigonometry: Math.sin(Math.PI/2)
    `,

    // This describes what input the tool expects
    expressionHint: dedent`
      JavaScript arithmetic expression using numbers, operators (+, -, *, /, **),
      parentheses, and Math functions.

      Examples:
      - '(1500 * Math.pow(1.08,10)) - 1500'
      - 'Math.sqrt(16) + 5'
      - 'Math.sin(Math.PI/2)'
    `,
  },

  webSearch: {
    // This is what the AI sees when it can search the web
    description: "Search the web for current information",

    // This describes the search query input
    queryHint: "Any search query - be specific and clear",
  },

  webFetch: {
    // This is what the AI sees when it can fetch web page content
    description: "Fetch and extract text content from a specific web page URL",

    // This describes the URL input
    urlHint: "A valid HTTP or HTTPS URL to fetch content from",
  },

  clientLookup: {
    // This is what the AI sees when it can look up client information
    description: dedent`
      Look up detailed information about investment clients from the proprietary client database.

      Available information includes:
      - Client contact details and last meeting dates
      - Assets under management (AUM) and portfolio strategies
      - Risk profiles and investment preferences
      - Recent activity and trading behavior
      - Compliance requirements and restrictions

      This simulates access to confidential client data that would never be in public training data.
    `,
  },

  portfolio: {
    // This is what the AI sees when it can view portfolio data
    description:
      "View current portfolio holdings and investment positions. You can only view the data, not modify it.",
  },

  portfolioWrite: {
    // This is what the AI sees when it can modify portfolio data
    description: dedent`
      Manage portfolio investments, client notes, and tasks with full read-write access.

      Available operations:
      - Add new investment positions
      - Create and update client meeting notes
      - Create and manage action items and tasks
      - View current portfolio performance
      - Track pending work and follow-ups

      This demonstrates AI's ability to modify data structures and maintain state.
    `,
  },
};
