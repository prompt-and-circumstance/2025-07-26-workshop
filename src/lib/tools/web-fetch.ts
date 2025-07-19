import { tool } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { KNOWLEDGE_DEMO_TOOL_DESCRIPTIONS, KNOWLEDGE_DEMO_PARAMETER_DESCRIPTIONS } from "../prompts/demo-knowledge";

// Helper function to extract text from HTML using cheerio
function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $(
    "script, style, nav, footer, aside, .advertisement, .ads, .sidebar"
  ).remove();

  // Focus on main content
  const contentSelectors = [
    "main",
    "article",
    ".content",
    ".main-content",
    "h1, h2, h3, h4, h5, h6",
    "p",
  ];

  let extractedText = "";

  for (const selector of contentSelectors) {
    const elements = $(selector);
    elements.each((_: any, element: any) => {
      const text = $(element).text().trim();
      if (text.length > 20) {
        extractedText += text + "\n";
      }
    });
  }

  // Fallback to body if no content found
  if (extractedText.length < 100) {
    extractedText = $("body").text();
  }

  return extractedText
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

// Helper function to extract title
function extractTitleFromHtml(html: string): string {
  const $ = cheerio.load(html);
  return (
    $("title").first().text().trim() ||
    $("h1").first().text().trim() ||
    "No title found"
  );
}

export const webFetchTool = tool({
  description: KNOWLEDGE_DEMO_TOOL_DESCRIPTIONS["web-fetch"],
  parameters: z.object({
    url: z
      .string()
      .url()
      .describe(KNOWLEDGE_DEMO_PARAMETER_DESCRIPTIONS["web-fetch"].url),
    maxLength: z
      .number()
      .optional()
      .default(5000)
      .describe(KNOWLEDGE_DEMO_PARAMETER_DESCRIPTIONS["web-fetch"].maxLength),
  }),
  execute: async ({ url, maxLength }) => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(15000), // 15 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const textContent = extractTextFromHtml(html);

      const truncatedContent =
        textContent.length > maxLength
          ? textContent.substring(0, maxLength) + "..."
          : textContent;

      return {
        url,
        title: extractTitleFromHtml(html),
        content: truncatedContent,
        contentLength: textContent.length,
        truncated: textContent.length > maxLength,
        fetchDate: new Date().toISOString(),
        message: `Successfully fetched content from ${
          new URL(url).hostname
        }. Content length: ${textContent.length} characters${
          textContent.length > maxLength ? ` (truncated to ${maxLength})` : ""
        }.`,
      };
    } catch (error) {
      return {
        url,
        title: "Error",
        content: `Failed to fetch content from ${url}. Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        contentLength: 0,
        truncated: false,
        fetchDate: new Date().toISOString(),
        message: `Failed to fetch content from ${url}. Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  },
});
