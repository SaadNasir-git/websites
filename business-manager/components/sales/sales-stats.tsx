import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sale } from '@/types/sales';

interface SalesStatsProps {
  sales: Sale[];
}

export function SalesStats({ sales }: SalesStatsProps) {
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.totalProfit, 0);
  const averageOrderValue = totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0;
  
  // Find best platform
  const platformRevenue = sales.reduce((acc, sale) => {
    acc[sale.platform] = (acc[sale.platform] || 0) + sale.totalAmount;
    return acc;
  }, {} as Record<string, number>);
  
  const bestPlatform = Object.entries(platformRevenue).reduce((max, [platform, revenue]) => {
    return revenue > max.revenue ? { platform, revenue } : max;
  }, { platform: 'None', revenue: 0 });

  const completedSales = sales.filter(sale => sale.status === 'completed').length;
  const pendingSales = sales.filter(sale => sale.status === 'pending').length;
  const cancelledSales = sales.filter(sale => sale.status === 'cancelled').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <span className="text-2xl">💰</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSales}</div>
          <p className="text-xs text-muted-foreground">
            {completedSales} completed, {pendingSales} pending
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <span className="text-2xl">📈</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs. {totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Average: Rs. {averageOrderValue.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          <span className="text-2xl">💹</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            Rs. {totalProfit.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
          <span className="text-2xl">📱</span>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold capitalize">{bestPlatform.platform}</div>
          <p className="text-xs text-muted-foreground">
            Rs. {bestPlatform.revenue.toLocaleString()} revenue
          </p>
        </CardContent>
      </Card>
    </div>
  );
}