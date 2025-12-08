// 'use client';

// import { Button } from '@/components/ui/button';
// import { SaleItem } from '@/types/sales';

// interface SaleItemsListProps {
//   items: SaleItem[];
//   onUpdateQuantity: (itemId: string, quantity: number) => void;
//   onUpdatePrice: (itemId: string, price: number) => void;
//   onRemoveItem: (itemId: string) => void;
//   onClearAll: () => void;
// }

// export function SaleItemsList({
//   items,
//   onUpdateQuantity,
//   onUpdatePrice,
//   onRemoveItem,
//   onClearAll,
// }: SaleItemsListProps) {
//   const subtotal = items.reduce((sum, item) => sum + item.totalAmount, 0);
//   const totalProfit = items.reduce((sum, item) => sum + item.profit, 0);

//   if (items.length === 0) {
//     return (
//       <div className="border rounded-lg p-8 text-center">
//         <div className="text-4xl mb-4">🛒</div>
//         <h3 className="text-lg font-semibold mb-2">No items in sale</h3>
//         <p className="text-muted-foreground">
//           Start adding products to create your sale
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="border rounded-lg p-6 space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold">Sale Items</h3>
//         <Button variant="outline" size="sm" onClick={onClearAll} type='button'>
//           Clear All
//         </Button>
//       </div>

//       {/* Items List */}
//       <div className="space-y-3 max-h-96 overflow-y-auto">
//         {items.map((item) => (
//           <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex-1">
//               <div className="font-medium">{item.productName}</div>
//               <div className="text-sm text-muted-foreground">
//                 Cost: Rs. {item.costPrice.toLocaleString()} • 
//                 Profit: <span className={item.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
//                   Rs. {item.profit.toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Price Input */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs text-muted-foreground">Price</label>
//                 <input
//                   type="number"
//                   value={item.sellingPrice}
//                   onChange={(e) => onUpdatePrice(item.id, Number(e.target.value))}
//                   className="w-20 px-2 py-1 border rounded text-sm"
//                 />
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs text-muted-foreground">Qty</label>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="h-6 w-6 p-0"
//                     onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
//                     disabled={item.quantity <= 1}
//                     type='button'
//                   >
//                     -
//                   </Button>
//                   <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="h-6 w-6 p-0"
//                     onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
//                     type='button'
//                   >
//                     +
//                   </Button>
//                 </div>
//               </div>

//               {/* Total */}
//               <div className="text-right min-w-24">
//                 <div className="font-medium">Rs. {item.totalAmount.toLocaleString()}</div>
//                 <div className="text-sm text-muted-foreground">
//                   {item.quantity} item{item.quantity > 1 ? 's' : ''}
//                 </div>
//               </div>

//               {/* Remove Button */}
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => onRemoveItem(item.id)}
//                 type='button'
//               >
//                 Remove
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Summary */}
//       <div className="border-t pt-4 space-y-2">
//         <div className="flex justify-between text-sm">
//           <span>Subtotal:</span>
//           <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span>Total Profit:</span>
//           <span className={`font-medium ${
//             totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
//           }`}>
//             Rs. {totalProfit.toLocaleString()}
//           </span>
//         </div>
//         <div className="flex justify-between text-lg font-semibold border-t pt-2">
//           <span>Total Amount:</span>
//           <span className="text-primary">Rs. {subtotal.toLocaleString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// }














































































'use client';

import { Button } from '@/components/ui/button';
import { SaleItem } from '@/types/sales';
import { ProductSelection } from '@/types/stock';
import { Edit } from 'lucide-react';

interface SelectedProductsListProps {
  products: SaleItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveProduct: (productId: number) => void;
  onClearAll: () => void;
  onEditProduct: (product: SaleItem) => void
}

export function SelectedProductsList({
  products,
  onUpdateQuantity,
  onRemoveProduct,
  onClearAll,
  onEditProduct
}: SelectedProductsListProps) {
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  // const totalCost = products.reduce((sum, product) => sum + product.totalCost, 0);

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
              <div className="font-medium">{product.productName}</div>
              <div className="text-sm text-muted-foreground">
                {/* Cost: Rs. {product.costPrice.toLocaleString()} • */}
                Price: Rs. {product.sellingPrice.toLocaleString()} •
                {/* Margin: <span className="text-green-600">
                  {((product.sellingPrice - product.costPrice) / product.costPrice * 100).toFixed(1)}%
                </span> */}
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
      </div>
    </div>
  );
}