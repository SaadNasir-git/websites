export interface ProfitLossData {
  month: string;
  revenue: number;
  costOfGoods: number;
  grossProfit: number;
  operatingExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ProfitLossFilters {
  period: '3months' | '6months' | '1year' | '2years' | 'all';
  year: string;
  view: 'overview' | 'detailed' | 'comparison';
}

export interface ProfitLossStats {
  totalRevenue: number;
  totalGrossProfit: number;
  totalNetProfit: number;
  averageMargin: number;
  growthRate: number;
  bestMonth: string;
}