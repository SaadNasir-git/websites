'use client';

import { Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface ProfitMarginChartProps {
  data: any[];
}

export function ProfitMarginChart({ data }: ProfitMarginChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Profit Margin: <span className="font-medium text-green-600">{payload[0].value}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const averageMargin = data.reduce((sum, item) => sum + item.profitMargin, 0) / data.length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Profit Margin Trend</CardTitle>
        <CardDescription>Monthly profit margin percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => `${value}%`}
              domain={[30, 45]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={averageMargin} 
              stroke="#6b7280" 
              strokeDasharray="3 3" 
              label={{
                value: `Avg: ${averageMargin.toFixed(1)}%`,
                position: 'right',
                fill: '#6b7280',
                fontSize: 12
              }} 
            />
            <Line
              type="monotone"
              dataKey="profitMargin"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#8b5cf6' }}
              name="Profit Margin"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-700">{Math.max(...data.map(d => d.profitMargin)).toFixed(1)}%</div>
            <div className="text-green-600 text-xs">Highest</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded-lg">
            <div className="font-semibold text-red-700">{Math.min(...data.map(d => d.profitMargin)).toFixed(1)}%</div>
            <div className="text-red-600 text-xs">Lowest</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}