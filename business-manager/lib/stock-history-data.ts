import { StockBatch, StockItem } from '@/types/stock';

export const stockHistory: StockBatch[] = [
  {
    id: '1',
    batchName: 'Nov-2023-Import',
    purchaseDate: '2023-11-15',
    supplier: 'Supplier A',
    totalItems: 45,
    totalCost: 125000,
    status: 'completed',
    createdAt: '2023-11-15',
    notes: 'Winter collection import - All items sold out'
  },
  {
    id: '2',
    batchName: 'Oct-2023-Backup',
    purchaseDate: '2023-10-10',
    supplier: 'Supplier C',
    totalItems: 25,
    totalCost: 75000,
    status: 'completed',
    createdAt: '2023-10-10',
    notes: 'Backup stock for festival season - Good sales'
  },
  {
    id: '3',
    batchName: 'Sep-2023-Initial',
    purchaseDate: '2023-09-01',
    supplier: 'Supplier A',
    totalItems: 50,
    totalCost: 150000,
    status: 'completed',
    createdAt: '2023-09-01',
    notes: 'Initial business stock - Established customer base'
  },
  {
    id: '4',
    batchName: 'Aug-2023-Trial',
    purchaseDate: '2023-08-15',
    supplier: 'Supplier B',
    totalItems: 20,
    totalCost: 45000,
    status: 'completed',
    createdAt: '2023-08-15',
    notes: 'Trial batch to test market - Good response'
  },
  {
    id: '5',
    batchName: 'Jul-2023-Start',
    purchaseDate: '2023-07-01',
    supplier: 'Supplier D',
    totalItems: 15,
    totalCost: 35000,
    status: 'completed',
    createdAt: '2023-07-01',
    notes: 'First ever stock batch - Learning phase'
  },
  {
    id: '6',
    batchName: 'Jun-2023-Test',
    purchaseDate: '2023-06-10',
    supplier: 'Local Manufacturer',
    totalItems: 10,
    totalCost: 20000,
    status: 'cancelled',
    createdAt: '2023-06-10',
    notes: 'Cancelled due to quality issues'
  },
  {
    id: '7',
    batchName: 'May-2023-Sample',
    purchaseDate: '2023-05-05',
    supplier: 'Supplier A',
    totalItems: 8,
    totalCost: 18000,
    status: 'completed',
    createdAt: '2023-05-05',
    notes: 'Sample products for testing'
  },
];

export const historicalStockItems: StockItem[] = [
  // Batch 1 - Nov 2023
  {
    id: '1',
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
    id: '2',
    stockBatchId: '1',
    productId: '2',
    productName: 'Vintage Leather Tote',
    costPrice: 3500,
    expectedSellingPrice: 7000,
    status: 'sold',
    addedAt: '2023-11-15',
    soldAt: '2023-11-25',
    salePrice: 7000
  },
  // Batch 2 - Oct 2023
  {
    id: '3',
    stockBatchId: '2',
    productId: '2',
    productName: 'Vintage Leather Tote',
    costPrice: 3200,
    expectedSellingPrice: 6800,
    status: 'sold',
    addedAt: '2023-10-10',
    soldAt: '2023-10-20',
    salePrice: 6800
  },
  {
    id: '4',
    stockBatchId: '2',
    productId: '3',
    productName: 'Travel Backpack Pro',
    costPrice: 3800,
    expectedSellingPrice: 8200,
    status: 'sold',
    addedAt: '2023-10-10',
    soldAt: '2023-10-30',
    salePrice: 8200
  },
  // Batch 3 - Sep 2023
  {
    id: '5',
    stockBatchId: '3',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 1900,
    expectedSellingPrice: 4500,
    status: 'sold',
    addedAt: '2023-09-01',
    soldAt: '2023-09-15',
    salePrice: 4500
  },
  // Batch 6 - Cancelled
  {
    id: '6',
    stockBatchId: '6',
    productId: '4',
    productName: 'Office Laptop Bag',
    costPrice: 1700,
    expectedSellingPrice: 4000,
    status: 'damaged',
    addedAt: '2023-06-10',
    soldAt: undefined
  },
];

export const suppliersHistory = [
  'Supplier A',
  'Supplier B',
  'Supplier C',
  'Supplier D',
  'Local Manufacturer',
  'All Suppliers'
];