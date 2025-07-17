import { createFileRoute } from "@tanstack/react-router";
import { WorkshopLayout } from "@/components/workshop-layout";
import { HeroSection } from "@/components/hero-section";
import { DemoCard } from "@/components/demo-card";
import { demoCards } from "@/data/demo-cards";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <WorkshopLayout>
      <HeroSection />
      <div className="space-y-6">
        {demoCards.map((demo) => (
          <DemoCard
            key={demo.href}
            title={demo.title}
            description={demo.description}
            href={demo.href}
          />
        ))}
      </div>
    </WorkshopLayout>
  );
}
