import { createServerFileRoute } from "@tanstack/react-start/server";
import { streamText } from "ai";
import { getDemoConfig } from "@/lib/demos/configs";
import { getWorkshopTools } from "@/lib/tools";
import { getModel } from "@/lib/models";

export const ServerRoute = createServerFileRoute("/api/chat").methods({
  POST: async ({ request }) => {
    const { messages, demoId } = await request.json();

    const config = getDemoConfig(demoId);
    if (!config) {
      return new Response(`Demo '${demoId}' not found`, { status: 404 });
    }

    const workshopTools = getWorkshopTools(config.tools);
    const model = getModel(config.model);

    // Only use backend-configured tools - no frontend tools needed for this workshop
    const tools = workshopTools;

    const result = streamText({
      model,
      messages,
      system: config.systemPrompt,
      tools,
      toolCallStreaming: true,
      maxTokens: config.maxTokens || 2048,
      temperature: config.temperature || 0.7,
      onError: console.log,
    });

    return result.toDataStreamResponse();
  },
});
