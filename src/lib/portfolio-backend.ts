// Backend state management for portfolio demo
// This runs on the server and is shared across requests

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
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completed: boolean;
}

export interface PortfolioState {
  investments: Investment[];
  clientNotes: ClientNote[];
  tasks: Task[];
}

// Global backend state - persists for the server session
let backendPortfolioState: PortfolioState = {
  investments: [
    {
      symbol: 'AAPL',
      shares: 50,
      purchasePrice: 150.00,
      purchaseDate: '2024-01-15',
      currentPrice: 185.50
    },
    {
      symbol: 'MSFT',
      shares: 25,
      purchasePrice: 300.00,
      purchaseDate: '2024-02-10',
      currentPrice: 350.25
    }
  ],
  clientNotes: [
    {
      id: '1',
      clientName: 'ACME Corp',
      content: 'Interested in increasing AI/ML sector allocation. Risk tolerance: moderate-aggressive.',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z'
    }
  ],
  tasks: [
    {
      id: '1',
      description: 'Review quarterly performance with ACME Corp',
      priority: 'high',
      createdAt: '2024-12-01T09:00:00Z',
      completed: false
    }
  ]
};

// Get current backend state
export function getBackendPortfolioState(): PortfolioState {
  return {
    investments: [...backendPortfolioState.investments],
    clientNotes: [...backendPortfolioState.clientNotes],
    tasks: [...backendPortfolioState.tasks]
  };
}

// Reset backend state to initial values
export function resetBackendPortfolioState(): void {
  backendPortfolioState = {
    investments: [
      {
        symbol: 'AAPL',
        shares: 50,
        purchasePrice: 150.00,
        purchaseDate: '2024-01-15',
        currentPrice: 185.50
      },
      {
        symbol: 'MSFT',
        shares: 25,
        purchasePrice: 300.00,
        purchaseDate: '2024-02-10',
        currentPrice: 350.25
      }
    ],
    clientNotes: [
      {
        id: '1',
        clientName: 'ACME Corp',
        content: 'Interested in increasing AI/ML sector allocation. Risk tolerance: moderate-aggressive.',
        createdAt: '2024-12-01T10:00:00Z',
        updatedAt: '2024-12-01T10:00:00Z'
      }
    ],
    tasks: [
      {
        id: '1',
        description: 'Review quarterly performance with ACME Corp',
        priority: 'high',
        createdAt: '2024-12-01T09:00:00Z',
        completed: false
      }
    ]
  };
}

// Backend portfolio operations
export function addBackendInvestment(investment: Omit<Investment, 'currentPrice'>): Investment {
  const newInvestment: Investment = {
    ...investment,
    currentPrice: investment.purchasePrice * (0.95 + Math.random() * 0.3)
  };
  
  const existingIndex = backendPortfolioState.investments.findIndex(inv => inv.symbol === investment.symbol);
  
  if (existingIndex >= 0) {
    const existing = backendPortfolioState.investments[existingIndex];
    const totalShares = existing.shares + investment.shares;
    const totalCost = (existing.shares * existing.purchasePrice) + (investment.shares * investment.purchasePrice);
    
    backendPortfolioState.investments[existingIndex] = {
      ...existing,
      shares: totalShares,
      purchasePrice: totalCost / totalShares,
      purchaseDate: investment.purchaseDate
    };
  } else {
    backendPortfolioState.investments.push(newInvestment);
  }
  
  return newInvestment;
}

export function addBackendClientNote(clientName: string, content: string): ClientNote {
  const note: ClientNote = {
    id: Date.now().toString(),
    clientName,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  backendPortfolioState.clientNotes.push(note);
  return note;
}

export function addBackendTask(description: string, priority: Task['priority'] = 'medium'): Task {
  const task: Task = {
    id: Date.now().toString(),
    description,
    priority,
    createdAt: new Date().toISOString(),
    completed: false
  };
  
  backendPortfolioState.tasks.push(task);
  return task;
}

export function completeBackendTask(id: string): Task | null {
  const task = backendPortfolioState.tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    return task;
  }
  return null;
}