'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductSelector } from '@/components/sales/product-selector';
import { SelectedProductsList } from '@/components/sales/sale-items-list';
import { CustomerInformationForm } from '@/components/sales/customer-information-form';
import { SaleItem, SaleFormData } from '@/types/sales';
import { ProductSelection } from '@/types/stock';
import axios from 'axios';

export default function NewSalePage() {
  const router = useRouter();

  const [products, setProduct] = useState<SaleItem | null | undefined>()
  const [saleData, setSaleData] = useState<SaleFormData>({
    customerName: '',
    platform: 'whatsapp',
    saleDate: new Date().toISOString().split('T')[0],
    shippingCost: 0,
    discount: 0,
    notes: '',
    items: [],
  });

  const handleEditItem = (Item: SaleItem) => {
    setProduct(Item)
  }

  const handleAddItem = (newItem: SaleItem) => {
    setSaleData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setSaleData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? {
            ...item,
            quantity: newQuantity,
            totalAmount: item.sellingPrice * newQuantity,
            // profit: (item.sellingPrice - item.costPrice) * newQuantity,
          }
          : item
      )
    }));
  };

  const handleUpdatePrice = (itemId: number, newPrice: number) => {
    setSaleData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? {
            ...item,
            sellingPrice: newPrice,
            totalAmount: newPrice * item.quantity,
            // profit: (newPrice - item.costPrice) * item.quantity,
          }
          : item
      )
    }));
  };

  const handleRemoveItem = (itemId: number) => {
    setSaleData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleClearAll = () => {
    setSaleData(prev => ({ ...prev, items: [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!saleData.customerName) {
      alert('Please fill in all required customer information');
      return;
    }

    if (saleData.items.length === 0) {
      alert('Please add at least one item to the sale');
      return;
    }

    // Calculate totals
    const subtotal = saleData.items.reduce((sum, item) => sum + item.totalAmount, 0);
    const totalAmount = subtotal + saleData.shippingCost - saleData.discount;
    // const totalProfit = saleData.items.reduce((sum, item) => sum + item.profit, 0) - saleData.shippingCost;

    const saleRecord = {
      ...saleData,
      subtotal,
      totalAmount,
      // totalProfit,
    };

    // Here you would typically send the data to your API
    console.log('Creating new sale:', saleRecord);

    // Simulate API call
    try {
      await axios.post('/api/sales/add' , {saleRecord});

      // Show success message and redirect
      alert('Sale created successfully!');
      // router.push('/sales');
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Error creating sale. Please try again.');
    }
  };

  const subtotal = saleData.items.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalAmount = subtotal + saleData.shippingCost - saleData.discount;
  // const totalProfit = saleData.items.reduce((sum, item) => sum + item.profit, 0) - saleData.shippingCost;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">New Sale</h2>
          <p className="text-muted-foreground">
            Create a new sale order for your customer
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/sales')}
            type='button'
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saleData.items.length === 0}
          >
            Complete Sale
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary/10 rounded-lg p-4 border">
          <div className="text-2xl font-bold text-primary">{saleData.items.length}</div>
          <div className="text-sm text-muted-foreground">Items in Sale</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 border">
          <div className="text-2xl font-bold text-primary">Rs. {subtotal.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Subtotal</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 border">
          <div className="text-2xl font-bold text-primary">Rs. {totalAmount.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Amount</div>
        </div>
        {/* <div className="bg-primary/10 rounded-lg p-4 border">
          <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
            Rs. {totalProfit.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Net Profit</div>
        </div> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-10">
        {/* Customer Information */}
        <CustomerInformationForm
          customerName={saleData.customerName}
          platform={saleData.platform}
          saleDate={saleData.saleDate}
          shippingCost={saleData.shippingCost}
          discount={saleData.discount}
          notes={saleData.notes}
          onCustomerNameChange={(value) => setSaleData(prev => ({ ...prev, customerName: value }))}
          onCustomerPhoneChange={(value) => setSaleData(prev => ({ ...prev, customerPhone: value }))}
          onCustomerLocationChange={(value) => setSaleData(prev => ({ ...prev, customerLocation: value }))}
          onPlatformChange={(value) => setSaleData(prev => ({ ...prev, platform: value as any }))}
          onSaleDateChange={(value) => setSaleData(prev => ({ ...prev, saleDate: value }))}
          onShippingCostChange={(value) => setSaleData(prev => ({ ...prev, shippingCost: value }))}
          onDiscountChange={(value) => setSaleData(prev => ({ ...prev, discount: value }))}
          onNotesChange={(value) => setSaleData(prev => ({ ...prev, notes: value }))}
        />

        {/* Product Selector */}
        <ProductSelector setProduct={setProduct} onAddProduct={handleAddItem} />

        {/* Sale Items */}
        <SelectedProductsList
          products={saleData.items}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveProduct={handleRemoveItem}
          onClearAll={handleClearAll}
          onEditProduct={handleEditItem}
        />

        {/* Final Calculation */}
        {saleData.items.length > 0 && (
          <div className="border rounded-lg p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Final Calculation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span>+ Rs. {saleData.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="text-red-600">- Rs. {saleData.discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-primary">Rs. {totalAmount.toLocaleString()}</span>
                </div>
              </div>
              {/* <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span>Rs. {saleData.items.reduce((sum, item) => sum + (item.costPrice * item.quantity), 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Profit:</span>
                  <span className="text-green-600">
                    Rs. {saleData.items.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span className="text-red-600">- Rs. {saleData.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Net Profit:</span>
                  <span className={totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                    Rs. {totalProfit.toLocaleString()}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        )}

        {/* Mobile Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 md:hidden">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => router.push('/sales')}
              type='button'
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={saleData.items.length === 0}
              onClick={handleSubmit}
            >
              Complete Sale
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}