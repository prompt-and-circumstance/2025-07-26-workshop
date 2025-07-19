import { tool } from "ai";
import { z } from "zod";

import {
  KNOWLEDGE_DEMO_PARAMETER_DESCRIPTIONS,
  KNOWLEDGE_DEMO_TOOL_DESCRIPTIONS,
} from "../prompts/demo-knowledge";

export const webSearchTool = tool({
  description: KNOWLEDGE_DEMO_TOOL_DESCRIPTIONS["web-search"],
  parameters: z.object({
    query: z
      .string()
      .describe(KNOWLEDGE_DEMO_PARAMETER_DESCRIPTIONS["web-search"].query),
    maxResults: z
      .number()
      .optional()
      .default(5)
      .describe(KNOWLEDGE_DEMO_PARAMETER_DESCRIPTIONS["web-search"].maxResults),
  }),
  execute: async ({ query, maxResults }) => {
    try {
      // Check if BRAVE_API_KEY is available
      const apiKey = process.env.BRAVE_API_KEY;
      if (!apiKey) {
        throw new Error("BRAVE_API_KEY environment variable is not set");
      }

      // Use Brave Search API
      const braveSearchUrl = `https://api.search.brave.com/res/v1/web/search`;

      // Build query parameters
      const params = new URLSearchParams({
        q: query,
        count: maxResults.toString(),
        country: "us",
        search_lang: "en",
      });

      const response = await fetch(`${braveSearchUrl}?${params.toString()}`, {
        headers: {
          "X-Subscription-Token": apiKey,
          Accept: "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          `Brave Search API responded with status ${response.status}`,
        );
      }

      const data = await response.json();
      let results: any[] = [];

      // Parse Brave Search results
      if (data.web && data.web.results) {
        results = data.web.results.slice(0, maxResults).map((result: any) => ({
          title: result.title || "No title",
          url: result.url || "",
          snippet:
            result.description || result.snippet || "No description available",
          date: result.age || new Date().toISOString().split("T")[0],
          source: result.profile?.name || new URL(result.url).hostname,
        }));
      }

      // If no results from Brave Search, provide a helpful message
      if (results.length === 0) {
        results = [
          {
            title: `No results found for "${query}"`,
            url: "https://brave.com/search/",
            snippet: `No search results were found for "${query}". Try refining your search terms or checking for spelling errors.`,
            date: new Date().toISOString().split("T")[0],
            source: "Brave Search",
          },
        ];
      }

      const finalResult = {
        query,
        results,
        message: `Found ${results.length} web search results for "${query}" using Brave Search API. This provides access to current information from Brave's independent web index.`,
        searchDate: new Date().toISOString().split("T")[0],
      };
      return finalResult;
    } catch (error) {
      console.error("Brave Search API error:", error);

      const errorResult = {
        query,
        results: [
          {
            title: "Web Search Error",
            url: "https://brave.com/search/",
            snippet: `Web search failed: ${
              error instanceof Error ? error.message : "Unknown error"
            }. Please check your BRAVE_API_KEY environment variable and try again.`,
            date: new Date().toISOString().split("T")[0],
            source: "Error",
          },
        ],
        message: `Web search failed for "${query}". Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        searchDate: new Date().toISOString().split("T")[0],
      };
      return errorResult;
    }
  },
});
