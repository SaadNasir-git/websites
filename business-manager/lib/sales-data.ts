import { AvailableStockItem } from '@/types/sales';
import { Sale } from '@/types/sales';

export const sales: Sale[] = [
  {
    id: '1',
    customerName: 'Ali Ahmed',
    customerPhone: '+923001234567',
    customerLocation: 'Gulberg, Lahore',
    platform: 'whatsapp',
    saleDate: '2023-12-15',
    subtotal: 4800,
    shippingCost: 200,
    discount: 0,
    totalAmount: 5000,
    totalProfit: 2200,
    status: 'completed',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Skyline Laptop Bag',
        costPrice: 2000,
        sellingPrice: 4800,
        quantity: 1,
        totalAmount: 4800,
        profit: 2800,
      }
    ],
    notes: 'Customer was very satisfied with the product',
    createdAt: '2023-12-15T10:30:00Z'
  },
  {
    id: '2',
    customerName: 'Sara Khan',
    customerPhone: '+923001234568',
    customerLocation: 'DHA, Karachi',
    platform: 'instagram',
    saleDate: '2023-12-14',
    subtotal: 14000,
    shippingCost: 300,
    discount: 500,
    totalAmount: 13800,
    totalProfit: 6100,
    status: 'completed',
    items: [
      {
        id: '2',
        productId: '2',
        productName: 'Vintage Leather Tote',
        costPrice: 3500,
        sellingPrice: 7000,
        quantity: 2,
        totalAmount: 14000,
        profit: 7000,
      }
    ],
    notes: 'Bulk order for gifts',
    createdAt: '2023-12-14T14:20:00Z'
  },
  {
    id: '3',
    customerName: 'Usman Riaz',
    customerPhone: '+923001234569',
    customerLocation: 'Islamabad',
    platform: 'tiktok',
    saleDate: '2023-12-14',
    subtotal: 8500,
    shippingCost: 250,
    discount: 0,
    totalAmount: 8750,
    totalProfit: 3800,
    status: 'completed',
    items: [
      {
        id: '3',
        productId: '3',
        productName: 'Travel Backpack Pro',
        costPrice: 4000,
        sellingPrice: 8500,
        quantity: 1,
        totalAmount: 8500,
        profit: 4500,
      }
    ],
    createdAt: '2023-12-14T16:45:00Z'
  },
  {
    id: '4',
    customerName: 'Fatima Noor',
    customerPhone: '+923001234570',
    customerLocation: 'Faisalabad',
    platform: 'whatsapp',
    saleDate: '2023-12-13',
    subtotal: 4800,
    shippingCost: 150,
    discount: 200,
    totalAmount: 4750,
    totalProfit: 2200,
    status: 'completed',
    items: [
      {
        id: '4',
        productId: '1',
        productName: 'Skyline Laptop Bag',
        costPrice: 2000,
        sellingPrice: 4800,
        quantity: 1,
        totalAmount: 4800,
        profit: 2800,
      }
    ],
    createdAt: '2023-12-13T11:15:00Z'
  },
  {
    id: '5',
    customerName: 'Bilal Arshad',
    customerPhone: '+923001234571',
    customerLocation: 'Multan',
    platform: 'whatsapp',
    saleDate: '2023-12-12',
    subtotal: 7000,
    shippingCost: 200,
    discount: 0,
    totalAmount: 7200,
    totalProfit: 3200,
    status: 'completed',
    items: [
      {
        id: '5',
        productId: '2',
        productName: 'Vintage Leather Tote',
        costPrice: 3500,
        sellingPrice: 7000,
        quantity: 1,
        totalAmount: 7000,
        profit: 3500,
      }
    ],
    createdAt: '2023-12-12T09:30:00Z'
  },
  {
    id: '6',
    customerName: 'Ayesha Malik',
    customerPhone: '+923001234572',
    customerLocation: 'Rawalpindi',
    platform: 'instagram',
    saleDate: '2023-12-11',
    subtotal: 10400,
    shippingCost: 300,
    discount: 400,
    totalAmount: 10300,
    totalProfit: 4600,
    status: 'completed',
    items: [
      {
        id: '6',
        productId: '1',
        productName: 'Skyline Laptop Bag',
        costPrice: 2000,
        sellingPrice: 4800,
        quantity: 1,
        totalAmount: 4800,
        profit: 2800,
      },
      {
        id: '7',
        productId: '6',
        productName: 'Student Backpack',
        costPrice: 2200,
        sellingPrice: 5200,
        quantity: 1,
        totalAmount: 5200,
        profit: 3000,
      }
    ],
    notes: 'Order for two siblings',
    createdAt: '2023-12-11T15:20:00Z'
  },
  {
    id: '7',
    customerName: 'Omar Farooq',
    customerPhone: '+923001234573',
    customerLocation: 'Gujranwala',
    platform: 'other',
    saleDate: '2023-12-10',
    subtotal: 4200,
    shippingCost: 180,
    discount: 0,
    totalAmount: 4380,
    totalProfit: 1900,
    status: 'pending',
    items: [
      {
        id: '8',
        productId: '4',
        productName: 'Office Laptop Bag',
        costPrice: 1800,
        sellingPrice: 4200,
        quantity: 1,
        totalAmount: 4200,
        profit: 2400,
      }
    ],
    createdAt: '2023-12-10T13:45:00Z'
  },
  {
    id: '8',
    customerName: 'Zainab Ali',
    customerPhone: '+923001234574',
    customerLocation: 'Sialkot',
    platform: 'whatsapp',
    saleDate: '2023-12-09',
    subtotal: 9600,
    shippingCost: 250,
    discount: 600,
    totalAmount: 9250,
    totalProfit: 4300,
    status: 'cancelled',
    items: [
      {
        id: '9',
        productId: '1',
        productName: 'Skyline Laptop Bag',
        costPrice: 2000,
        sellingPrice: 4800,
        quantity: 2,
        totalAmount: 9600,
        profit: 5600,
      }
    ],
    notes: 'Customer cancelled due to change of mind',
    createdAt: '2023-12-09T10:00:00Z'
  }
];

export const availableStockItems: AvailableStockItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 2000,
    expectedSellingPrice: 4800,
    stockBatchId: '1',
    batchName: 'Nov-2023-Import'
  },
  {
    id: '2',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 2000,
    expectedSellingPrice: 4800,
    stockBatchId: '1',
    batchName: 'Nov-2023-Import'
  },
  {
    id: '3',
    productId: '2',
    productName: 'Vintage Leather Tote',
    costPrice: 3500,
    expectedSellingPrice: 7000,
    stockBatchId: '1',
    batchName: 'Nov-2023-Import'
  },
  {
    id: '4',
    productId: '3',
    productName: 'Travel Backpack Pro',
    costPrice: 4000,
    expectedSellingPrice: 8500,
    stockBatchId: '1',
    batchName: 'Nov-2023-Import'
  },
  {
    id: '5',
    productId: '1',
    productName: 'Skyline Laptop Bag',
    costPrice: 2200,
    expectedSellingPrice: 5000,
    stockBatchId: '2',
    batchName: 'Dec-2023-Restock'
  },
  {
    id: '6',
    productId: '4',
    productName: 'Office Laptop Bag',
    costPrice: 1800,
    expectedSellingPrice: 4200,
    stockBatchId: '2',
    batchName: 'Dec-2023-Restock'
  },
  {
    id: '7',
    productId: '6',
    productName: 'Student Backpack',
    costPrice: 2200,
    expectedSellingPrice: 5200,
    stockBatchId: '2',
    batchName: 'Dec-2023-Restock'
  },
];

export const recentCustomers = [
  { name: 'Ali Ahmed', phone: '+923001234567', location: 'Gulberg, Lahore' },
  { name: 'Sara Khan', phone: '+923001234568', location: 'DHA, Karachi' },
  { name: 'Usman Riaz', phone: '+923001234569', location: 'Islamabad' },
  { name: 'Fatima Noor', phone: '+923001234570', location: 'Faisalabad' },
  { name: 'Bilal Arshad', phone: '+923001234571', location: 'Multan' },
];