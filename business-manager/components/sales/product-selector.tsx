// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { AvailableStockItem, SaleItem } from '@/types/sales';
// import { availableStockItems } from '@/lib/sales-data';

// interface ProductSelectorProps {
//   onAddItem: (item: SaleItem) => void;
// }

// export function ProductSelector({ onAddItem }: ProductSelectorProps) {
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [sellingPrice, setSellingPrice] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   const availableProducts = availableStockItems.filter(item => 
//     !selectedProductId || item.productId === selectedProductId
//   );

//   const selectedProduct = availableProducts[0];
//   const productGroups = availableStockItems.reduce((groups, item) => {
//     if (!groups[item.productId]) {
//       groups[item.productId] = [];
//     }
//     groups[item.productId].push(item);
//     return groups;
//   }, {} as Record<string, AvailableStockItem[]>);

//   const handleAddToSale = () => {
//     if (!selectedProduct) {
//       alert('Please select a product');
//       return;
//     }

//     if (quantity < 1) {
//       alert('Quantity must be at least 1');
//       return;
//     }

//     const finalPrice = sellingPrice || selectedProduct.expectedSellingPrice;
//     const totalAmount = finalPrice * quantity;
//     const profit = (finalPrice - selectedProduct.costPrice) * quantity;

//     const saleItem: SaleItem = {
//       id: selectedProduct.id,
//       productId: selectedProduct.productId,
//       productName: selectedProduct.productName,
//       costPrice: selectedProduct.costPrice,
//       sellingPrice: finalPrice,
//       quantity,
//       totalAmount,
//       profit,
//     };

//     onAddItem(saleItem);

//     // Reset form
//     setSelectedProductId('');
//     setSellingPrice(0);
//     setQuantity(1);
//   };

//   const getAvailableQuantity = (productId: string) => {
//     return availableStockItems.filter(item => item.productId === productId).length;
//   };

//   return (
//     <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
//       <h3 className="text-lg font-semibold">Add Products to Sale</h3>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Product Selection */}
//         <div className="space-y-2">
//           <Label htmlFor="product">Product *</Label>
//           <Select value={selectedProductId} onValueChange={setSelectedProductId}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select product" />
//             </SelectTrigger>
//             <SelectContent>
//               {Object.entries(productGroups).map(([productId, items]) => {
//                 const product = items[0];
//                 const availableQty = getAvailableQuantity(productId);
//                 return (
//                   <SelectItem key={productId} value={productId}>
//                     <div className="flex justify-between items-center w-full">
//                       <span>{product.productName}</span>
//                       <Badge variant="secondary" className="ml-2">
//                         {availableQty}
//                       </Badge>
//                     </div>
//                   </SelectItem>
//                 );
//               })}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Selling Price */}
//         <div className="space-y-2">
//           <Label htmlFor="sellingPrice">Selling Price (Rs.)</Label>
//           <Input
//             id="sellingPrice"
//             type="number"
//             value={sellingPrice}
//             onChange={(e) => setSellingPrice(Number(e.target.value))}
//             placeholder="0.00"
//             disabled={!selectedProductId}
//           />
//         </div>

//         {/* Quantity */}
//         <div className="space-y-2">
//           <Label htmlFor="quantity">Quantity *</Label>
//           <Input
//             id="quantity"
//             type="number"
//             min="1"
//             max={selectedProductId ? getAvailableQuantity(selectedProductId) : 1}
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             placeholder="1"
//           />
//         </div>

//         {/* Add Button */}
//         <div className="space-y-2">
//           <Label className="invisible">Add</Label>
//           <Button 
//             onClick={handleAddToSale} 
//             className="w-full"
//             disabled={!selectedProductId}
//             type='button'
//           >
//             Add to Sale
//           </Button>
//         </div>
//       </div>

//       {/* Product Info */}
//       {selectedProduct && (
//         <div className="bg-background p-3 rounded border text-sm">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div>
//               <span className="text-muted-foreground">Cost Price:</span>
//               <span className="ml-2 font-medium">Rs. {selectedProduct.costPrice}</span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Expected Price:</span>
//               <span className="ml-2 font-medium">Rs. {selectedProduct.expectedSellingPrice}</span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Available:</span>
//               <span className="ml-2 font-medium">{getAvailableQuantity(selectedProductId)}</span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Batch:</span>
//               <span className="ml-2 font-medium">{selectedProduct.batchName}</span>
//             </div>
//           </div>
//           {sellingPrice > 0 && (
//             <div className="mt-2">
//               <span className="text-muted-foreground">Profit Margin:</span>
//               <span className={`ml-2 font-medium ${
//                 sellingPrice > selectedProduct.costPrice ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 {(((sellingPrice - selectedProduct.costPrice) / selectedProduct.costPrice) * 100).toFixed(1)}%
//               </span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

































































































































'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CldImage } from 'next-cloudinary'
import { ImageZoom } from '../ui/shadcn-io/image-zoom';
import { SaleItem } from '@/types/sales';

interface ProductSelectorProps {
  onAddProduct: (product: SaleItem) => void;
  Product?: SaleItem | null;
  setProduct: Dispatch<SetStateAction<SaleItem | undefined | null>>
}

export function ProductSelector({ onAddProduct, Product, setProduct }: ProductSelectorProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<SaleItem | undefined>()

  // const selectedProduct = products.find(p => p.id === selectedProductId);

  // Fetch products when search value changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchValue.trim().length === 0) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post('/api/products/get', {
          filters: {
            category: 'all-in-stock',
            stockStatus: 'all',
            search: searchValue
          }
        });
        setProducts(res.data.products || []);
        console.log(res.data.products)
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (productId: number) => {
    setSelectedProductId(productId);
    setOpen(false);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) {
      alert('Please select a product');
      return;
    }

    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    const productSelection: SaleItem = {
      id: selectedProduct.id,
      productName: selectedProduct.productName,
      // costPrice: costPrice,
      sellingPrice: sellingPrice,
      quantity,
      productId: selectedProduct.productId,
      totalAmount: sellingPrice * quantity
    };

    onAddProduct(productSelection);
    setProduct(null)
    // Reset form
    setSelectedProductId(null);
    setQuantity(1);
    setCostPrice(0);
    setSellingPrice(0);
    setSearchValue('');
  };

  useEffect(() => {
    if (Product) {
      setselectedProduct(Product)
      setSelectedProductId(Product.id)
    }
  }, [Product])

  useEffect(() => {
    if (!Product) {
      const product = products.find(p => p.id === selectedProductId)
      console.log(product);
      if (product) { 
        setselectedProduct({
          id: Math.random() + 100,
          productId: product.id,
          productName: product.name,
          quantity: 0,
          sellingPrice: 0,
          totalAmount: 0
        })
      }
    }
  }, [selectedProductId]); 

  useEffect(() => {
    console.log(products);
  }, [products])
  


  return (
    <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
      <h3 className="text-lg font-semibold">Add Products to Batch</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Product Selection - Combobox */}
        <div className="space-y-2">
          <Label htmlFor="product">Product *</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                disabled={loading}
              >
                {selectedProduct ? selectedProduct.productName : "Select product..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search products..."
                  value={searchValue}
                  onValueChange={handleSearch}
                />
                <CommandList>
                  {loading ? (
                    <CommandEmpty>Searching products...</CommandEmpty>
                  ) : (
                    <CommandEmpty>No products found.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {products.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.name}
                        onSelect={() => handleSelect(product.id)}
                        className="flex items-center gap-3 py-3 px-2"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 flex-shrink-0",
                            selectedProductId === product.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <ImageZoom
                          zoomMargin={0}
                          zoomImg={{
                            src: product.image,
                            alt: product.name,
                          }}
                        >
                          <div className="relative w-12 h-12 rounded-md overflow-hidden border" onClick={(e) => e.stopPropagation()}>
                            <CldImage
                              alt={product.name}
                              src={product.image}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </ImageZoom>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium text-sm truncate">{product.name}</span>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                            {/* <span className="text-xs text-muted-foreground">
                              Stock: <span className="font-medium">{product.currentStock}</span>
                            </span> */}
                            {/* <span className="text-xs text-muted-foreground">
                              Cost: <span className="font-medium">Rs. {product.costPrice}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Price: <span className="font-medium">Rs. {product.sellingPrice}</span>
                            </span> */}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Display search status */}
          {searchValue && (
            <p className="text-xs text-muted-foreground">
              {loading ? 'Searching...' : `Found ${products.length} products`}
            </p>
          )}
        </div>

        {/* Selling Price */}
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (Rs.) *</Label>
          <Input
            id="sellingPrice"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            placeholder="0.00"
            disabled={!selectedProductId}
            min="0"
            step="1"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="1"
          />
        </div>

        {/* Add Button */}
        <div className="space-y-2">
          <Label className="invisible">Add</Label>
          <Button
            onClick={handleAddProduct}
            className="w-full"
            disabled={!selectedProductId}
            type="button"
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}