import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Badge } from "@/components/ui/badge";
import { getAllWorkshopDemos } from "@/lib/demos/workshop-demos";
import { getDemoConfig } from "@/lib/demos/configs";
import {
  type Investment,
  type ClientNote,
  type Task,
  type PortfolioState,
} from "@/lib/portfolio-state";

export const Route = createFileRoute("/demo-portfolio")({
  component: DemoPortfolio,
});

function DemoPortfolio() {
  const portfolioDemo = getAllWorkshopDemos().find(
    (demo) => demo.id === "portfolio"
  );
  const basicConfig = getDemoConfig("portfolio-read");
  const enhancedConfig = getDemoConfig("portfolio-write");

  if (!portfolioDemo || !basicConfig || !enhancedConfig) {
    return <div>Demo not found</div>;
  }

  const [isWriteEnabled, setIsWriteEnabled] = useState(false);
  const queryClient = useQueryClient();

  // Fetch portfolio state with auto-refresh
  const {
    data: portfolioState = { investments: [], clientNotes: [], tasks: [] },
  } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async (): Promise<PortfolioState> => {
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio state");
      }
      return response.json();
    },
    refetchInterval: 2000, // Poll every 2 seconds
  });

  const runtimeReadOnly = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: portfolioDemo.variants.basic.demoId,
    },
  });

  const runtimeReadWrite = useChatRuntime({
    api: "/api/chat",
    body: {
      demoId: portfolioDemo.variants.enhanced.demoId,
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

  const suggestions = basicConfig.suggestions.map((suggestion) => ({
    text: suggestion,
    prompt: suggestion,
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getGainLossColor = (gainLoss: number) => {
    if (gainLoss > 0) return "text-green-600 dark:text-green-400";
    if (gainLoss < 0) return "text-red-600 dark:text-red-400";
    return "text-muted-foreground";
  };

  return (
    <WorkshopLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{portfolioDemo.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {portfolioDemo.description} Watch the portfolio update in real-time
            as the AI makes changes.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-4 bg-card border rounded-lg p-2">
            <Button
              variant={!isWriteEnabled ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsWriteEnabled(false)}
            >
              {portfolioDemo.variants.basic.title}
            </Button>
            <Button
              variant={isWriteEnabled ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsWriteEnabled(true)}
            >
              {portfolioDemo.variants.enhanced.title}
            </Button>
          </div>
        </div>

        {/* Live Portfolio View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span suppressHydrationWarning>
                  Portfolio ({portfolioState.investments.length})
                </span>
                <Badge variant="outline">Live Data</Badge>
              </CardTitle>
              <CardDescription>Current investment positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioState.investments.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No investments
                  </p>
                ) : (
                  portfolioState.investments.map(
                    (investment: Investment, idx: number) => {
                      const currentValue =
                        investment.shares *
                        (investment.currentPrice || investment.purchasePrice);
                      const costBasis =
                        investment.shares * investment.purchasePrice;
                      const gainLoss = currentValue - costBasis;

                      return (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-2 border rounded"
                        >
                          <div>
                            <div className="font-medium">
                              {investment.symbol}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {investment.shares} shares @{" "}
                              {formatCurrency(investment.purchasePrice)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {formatCurrency(currentValue)}
                            </div>
                            <div
                              className={`text-sm ${getGainLossColor(
                                gainLoss
                              )}`}
                            >
                              {gainLoss >= 0 ? "+" : ""}
                              {formatCurrency(gainLoss)}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span suppressHydrationWarning>
                  Client Notes ({portfolioState.clientNotes.length})
                </span>
                <Badge variant="outline">Live Data</Badge>
              </CardTitle>
              <CardDescription>Recent client interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioState.clientNotes.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No notes</p>
                ) : (
                  portfolioState.clientNotes
                    .slice(-3)
                    .map((note: ClientNote) => (
                      <div key={note.id} className="p-2 border rounded">
                        <div className="font-medium text-sm">
                          {note.clientName}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {note.content}
                        </div>
                        <div
                          className="text-xs text-muted-foreground mt-1"
                          suppressHydrationWarning
                        >
                          {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span suppressHydrationWarning>
                  Tasks (
                  {portfolioState.tasks.filter((t) => !t.completed).length})
                </span>
                <Badge variant="outline">Live Data</Badge>
              </CardTitle>
              <CardDescription>Pending action items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioState.tasks.filter((task: Task) => !task.completed)
                  .length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No pending tasks
                  </p>
                ) : (
                  portfolioState.tasks
                    .filter((task: Task) => !task.completed)
                    .slice(-3)
                    .map((task: Task) => (
                      <div key={task.id} className="p-2 border rounded">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">{task.description}</div>
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "success"
                                : task.priority === "medium"
                                ? "warning"
                                : "info"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <div
                          className="text-xs text-muted-foreground mt-1"
                          suppressHydrationWarning
                        >
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Interface */}
        <AssistantRuntimeProvider runtime={runtimeReadOnly}>
          <div style={{ display: !isWriteEnabled ? "block" : "none" }}>
            <WorkshopThread
              title={`${portfolioDemo.variants.basic.title}: AI Can Only View Data`}
              description={portfolioDemo.variants.basic.description}
              suggestions={suggestions}
            />
          </div>
        </AssistantRuntimeProvider>

        <AssistantRuntimeProvider runtime={runtimeReadWrite}>
          <div style={{ display: isWriteEnabled ? "block" : "none" }}>
            <WorkshopThread
              title={`${portfolioDemo.variants.enhanced.title}: AI Can Modify Data`}
              description={`${portfolioDemo.variants.enhanced.description}. Watch the live data update above!`}
              suggestions={suggestions}
            />
          </div>
        </AssistantRuntimeProvider>

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
