// Browser-based state management for portfolio demo
// Data persists during session but resets on refresh

export interface Investment {
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
}

export interface ClientNote {
  id: string;
  clientName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  description: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  completed: boolean;
}

export interface PortfolioState {
  investments: Investment[];
  clientNotes: ClientNote[];
  tasks: Task[];
}
