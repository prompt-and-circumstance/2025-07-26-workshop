import { tool } from "ai";
import { z } from "zod";

export const calculatorTool = tool({
  description:
    "Evaluate JavaScript arithmetic expressions, including Math functions. For course use only. WARNING: Arbitrary JavaScript is allowed for educational purposes in a controlled Replit environment.",
  parameters: z.object({
    expression: z
      .string()
      .describe(
        "JavaScript arithmetic expression using numbers, operators (+, -, *, /, **), parentheses, and Math functions (e.g., Math.sin, Math.sqrt, Math.log). Examples: '(1500 * Math.pow(1.08,10)) - 1500', 'Math.sqrt(16) + 5', 'Math.sin(Math.PI/2)'. WARNING: Arbitrary JavaScript is allowed. Do not use in production."
      ),
  }),
  execute: async ({ expression }) => {
    try {
      // WARNING: In this course context, we allow arbitrary JavaScript for educational purposes only.
      // This is UNSAFE for production use. Do not use this pattern outside a controlled environment like Replit classroom.
      const result = new Function(`"use strict"; return (${expression})`)();

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
          "Unable to calculate this expression. Please use valid JavaScript arithmetic, including Math functions. (WARNING: This tool allows arbitrary JavaScript for educational use only.)",
      };
    }
  },
});
