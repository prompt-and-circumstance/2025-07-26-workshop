import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { WorkshopThread } from "@/components/assistant-ui/workshop-thread";
import { WorkshopLayout } from "@/components/workshop-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoCards } from "@/data/demo-cards";

export const Route = createFileRoute("/demo-knowledge")({
  component: DemoKnowledge,
});

function DemoKnowledge() {
  const knowledgeDemo = demoCards.find(
    (demo) => demo.href === "/demo-knowledge"
  );
  if (!knowledgeDemo) {
    return <div>Demo not found</div>;
  }

  const [isToolsEnabled, setIsToolsEnabled] = useState(false);

  const runtimeBasic = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: "knowledge-basic",
    },
  });

  const runtimeEnhanced = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: "knowledge-enhanced",
    },
  });

  const suggestions = [
    {
      text: "What's the current Bitcoin price?",
      prompt: "What's the current Bitcoin price?",
    },
    {
      text: "How did TSMC's latest earnings report perform?",
      prompt: "How did TSMC's latest earnings report perform?",
    },
    {
      text: "What are Tesla's Q4 2024 delivery numbers?",
      prompt: "What are Tesla's Q4 2024 delivery numbers?",
    },
    {
      text: "Can you provide information about our client ACME Corp?",
      prompt: "Can you provide information about our client ACME Corp?",
    },
  ];

  return (
    <WorkshopLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">LLMs and Knowledge</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore how LLMs handle knowledge gaps and the transformative power
            of external tools for accessing recent events and proprietary data.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-4 bg-card border rounded-lg p-2">
            <Button
              variant={!isToolsEnabled ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsToolsEnabled(false)}
            >
              Base Model
            </Button>
            <Button
              variant={isToolsEnabled ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsToolsEnabled(true)}
            >
              Tool-Enhanced
            </Button>
          </div>
        </div>

        <AssistantRuntimeProvider runtime={runtimeBasic}>
          <div style={{ display: !isToolsEnabled ? "block" : "none" }}>
            <WorkshopThread
              title="Base Model: Knowledge Cutoff Limitations"
              description="Experience the limitations of LLM knowledge cutoffs and lack of proprietary data access."
              suggestions={suggestions}
            />
          </div>
        </AssistantRuntimeProvider>

        <AssistantRuntimeProvider runtime={runtimeEnhanced}>
          <div style={{ display: isToolsEnabled ? "block" : "none" }}>
            <WorkshopThread
              title="Tool-Enhanced: Web Search + Client Database"
              description="See how external tools provide access to recent information and proprietary data."
              suggestions={suggestions}
            />
          </div>
        </AssistantRuntimeProvider>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              What this demo illustrates about AI capabilities and limitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ul>
                <li>
                  <strong>Training Data Boundaries:</strong> LLMs are frozen in
                  time at their training cutoff date
                </li>
                <li>
                  <strong>Proprietary Data Access:</strong> Internal company
                  data requires explicit tool integration
                </li>
                <li>
                  <strong>Real-time Information:</strong> Web search tools
                  enable access to current events and market conditions
                </li>
                <li>
                  <strong>Competitive Advantage:</strong> Companies with better
                  data access and tool integration have superior AI capabilities
                </li>
                <li>
                  <strong>Privacy and Security:</strong> Proprietary tools must
                  be carefully designed to protect sensitive information
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </WorkshopLayout>
  );
}
