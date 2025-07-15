import { tool } from "ai";
import { z } from "zod";
import { TOOL_DESCRIPTIONS } from "../prompts";

export const calculatorTool = tool({
  description: TOOL_DESCRIPTIONS.calculator.description,
  parameters: z.object({
    expression: z
      .string()
      .describe(TOOL_DESCRIPTIONS.calculator.expressionHint),
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
          "Unable to calculate this expression. Please use valid JavaScript arithmetic, including Math functions.",
      };
    }
  },
});
