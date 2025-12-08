'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StockFormData, StockItemFormData } from '@/types/stock';
import { products } from '@/lib/products-data';
import { suppliers } from '@/lib/stock-data';

interface StockBatchFormProps {
  initialData?: StockFormData;
  onSubmit: (data: StockFormData) => void;
  onCancel: () => void;
}

export function StockBatchForm({ initialData, onSubmit, onCancel }: StockBatchFormProps) {
  const [formData, setFormData] = useState<StockFormData>(
    initialData || {
      batchName: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      supplier: '',
      notes: '',
      items: [],
    }
  );

  const [currentItem, setCurrentItem] = useState<StockItemFormData>({
    productId: '',
    costPrice: 0,
    expectedSellingPrice: 0,
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      alert('Please add at least one item to the batch');
      return;
    }
    onSubmit(formData);
  };

  const addItem = () => {
    if (!currentItem.productId || currentItem.quantity < 1) {
      alert('Please select a product and quantity');
      return;
    }

    const selectedProduct = products.find(p => p.id === currentItem.productId);
    if (!selectedProduct) return;

    const newItems: StockItemFormData[] = [];
    for (let i = 0; i < currentItem.quantity; i++) {
      newItems.push({
        ...currentItem,
        costPrice: currentItem.costPrice || selectedProduct.costPrice,
        expectedSellingPrice: currentItem.expectedSellingPrice || selectedProduct.sellingPrice,
      });
    }

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, ...newItems]
    }));

    // Reset current item but keep product selected for quick additions
    setCurrentItem(prev => ({
      ...prev,
      quantity: 1,
      costPrice: 0,
      expectedSellingPrice: 0,
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateCurrentItem = (field: keyof StockItemFormData, value: string | number) => {
    setCurrentItem(prev => ({ ...prev, [field]: value }));
  };

  const totalCost = formData.items.reduce((sum, item) => sum + item.costPrice, 0);
  const totalItems = formData.items.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Batch Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="batchName">Batch Name *</Label>
          <Input
            id="batchName"
            value={formData.batchName}
            onChange={(e) => setFormData(prev => ({ ...prev, batchName: e.target.value }))}
            placeholder="e.g., Dec-2023-Import"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date *</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier *</Label>
          <Select
            value={formData.supplier}
            onValueChange={(value) => setFormData(prev => ({ ...prev, supplier: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier} value={supplier}>
                  {supplier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Any additional notes about this stock batch..."
          rows={3}
        />
      </div>

      {/* Add Items Section */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">Add Items to Batch</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select
              value={currentItem.productId}
              onValueChange={(value) => updateCurrentItem('productId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price (Rs.)</Label>
            <Input
              id="costPrice"
              type="number"
              value={currentItem.costPrice}
              onChange={(e) => updateCurrentItem('costPrice', Number(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedPrice">Expected Price (Rs.)</Label>
            <Input
              id="expectedPrice"
              type="number"
              value={currentItem.expectedSellingPrice}
              onChange={(e) => updateCurrentItem('expectedSellingPrice', Number(e.target.value))}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={currentItem.quantity}
              onChange={(e) => updateCurrentItem('quantity', Number(e.target.value))}
              placeholder="1"
            />
          </div>
        </div>

        <Button type="button" onClick={addItem} className="w-full">
          Add to Batch
        </Button>
      </div>

      {/* Items List */}
      {formData.items.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">
            Batch Items ({totalItems} items, Total Cost: Rs. {totalCost.toLocaleString()})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {formData.items.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{product?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Cost: Rs. {item.costPrice} • Expected: Rs. {item.expectedSellingPrice}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={formData.items.length === 0}>
          Create Stock Batch
        </Button>
      </div>
    </form>
  );
}