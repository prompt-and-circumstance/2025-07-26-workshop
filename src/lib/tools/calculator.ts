import { tool } from "ai";
import { z } from "zod";

import {
  MATH_DEMO_PARAMETER_DESCRIPTIONS,
  MATH_DEMO_TOOL_DESCRIPTIONS,
} from "../prompts/demo-math";

export const calculatorTool = tool({
  description: MATH_DEMO_TOOL_DESCRIPTIONS.calculator,
  parameters: z.object({
    expression: z
      .string()
      .describe(MATH_DEMO_PARAMETER_DESCRIPTIONS.calculator.expression),
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
