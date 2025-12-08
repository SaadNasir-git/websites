'use client';

import { RefreshCw } from 'lucide-react';
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

interface TurnoverRateChartProps {
  data: any[];
}

export function TurnoverRateChart({ data }: TurnoverRateChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Turnover Rate: <span className="font-medium">{payload[0].value}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Higher is better for inventory efficiency
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const averageTurnover = data.reduce((sum, item) => sum + item.turnoverRate, 0) / data.length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Inventory Turnover</CardTitle>
        <CardDescription>Monthly inventory turnover rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-green-600">
            {averageTurnover.toFixed(1)}
          </div>
          <RefreshCw className="h-5 w-5 text-muted-foreground" />
        </div>
        <ResponsiveContainer width="100%" height={200}>
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
              domain={[1.5, 2.8]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={averageTurnover} 
              stroke="#6b7280" 
              strokeDasharray="3 3" 
              label={{
                value: `Avg: ${averageTurnover.toFixed(1)}`,
                position: 'right',
                fill: '#6b7280',
                fontSize: 12
              }} 
            />
            <Line
              type="monotone"
              dataKey="turnoverRate"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10b981' }}
              name="Turnover Rate"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Turnover rate indicates how many times inventory is sold and replaced in a period.</p>
          <p className="mt-1">Higher rates suggest better inventory management and sales performance.</p>
        </div>
      </CardContent>
    </Card>
  );
}