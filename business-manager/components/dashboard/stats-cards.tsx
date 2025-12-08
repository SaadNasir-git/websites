import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types/dashboard';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      description: 'All-time total revenue',
      icon: '💰',
      trend: '+12.5%',
    },
    {
      title: 'Net Profit',
      value: `Rs. ${stats.totalProfit.toLocaleString()}`,
      description: 'After all expenses',
      icon: '💹',
      trend: '+15.2%',
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toString(),
      description: 'Completed transactions',
      icon: '🛒',
      trend: '+8.3%',
    },
    {
      title: 'Active Stock',
      value: stats.activeStock.toString(),
      description: `${stats.lowStockItems} low stock items`,
      icon: '📦',
      trend: 'Stable',
    },
  ];

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">
              {card.title}
            </CardTitle>
            <span className="text-xl sm:text-2xl">{card.icon}</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {card.description}
            </p>
            <div className={`mt-2 text-xs ${
              card.trend.includes('+') 
                ? 'text-green-600' 
                : card.trend === 'Stable' 
                ? 'text-blue-600' 
                : 'text-red-600'
            }`}>
              {card.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}