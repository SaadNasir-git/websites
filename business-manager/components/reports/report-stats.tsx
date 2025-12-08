import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReportStats as ReportStatsType } from '@/types/reports';

interface ReportStatsProps {
  stats: ReportStatsType;
}

export function ReportStats({ stats }: ReportStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {/* Total Revenue */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
          <span className="text-xl sm:text-2xl">💰</span>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
            {formatCurrency(stats.totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            All-time total revenue
          </p>
        </CardContent>
      </Card>

      {/* Net Profit */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-xs sm:text-sm font-medium">Net Profit</CardTitle>
          <span className="text-xl sm:text-2xl">💹</span>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
            {formatCurrency(stats.totalProfit)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            After all expenses
          </p>
        </CardContent>
      </Card>

      {/* Profit Margin */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-xs sm:text-sm font-medium">Profit Margin</CardTitle>
          <span className="text-xl sm:text-2xl">📊</span>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
            {stats.profitMargin}%
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            Net profit margin
          </p>
        </CardContent>
      </Card>

      {/* Total Sales */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-xs sm:text-sm font-medium">Total Sales</CardTitle>
          <span className="text-xl sm:text-2xl">🛒</span>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
            {stats.totalSales}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            Completed transactions
          </p>
        </CardContent>
      </Card>

      {/* Average Order Value */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-xs sm:text-sm font-medium">Avg Order Value</CardTitle>
          <span className="text-xl sm:text-2xl">📦</span>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
            {formatCurrency(stats.averageOrderValue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            Per transaction
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-xs sm:text-sm font-medium">Total Expenses</CardTitle>
          <span className="text-xl sm:text-2xl">💸</span>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 truncate">
            {formatCurrency(stats.totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            Operating costs
          </p>
        </CardContent>
      </Card>
    </div>
  );
}