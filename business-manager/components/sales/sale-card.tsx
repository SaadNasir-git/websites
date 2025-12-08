import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sale } from '@/types/sales';

interface SaleCardProps {
  sale: Sale;
  onViewDetails: (sale: Sale) => void;
  onEdit?: (sale: Sale) => void;
}

export function SaleCard({ sale, onViewDetails, onEdit }: SaleCardProps) {
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
        return '💚';
      case 'instagram':
        return '📷';
      case 'tiktok':
        return '🎵';
      default:
        return '📱';
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
          <CardTitle className="text-lg">Sale #{sale.id}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusVariant(sale.status)}>
              {sale.status}
            </Badge>
            <Badge variant="outline">
              {getPlatformIcon(sale.platform)} {sale.platform}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{sale.customerName}</span>
          <span>•</span>
          <span>{sale.customerLocation}</span>
          <span>•</span>
          <span>{getDaysAgo(sale.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Sale Items */}
        <div className="space-y-2">
          {sale.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="truncate flex-1">
                {item.productName}
                {item.quantity > 1 && ` × ${item.quantity}`}
              </span>
              <span className="font-medium ml-2">
                Rs. {item.totalAmount.toLocaleString()}
              </span>
            </div>
          ))}
          {sale.items.length > 2 && (
            <div className="text-sm text-muted-foreground">
              +{sale.items.length - 2} more items
            </div>
          )}
        </div>

        {/* Sale Summary */}
        <div className="grid grid-cols-2 gap-4 text-sm border-t pt-3">
          <div>
            <div className="text-muted-foreground">Total Amount</div>
            <div className="font-medium">Rs. {sale.totalAmount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Profit</div>
            <div className={`font-medium ${
              sale.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              Rs. {sale.totalProfit.toLocaleString()}
            </div>
          </div>
        </div>

        {sale.notes && (
          <p className="text-sm text-muted-foreground line-clamp-2 border-t pt-3">
            {sale.notes}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            onClick={() => onViewDetails(sale)}
          >
            View Details
          </Button>
          {sale.status === 'pending' && onEdit && (
            <Button 
              size="sm" 
              className="flex-1" 
              onClick={() => onEdit(sale)}
            >
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}