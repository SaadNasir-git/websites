'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StockBatch, StockItem } from '@/types/stock';

interface BatchItemsModalProps {
  batch: StockBatch | null;
  items: StockItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function BatchItemsModal({ batch, items, isOpen, onClose }: BatchItemsModalProps) {
  if (!batch) return null;

  const batchItems = items.filter(item => item.stockBatchId === batch.id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'sold':
        return 'secondary';
      case 'returned':
        return 'outline';
      case 'damaged':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'sold':
        return 'Sold';
      case 'returned':
        return 'Returned';
      case 'damaged':
        return 'Damaged';
      default:
        return status;
    }
  };

  const soldItems = batchItems.filter(item => item.status === 'sold');
  const totalRevenue = soldItems.reduce((sum, item) => sum + (item.salePrice || 0), 0);
  const totalProfit = soldItems.reduce((sum, item) => sum + ((item.salePrice || 0) - item.costPrice), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Items in {batch.batchName}</DialogTitle>
        </DialogHeader>

        {/* Batch Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">Total Items</div>
            <div className="text-lg font-semibold">{batchItems.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Sold Items</div>
            <div className="text-lg font-semibold text-green-600">{soldItems.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Profit</div>
            <div className="text-lg font-semibold text-green-600">
              Rs. {totalProfit.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Expected Price</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead>Sold Date</TableHead>
                <TableHead>Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchItems.map((item) => {
                const profit = item.salePrice ? item.salePrice - item.costPrice : 0;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>Rs. {item.costPrice.toLocaleString()}</TableCell>
                    <TableCell>Rs. {item.expectedSellingPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      {item.salePrice ? `Rs. ${item.salePrice.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.addedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item.soldAt ? new Date(item.soldAt).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell className={profit > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {item.salePrice ? `Rs. ${profit.toLocaleString()}` : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {batchItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No items found in this batch
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}