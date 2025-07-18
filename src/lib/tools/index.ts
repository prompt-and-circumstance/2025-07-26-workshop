import { calculatorTool } from "./calculator";
import { webSearchTool } from "./web-search";
import { clientLookupTool } from "./client-lookup";
import {
  viewPortfolioTool,
  getClientNotesTool,
  listTasksTool,
} from "./portfolio-read";
import {
  addInvestmentTool,
  addClientNoteTool,
  updateClientNoteTool,
  createTaskTool,
  completeTaskTool,
} from "./portfolio-write";
import { webFetchTool } from "./web-fetch";
import {
  getStockPrice,
  convertCurrency,
  getCurrencyRate,
  calculateExchange,
  fetchStockData,
  lookupStock,
  exchangeRateHistory,
  formatCurrency,
  getQuote,
  currencyCalculator,
  getMarketData,
  performExchange,
  checkPrice,
  forexConvert,
  analyzeStock,
  getStockPricePoor,
  convertCurrencyPoor,
} from "./currency";

export const TOOL_REGISTRY = {
  // Original tools
  calculator: calculatorTool,
  "web-search": webSearchTool,
  "web-fetch": webFetchTool,
  "client-lookup": clientLookupTool,
  "view-portfolio": viewPortfolioTool,
  "get-client-notes": getClientNotesTool,
  "list-tasks": listTasksTool,
  "add-investment": addInvestmentTool,
  "add-client-note": addClientNoteTool,
  "update-client-note": updateClientNoteTool,
  "create-task": createTaskTool,
  "complete-task": completeTaskTool,
  // Currency tools
  "get-stock-price": getStockPrice,
  "convert-currency": convertCurrency,
  "get-currency-rate": getCurrencyRate,
  "calculate-exchange": calculateExchange,
  "fetch-stock-data": fetchStockData,
  "lookup-stock": lookupStock,
  "exchange-rate-history": exchangeRateHistory,
  "format-currency": formatCurrency,
  "get-quote": getQuote,
  "currency-calculator": currencyCalculator,
  "get-market-data": getMarketData,
  "perform-exchange": performExchange,
  "check-price": checkPrice,
  "forex-convert": forexConvert,
  "analyze-stock": analyzeStock,
  // Maximally confusing tools
  "portfolio-risk-assessment": getStockPricePoor,
  "tax-liability-calculator": convertCurrencyPoor,
} as const;

export type ToolName = keyof typeof TOOL_REGISTRY;

export function getWorkshopTools(toolNames: ToolName[]) {
  const tools: Record<string, any> = {};

  for (const toolName of toolNames) {
    const tool = TOOL_REGISTRY[toolName];
    if (tool) {
      tools[toolName] = tool;
    } else {
      console.warn(
        `Tool '${toolName}' not found in registry or not implemented yet`
      );
    }
  }

  return tools;
}
