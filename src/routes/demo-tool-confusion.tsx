import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { WorkshopThread } from "@/components/assistant-ui/workshop-thread";
import { WorkshopLayout } from "@/components/workshop-layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllWorkshopDemos } from "@/lib/demos/workshop-demos";
import { getDemoConfig } from "@/lib/demos/configs";
import { z } from "zod";

const toolsSearchSchema = z.object({
  overloadEnabled: z.coerce.boolean().optional(),
});

export const Route = createFileRoute("/demo-tool-confusion")({
  validateSearch: (search) => toolsSearchSchema.parse(search),
  component: DemoTools,
});

function DemoTools() {
  const toolsDemo = getAllWorkshopDemos().find(
    (demo) => demo.id === "tool-confusion"
  );
  const focusedConfig = getDemoConfig("tools-focused");
  const overloadConfig = getDemoConfig("tools-overload");

  if (!toolsDemo || !focusedConfig || !overloadConfig) {
    return <div>Demo not found</div>;
  }

  const { overloadEnabled } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // Fetch portfolio state with auto-refresh
  const runtimeFocused = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: toolsDemo.variants.basic.demoId,
    },
  });

  const runtimeOverload = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: toolsDemo.variants.enhanced.demoId,
    },
  });

  // Reset portfolio mutation
  const resetMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      const response = await fetch("/api/portfolio/reset", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to reset portfolio");
      }
    },
    onSuccess: () => {
      // Reset everything by reloading the page
      window.location.reload();
    },
  });

  const suggestions = focusedConfig.suggestions.map((suggestion) => ({
    text: suggestion,
    prompt: suggestion,
  }));

  const focusedToolCount = focusedConfig.tools.length;
  const overloadToolCount = overloadConfig.tools.length;

  return (
    <WorkshopLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{toolsDemo.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {toolsDemo.description} Compare how AI performs with focused vs.
            overwhelming tool selection.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-4 bg-card border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Switch
                checked={overloadEnabled}
                onCheckedChange={(checked) =>
                  navigate({ search: { overloadEnabled: checked } })
                }
              />
              <span className="text-sm font-medium w-32 text-left">
                {overloadEnabled
                  ? toolsDemo.variants.enhanced.title
                  : toolsDemo.variants.basic.title}
              </span>
            </div>
          </div>
        </div>

        {/* Tool Count Display */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Available Tools</CardTitle>
              <CardDescription className="text-center">
                Current configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {overloadEnabled ? overloadToolCount : focusedToolCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  {overloadEnabled
                    ? `${focusedToolCount} execution tools + ${
                        overloadToolCount - focusedToolCount
                      } confusing alternatives`
                    : "Essential execution tools only"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Interface */}
        <AssistantRuntimeProvider runtime={runtimeFocused}>
          <div style={{ display: !overloadEnabled ? "block" : "none" }}>
            <WorkshopThread
              title={`${toolsDemo.variants.basic.title}: ${focusedToolCount} Essential Tools`}
              description={`${toolsDemo.variants.basic.description}. Clean, focused tool selection for maximum efficiency.`}
              suggestions={suggestions}
            />
          </div>
        </AssistantRuntimeProvider>

        <AssistantRuntimeProvider runtime={runtimeOverload}>
          <div style={{ display: overloadEnabled ? "block" : "none" }}>
            <WorkshopThread
              title={`${toolsDemo.variants.enhanced.title}: ${overloadToolCount} Available Tools`}
              description={`${toolsDemo.variants.enhanced.description}. Watch how too many options can impact AI performance.`}
              suggestions={suggestions}
            />
          </div>
        </AssistantRuntimeProvider>

        {/* Key Insights Card */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              What this demo illustrates about AI tool selection and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ul>
                <li>
                  <strong>Analysis Paralysis:</strong> Too many analysis tools
                  can prevent action and decision-making
                </li>
                <li>
                  <strong>Execution vs Analysis:</strong> Focused execution
                  tools enable faster task completion than extensive analysis
                  tools
                </li>
                <li>
                  <strong>Tool Purpose Matters:</strong> Analysis tools that
                  don't execute create bottlenecks in workflows
                </li>
                <li>
                  <strong>Cognitive Overload:</strong> Multiple similar tools
                  can confuse AI decision-making processes
                </li>
                <li>
                  <strong>Workflow Design:</strong> Successful AI systems need
                  tools that complete tasks, not just analyze them
                </li>
                <li>
                  <strong>Business Impact:</strong> Over-analysis can delay
                  important financial decisions and reduce productivity
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => resetMutation.mutate()}
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending ? "Resetting..." : "Reset Demo Data"}
          </Button>
        </div>
      </div>
    </WorkshopLayout>
  );
}
