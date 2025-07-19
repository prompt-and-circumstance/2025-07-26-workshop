import { createServerFileRoute } from "@tanstack/react-start/server";

import {
  getBackendPortfolioState,
  resetBackendPortfolioState,
} from "@/lib/portfolio-backend";

export const ServerRoute = createServerFileRoute(
  "/api/portfolio/reset",
).methods({
  POST: async () => {
    resetBackendPortfolioState();
    return Response.json({ success: true });
  },
});
