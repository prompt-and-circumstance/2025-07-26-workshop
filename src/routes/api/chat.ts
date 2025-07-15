import { createServerFileRoute } from "@tanstack/react-start/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getDemoConfig } from "@/lib/demos/configs";
import { getWorkshopTools } from "@/lib/tools";
import { getModelConfig } from "@/lib/models/types";

export const ServerRoute = createServerFileRoute("/api/chat").methods({
  POST: async ({ request }) => {
    const { messages, demoId } = await request.json();

    const config = getDemoConfig(demoId);
    if (!config) {
      return new Response(`Demo '${demoId}' not found`, { status: 404 });
    }

    const modelConfig = getModelConfig(config.model);
    const workshopTools = getWorkshopTools(config.tools);

    // Only use backend-configured tools - no frontend tools needed for this workshop
    const tools = workshopTools;

    const result = streamText({
      model: openai(modelConfig.model),
      messages,
      system: config.systemPrompt,
      tools,
      toolCallStreaming: true,
      maxTokens: config.maxTokens || modelConfig.maxTokens,
      temperature: config.temperature || modelConfig.temperature,
      onError: console.log,
    });

    return result.toDataStreamResponse();
  },
});
