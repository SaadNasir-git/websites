import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecentSale } from '@/types/dashboard';

interface RecentSalesProps {
  sales: RecentSale[];
}

export function RecentSales({ sales }: RecentSalesProps) {
  const getPlatformBadge = (platform: string) => {
    const variants = {
      whatsapp: 'bg-green-100 text-green-800',
      instagram: 'bg-pink-100 text-pink-800',
      tiktok: 'bg-black text-white',
      other: 'bg-gray-100 text-gray-800',
    };
    return variants[platform as keyof typeof variants] || variants.other;
  };

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {sales.map((sale) => (
            <div 
              key={sale.id} 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-0 rounded-lg border sm:border-0 bg-muted/30 sm:bg-transparent"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {sale.productName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {sale.productName}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                    <p className="text-xs text-muted-foreground truncate">
                      {sale.customer}
                    </p>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform and Amount */}
              <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getPlatformBadge(sale.platform)} sm:order-2`}
                >
                  {sale.platform}
                </Badge>
                <div className="text-right sm:text-left sm:order-1">
                  <p className="text-sm font-medium">
                    Rs. {sale.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">
                    +Rs. {sale.profit.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}