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
import { Sale } from '@/types/sales';

interface SaleDetailsModalProps {
  sale: Sale | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SaleDetailsModal({ sale, isOpen, onClose }: SaleDetailsModalProps) {
  if (!sale) return null;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return '💚 WhatsApp';
      case 'instagram':
        return '📷 Instagram';
      case 'tiktok':
        return '🎵 TikTok';
      default:
        return '📱 Other';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sale Details #{sale.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Customer Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{sale.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{sale.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{sale.customerLocation}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Sale Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform:</span>
                  <span className="font-medium">{getPlatformIcon(sale.platform)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sale Date:</span>
                  <span className="font-medium">
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={getStatusVariant(sale.status)}>
                    {sale.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-semibold mb-4">Items Sold</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Cost Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>Rs. {item.costPrice.toLocaleString()}</TableCell>
                    <TableCell>Rs. {item.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>Rs. {item.totalAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600 font-medium">
                      Rs. {item.profit.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <h4 className="font-semibold">Amount Breakdown</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {sale.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span>+ Rs. {sale.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="text-red-600">- Rs. {sale.discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>Total Amount:</span>
                  <span>Rs. {sale.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Profit Analysis</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span>
                    Rs. {sale.items.reduce((sum, item) => sum + (item.costPrice * item.quantity), 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Profit:</span>
                  <span className="text-green-600">
                    Rs. {sale.items.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span className="text-red-600">- Rs. {sale.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>Net Profit:</span>
                  <span className={sale.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                    Rs. {sale.totalProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {sale.notes && (
            <div>
              <h4 className="font-semibold mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                {sale.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}