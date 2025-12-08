'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InventoryTrendChart } from '@/components/reports/inventory-trend-chart';
import { StockValueChart } from '@/components/reports/stock-value-chart';
import { TurnoverRateChart } from '@/components/reports/turnover-rate-chart';
import { StockStatusChart } from '@/components/reports/stock-status-chart';
import { InventoryFilters } from '@/components/reports/inventory-filters';
import { InventoryFilters as FiltersType } from '@/types/inventory-reports';
import {
  inventoryTrendData,
  stockLevelData,
  turnoverAnalysis,
  inventoryForecast,
  inventoryStats,
} from '@/lib/inventory-reports-data';

export default function InventoryReportsPage() {
  const [filters, setFilters] = useState<FiltersType>({
    period: '1year',
    category: 'all',
    status: 'all',
    view: 'overview',
  });

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    alert('Exporting Inventory report...');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Filter data based on selected period
  const getFilteredTrendData = () => {
    switch (filters.period) {
      case '30days':
        return inventoryTrendData.slice(-1);
      case '90days':
        return inventoryTrendData.slice(-3);
      case '6months':
        return inventoryTrendData.slice(-6);
      case '1year':
        return inventoryTrendData;
      default:
        return inventoryTrendData;
    }
  };

  const filteredTrendData = getFilteredTrendData();

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Inventory Reports</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Comprehensive inventory analysis and stock management insights
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Real-time Data
        </Badge>
      </div>

      {/* Filters */}
      <InventoryFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Inventory</CardTitle>
            <span className="text-xl sm:text-2xl">📦</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
              {inventoryStats.totalItems}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Items in stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Stock Value</CardTitle>
            <span className="text-xl sm:text-2xl">💰</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
              {formatCurrency(inventoryStats.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current inventory worth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Low Stock</CardTitle>
            <span className="text-xl sm:text-2xl">⚠️</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 truncate">
              {inventoryStats.lowStockItems}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Turnover Rate</CardTitle>
            <span className="text-xl sm:text-2xl">🔄</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
              {inventoryStats.averageTurnover}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average monthly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={filters.view} onValueChange={(value) => handleFiltersChange({ ...filters, view: value as any })}>
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="grid w-max sm:w-full grid-cols-4 min-w-full sm:min-w-0">
            <TabsTrigger value="overview" className="text-xs sm:text-sm whitespace-nowrap">
              Overview
            </TabsTrigger>
            <TabsTrigger value="levels" className="text-xs sm:text-sm whitespace-nowrap">
              Stock Levels
            </TabsTrigger>
            <TabsTrigger value="turnover" className="text-xs sm:text-sm whitespace-nowrap">
              Turnover
            </TabsTrigger>
            <TabsTrigger value="forecast" className="text-xs sm:text-sm whitespace-nowrap">
              Forecast
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab - FIXED LAYOUT */}
        <TabsContent value="overview" className="space-y-6">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Main chart - full width on mobile, 2/3 on desktop */}
            <div className="flex-1 xl:flex-[2]">
              <InventoryTrendChart data={filteredTrendData} />
            </div>
            
            {/* Side charts container - full width on mobile, 1/3 on desktop */}
            <div className="flex-1 space-y-6">
              <StockValueChart data={filteredTrendData} />
              <TurnoverRateChart data={filteredTrendData} />
              <StockStatusChart data={stockLevelData} />
            </div>
          </div>
        </TabsContent>

        {/* Stock Levels Tab */}
        <TabsContent value="levels" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">Current Stock Levels</CardTitle>
                <CardDescription className="text-sm">Detailed inventory status across all products</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-semibold text-sm">Product</th>
                        <th className="text-right p-3 font-semibold text-sm">Current</th>
                        <th className="text-right p-3 font-semibold text-sm">Min</th>
                        <th className="text-right p-3 font-semibold text-sm">Max</th>
                        <th className="text-center p-3 font-semibold text-sm">Status</th>
                        <th className="text-right p-3 font-semibold text-sm">Value</th>
                        <th className="text-center p-3 font-semibold text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockLevelData.map((item) => (
                        <tr key={item.productName} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium text-sm">{item.productName}</td>
                          <td className="p-3 text-right text-sm">{item.currentStock}</td>
                          <td className="p-3 text-right text-sm">{item.minStock}</td>
                          <td className="p-3 text-right text-sm">{item.maxStock}</td>
                          <td className="p-3 text-center">
                            <Badge variant={
                              item.status === 'optimal' ? 'default' :
                              item.status === 'low' ? 'secondary' :
                              item.status === 'out-of-stock' ? 'destructive' : 'outline'
                            } className="text-xs">
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-medium text-sm">
                            {formatCurrency(item.value)}
                          </td>
                          <td className="p-3 text-center">
                            {item.status === 'low' || item.status === 'out-of-stock' ? (
                              <Button size="sm" variant="outline" className="text-xs">
                                Order
                              </Button>
                            ) : item.status === 'overstock' ? (
                              <Button size="sm" variant="outline" className="text-xs">
                                Promote
                              </Button>
                            ) : (
                              <span className="text-xs text-muted-foreground">Optimal</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Turnover Analysis Tab */}
        <TabsContent value="turnover" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">Inventory Turnover Analysis</CardTitle>
                <CardDescription className="text-sm">Product performance and sales velocity</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-semibold text-sm">Product</th>
                        <th className="text-right p-3 font-semibold text-sm">Turnover</th>
                        <th className="text-right p-3 font-semibold text-sm">Days in Stock</th>
                        <th className="text-right p-3 font-semibold text-sm">Sales Velocity</th>
                        <th className="text-center p-3 font-semibold text-sm">Category</th>
                        <th className="text-center p-3 font-semibold text-sm">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnoverAnalysis.map((item) => (
                        <tr key={item.productName} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium text-sm">{item.productName}</td>
                          <td className="p-3 text-right">
                            <Badge variant={
                              item.turnoverRate >= 3 ? 'default' :
                              item.turnoverRate >= 2 ? 'secondary' : 'outline'
                            } className="text-xs">
                              {item.turnoverRate}
                            </Badge>
                          </td>
                          <td className="p-3 text-right text-sm">{item.daysInStock} days</td>
                          <td className="p-3 text-right text-sm">{item.salesVelocity}/day</td>
                          <td className="p-3 text-center">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant={
                              item.turnoverRate >= 3 ? 'default' :
                              item.turnoverRate >= 2 ? 'secondary' :
                              'destructive'
                            } className="text-xs">
                              {item.turnoverRate >= 3 ? 'High' :
                               item.turnoverRate >= 2 ? 'Medium' : 'Low'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demand Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">Inventory Demand Forecast</CardTitle>
                <CardDescription className="text-sm">Predicted demand and recommended orders</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-semibold text-sm">Month</th>
                        <th className="text-right p-3 font-semibold text-sm">Predicted Demand</th>
                        <th className="text-right p-3 font-semibold text-sm">Recommended Order</th>
                        <th className="text-right p-3 font-semibold text-sm">Current Stock</th>
                        <th className="text-center p-3 font-semibold text-sm">Status</th>
                        <th className="text-center p-3 font-semibold text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryForecast.map((item) => {
                        const needsOrder = item.currentStock < item.predictedDemand;
                        return (
                          <tr key={item.month} className="border-b hover:bg-muted/50">
                            <td className="p-3 font-medium text-sm">{item.month}</td>
                            <td className="p-3 text-right text-sm">{item.predictedDemand}</td>
                            <td className="p-3 text-right text-sm">{item.recommendedOrder}</td>
                            <td className="p-3 text-right text-sm">{item.currentStock}</td>
                            <td className="p-3 text-center">
                              <Badge variant={needsOrder ? 'destructive' : 'default'} className="text-xs">
                                {needsOrder ? 'Order Needed' : 'Adequate'}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Button size="sm" variant={needsOrder ? 'default' : 'outline'} className="text-xs">
                                {needsOrder ? 'Place Order' : 'Monitor'}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-blue-900 text-lg sm:text-xl">📊 Inventory Insights</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">✅ Strengths</h4>
              <ul className="space-y-1 text-blue-700 text-xs sm:text-sm">
                <li>• Healthy average turnover rate of 2.3 indicates good inventory movement</li>
                <li>• 75% of products are at optimal stock levels</li>
                <li>• Consistent growth in stock value shows strategic inventory investment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">🎯 Recommendations</h4>
              <ul className="space-y-1 text-blue-700 text-xs sm:text-sm">
                <li>• Restock 2 low stock items and 1 out-of-stock product immediately</li>
                <li>• Consider promotions for 2 overstocked items to improve turnover</li>
                <li>• Monitor high-turnover products (Mini Crossbody Bag, Travel Backpack Pro) closely</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}