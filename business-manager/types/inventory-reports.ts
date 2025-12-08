export interface InventoryTrendData {
  month: string;
  totalStock: number;
  itemsSold: number;
  itemsPurchased: number;
  stockValue: number;
  turnoverRate: number;
}

export interface StockLevelData {
  productName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'optimal' | 'low' | 'out-of-stock' | 'overstock';
  value: number;
}

export interface TurnoverAnalysis {
  productName: string;
  turnoverRate: number;
  daysInStock: number;
  salesVelocity: number;
  category: string;
}

export interface InventoryForecast {
  month: string;
  predictedDemand: number;
  recommendedOrder: number;
  currentStock: number;
}

export interface InventoryFilters {
  period: '30days' | '90days' | '6months' | '1year' | 'all';
  category: string;
  status: string;
  view: 'overview' | 'levels' | 'turnover' | 'forecast';
}

export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  averageTurnover: number;
  totalInvestments: number;
}