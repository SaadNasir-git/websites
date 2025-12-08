'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductSelector } from '@/components/stock/product-selector';
import { SelectedProductsList } from '@/components/stock/selected-products-list';
import { BatchInformationForm } from '@/components/stock/batch-information-form';
import { ProductSelection, NewStockBatch } from '@/types/stock';
import { toast } from 'react-toastify';
import axios from 'axios';
import CustomToast from '@/components/CustomToast';

export default function AddStockPage() {
  const router = useRouter();

  const [batchInfo, setBatchInfo] = useState<NewStockBatch>({
    batchName: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    notes: '',
    charges: 0,
    products: [],
    totalCost: 0
  });

  const [selectedProducts, setSelectedProducts] = useState<ProductSelection[]>([]);
  const [editingProduct, seteditingProduct] = useState<ProductSelection | null>();

  const handleAddProduct = (newProduct: ProductSelection) => {
    setSelectedProducts(prev => {
      const existingProduct = prev.find(p => p.id === newProduct.id);
      if (existingProduct) {
        // Update quantity if product already exists
        return prev.map(p =>
          p.id === newProduct.id
            ? {
              ...p,
              quantity: p.quantity + newProduct.quantity,
              totalCost: (p.costPrice) * (p.quantity + newProduct.quantity),
            }
            : p
        );
      } else {
        // Add new product
        return [...prev, newProduct];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
            ...product,
            quantity: newQuantity,
            totalCost: product.costPrice * newQuantity,
          }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!batchInfo.batchName || !batchInfo.purchaseDate) {
      toast.error('Please fill in all required batch information');
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error('Please add at least one product to the batch');
      return;
    }

    const newBatch: NewStockBatch = {
      ...batchInfo,
      products: selectedProducts,
      totalCost: selectedProducts.reduce((sum, product) => sum + product.totalCost, 0) + batchInfo.charges,
    };

    // // Here you would typically send the data to your API
    // console.log('Creating new stock batch:', newBatch);

    // Simulate API call
    try {
      await axios.post('/api/stock/add', { stock: newBatch })
      setSelectedProducts([])
      setBatchInfo({
        batchName: '',
        notes: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        charges: 0,
        products:[],
        totalCost: 0
      })
      // Show success message and redirect
      toast.success('Stock batch created successfully!');
    } catch (error) {
      console.error('Error creating stock batch:', error);
      toast.error('Error creating stock batch. Please try again.');
    }
  };

  const handleEditProduct = (product: ProductSelection) => {
    seteditingProduct(product);
    setSelectedProducts(selectedProducts.filter((selectProduct) => selectProduct.id !== product.id));
  }


  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts])
  

  const totalItems = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
  const totalCost = selectedProducts.reduce((sum, product) => sum + product.totalCost, 0) + batchInfo.charges;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <CustomToast />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New Stock</h2>
          <p className="text-muted-foreground">
            Create a new stock batch by adding products and batch information
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/stock')}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedProducts.length === 0}
          >
            Create Stock Batch
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary/10 rounded-lg p-4 border">
          <div className="text-2xl font-bold text-primary">{selectedProducts.length}</div>
          <div className="text-sm text-muted-foreground">Product Types</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 border">
          <div className="text-2xl font-bold text-primary">{totalItems}</div>
          <div className="text-sm text-muted-foreground">Total Items</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 border">
          <div className="text-2xl font-bold text-primary">Rs. {totalCost.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Investment</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Batch Information */}
        <BatchInformationForm
          batchName={batchInfo.batchName}
          purchaseDate={batchInfo.purchaseDate}
          notes={batchInfo.notes}
          charges={batchInfo.charges}
          onBatchNameChange={(value) => setBatchInfo(prev => ({ ...prev, batchName: value }))}
          onPurchaseDateChange={(value) => setBatchInfo(prev => ({ ...prev, purchaseDate: value }))}
          onNotesChange={(value) => setBatchInfo(prev => ({ ...prev, notes: value }))}
          onChargesChange={(value) => setBatchInfo(prev => ({...prev , charges: value}))}
        />

        {/* Product Selector */}
        <ProductSelector setProduct={seteditingProduct} Product={editingProduct} onAddProduct={handleAddProduct} />

        {/* Selected Products */}
        <SelectedProductsList
          products={selectedProducts}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveProduct={handleRemoveProduct}
          onClearAll={handleClearAll}
          onEditProduct={handleEditProduct}
        />

        {/* Mobile Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 md:hidden">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => router.push('/stock')} type='button'>
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={selectedProducts.length === 0}
              onClick={handleSubmit}
            >
              Create Batch
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}