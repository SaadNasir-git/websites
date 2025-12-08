'use client';

import { TrendingUp, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface InventoryTrendChartProps {
  data: any[];
}

export function InventoryTrendChart({ data }: InventoryTrendChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Safely access payload values with fallbacks
      const totalStock = payload.find((p: any) => p.dataKey === 'totalStock')?.value || 0;
      const itemsSold = payload.find((p: any) => p.dataKey === 'itemsSold')?.value || 0;
      const itemsPurchased = payload.find((p: any) => p.dataKey === 'itemsPurchased')?.value || 0;
      const stockValue = payload.find((p: any) => p.dataKey === 'stockValue')?.value || 0;

      return (
        <div className="bg-background border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-sm mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Total Stock:
              </span>
              <span className="font-medium">{totalStock} items</span>
            </p>
            <p className="text-sm flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Items Sold:
              </span>
              <span className="font-medium">{itemsSold}</span>
            </p>
            <p className="text-sm flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Items Purchased:
              </span>
              <span className="font-medium">{itemsPurchased}</span>
            </p>
            <div className="border-t pt-1 mt-1">
              <p className="text-sm flex items-center justify-between gap-4">
                <span>Stock Value:</span>
                <span className="font-medium">{formatCurrency(stockValue)}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Inventory Trends</CardTitle>
          <CardDescription>
            Monthly stock levels, sales, and purchase patterns
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="totalStock"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
              name="Total Stock"
            />
            <Area
              type="monotone"
              dataKey="itemsSold"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Items Sold"
            />
            <Area
              type="monotone"
              dataKey="itemsPurchased"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
              strokeWidth={3}
              name="Items Purchased"
            />
            {/* Add the stockValue area if it exists in your data */}
            <Area
              type="monotone"
              dataKey="stockValue"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Stock Value"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}