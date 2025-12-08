'use client';

import { TrendingUp, DollarSign } from 'lucide-react';
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

interface ProfitLossOverviewChartProps {
  data: any[];
}

export function ProfitLossOverviewChart({ data }: ProfitLossOverviewChartProps) {
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
      const revenue = payload[0].value;
      const grossProfit = payload[1].value;
      const netProfit = payload[2].value;
      const margin = ((netProfit / revenue) * 100).toFixed(1);

      return (
        <div className="bg-background border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-sm mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Revenue:
              </span>
              <span className="font-medium">{formatCurrency(revenue)}</span>
            </p>
            <p className="text-sm flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Gross Profit:
              </span>
              <span className="font-medium">{formatCurrency(grossProfit)}</span>
            </p>
            <p className="text-sm flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Net Profit:
              </span>
              <span className="font-medium">{formatCurrency(netProfit)}</span>
            </p>
            <div className="border-t pt-1 mt-1">
              <p className="text-sm flex items-center justify-between gap-4">
                <span>Profit Margin:</span>
                <span className="font-medium text-green-600">{margin}%</span>
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
          <CardTitle className="text-xl font-bold">Profit & Loss Statement</CardTitle>
          <CardDescription>
            Monthly revenue, gross profit, and net profit trends
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <DollarSign className="h-5 w-5 text-muted-foreground" />
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
              tickFormatter={(value) => `Rs. ${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="grossProfit"
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
              strokeWidth={3}
              name="Net Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}