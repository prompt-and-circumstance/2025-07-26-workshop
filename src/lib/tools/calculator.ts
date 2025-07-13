import { tool } from "ai";
import { z } from "zod";

export const calculatorTool = tool({
  description:
    "Evaluate basic JavaScript arithmetic expressions with numbers and operators only",
  parameters: z.object({
    expression: z
      .string()
      .describe(
        "JavaScript arithmetic expression using: numbers, +, -, *, /, ** (exponentiation), and parentheses. Examples: '(1500 * 1.08**10) - 1500', '125000 * 0.06 / 12', '(100 + 50) * 2'. Use ** for exponentiation (^ will be converted to **). Math functions like Math.sin, Math.cos, Math.log, Math.sqrt are NOT supported."
      ),
  }),
  execute: async ({ expression }) => {
    try {
      // Safe evaluation of mathematical expressions
      // Only allow numbers, basic operators, parentheses, and exponentiation
      const sanitized = expression
        .replace(/[^0-9+\-*/().\\s^]/g, "") // Remove non-math characters
        .replace(/\\^/g, "**"); // Convert ^ to ** for JavaScript exponentiation

      // Use Function constructor for safe evaluation (more secure than eval)
      const result = new Function(`"use strict"; return (${sanitized})`)();

      if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid calculation result");
      }

      return {
        expression: expression,
        result: result,
        formatted: result.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 10,
        }),
      };
    } catch (error) {
      return {
        expression: expression,
        error:
          "Unable to calculate this expression. Please use only basic JavaScript arithmetic: +, -, *, /, ** (exponentiation), and parentheses with numbers.",
      };
    }
  },
});
