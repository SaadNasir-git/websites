'use client';

import { Dispatch, SetStateAction, useState } from 'react';
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
import { categories } from '@/lib/products-data';
import { ProductMedia } from '../media';
import { Tags, X } from 'lucide-react';

interface initialData extends ProductFormData {
  id: string;
  image: string;
}

interface ProductFormProps {
  initialData?: initialData;
  handleSumbit: (data: ProductFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  Image: File | null | string;
  setImage: Dispatch<SetStateAction<File | null | string>>;
  isSubmitting: boolean;
}

export function ProductForm({ initialData, handleSumbit, onCancel, isEditing = false, Image, setImage, isSubmitting }: ProductFormProps) {
  const [productData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      description: '',
      category: '',
      minStock: 0,
      tags: []
    }
  );

  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput.trim() && !productData.tags?.includes(tagInput.trim())) {
      const tags: string[] = []
      if (productData.tags) {
        tags.push(...productData.tags , tagInput.trim())
      }
      setFormData({
        ...productData,
        tags
      })
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    let tags: string[] = [];
    if (productData.tags) {
      tags = productData.tags.filter(tag => tag !== tagToRemove)
    }
    setFormData({ ...productData, tags })
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={productData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter product name"
            maxLength={72}
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={productData.category}
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cost Price */}
        {/* <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (Rs.) *</Label>
          <Input
            id="costPrice"
            type="number"
            value={productData.costPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, costPrice: Number(e.target.value) }))}
            placeholder="0.00"
            required
          />
        </div> */}

        {/* Selling Price */}
        {/* <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (Rs.) *</Label>
          <Input
            id="sellingPrice"
            type="number"
            value={productData.sellingPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: Number(e.target.value) }))}
            placeholder="0.00"
            required
          />
        </div> */}

        {/* Minimum Stock */}
        <div className="space-y-2">
          <Label htmlFor="minStock">Minimum Stock Level *</Label>
          <Input
            id="minStock"
            type="number"
            value={productData.minStock}
            onChange={(e) => setFormData(prev => ({ ...prev, minStock: Number(e.target.value) }))}
            placeholder="0"
            required
          />
        </div>

        {/* Supplier */}
        {/* <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
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
        </div> */}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={productData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter product description"
          maxLength={100}
          rows={3}
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tags"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {productData.tags?.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className='w-2 h-2' />
              </button>
            </div>
          ))}
        </div>
      </div>

      <ProductMedia
        image={Image}
        updateImages={(images) => setImage(images)}
      />

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={() => handleSumbit(productData)} disabled={isSubmitting}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}