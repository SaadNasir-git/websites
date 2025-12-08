import { StockBatch, StockItem } from '@/types/stock';

export const stockBatches: StockBatch[] = [
  {
    id: '1',
    batchName: 'Nov-2023-Import',
    purchaseDate: '2023-11-15',
    supplier: 'Supplier A',
    totalItems: 45,
    totalCost: 125000,
    status: 'active',
    createdAt: '2023-11-15',
    notes: 'Winter collection import'
  },
  {
    id: '2',
    batchName: 'Dec-2023-Restock',
    purchaseDate: '2023-12-01',
    supplier: 'Supplier B',
    totalItems: 30,
    totalCost: 95000,
    status: 'active',
    createdAt: '2023-12-01',
    notes: 'Quick restock for high-demand items'
  },
  {
    id: '3',
    batchName: 'Oct-2023-Backup',
    purchaseDate: '2023-10-10',
    supplier: 'Supplier C',
    totalItems: 25,
    totalCost: 75000,
    status: 'completed',
    createdAt: '2023-10-10',
    notes: 'Backup stock for festival season'
  },
  {
    id: '4',
    batchName: 'Sep-2023-Initial',
    purchaseDate: '2023-09-01',
    supplier: 'Supplier A',
    totalItems: 50,
    totalCost: 150000,
    status: 'completed',
    createdAt: '2023-09-01',
    notes: 'Initial business stock'
  }
];

export const stockItems: StockItem[] = [
  // Batch 1 Items
  {
    id: '1',
    stockBatchId: '1',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 2000,
    expectedSellingPrice: 4800,
    status: 'available',
    addedAt: '2023-11-15'
  },
  {
    id: '2',
    stockBatchId: '1',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 2000,
    expectedSellingPrice: 4800,
    status: 'sold',
    addedAt: '2023-11-15',
    soldAt: '2023-11-20',
    salePrice: 4800
  },
  {
    id: '3',
    stockBatchId: '1',
    productId: '2',
    productName: 'Vintage Leather Tote',
    costPrice: 3500,
    expectedSellingPrice: 7000,
    status: 'available',
    addedAt: '2023-11-15'
  },
  {
    id: '4',
    stockBatchId: '1',
    productId: '3',
    productName: 'Travel Backpack Pro',
    costPrice: 4000,
    expectedSellingPrice: 8500,
    status: 'sold',
    addedAt: '2023-11-15',
    soldAt: '2023-12-01',
    salePrice: 8500
  },
  // Batch 2 Items
  {
    id: '5',
    stockBatchId: '2',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 2200,
    expectedSellingPrice: 5000,
    status: 'available',
    addedAt: '2023-12-01'
  },
  {
    id: '6',
    stockBatchId: '2',
    productId: '4',
    productName: 'Office Laptop Bag',
    costPrice: 1800,
    expectedSellingPrice: 4200,
    status: 'available',
    addedAt: '2023-12-01'
  },
  {
    id: '7',
    stockBatchId: '2',
    productId: '6',
    productName: 'Student Backpack',
    costPrice: 2200,
    expectedSellingPrice: 5200,
    status: 'available',
    addedAt: '2023-12-01'
  },
  // Batch 3 Items (Completed)
  {
    id: '8',
    stockBatchId: '3',
    productId: '2',
    productName: 'Vintage Leather Tote',
    costPrice: 3200,
    expectedSellingPrice: 6800,
    status: 'sold',
    addedAt: '2023-10-10',
    soldAt: '2023-11-15',
    salePrice: 6800
  }
];

export const suppliers = [
  'Supplier A',
  'Supplier B',
  'Supplier C',
  'Supplier D',
  'Local Manufacturer'
];