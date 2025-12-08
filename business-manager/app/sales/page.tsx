'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalesFilters } from '@/components/sales/sales-filters';
import { SalesStats } from '@/components/sales/sales-stats';
import { SaleCard } from '@/components/sales/sale-card';
import { SaleDetailsModal } from '@/components/sales/sale-details-modal';
import { Sale, SalesFilters as Filters } from '@/types/sales';
import { sales } from '@/lib/sales-data';

export default function SalesPage() {
  const router = useRouter();
  const [allSales] = useState<Sale[]>(sales);
  const [filters, setFilters] = useState<Filters>({
    dateRange: {
      from: '',
      to: '',
    },
    platform: 'all',
    status: 'all',
    search: '',
  });
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter sales
  const filteredSales = allSales.filter(sale => {
    // Date range filter
    if (filters.dateRange.from && sale.saleDate < filters.dateRange.from) {
      return false;
    }
    if (filters.dateRange.to && sale.saleDate > filters.dateRange.to) {
      return false;
    }

    // Platform filter
    if (filters.platform !== 'all' && sale.platform !== filters.platform) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && sale.status !== filters.status) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesCustomer = sale.customerName.toLowerCase().includes(searchLower) ||
        sale.customerLocation.toLowerCase().includes(searchLower);
      const matchesProduct = sale.items.some(item =>
        item.productName.toLowerCase().includes(searchLower)
      );
      const matchesNotes = sale.notes?.toLowerCase().includes(searchLower);

      if (!matchesCustomer && !matchesProduct && !matchesNotes) {
        return false;
      }
    }

    return true;
  });

  const completedSales = filteredSales.filter(sale => sale.status === 'completed');
  const pendingSales = filteredSales.filter(sale => sale.status === 'pending');
  const cancelledSales = filteredSales.filter(sale => sale.status === 'cancelled');

  const handleResetFilters = () => {
    setFilters({
      dateRange: { from: '', to: '' },
      platform: 'all',
      status: 'all',
      search: '',
    });
  };

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDetailsModalOpen(true);
  };

  const handleEditSale = (sale: Sale) => {
    // TODO: Implement edit sale functionality
    console.log('Edit sale:', sale);
    alert(`Editing sale #${sale.id}`);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
          <p className="text-muted-foreground">
            View and manage all your sales transactions
          </p>
        </div>

        <Button onClick={() => router.push('/sales/new')}>
          New Sale
        </Button>
      </div>

      {/* Statistics */}
      <SalesStats sales={filteredSales} />

      {/* Filters */}
      <SalesFilters
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
            <TabsList className="w-max sm:w-auto min-w-full sm:min-w-0">
              <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap">
                All ({filteredSales.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm whitespace-nowrap">
                Completed ({completedSales.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm whitespace-nowrap">
                Pending ({pendingSales.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs sm:text-sm whitespace-nowrap">
                Cancelled ({cancelledSales.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground text-center sm:text-right">
            Showing {filteredSales.length} of {allSales.length} sales
          </div>
        </div>

        {/* All Sales Tab */}
        <TabsContent value="all" className="space-y-4">
          {filteredSales.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💰</div>
              <h3 className="text-base sm:text-lg font-semibold">No sales found</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base max-w-sm mx-auto">
                {filters.search || filters.platform !== 'all' || filters.status !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'Get started by creating your first sale.'}
              </p>
              <Button
                className="mt-3 sm:mt-4"
                onClick={() => router.push('/sales/new')}
                size="sm"
              >
                Create New Sale
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredSales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditSale}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Completed Sales Tab */}
        <TabsContent value="completed" className="space-y-4">
          {completedSales.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✅</div>
              <h3 className="text-base sm:text-lg font-semibold">No completed sales</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Completed sales will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {completedSales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Pending Sales Tab */}
        <TabsContent value="pending" className="space-y-4">
          {pendingSales.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⏳</div>
              <h3 className="text-base sm:text-lg font-semibold">No pending sales</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Pending sales will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pendingSales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditSale}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Cancelled Sales Tab */}
        <TabsContent value="cancelled" className="space-y-4">
          {cancelledSales.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">❌</div>
              <h3 className="text-base sm:text-lg font-semibold">No cancelled sales</h3>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                Cancelled sales will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cancelledSales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* Sale Details Modal */}
      <SaleDetailsModal
        sale={selectedSale}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
}