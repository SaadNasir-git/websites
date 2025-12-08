'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductCard } from '@/components/products/product-card';
import { ProductsFilter } from '@/components/products/products-filter';
import { ProductForm } from '@/components/products/product-form';
import { validateProduct } from '@/actions/product';
import axios from 'axios'
import { toast } from 'react-toastify';
import CustomToast from '@/components/CustomToast';

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    stockStatus: 'all',
    search: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [Image, setImage] = useState<File | null | string>(null)
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([])

  const handleAddProduct = async (product: ProductFormData) => {
    try {
      const isNotValid = validateProduct(product)
      if (isNotValid) {
        toast.error(isNotValid);
        return;
      }
      if (Image) {
        setisSubmitting(true)
        const formData = new FormData();
        formData.append('product', JSON.stringify(product));
        formData.append('image', Image);

        const res = await axios.post('/api/products/add', formData);
        toast.success(res.data.message)
        setIsDialogOpen(false);
      } else {
        toast.error('Image is required');
      }
    } catch (error: any) {
      console.error('Error adding product:', error);
      if (error.response?.data?.error) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error('Failed to add product');
      }
    } finally {
      setisSubmitting(false)
    }
  };

  const handleEditProduct = async (ProductFormdata: ProductFormData) => {
    if (!editingProduct) return;
    try {
      if (Image) {
        setisSubmitting(true)
        const formData = new FormData();
        formData.append('product', JSON.stringify(ProductFormdata))
        formData.append('formImage', Image)

        const res = await axios.post('/api/products/update', formData);
        setfilteredProducts(prev => prev.map(product =>
          product.id === editingProduct.id
            ? { ...product, ...res.data.data, updatedAt: new Date().toISOString().split('T')[0] }
            : product
        ));
        setEditingProduct(null);
        toast.success(res.data.message)
      } else {
        toast.error('Image is required');
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      if (error.response?.data?.error) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error('Failed to updating product');
      }
    } finally {
      setIsDialogOpen(false);
      setisSubmitting(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setImage(product.secureImage)
    setIsDialogOpen(true);
  };

  const handleViewClick = (product: Product) => {
    // TODO: Implement product detail view
    console.log('View product:', product);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  useEffect(() => {
    const main = async () => {
      const res = await axios.post('/api/products/get', { filters })
      setfilteredProducts(res.data.products)
    }
    main()
  }, [filters])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <CustomToast />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your bag inventory and product information
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              initialData={editingProduct ? {
                id: editingProduct.id,
                name: editingProduct.name,
                description: editingProduct.description,
                tags: editingProduct.tags,
                category: editingProduct.category,
                image: editingProduct.image,
                minStock: editingProduct.minStock
              } : undefined}
              Image={Image}
              setImage={setImage}
              handleSumbit={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={() => handleDialogOpenChange(false)}
              isEditing={!!editingProduct}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <ProductsFilter filters={filters} onFiltersChange={setFilters} />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditClick}
            onView={handleViewClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-lg font-semibold">No products found</h3>
          <p className="text-muted-foreground mt-2">
            {filters.search || filters.category !== 'all' || filters.stockStatus !== 'all'
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first product.'}
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>
          {filteredProducts.filter(p => p.currentStock <= p.minStock).length} need restocking
        </span>
      </div>
    </div>
  );
}