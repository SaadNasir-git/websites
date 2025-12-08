'use client';

import { TrendingUp } from 'lucide-react';
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

interface ProfitLossChartProps {
  data: any[];
}

export function ProfitLossChart({ data }: ProfitLossChartProps) {
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
      const revenue = payload.find((p: any) => p.dataKey === 'revenue')?.value || 0;
      const cost = payload.find((p: any) => p.dataKey === 'cost')?.value || 0;
      const netProfit = payload.find((p: any) => p.dataKey === 'netProfit')?.value || 0;

      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg max-w-[280px] sm:max-w-none">
          <p className="font-semibold text-sm mb-2">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm">Revenue:</span>
              </div>
              <span className="font-medium text-sm">{formatCurrency(revenue)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm">Cost:</span>
              </div>
              <span className="font-medium text-sm">{formatCurrency(cost)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm font-medium">Net Profit:</span>
              </div>
              <span className="font-medium text-sm text-green-600">{formatCurrency(netProfit)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6">
        <div>
          <CardTitle className="text-lg sm:text-xl font-bold">Profit & Loss Overview</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Monthly revenue, costs, and net profit trends
          </CardDescription>
        </div>
        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={300} className="text-xs sm:text-sm">
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
              tickMargin={8}
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `Rs. ${value / 1000}k`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px',
                paddingTop: '10px'
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="cost"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Cost"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Gross Profit"
            />
            <Area
              type="monotone"
              dataKey="netProfit"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
              strokeWidth={2}
              name="Net Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}