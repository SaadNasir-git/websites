'use client';

// import { Compare } from 'lucide-react';
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

interface YearComparisonChartProps {
  data: any[];
}

export function YearComparisonChart({ data }: YearComparisonChartProps) {
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
      const currentYear = payload[0].value;
      const previousYear = payload[1].value;
      const growth = ((currentYear - previousYear) / previousYear * 100).toFixed(1);

      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              2023: <span className="font-medium">{formatCurrency(currentYear)}</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              2022: <span className="font-medium">{formatCurrency(previousYear)}</span>
            </p>
            <div className="border-t pt-1 mt-1">
              <p className="text-sm flex items-center justify-between gap-4">
                <span>Growth:</span>
                <span className={`font-medium ${Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growth}%
                </span>
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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Year-over-Year Comparison</CardTitle>
        <CardDescription>Revenue comparison between 2022 and 2023</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
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
              dataKey="2023"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
              name="2023 Revenue"
            />
            <Area
              type="monotone"
              dataKey="2022"
              stroke="#9ca3af"
              fill="#9ca3af"
              fillOpacity={0.1}
              strokeWidth={2}
              name="2022 Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}