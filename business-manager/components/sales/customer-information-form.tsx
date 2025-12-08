'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { recentCustomers } from '@/lib/sales-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as CalenderIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

interface CustomerInformationFormProps {
  customerName: string;
  platform: string;
  saleDate: string;
  shippingCost: number;
  discount: number;
  notes: string;
  onCustomerNameChange: (value: string) => void;
  onCustomerPhoneChange: (value: string) => void;
  onCustomerLocationChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onSaleDateChange: (value: string) => void;
  onShippingCostChange: (value: number) => void;
  onDiscountChange: (value: number) => void;
  onNotesChange: (value: string) => void;
}

export function CustomerInformationForm({
  customerName,
  platform,
  saleDate,
  shippingCost,
  discount,
  notes,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onCustomerLocationChange,
  onPlatformChange,
  onSaleDateChange,
  onShippingCostChange,
  onDiscountChange,
  onNotesChange,
}: CustomerInformationFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="border rounded-lg p-6 space-y-6 bg-muted/50">
      <h3 className="text-lg font-semibold">Customer & Sale Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name *</Label>
          <div className="relative">
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <Label htmlFor="platform">Platform *</Label>
          <Select value={platform} onValueChange={onPlatformChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sale Date */}
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date *</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <div>
                  {date?.toLocaleDateString()}
                </div>
                <CalenderIcon className='w-2 h-2' />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 w-fit">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <div className='mx-auto z-50'>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg"
                  required
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Shipping Cost */}
        <div className="space-y-2">
          <Label htmlFor="shippingCost">Shipping Cost (Rs.)</Label>
          <Input
            id="shippingCost"
            type="number"
            value={shippingCost}
            onChange={(e) => onShippingCostChange(Number(e.target.value))}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Order Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any special instructions, packaging requests, or notes about this sale..."
          rows={3}
        />
      </div>
    </div>
  );
}