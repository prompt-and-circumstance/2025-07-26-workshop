import { DemoCardProps } from "@/components/demo-card";
import { getAllWorkshopDemos } from "@/lib/demos/workshop-demos";

export interface DemoCardData extends DemoCardProps {
  content: string;
}

// Generate demo cards from workshop demos configuration
const workshopDemos = getAllWorkshopDemos();

export const demoCards: DemoCardData[] = workshopDemos.map(demo => ({
  title: demo.name,
  description: demo.description,
  content: demo.description,
  href: `/demo-${demo.id}`, // Keep existing URL structure for now
}));
