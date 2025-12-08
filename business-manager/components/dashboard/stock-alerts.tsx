import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StockAlert } from '@/types/dashboard';

interface StockAlertsProps {
  alerts: StockAlert[];
}

export function StockAlerts({ alerts }: StockAlertsProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-orange-100 text-orange-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'low':
        return 'Low Stock';
      case 'critical':
        return 'Critical';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Stock Alerts</CardTitle>
        <Button variant="outline" size="sm">
          Restock All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.productName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Stock: {alert.currentStock}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    • Min: {alert.minStock}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getStatusVariant(alert.status)}>
                  {getStatusText(alert.status)}
                </Badge>
                <Button variant="outline" size="sm">
                  Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}