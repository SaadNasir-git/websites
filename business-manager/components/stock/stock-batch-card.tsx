import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StockBatch } from '@/types/stock';

interface StockBatchCardProps {
  batch: StockBatch;
  onView: (batch: StockBatch) => void;
  onEdit?: (batch: StockBatch) => void;
}

export function StockBatchCard({ batch, onView, onEdit }: StockBatchCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{batch.batchName}</CardTitle>
          <Badge variant={getStatusVariant(batch.status)}>
            {getStatusText(batch.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{batch.supplier}</span>
          <span>•</span>
          <span>{new Date(batch.purchaseDate).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total Items</div>
            <div className="font-medium">{batch.totalItems}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total Cost</div>
            <div className="font-medium">Rs. {batch.totalCost.toLocaleString()}</div>
          </div>
        </div>

        {batch.notes && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {batch.notes}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(batch)}>
            View Details
          </Button>
          {batch.status === 'active' && onEdit && (
            <Button size="sm" className="flex-1" onClick={() => onEdit(batch)}>
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}