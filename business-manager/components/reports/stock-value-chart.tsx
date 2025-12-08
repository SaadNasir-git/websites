'use client';

import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StockValueChartProps {
  data: any[];
}

export function StockValueChart({ data }: StockValueChartProps) {
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
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Stock Value: <span className="font-medium">{formatCurrency(payload[0].value)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Stock Value Trend</CardTitle>
        <CardDescription>Monthly inventory investment value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(data[data.length - 1]?.stockValue || 0)}
          </div>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `Rs. ${value / 1000000}M`}
            />
            <Tooltip content={<CustomTooltip />} />
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
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-700">
              {formatCurrency(Math.max(...data.map(d => d.stockValue)))}
            </div>
            <div className="text-green-600 text-xs">Peak Value</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-700">
              {formatCurrency(data.reduce((sum, item) => sum + item.stockValue, 0) / data.length)}
            </div>
            <div className="text-blue-600 text-xs">Average</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}