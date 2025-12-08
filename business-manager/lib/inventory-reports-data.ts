import { 
  InventoryTrendData, 
  StockLevelData, 
  TurnoverAnalysis, 
  InventoryForecast,
  InventoryStats 
} from '@/types/inventory-reports';

export const inventoryTrendData: InventoryTrendData[] = [
  { month: 'Jan', totalStock: 450, itemsSold: 85, itemsPurchased: 120, stockValue: 1250000, turnoverRate: 1.8 },
  { month: 'Feb', totalStock: 480, itemsSold: 92, itemsPurchased: 110, stockValue: 1320000, turnoverRate: 1.9 },
  { month: 'Mar', totalStock: 460, itemsSold: 88, itemsPurchased: 95, stockValue: 1280000, turnoverRate: 1.9 },
  { month: 'Apr', totalStock: 520, itemsSold: 105, itemsPurchased: 150, stockValue: 1450000, turnoverRate: 2.0 },
  { month: 'May', totalStock: 510, itemsSold: 98, itemsPurchased: 110, stockValue: 1420000, turnoverRate: 1.9 },
  { month: 'Jun', totalStock: 580, itemsSold: 125, itemsPurchased: 180, stockValue: 1620000, turnoverRate: 2.1 },
  { month: 'Jul', totalStock: 620, itemsSold: 135, itemsPurchased: 160, stockValue: 1720000, turnoverRate: 2.2 },
  { month: 'Aug', totalStock: 590, itemsSold: 128, itemsPurchased: 120, stockValue: 1650000, turnoverRate: 2.2 },
  { month: 'Sep', totalStock: 560, itemsSold: 118, itemsPurchased: 100, stockValue: 1580000, turnoverRate: 2.1 },
  { month: 'Oct', totalStock: 610, itemsSold: 142, itemsPurchased: 180, stockValue: 1700000, turnoverRate: 2.3 },
  { month: 'Nov', totalStock: 680, itemsSold: 155, itemsPurchased: 200, stockValue: 1880000, turnoverRate: 2.3 },
  { month: 'Dec', totalStock: 720, itemsSold: 185, itemsPurchased: 220, stockValue: 1980000, turnoverRate: 2.5 },
];

export const stockLevelData: StockLevelData[] = [
  { productName: 'Skyline Laptop Bag', currentStock: 45, minStock: 20, maxStock: 100, status: 'optimal', value: 216000 },
  { productName: 'Vintage Leather Tote', currentStock: 28, minStock: 15, maxStock: 60, status: 'optimal', value: 196000 },
  { productName: 'Travel Backpack Pro', currentStock: 32, minStock: 12, maxStock: 50, status: 'optimal', value: 272000 },
  { productName: 'Student Backpack', currentStock: 18, minStock: 25, maxStock: 80, status: 'low', value: 93600 },
  { productName: 'Office Laptop Bag', currentStock: 8, minStock: 10, maxStock: 40, status: 'low', value: 33600 },
  { productName: 'Mini Crossbody Bag', currentStock: 0, minStock: 8, maxStock: 30, status: 'out-of-stock', value: 0 },
  { productName: 'Leather Messenger Bag', currentStock: 65, minStock: 20, maxStock: 50, status: 'overstock', value: 455000 },
  { productName: 'Waterproof Duffel Bag', currentStock: 42, minStock: 15, maxStock: 40, status: 'overstock', value: 294000 },
];

export const turnoverAnalysis: TurnoverAnalysis[] = [
  { productName: 'Skyline Laptop Bag', turnoverRate: 2.8, daysInStock: 13, salesVelocity: 3.5, category: 'laptop-bags' },
  { productName: 'Vintage Leather Tote', turnoverRate: 2.5, daysInStock: 14, salesVelocity: 2.8, category: 'handbags' },
  { productName: 'Travel Backpack Pro', turnoverRate: 3.2, daysInStock: 11, salesVelocity: 4.1, category: 'backpacks' },
  { productName: 'Student Backpack', turnoverRate: 1.8, daysInStock: 20, salesVelocity: 1.5, category: 'backpacks' },
  { productName: 'Office Laptop Bag', turnoverRate: 2.1, daysInStock: 17, salesVelocity: 2.2, category: 'laptop-bags' },
  { productName: 'Mini Crossbody Bag', turnoverRate: 3.5, daysInStock: 10, salesVelocity: 4.5, category: 'handbags' },
  { productName: 'Leather Messenger Bag', turnoverRate: 0.8, daysInStock: 45, salesVelocity: 0.9, category: 'laptop-bags' },
  { productName: 'Waterproof Duffel Bag', turnoverRate: 1.2, daysInStock: 30, salesVelocity: 1.3, category: 'travel-bags' },
];

export const inventoryForecast: InventoryForecast[] = [
  { month: 'Jan 2024', predictedDemand: 95, recommendedOrder: 120, currentStock: 85 },
  { month: 'Feb 2024', predictedDemand: 105, recommendedOrder: 130, currentStock: 90 },
  { month: 'Mar 2024', predictedDemand: 115, recommendedOrder: 140, currentStock: 95 },
  { month: 'Apr 2024', predictedDemand: 125, recommendedOrder: 150, currentStock: 100 },
  { month: 'May 2024', predictedDemand: 135, recommendedOrder: 160, currentStock: 105 },
  { month: 'Jun 2024', predictedDemand: 145, recommendedOrder: 170, currentStock: 110 },
];

export const inventoryStats: InventoryStats = {
  totalItems: 720,
  totalValue: 1980000,
  lowStockItems: 2,
  outOfStockItems: 1,
  averageTurnover: 2.3,
  totalInvestments: 2850000,
};

export const categories = [
  'all',
  'laptop-bags',
  'handbags',
  'backpacks',
  'travel-bags',
  'wallets'
];