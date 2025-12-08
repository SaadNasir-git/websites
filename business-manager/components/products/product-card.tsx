'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import { ImageZoom } from '../ui/shadcn-io/image-zoom';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onView }: ProductCardProps) {
  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { status: 'Out of Stock', variant: 'destructive' as const };
    if (current <= min) return { status: 'Low Stock', variant: 'secondary' as const };
    return { status: 'In Stock', variant: 'default' as const };
  };

  const stockInfo = getStockStatus(product.currentStock, product.minStock);
  // const profitMargin = ((product.sellingPrice - product.costPrice) / product.costPrice) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex gap-3">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <ImageZoom
              zoomMargin={0}
              zoomImg={{
                src: product.image,
                alt: product.name,
              }}
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border cursor-zoom-in">
                <CldImage
                  alt={product.name}
                  src={product.image}
                  fill
                  className="object-cover"
                />
              </div>
            </ImageZoom>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg truncate">{product.name}</CardTitle>
              <Badge variant={stockInfo.variant}>
                {stockInfo.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{product.category}</span>
              <span>•</span>
              <span>Stock: {product.currentStock}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Cost</div>
            <div className="font-medium">Rs. {product.costPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Price</div>
            <div className="font-medium">Rs. {product.sellingPrice.toLocaleString()}</div>
          </div>
        </div> */}

        {/* <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Margin</span>
          <span className="font-medium text-green-600">
            {profitMargin.toFixed(1)}%
          </span>
        </div> */}

        {product.tags && product.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(product)}>
            View
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onEdit(product)}>
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}