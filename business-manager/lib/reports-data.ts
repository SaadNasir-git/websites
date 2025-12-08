import { 
  ProfitLossData, 
  SalesTrendData, 
  PlatformPerformance, 
  ProductPerformance,
  ReportStats 
} from '@/types/reports';

export const profitLossData: ProfitLossData[] = [
  { month: 'Jan', revenue: 45000, cost: 22000, profit: 23000, expenses: 8000, netProfit: 15000 },
  { month: 'Feb', revenue: 52000, cost: 25000, profit: 27000, expenses: 8500, netProfit: 18500 },
  { month: 'Mar', revenue: 48000, cost: 23000, profit: 25000, expenses: 9000, netProfit: 16000 },
  { month: 'Apr', revenue: 61000, cost: 29000, profit: 32000, expenses: 9500, netProfit: 22500 },
  { month: 'May', revenue: 55000, cost: 26000, profit: 29000, expenses: 8800, netProfit: 20200 },
  { month: 'Jun', revenue: 68000, cost: 32000, profit: 36000, expenses: 10000, netProfit: 26000 },
  { month: 'Jul', revenue: 72000, cost: 34000, profit: 38000, expenses: 11000, netProfit: 27000 },
  { month: 'Aug', revenue: 65000, cost: 31000, profit: 34000, expenses: 10500, netProfit: 23500 },
  { month: 'Sep', revenue: 58000, cost: 28000, profit: 30000, expenses: 9200, netProfit: 20800 },
  { month: 'Oct', revenue: 75000, cost: 35000, profit: 40000, expenses: 11500, netProfit: 28500 },
  { month: 'Nov', revenue: 82000, cost: 38000, profit: 44000, expenses: 12000, netProfit: 32000 },
  { month: 'Dec', revenue: 95000, cost: 45000, profit: 50000, expenses: 13000, netProfit: 37000 },
];

export const salesTrendData: SalesTrendData[] = [
  { month: 'Jan', sales: 45, orders: 38, averageOrderValue: 1184 },
  { month: 'Feb', sales: 52, orders: 44, averageOrderValue: 1181 },
  { month: 'Mar', sales: 48, orders: 41, averageOrderValue: 1170 },
  { month: 'Apr', sales: 61, orders: 52, averageOrderValue: 1173 },
  { month: 'May', sales: 55, orders: 47, averageOrderValue: 1170 },
  { month: 'Jun', sales: 68, orders: 58, averageOrderValue: 1172 },
  { month: 'Jul', sales: 72, orders: 62, averageOrderValue: 1161 },
  { month: 'Aug', sales: 65, orders: 56, averageOrderValue: 1160 },
  { month: 'Sep', sales: 58, orders: 50, averageOrderValue: 1160 },
  { month: 'Oct', sales: 75, orders: 65, averageOrderValue: 1153 },
  { month: 'Nov', sales: 82, orders: 71, averageOrderValue: 1154 },
  { month: 'Dec', sales: 95, orders: 82, averageOrderValue: 1158 },
];

export const platformPerformance: PlatformPerformance[] = [
  { platform: 'whatsapp', sales: 320, revenue: 452000, profit: 187500, orders: 285 },
  { platform: 'instagram', sales: 150, revenue: 198000, profit: 82000, orders: 135 },
  { platform: 'tiktok', sales: 85, revenue: 112000, profit: 46500, orders: 78 },
  { platform: 'other', sales: 45, revenue: 58000, profit: 24000, orders: 40 },
];

export const productPerformance: ProductPerformance[] = [
  { productName: 'Skyline Laptop Bag', sales: 180, revenue: 254000, profit: 105000, quantitySold: 180 },
  { productName: 'Vintage Leather Tote', sales: 120, revenue: 168000, profit: 69500, quantitySold: 120 },
  { productName: 'Travel Backpack Pro', sales: 95, revenue: 133000, profit: 55000, quantitySold: 95 },
  { productName: 'Student Backpack', sales: 65, revenue: 84500, profit: 35000, quantitySold: 65 },
  { productName: 'Office Laptop Bag', sales: 40, revenue: 50400, profit: 20800, quantitySold: 40 },
];

export const reportStats: ReportStats = {
  totalRevenue: 820000,
  totalProfit: 340000,
  totalExpenses: 115000,
  totalSales: 600,
  profitMargin: 41.5,
  averageOrderValue: 1366,
};

export const periods = [
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 90 Days' },
  { value: '1year', label: 'Last 1 Year' },
  { value: 'all', label: 'All Time' },
];