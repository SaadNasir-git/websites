import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StockBatch } from '@/types/stock';

interface HistoryBatchCardProps {
  batch: StockBatch;
  onViewDetails: (batch: StockBatch) => void;
  onViewItems: (batch: StockBatch) => void;
}

export function HistoryBatchCard({ batch, onViewDetails, onViewItems }: HistoryBatchCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getDaysAgo = (date: string) => {
    const created = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
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
          <span>•</span>
          <span>{getDaysAgo(batch.createdAt)}</span>
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
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            onClick={() => onViewItems(batch)}
          >
            View Items
          </Button>
          <Button 
            size="sm" 
            className="flex-1" 
            onClick={() => onViewDetails(batch)}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}