import type { WorkshopDemo } from "./types";

export const WORKSHOP_DEMOS: WorkshopDemo[] = [
  {
    id: "math",
    category: "Mathematical Reasoning",
    name: "LLMs and Math",
    description:
      "Discover the difference between raw LLM capabilities and tool-enhanced AI performance.",
    variants: {
      basic: {
        title: "Carrie 1A",
        description: "Raw LLM mathematical capabilities",
        demoId: "math-basic",
      },
      enhanced: {
        title: "Carrie 1B",
        description: "AI with calculator tool integration",
        demoId: "math-enhanced",
      },
    },
  },
];

export function getWorkshopDemo(id: string): WorkshopDemo | null {
  return WORKSHOP_DEMOS.find((demo) => demo.id === id) || null;
}

export function getAllWorkshopDemos(): WorkshopDemo[] {
  return WORKSHOP_DEMOS;
}

export function getWorkshopDemosByCategory(category: string): WorkshopDemo[] {
  return WORKSHOP_DEMOS.filter((demo) => demo.category === category);
}
