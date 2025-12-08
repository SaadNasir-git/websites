import { DashboardStats, RecentSale, StockAlert, ProfitTrend } from '@/types/dashboard';

export const dashboardStats: DashboardStats = {
  totalRevenue: 45250.00,
  totalProfit: 18750.00,
  totalSales: 324,
  totalExpenses: 26500.00,
  activeStock: 156,
  lowStockItems: 8,
};

export const recentSales: RecentSale[] = [
  {
    id: '1',
    productName: 'Skyline Laptop Bag',
    customer: 'Ali Ahmed',
    date: '2023-12-15',
    amount: 4800,
    profit: 2200,
    platform: 'whatsapp'
  },
  {
    id: '2',
    productName: 'Vintage Leather Tote',
    customer: 'Sara Khan',
    date: '2023-12-14',
    amount: 7000,
    profit: 3200,
    platform: 'instagram'
  },
  {
    id: '3',
    productName: 'Travel Backpack',
    customer: 'Usman Riaz',
    date: '2023-12-14',
    amount: 8500,
    profit: 3800,
    platform: 'tiktok'
  },
  {
    id: '4',
    productName: 'Skyline Laptop Bag',
    customer: 'Fatima Noor',
    date: '2023-12-13',
    amount: 4800,
    profit: 2200,
    platform: 'whatsapp'
  },
  {
    id: '5',
    productName: 'Vintage Leather Tote',
    customer: 'Bilal Arshad',
    date: '2023-12-12',
    amount: 7000,
    profit: 3200,
    platform: 'whatsapp'
  },
];

export const stockAlerts: StockAlert[] = [
  {
    id: '1',
    productName: 'Skyline Laptop Bag - Grey',
    currentStock: 3,
    minStock: 5,
    status: 'low'
  },
  {
    id: '2',
    productName: 'Travel Backpack - Black',
    currentStock: 2,
    minStock: 4,
    status: 'critical'
  },
  {
    id: '3',
    productName: 'Vintage Leather Tote - Brown',
    currentStock: 0,
    minStock: 3,
    status: 'out-of-stock'
  },
  {
    id: '4',
    productName: 'Office Laptop Bag - Black',
    currentStock: 4,
    minStock: 6,
    status: 'low'
  },
];

export const profitTrend: ProfitTrend[] = [
  { month: 'Jul', revenue: 35000, profit: 14000 },
  { month: 'Aug', revenue: 42000, profit: 16800 },
  { month: 'Sep', revenue: 38000, profit: 15200 },
  { month: 'Oct', revenue: 45000, profit: 18000 },
  { month: 'Nov', revenue: 48000, profit: 19200 },
  { month: 'Dec', revenue: 52000, profit: 20800 },
];