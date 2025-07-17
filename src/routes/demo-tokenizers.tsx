import { createFileRoute } from "@tanstack/react-router";
import { WorkshopLayout } from "@/components/workshop-layout";
import { getAllWorkshopDemos } from "@/lib/demos/workshop-demos";
import { TokenizerDemo } from "@/components/tokenizer-demo";
import { TokenizerComparison } from "@/components/tokenizer-comparison";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/demo-tokenizers")({
  component: TokenizerDemoPage,
});

function TokenizerDemoPage() {
  const tokenizerDemo = getAllWorkshopDemos().find(
    (demo) => demo.id === "tokenizers"
  );

  if (!tokenizerDemo) {
    return <div>Demo not found</div>;
  }

  return (
    <WorkshopLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{tokenizerDemo.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {tokenizerDemo.description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What are Tokens?</CardTitle>
            <CardDescription>
              Understanding the fundamental unit of AI language processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Tokens are the basic units that AI language models use to
                process text. Rather than working with individual characters or
                words, models break text into tokens - which can be whole words,
                parts of words, or even single characters.
              </p>
              <ul>
                <li>
                  <strong>Subword tokenization:</strong> Most modern models use
                  algorithms like BPE (Byte Pair Encoding)
                </li>
                <li>
                  <strong>Context windows:</strong> Models have limits on how
                  many tokens they can process at once
                </li>
                <li>
                  <strong>Cost implications:</strong> API pricing is typically
                  based on token usage
                </li>
                <li>
                  <strong>Language efficiency:</strong> Different tokenizers
                  perform better with different languages
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <TokenizerDemo />

        <TokenizerComparison />
      </div>
    </WorkshopLayout>
  );
}
