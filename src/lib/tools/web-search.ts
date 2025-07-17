import { tool } from "ai";
import { z } from "zod";
import { TOOL_DESCRIPTIONS } from "../prompts";

export const webSearchTool = tool({
  description: TOOL_DESCRIPTIONS.webSearch.description,
  parameters: z.object({
    query: z.string().describe(TOOL_DESCRIPTIONS.webSearch.queryHint),
    maxResults: z.number().optional().default(5).describe("Maximum number of results to return"),
  }),
  execute: async ({ query, maxResults }) => {
    try {
      // Use DuckDuckGo Instant Answer API
      const duckDuckGoUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
      
      const response = await fetch(duckDuckGoUrl);
      const data = await response.json();
      
      let results: any[] = [];
      
      // Parse DuckDuckGo results
      if (data.Abstract && data.Abstract.length > 0) {
        results.push({
          title: data.Heading || "DuckDuckGo Instant Answer",
          url: data.AbstractURL || "https://duckduckgo.com",
          snippet: data.Abstract,
          date: new Date().toISOString().split('T')[0],
          source: data.AbstractSource || "DuckDuckGo"
        });
      }
      
      // Add related topics if available
      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        data.RelatedTopics.slice(0, maxResults - 1).forEach((topic: any) => {
          if (topic.Text && topic.FirstURL) {
            results.push({
              title: topic.Text.split(' - ')[0] || "Related Topic",
              url: topic.FirstURL,
              snippet: topic.Text,
              date: new Date().toISOString().split('T')[0],
              source: "DuckDuckGo"
            });
          }
        });
      }
      
      // If no results from DuckDuckGo, provide a general response
      if (results.length === 0) {
        results = [
          {
            title: `Search Results for "${query}"`,
            url: "https://duckduckgo.com",
            snippet: `No instant answers found for "${query}". The DuckDuckGo API works best with factual queries about well-known topics, companies, or concepts.`,
            date: new Date().toISOString().split('T')[0],
            source: "DuckDuckGo"
          }
        ];
      }
      
      // Limit results
      results = results.slice(0, maxResults);
      
      return {
        query,
        results,
        message: `Found ${results.length} web search results for "${query}". This demonstrates accessing current information beyond the model's training cutoff.`,
        searchDate: new Date().toISOString().split('T')[0]
      };
      
    } catch (error) {
      // Simple error handling
      console.warn('DuckDuckGo API failed:', error);
      
      return {
        query,
        results: [
          {
            title: "Web Search Unavailable",
            url: "https://duckduckgo.com",
            snippet: `Web search is temporarily unavailable. This demonstrates how the base model would be limited without external data access.`,
            date: new Date().toISOString().split('T')[0],
            source: "Error"
          }
        ],
        message: `Web search failed for "${query}". This actually demonstrates the knowledge limitations when external tools are unavailable.`,
        searchDate: new Date().toISOString().split('T')[0]
      };
    }
  },
});