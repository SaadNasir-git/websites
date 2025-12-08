import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockBatch } from '@/types/stock';

interface StockHistoryStatsProps {
  batches: StockBatch[];
}

export function StockHistoryStats({ batches }: StockHistoryStatsProps) {
  const totalBatches = batches.length;
  const totalInvestment = batches.reduce((sum, batch) => sum + batch.totalCost, 0);
  const totalItems = batches.reduce((sum, batch) => sum + batch.totalItems, 0);
  const averageBatchSize = totalBatches > 0 ? Math.round(totalItems / totalBatches) : 0;
  
  // Find most used supplier
  const supplierCounts = batches.reduce((acc, batch) => {
    acc[batch.supplier] = (acc[batch.supplier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostUsedSupplier = Object.entries(supplierCounts).reduce((max, [supplier, count]) => {
    return count > max.count ? { supplier, count } : max;
  }, { supplier: 'None', count: 0 });

  const completedBatches = batches.filter(batch => batch.status === 'completed').length;
  const cancelledBatches = batches.filter(batch => batch.status === 'cancelled').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
          <span className="text-2xl">📦</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBatches}</div>
          <p className="text-xs text-muted-foreground">
            {completedBatches} completed, {cancelledBatches} cancelled
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          <span className="text-2xl">💰</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs. {totalInvestment.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Average: Rs. {Math.round(totalInvestment / totalBatches).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <span className="text-2xl">🛍️</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">
            {averageBatchSize} items per batch
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Supplier</CardTitle>
          <span className="text-2xl">🏭</span>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold truncate">{mostUsedSupplier.supplier}</div>
          <p className="text-xs text-muted-foreground">
            {mostUsedSupplier.count} batches
          </p>
        </CardContent>
      </Card>
    </div>
  );
}