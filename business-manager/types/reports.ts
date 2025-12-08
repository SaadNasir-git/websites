export interface ProfitLossData {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  expenses: number;
  netProfit: number;
}

export interface SalesTrendData {
  month: string;
  sales: number;
  orders: number;
  averageOrderValue: number;
}

export interface PlatformPerformance {
  platform: string;
  sales: number;
  revenue: number;
  profit: number;
  orders: number;
}

export interface ProductPerformance {
  productName: string;
  sales: number;
  revenue: number;
  profit: number;
  quantitySold: number;
}

export interface ReportFilters {
  period: '7days' | '30days' | '90days' | '1year' | 'all';
  dateRange: {
    from: string;
    to: string;
  };
  category: string;
}

export interface ReportStats {
  totalRevenue: number;
  totalProfit: number;
  totalExpenses: number;
  totalSales: number;
  profitMargin: number;
  averageOrderValue: number;
}