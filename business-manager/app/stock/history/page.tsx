'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StockHistoryFilters } from '@/components/stock/stock-history-filters';
import { StockHistoryStats } from '@/components/stock/stock-history-stats';
import { HistoryBatchCard } from '@/components/stock/history-batch-card';
import { BatchItemsModal } from '@/components/stock/batch-items-modal';
import { StockBatch, StockHistoryFilters as Filters } from '@/types/stock';
import { stockHistory, historicalStockItems } from '@/lib/stock-history-data';

export default function StockHistoryPage() {
  const [batches] = useState<StockBatch[]>(stockHistory);
  const [items] = useState(historicalStockItems);
  const [filters, setFilters] = useState<Filters>({
    dateRange: {
      from: '',
      to: '',
    },
    supplier: 'all',
    status: 'all',
    search: '',
  });
  const [selectedBatch, setSelectedBatch] = useState<StockBatch | null>(null);
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

  // Filter batches
  const filteredBatches = batches.filter(batch => {
    // Date range filter
    if (filters.dateRange.from && batch.purchaseDate < filters.dateRange.from) {
      return false;
    }
    if (filters.dateRange.to && batch.purchaseDate > filters.dateRange.to) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && batch.status !== filters.status) {
      return false;
    }

    // Search filter
    if (filters.search &&
      !batch.batchName.toLowerCase().includes(filters.search.toLowerCase()) &&
      !batch.notes?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    return true;
  });

  const completedBatches = filteredBatches.filter(batch => batch.status === 'completed');
  const cancelledBatches = filteredBatches.filter(batch => batch.status === 'cancelled');

  const handleResetFilters = () => {
    setFilters({
      dateRange: { from: '', to: '' },
      supplier: 'all',
      status: 'all',
      search: '',
    });
  };

  const handleViewItems = (batch: StockBatch) => {
    setSelectedBatch(batch);
    setIsItemsModalOpen(true);
  };

  const handleViewDetails = (batch: StockBatch) => {
    // TODO: Implement detailed batch view
    console.log('View batch details:', batch);
    alert(`Viewing details for ${batch.batchName}`);
  };

  const handleCloseItemsModal = () => {
    setIsItemsModalOpen(false);
    setSelectedBatch(null);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock History</h2>
          <p className="text-muted-foreground">
            View historical stock batches and their performance
          </p>
        </div>

        <Button variant="outline" onClick={() => window.print()}>
          Export Report
        </Button>
      </div>

      {/* Statistics */}
      <StockHistoryStats batches={filteredBatches} />

      {/* Filters */}
      <StockHistoryFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Results */}
      <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Tabs - Scrollable on mobile */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap">
                All Batches ({filteredBatches.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm whitespace-nowrap">
                Completed ({completedBatches.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs sm:text-sm whitespace-nowrap">
                Cancelled ({cancelledBatches.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground text-center sm:text-right">
            Showing {filteredBatches.length} of {batches.length} batches
          </div>
        </div>

        {/* Tab Content */}
        <TabsContent value="all" className="space-y-4">
          {filteredBatches.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📚</div>
              <h3 className="text-base sm:text-lg font-semibold">No historical batches found</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                {filters.search || filters.supplier !== 'all' || filters.status !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'No stock history available yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBatches.map((batch) => (
                <HistoryBatchCard
                  key={batch.id}
                  batch={batch}
                  onViewDetails={handleViewDetails}
                  onViewItems={handleViewItems}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedBatches.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✅</div>
              <h3 className="text-base sm:text-lg font-semibold">No completed batches</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Completed batches will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {completedBatches.map((batch) => (
                <HistoryBatchCard
                  key={batch.id}
                  batch={batch}
                  onViewDetails={handleViewDetails}
                  onViewItems={handleViewItems}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledBatches.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">❌</div>
              <h3 className="text-base sm:text-lg font-semibold">No cancelled batches</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Cancelled batches will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cancelledBatches.map((batch) => (
                <HistoryBatchCard
                  key={batch.id}
                  batch={batch}
                  onViewDetails={handleViewDetails}
                  onViewItems={handleViewItems}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Batch Items Modal */}
      <BatchItemsModal
        batch={selectedBatch}
        items={items}
        isOpen={isItemsModalOpen}
        onClose={handleCloseItemsModal}
      />
    </div>
  );
}