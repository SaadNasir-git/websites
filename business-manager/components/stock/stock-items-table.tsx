import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StockItem } from '@/types/stock';

interface StockItemsTableProps {
  items: StockItem[];
  batchName: string;
}

export function StockItemsTable({ items, batchName }: StockItemsTableProps) {
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

  const availableItems = items.filter(item => item.status === 'available');
  const soldItems = items.filter(item => item.status === 'sold');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Items in {batchName}</h3>
        <div className="flex gap-4 text-sm">
          <span>Total: {items.length}</span>
          <span className="text-green-600">Available: {availableItems.length}</span>
          <span className="text-blue-600">Sold: {soldItems.length}</span>
        </div>
      </div>

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No items found in this batch
        </div>
      )}
    </div>
  );
}