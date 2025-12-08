export interface DashboardStats {
  totalRevenue: number;
  totalProfit: number;
  totalSales: number;
  totalExpenses: number;
  activeStock: number;
  lowStockItems: number;
}

export interface RecentSale {
  id: string;
  productName: string;
  customer: string;
  date: string;
  amount: number;
  profit: number;
  platform: 'whatsapp' | 'instagram' | 'tiktok' | 'other';
}

export interface StockAlert {
  id: string;
  productName: string;
  currentStock: number;
  minStock: number;
  status: 'low' | 'critical' | 'out-of-stock';
}

export interface ProfitTrend {
  month: string;
  revenue: number;
  profit: number;
}