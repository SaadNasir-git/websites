export interface StockBatch {
  id: string;
  batchName: string;
  purchaseDate: string;
  totalItems: number;
  totalCost: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface StockItem {
  id: string;
  stockBatchId: string;
  productId: string;
  productName: string;
  costPrice: number;
  expectedSellingPrice: number;
  status: 'available' | 'sold' | 'returned' | 'damaged';
  addedAt: string;
  soldAt?: string;
  salePrice?: number;
}

export interface StockFormData {
  batchName: string;
  purchaseDate: string;
  notes: string;
  items: StockItemFormData[];
}

export interface StockItemFormData {
  productId: string;
  costPrice: number;
  expectedSellingPrice: number;
  quantity: number;
}

export interface ProductSelection {
  id: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  totalCost: number;
}

export interface NewStockBatch {
  batchName: string;
  purchaseDate: string;
  notes: string;
  products: ProductSelection[];
  totalCost: number;
  charges: number;
}

export interface StockHistoryFilters {
  dateRange: {
    from: string;
    to: string;
  };
  supplier: string;
  status: string;
  search: string;
}

export interface StockHistoryStats {
  totalBatches: number;
  totalInvestment: number;
  totalItems: number;
  averageBatchSize: number;
  mostUsedSupplier: string;
}