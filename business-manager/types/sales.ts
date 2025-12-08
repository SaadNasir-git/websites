export interface SaleItem {
  id: number;
  productId: number;
  productName: string;
  // costPrice: number;
  sellingPrice: number;
  quantity: number;
  totalAmount: number;
  // profit: number;
}

export interface SaleFormData {
  customerName: string;
  platform: 'whatsapp' | 'instagram' | 'tiktok' | 'other';
  saleDate: string;
  shippingCost: number;
  discount: number;
  notes: string;
  items: SaleItem[];
}

export interface AvailableStockItem {
  id: string;
  productId: string;
  productName: string;
  costPrice: number;
  expectedSellingPrice: number;
  stockBatchId: string;
  batchName: string;
}

export interface Sale {
  id: string;
  customerName: string;
  customerPhone: string;
  customerLocation: string;
  platform: 'whatsapp' | 'instagram' | 'tiktok' | 'other';
  saleDate: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  totalAmount: number;
  totalProfit: number;
  status: 'completed' | 'pending' | 'cancelled';
  items: SaleItem[];
  notes?: string;
  createdAt: string;
}

export interface SalesFilters {
  dateRange: {
    from: string;
    to: string;
  };
  platform: string;
  status: string;
  search: string;
}

export interface SalesStats {
  totalSales: number;
  totalRevenue: number;
  totalProfit: number;
  averageOrderValue: number;
  bestPlatform: string;
}