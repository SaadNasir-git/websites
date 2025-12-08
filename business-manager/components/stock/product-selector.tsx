'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductSelection } from '@/types/stock';
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

interface ProductSelectorProps {
  onAddProduct: (product: ProductSelection) => void;
  Product?: ProductSelection | null;
  setProduct: Dispatch<SetStateAction<ProductSelection | undefined | null>>
}

export function ProductSelector({ onAddProduct, Product, setProduct }: ProductSelectorProps) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<ProductSelection | undefined>()

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
            category: 'all',
            stockStatus: 'all',
            search: searchValue
          }
        });
        setProducts(res.data.products || []);
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

  const handleSelect = (productId: string) => {
    setSelectedProductId(productId);
    // const product = products.find(p => p.id === productId);
    // if (product) {
    //   setCostPrice(product.costPrice);
    //   setSellingPrice(product.sellingPrice);
    // }
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

    const productSelection: ProductSelection = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      costPrice: costPrice,
      sellingPrice: sellingPrice,
      quantity,
      totalCost: costPrice * quantity,
    };

    onAddProduct(productSelection);
    setProduct(null)
    // Reset form
    setSelectedProductId('');
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
      // setselectedProduct(products.find(p => p.id === selectedProductId))
      const product = products.find(p => p.id === selectedProductId)
      if (product) {
        setselectedProduct({
          id: product.id,
          costPrice: 0,
          name: product.name,
          quantity: 0,
          sellingPrice: 0,
          totalCost: 0
        })
      }
    }
  }, [selectedProductId]);


  return (
    <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
      <h3 className="text-lg font-semibold">Add Products to Batch</h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                {selectedProduct ? selectedProduct.name : "Select product..."}
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

        {/* Cost Price */}
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (Rs.) *</Label>
          <Input
            id="costPrice"
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(Number(e.target.value))}
            placeholder="0.00"
            disabled={!selectedProductId}
            min="0"
            step="1"
          />
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

      {/* Product Info */}
      {/* {selectedProduct && (
        <div className="bg-background p-3 rounded border text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <span className="text-muted-foreground">Current Cost:</span>
              <span className="ml-2 font-medium">Rs. {selectedProduct.costPrice}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Current Price:</span>
              <span className="ml-2 font-medium">Rs. {selectedProduct.sellingPrice}</span>
            </div>
            <div>
              <span className="text-muted-foreground">In Stock:</span>
              <span className="ml-2 font-medium">{selectedProduct.currentStock}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Margin:</span>
              <span className="ml-2 font-medium text-green-600">
                {((selectedProduct.sellingPrice - selectedProduct.costPrice) / selectedProduct.costPrice * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}