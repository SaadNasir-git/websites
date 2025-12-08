'use client';

import { Button } from '@/components/ui/button';
import { ProductSelection } from '@/types/stock';
import { Edit } from 'lucide-react';

interface SelectedProductsListProps {
  products: ProductSelection[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onEditProduct: (product: ProductSelection) => void
}

export function SelectedProductsList({
  products,
  onUpdateQuantity,
  onRemoveProduct,
  onClearAll,
  onEditProduct
}: SelectedProductsListProps) {
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalCost = products.reduce((sum, product) => sum + product.totalCost, 0);

  if (products.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-semibold mb-2">No products added</h3>
        <p className="text-muted-foreground">
          Start adding products to create your stock batch
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Selected Products</h3>
        <Button variant="outline" size="sm" onClick={onClearAll} type='button'>
          Clear All
        </Button>
      </div>

      {/* Products List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-muted-foreground">
                Cost: Rs. {product.costPrice.toLocaleString()} •
                Price: Rs. {product.sellingPrice.toLocaleString()} •
                Margin: <span className="text-green-600">
                  {((product.sellingPrice - product.costPrice) / product.costPrice * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                  disabled={product.quantity <= 1}
                  type='button'
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{product.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                  type='button'
                >
                  +
                </Button>
              </div>

              {/* Total Cost */}
              <div className="text-right min-w-24">
                <div className="font-medium">Rs. {product.totalCost.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {product.quantity} item{product.quantity > 1 ? 's' : ''}
                </div>
              </div>

              <Button
                 variant='outline'
                 size='sm'
                 onClick={() => onEditProduct(product)}
                 type='button'
              >
                <Edit className='w-2 h-2' />
              </Button>

              {/* Remove Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveProduct(product.id)}
                type='button'
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total Products:</span>
          <span className="font-medium">{products.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total Items:</span>
          <span className="font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t pt-2">
          <span>Total Investment:</span>
          <span className="text-primary">Rs. {totalCost.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}