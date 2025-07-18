import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { WorkshopThread } from "@/components/assistant-ui/workshop-thread";
import { WorkshopLayout } from "@/components/workshop-layout";
import { Button } from "@/components/ui/button";
import { demoCards } from "@/data/demo-cards";
import { z } from "zod";

const mathSearchSchema = z.object({
  toolsEnabled: z.coerce.boolean().optional(),
});

export const Route = createFileRoute("/demo-math")({
  validateSearch: (search) => mathSearchSchema.parse(search),
  component: DemoMath,
});

function DemoMath() {
  const mathDemo = demoCards.find((demo) => demo.href === "/demo-math");
  if (!mathDemo) {
    return <div>Demo not found</div>;
  }

  const { toolsEnabled } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const runtimeBasic = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: "math-basic",
    },
  });

  const runtimeEnhanced = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: "math-enhanced",
    },
  });

  const suggestions = [
    {
      text: "Calculate compound interest: $10,000 at 7% for 15 years",
      prompt: "Calculate compound interest: $10,000 at 7% for 15 years",
    },
    {
      text: "Find the square root of 386,154,294,354,481",
      prompt: "Find the square root of 386,154,294,354,481",
    },
    {
      text: "Compute 23.7% of 48,329",
      prompt: "Compute 23.7% of 48,329",
    },
    {
      text: "Try: (1,500 × 1.08^10) - 1,500",
      prompt: "Calculate: (1,500 × 1.08^10) - 1,500",
    },
  ];

  return (
    <WorkshopLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bloomberg-orange">
          {mathDemo.title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {mathDemo.content}
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="flex items-center gap-4 bg-card border rounded-lg p-2">
          <Button
            variant={!toolsEnabled ? "default" : "ghost"}
            size="sm"
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, toolsEnabled: false }),
              })
            }
          >
            Base Model
          </Button>
          <Button
            variant={toolsEnabled ? "default" : "ghost"}
            size="sm"
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, toolsEnabled: true }),
              })
            }
          >
            Tool-Enhanced
          </Button>
        </div>
      </div>

      <AssistantRuntimeProvider runtime={runtimeBasic}>
        <div style={{ display: !toolsEnabled ? "block" : "none" }}>
          <WorkshopThread
            title="Base Model: Raw LLM Math Capabilities"
            description="Raw LLM mathematical abilities without external tools."
            suggestions={suggestions}
          />
        </div>
      </AssistantRuntimeProvider>

      <AssistantRuntimeProvider runtime={runtimeEnhanced}>
        <div style={{ display: toolsEnabled ? "block" : "none" }}>
          <WorkshopThread
            title="Tool-Enhanced: LLM with Calculator"
            description="Enhanced with precise calculation tools. Experience the difference!"
            suggestions={suggestions}
          />
        </div>
      </AssistantRuntimeProvider>

      <div className="flex justify-center mt-8">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => window.location.reload()}
        >
          Reset Chat
        </Button>
      </div>
    </WorkshopLayout>
  );
}
