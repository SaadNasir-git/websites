import { ProfitLossData, ExpenseBreakdown, ProfitLossStats } from '@/types/profit-loss';

export const profitLossData: ProfitLossData[] = [
  {
    month: 'Jan 2023',
    revenue: 45000,
    costOfGoods: 22000,
    grossProfit: 23000,
    operatingExpenses: 8000,
    netProfit: 15000,
    profitMargin: 33.3
  },
  {
    month: 'Feb 2023',
    revenue: 52000,
    costOfGoods: 25000,
    grossProfit: 27000,
    operatingExpenses: 8500,
    netProfit: 18500,
    profitMargin: 35.6
  },
  {
    month: 'Mar 2023',
    revenue: 48000,
    costOfGoods: 23000,
    grossProfit: 25000,
    operatingExpenses: 9000,
    netProfit: 16000,
    profitMargin: 33.3
  },
  {
    month: 'Apr 2023',
    revenue: 61000,
    costOfGoods: 29000,
    grossProfit: 32000,
    operatingExpenses: 9500,
    netProfit: 22500,
    profitMargin: 36.9
  },
  {
    month: 'May 2023',
    revenue: 55000,
    costOfGoods: 26000,
    grossProfit: 29000,
    operatingExpenses: 8800,
    netProfit: 20200,
    profitMargin: 36.7
  },
  {
    month: 'Jun 2023',
    revenue: 68000,
    costOfGoods: 32000,
    grossProfit: 36000,
    operatingExpenses: 10000,
    netProfit: 26000,
    profitMargin: 38.2
  },
  {
    month: 'Jul 2023',
    revenue: 72000,
    costOfGoods: 34000,
    grossProfit: 38000,
    operatingExpenses: 11000,
    netProfit: 27000,
    profitMargin: 37.5
  },
  {
    month: 'Aug 2023',
    revenue: 65000,
    costOfGoods: 31000,
    grossProfit: 34000,
    operatingExpenses: 10500,
    netProfit: 23500,
    profitMargin: 36.2
  },
  {
    month: 'Sep 2023',
    revenue: 58000,
    costOfGoods: 28000,
    grossProfit: 30000,
    operatingExpenses: 9200,
    netProfit: 20800,
    profitMargin: 35.9
  },
  {
    month: 'Oct 2023',
    revenue: 75000,
    costOfGoods: 35000,
    grossProfit: 40000,
    operatingExpenses: 11500,
    netProfit: 28500,
    profitMargin: 38.0
  },
  {
    month: 'Nov 2023',
    revenue: 82000,
    costOfGoods: 38000,
    grossProfit: 44000,
    operatingExpenses: 12000,
    netProfit: 32000,
    profitMargin: 39.0
  },
  {
    month: 'Dec 2023',
    revenue: 95000,
    costOfGoods: 45000,
    grossProfit: 50000,
    operatingExpenses: 13000,
    netProfit: 37000,
    profitMargin: 38.9
  },
];

export const expenseBreakdown: ExpenseBreakdown[] = [
  { category: 'Shipping & Delivery', amount: 45000, percentage: 35, color: '#3b82f6' },
  { category: 'Marketing & Ads', amount: 28000, percentage: 22, color: '#8b5cf6' },
  { category: 'Packaging', amount: 18000, percentage: 14, color: '#ec4899' },
  { category: 'Transportation', amount: 15000, percentage: 12, color: '#f59e0b' },
  { category: 'Utilities', amount: 12000, percentage: 9, color: '#10b981' },
  { category: 'Other Expenses', amount: 8000, percentage: 6, color: '#6b7280' },
];

export const profitLossStats: ProfitLossStats = {
  totalRevenue: 820000,
  totalGrossProfit: 388000,
  totalNetProfit: 273000,
  averageMargin: 37.2,
  growthRate: 28.5,
  bestMonth: 'December 2023',
};

export const comparisonData = [
  { month: 'Jan', '2022': 38000, '2023': 45000 },
  { month: 'Feb', '2022': 42000, '2023': 52000 },
  { month: 'Mar', '2022': 40000, '2023': 48000 },
  { month: 'Apr', '2022': 48000, '2023': 61000 },
  { month: 'May', '2022': 45000, '2023': 55000 },
  { month: 'Jun', '2022': 52000, '2023': 68000 },
  { month: 'Jul', '2022': 58000, '2023': 72000 },
  { month: 'Aug', '2022': 54000, '2023': 65000 },
  { month: 'Sep', '2022': 49000, '2023': 58000 },
  { month: 'Oct', '2022': 60000, '2023': 75000 },
  { month: 'Nov', '2022': 65000, '2023': 82000 },
  { month: 'Dec', '2022': 72000, '2023': 95000 },
];