'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProfitLossOverviewChart } from '@/components/reports/profit-loss-overview-chart';
import { ProfitMarginChart } from '@/components/reports/profit-margin-chart';
import { ExpenseBreakdownChart } from '@/components/reports/expense-breakdown-chart';
import { YearComparisonChart } from '@/components/reports/year-comparison-chart';
import { ProfitLossFilters } from '@/components/reports/profit-loss-filters';
import { ProfitLossFilters as FiltersType, ProfitLossData } from '@/types/profit-loss';
import {
  profitLossData,
  expenseBreakdown,
  profitLossStats,
  comparisonData,
} from '@/lib/profit-loss-data';

export default function ProfitLossPage() {
  const [filters, setFilters] = useState<FiltersType>({
    period: '1year',
    year: '2023',
    view: 'overview',
  });

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    alert('Exporting Profit & Loss report...');
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
  const getFilteredData = () => {
    switch (filters.period) {
      case '3months':
        return profitLossData.slice(-3);
      case '6months':
        return profitLossData.slice(-6);
      case '1year':
        return profitLossData;
      case '2years':
        return profitLossData; // In real app, this would be 2 years of data
      default:
        return profitLossData;
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profit & Loss Report</h2>
          <p className="text-muted-foreground">
            Detailed analysis of revenue, costs, and profitability
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Filters */}
      <ProfitLossFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-xl sm:text-2xl">💰</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
              {formatCurrency(profitLossStats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{profitLossStats.growthRate}% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Net Profit</CardTitle>
            <span className="text-xl sm:text-2xl">💹</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
              {formatCurrency(profitLossStats.totalNetProfit)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {profitLossStats.averageMargin}% average margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Gross Profit</CardTitle>
            <span className="text-xl sm:text-2xl">📈</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
              {formatCurrency(profitLossStats.totalGrossProfit)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Before operating expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Best Month</CardTitle>
            <span className="text-xl sm:text-2xl">🏆</span>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4">
            <div className="text-base sm:text-lg font-bold truncate">
              {profitLossStats.bestMonth}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Highest revenue month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={filters.view} onValueChange={(value) => handleFiltersChange({ ...filters, view: value as any })}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
        </TabsList>

        {/* Overview Tab - FIXED LAYOUT */}
        <TabsContent value="overview" className="space-y-6">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Main chart - full width on mobile, 2/3 on desktop */}
            <div className="flex-1 xl:flex-[2]">
              <ProfitLossOverviewChart data={filteredData} />
            </div>
            
            {/* Side charts container - full width on mobile, 1/3 on desktop */}
            <div className="flex-1 space-y-6">
              <ProfitMarginChart data={filteredData} />
              <ExpenseBreakdownChart data={expenseBreakdown} />
            </div>
          </div>
        </TabsContent>

        {/* Detailed Analysis Tab */}
        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ProfitLossOverviewChart data={filteredData} />
            
            {/* Detailed Table */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit & Loss Details</CardTitle>
                <CardDescription>Complete breakdown by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-semibold text-sm">Month</th>
                        <th className="text-right p-3 font-semibold text-sm">Revenue</th>
                        <th className="text-right p-3 font-semibold text-sm">Cost of Goods</th>
                        <th className="text-right p-3 font-semibold text-sm">Gross Profit</th>
                        <th className="text-right p-3 font-semibold text-sm">Expenses</th>
                        <th className="text-right p-3 font-semibold text-sm">Net Profit</th>
                        <th className="text-right p-3 font-semibold text-sm">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, index) => (
                        <tr key={row.month} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium text-sm">{row.month}</td>
                          <td className="p-3 text-right text-sm">{formatCurrency(row.revenue)}</td>
                          <td className="p-3 text-right text-red-600 text-sm">{formatCurrency(row.costOfGoods)}</td>
                          <td className="p-3 text-right text-green-600 text-sm">{formatCurrency(row.grossProfit)}</td>
                          <td className="p-3 text-right text-orange-600 text-sm">{formatCurrency(row.operatingExpenses)}</td>
                          <td className="p-3 text-right font-semibold text-purple-600 text-sm">
                            {formatCurrency(row.netProfit)}
                          </td>
                          <td className="p-3 text-right text-sm">
                            <Badge variant={row.profitMargin >= 35 ? "default" : "secondary"} className="text-xs">
                              {row.profitMargin}%
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

        {/* Year Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <YearComparisonChart data={comparisonData} />
            
            {/* Growth Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm">Total Growth</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4">
                  <div className="text-xl font-bold text-green-600">+28.5%</div>
                  <p className="text-xs text-muted-foreground mt-1">Year-over-year revenue growth</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm">Profit Growth</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4">
                  <div className="text-xl font-bold text-green-600">+32.1%</div>
                  <p className="text-xs text-muted-foreground mt-1">Net profit increase</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm">Margin Improvement</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4">
                  <div className="text-xl font-bold text-green-600">+3.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">Average profit margin</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-blue-900 text-lg sm:text-xl">💡 Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">📈 Positive Trends</h4>
              <ul className="space-y-1 text-blue-700 text-xs sm:text-sm">
                <li>• Consistent revenue growth throughout the year</li>
                <li>• Profit margins improved by 3.2% compared to last year</li>
                <li>• December was the best performing month with 38.9% margin</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">🎯 Recommendations</h4>
              <ul className="space-y-1 text-blue-700 text-xs sm:text-sm">
                <li>• Focus on high-margin products to improve overall profitability</li>
                <li>• Optimize shipping costs which account for 35% of expenses</li>
                <li>• Consider expanding marketing during peak months</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}