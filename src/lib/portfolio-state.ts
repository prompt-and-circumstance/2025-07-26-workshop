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

// Global state - now synced from backend
let portfolioState: PortfolioState = {
  investments: [],
  clientNotes: [],
  tasks: [],
};

// Initialize from backend
export async function initializePortfolioState(): Promise<PortfolioState> {
  try {
    const response = await fetch("/api/portfolio");
    if (response.ok) {
      const backendState = await response.json();
      portfolioState = backendState;
      return portfolioState;
    }
  } catch (error) {
    console.warn(
      "Failed to fetch portfolio state from backend, using fallback:",
      error
    );
    // Fallback to initial data if backend not available
    portfolioState = {
      investments: [
        {
          symbol: "AAPL",
          shares: 50,
          purchasePrice: 150.0,
          purchaseDate: "2024-01-15",
          currentPrice: 185.5,
        },
        {
          symbol: "MSFT",
          shares: 25,
          purchasePrice: 300.0,
          purchaseDate: "2024-02-10",
          currentPrice: 350.25,
        },
      ],
      clientNotes: [
        {
          id: "1",
          clientName: "ACME Corp",
          content:
            "Interested in increasing AI/ML sector allocation. Risk tolerance: moderate-aggressive.",
          createdAt: "2024-12-01T10:00:00Z",
          updatedAt: "2024-12-01T10:00:00Z",
        },
      ],
      tasks: [
        {
          id: "1",
          description: "Review quarterly performance with ACME Corp",
          priority: "high",
          createdAt: "2024-12-01T09:00:00Z",
          completed: false,
        },
      ],
    };
  }
  return portfolioState;
}

// Refresh state from backend
export async function refreshPortfolioState(): Promise<PortfolioState> {
  return initializePortfolioState();
}

// State change listeners for real-time UI updates
const listeners = new Set<() => void>();

export function subscribeToPortfolioChanges(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners() {
  console.log("🔔 Notifying portfolio listeners, count:", listeners.size);
  listeners.forEach((callback) => callback());
}

// Portfolio operations
export function getPortfolioState(): PortfolioState {
  return {
    investments: [...portfolioState.investments],
    clientNotes: [...portfolioState.clientNotes],
    tasks: [...portfolioState.tasks],
  };
}

export function addInvestment(
  investment: Omit<Investment, "currentPrice">
): Investment {
  const newInvestment: Investment = {
    ...investment,
    currentPrice: investment.purchasePrice * (0.95 + Math.random() * 0.3), // Mock current price
  };

  // Check if investment already exists
  const existingIndex = portfolioState.investments.findIndex(
    (inv) => inv.symbol === investment.symbol
  );

  if (existingIndex >= 0) {
    // Update existing investment (average cost)
    const existing = portfolioState.investments[existingIndex];
    const totalShares = existing.shares + investment.shares;
    const totalCost =
      existing.shares * existing.purchasePrice +
      investment.shares * investment.purchasePrice;

    portfolioState.investments[existingIndex] = {
      ...existing,
      shares: totalShares,
      purchasePrice: totalCost / totalShares,
      purchaseDate: investment.purchaseDate, // Update to latest purchase date
    };
  } else {
    // Add new investment
    portfolioState.investments.push(newInvestment);
  }

  notifyListeners();
  return newInvestment;
}

export function removeInvestment(symbol: string): boolean {
  const index = portfolioState.investments.findIndex(
    (inv) => inv.symbol === symbol
  );
  if (index >= 0) {
    portfolioState.investments.splice(index, 1);
    notifyListeners();
    return true;
  }
  return false;
}

// Client notes operations
export function getClientNotes(clientName?: string): ClientNote[] {
  if (clientName) {
    return portfolioState.clientNotes.filter((note) =>
      note.clientName.toLowerCase().includes(clientName.toLowerCase())
    );
  }
  return [...portfolioState.clientNotes];
}

export function addClientNote(clientName: string, content: string): ClientNote {
  const note: ClientNote = {
    id: Date.now().toString(),
    clientName,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  portfolioState.clientNotes.push(note);
  notifyListeners();
  return note;
}

export function updateClientNote(
  id: string,
  content: string
): ClientNote | null {
  const note = portfolioState.clientNotes.find((n) => n.id === id);
  if (note) {
    note.content = content;
    note.updatedAt = new Date().toISOString();
    notifyListeners();
    return note;
  }
  return null;
}

// Tasks operations
export function getTasks(completed?: boolean): Task[] {
  if (completed !== undefined) {
    return portfolioState.tasks.filter((task) => task.completed === completed);
  }
  return [...portfolioState.tasks];
}

export function addTask(
  description: string,
  priority: Task["priority"] = "medium"
): Task {
  const task: Task = {
    id: Date.now().toString(),
    description,
    priority,
    createdAt: new Date().toISOString(),
    completed: false,
  };

  portfolioState.tasks.push(task);
  notifyListeners();
  return task;
}

export function completeTask(id: string): Task | null {
  const task = portfolioState.tasks.find((t) => t.id === id);
  if (task) {
    task.completed = true;
    notifyListeners();
    return task;
  }
  return null;
}

export function deleteTask(id: string): boolean {
  const index = portfolioState.tasks.findIndex((t) => t.id === id);
  if (index >= 0) {
    portfolioState.tasks.splice(index, 1);
    notifyListeners();
    return true;
  }
  return false;
}

// Reset state (useful for demo purposes)
export function resetPortfolioState(): void {
  portfolioState = {
    investments: [],
    clientNotes: [],
    tasks: [],
  };
  notifyListeners();
}
