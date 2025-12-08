'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StockBatchCard } from '@/components/stock/stock-batch-card';
import { StockBatchForm } from '@/components/stock/stock-batch-form';
import { StockItemsTable } from '@/components/stock/stock-items-table';
import { StockBatch, StockFormData } from '@/types/stock';
import { stockBatches, stockItems } from '@/lib/stock-data';
import Link from 'next/link';

export default function StockPage() {
  const [batches, setBatches] = useState(stockBatches);
  const [items] = useState(stockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<StockBatch | null>(null);

  // Filter batches
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeBatches = batches.filter(batch => batch.status === 'active');
  const completedBatches = batches.filter(batch => batch.status === 'completed');

  const handleViewBatch = (batch: StockBatch) => {
    setSelectedBatch(batch);
  };

  const handleCloseDetails = () => {
    setSelectedBatch(null);
  };

  const batchItems = selectedBatch ? items.filter(item => item.stockBatchId === selectedBatch.id) : [];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>
          <p className="text-muted-foreground">
            Manage your stock batches and inventory items
          </p>
        </div>
        <Link href={'/stock/add'} className='bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold text-sm'>Add Stock</Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">{batches.length}</div>
          <div className="text-sm text-muted-foreground">Total Batches</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{activeBatches.length}</div>
          <div className="text-sm text-muted-foreground">Active Batches</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{completedBatches.length}</div>
          <div className="text-sm text-muted-foreground">Completed Batches</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-2xl font-bold">
            Rs. {batches.reduce((sum, batch) => sum + batch.totalCost, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Investment</div>
        </div>
      </div>

      {/* Batch Details View */}
      {selectedBatch ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleCloseDetails}>
              ← Back to Batches
            </Button>
            <h3 className="text-xl font-semibold">{selectedBatch.batchName} - Details</h3>
          </div>
          <StockItemsTable items={batchItems} batchName={selectedBatch.batchName} />
        </div>
      ) : (
        /* Main Batches View */
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>
                All Batches
              </TabsTrigger>
              <TabsTrigger value="active" onClick={() => setStatusFilter('active')}>
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setStatusFilter('completed')}>
                Completed
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[250px]"
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredBatches.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-semibold">No stock batches found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first stock batch.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBatches.map((batch) => (
                  <StockBatchCard
                    key={batch.id}
                    batch={batch}
                    onView={handleViewBatch}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBatches.map((batch) => (
                <StockBatchCard
                  key={batch.id}
                  batch={batch}
                  onView={handleViewBatch}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedBatches.map((batch) => (
                <StockBatchCard
                  key={batch.id}
                  batch={batch}
                  onView={handleViewBatch}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Stock Alert */}
      {!selectedBatch && activeBatches.length > 0 && (
        <Alert>
          <AlertDescription>
            You have {activeBatches.length} active stock batch{activeBatches.length > 1 ? 'es' : ''} with {
              items.filter(item => item.status === 'available').length
            } items available for sale.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}