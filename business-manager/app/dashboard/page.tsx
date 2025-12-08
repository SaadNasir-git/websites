// import { DashboardStats, RecentSale, StockAlert, ProfitTrend , StatsCards } from '@/components/dashboard/stats-cards';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentSales } from '@/components/dashboard/recent-sales';
import { StockAlerts } from '@/components/dashboard/stock-alerts';
import { QuickActions } from '@/components/dashboard/quick-actions';
import {
  dashboardStats,
  recentSales,
  stockAlerts,
  profitTrend
} from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsCards stats={dashboardStats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Sales */}
        <div className="col-span-4">
          <RecentSales sales={recentSales} />
        </div>

        {/* Sidebar */}
        <div className="col-span-3 space-y-4">
          <QuickActions />
          <StockAlerts alerts={stockAlerts} />
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Top Selling Platforms</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>WhatsApp</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Instagram</span>
              <span className="font-medium">22%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>TikTok</span>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">This Month</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Sales</span>
              <span className="font-medium text-green-600">+15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Revenue</span>
              <span className="font-medium text-green-600">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Profit</span>
              <span className="font-medium text-green-600">+18%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}