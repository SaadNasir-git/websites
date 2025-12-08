'use client';

import { BarChart3 } from 'lucide-react';
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
import { SalesTrendData } from '@/types/reports';

interface SalesTrendChartProps {
  data: SalesTrendData[];
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
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
      // Safely access the values from payload
      const sales = payload.find((p: any) => p.dataKey === 'sales')?.value || 0;
      const orders = payload.find((p: any) => p.dataKey === 'orders')?.value || 0;
      const averageOrderValue = payload.find((p: any) => p.dataKey === 'averageOrderValue')?.value || 0;

      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg max-w-[280px] sm:max-w-none">
          <p className="font-semibold text-sm mb-2">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm">Sales:</span>
              </div>
              <span className="font-medium text-sm">{sales}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm">Orders:</span>
              </div>
              <span className="font-medium text-sm">{orders}</span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm">Avg Order:</span>
              </div>
              <span className="font-medium text-sm">{formatCurrency(averageOrderValue)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className='w-full'>
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-semibold">Sales Trend</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Monthly sales and order volume
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={220} className="text-xs sm:text-sm">
          <AreaChart 
            data={data} 
            margin={{ 
              top: 10, 
              right: 10, 
              left: 0, 
              bottom: 0 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fontSize: 10 }}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '11px',
                paddingTop: '8px',
                display: 'flex',
                justifyContent: 'center',
                gap: '16px'
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={1.5}
              name="Sales"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
              strokeWidth={1.5}
              name="Orders"
            />
            <Area
              type="monotone"
              dataKey="averageOrderValue"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
              strokeWidth={1.5}
              name="Avg Order"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}