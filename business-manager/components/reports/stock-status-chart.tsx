'use client';

import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface StockStatusChartProps {
  data: any[];
}

export function StockStatusChart({ data }: StockStatusChartProps) {
  const statusData = [
    { name: 'Optimal', value: data.filter(item => item.status === 'optimal').length, color: '#10b981' },
    { name: 'Low Stock', value: data.filter(item => item.status === 'low').length, color: '#f59e0b' },
    { name: 'Out of Stock', value: data.filter(item => item.status === 'out-of-stock').length, color: '#ef4444' },
    { name: 'Overstock', value: data.filter(item => item.status === 'overstock').length, color: '#8b5cf6' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{data.name}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm">
              Products: <span className="font-medium">{data.value}</span>
            </p>
            <p className="text-sm">
              Percentage: <span className="font-medium">
                {((data.value / data.length) * 100).toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Optimal':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Low Stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Out of Stock':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Overstock':
        return <Info className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Stock Status Overview</CardTitle>
        <CardDescription>Current inventory health by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">{data.length}</div>
          <div className="text-sm text-muted-foreground">Total Products</div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Status Legend */}
        <div className="mt-4 space-y-2">
          {statusData.map((status) => (
            <div key={status.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {getStatusIcon(status.name)}
                <span>{status.name}</span>
              </div>
              <div className="font-medium">
                {status.value} products
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}