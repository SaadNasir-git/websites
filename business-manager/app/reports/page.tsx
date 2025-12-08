'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfitLossChart } from '@/components/reports/profit-loss-chart';
import { SalesTrendChart } from '@/components/reports/sales-trend-chart';
import { PlatformPerformanceChart } from '@/components/reports/platform-performance-chart';
import { ReportFilters } from '@/components/reports/report-filters';
import { ReportStats } from '@/components/reports/report-stats';
import { ReportFilters as FiltersType } from '@/types/reports';
import {
  profitLossData,
  salesTrendData,
  platformPerformance,
  productPerformance,
  reportStats,
} from '@/lib/reports-data';

export default function ReportsPage() {
  const [filters, setFilters] = useState<FiltersType>({
    period: '1year',
    dateRange: {
      from: '',
      to: '',
    },
    category: 'all',
  });

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    alert('Exporting PDF report...');
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Business Reports</h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and performance insights
          </p>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
      />

      {/* Statistics */}
      <ReportStats stats={reportStats} />

      {/* Charts and Reports */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - ProfitLossChart (spans full width on mobile, 2 cols on desktop) */}
            <div className="lg:col-span-2">
              <ProfitLossChart data={profitLossData} />
            </div>

            {/* Right column - Stacked charts (full width on mobile, 1 col on desktop) */}
            <div className="space-y-6 w-full">
              <SalesTrendChart data={salesTrendData} />
              <PlatformPerformanceChart data={platformPerformance} />
            </div>
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProfitLossChart data={profitLossData} />
            <SalesTrendChart data={salesTrendData} />
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
              <div className="space-y-4">
                {productPerformance.map((product, index) => (
                  <div key={product.productName} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.quantitySold} units sold
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rs. {product.revenue.toLocaleString()}</div>
                      <div className="text-sm text-green-600">
                        Rs. {product.profit.toLocaleString()} profit
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlatformPerformanceChart data={platformPerformance} />
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Platform Breakdown</h3>
              <div className="space-y-4">
                {platformPerformance.map((platform) => (
                  <div key={platform.platform} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${platform.platform === 'whatsapp' ? 'bg-blue-500' :
                          platform.platform === 'instagram' ? 'bg-purple-500' :
                            platform.platform === 'tiktok' ? 'bg-pink-500' : 'bg-gray-500'
                        }`} />
                      <div className="capitalize font-medium">{platform.platform}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{platform.orders} orders</div>
                      <div className="text-sm text-muted-foreground">
                        Rs. {platform.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Section */}
      <div className="border rounded-lg p-6 bg-muted/50">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">📈 Growth Trend</h4>
            <p className="text-sm text-muted-foreground">
              Revenue has grown by 45% compared to last year, with consistent monthly increases.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">💰 Profitability</h4>
            <p className="text-sm text-muted-foreground">
              Maintaining a healthy 41.5% profit margin with optimized cost management.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">📱 Platform Performance</h4>
            <p className="text-sm text-muted-foreground">
              WhatsApp drives 55% of total revenue, showing strong customer engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}