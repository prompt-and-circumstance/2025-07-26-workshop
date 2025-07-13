import { createFileRoute } from '@tanstack/react-router'
import { WorkshopLayout } from "@/components/workshop-layout";
import { HeroSection } from "@/components/hero-section";
import { DemoCard } from "@/components/demo-card";
import { demoCards } from "@/data/demo-cards";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <WorkshopLayout>
      <HeroSection />
      <DemoCard 
        title={demoCards[0].title}
        description={demoCards[0].description}
        href={demoCards[0].href}
      />
    </WorkshopLayout>
  )
}
