'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Calendar as CalenderIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BatchInformationFormProps {
  batchName: string;
  purchaseDate: string;
  notes: string;
  charges: number;
  onBatchNameChange: (value: string) => void;
  onPurchaseDateChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onChargesChange: (Value: number) => void;
}

export function BatchInformationForm({
  batchName,
  notes,
  onBatchNameChange,
  charges,
  onNotesChange,
  purchaseDate,
  onPurchaseDateChange,
  onChargesChange
}: BatchInformationFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [suggestedBatchName, setSuggestedBatchName] = useState<string>('');

  useEffect(() => {
    const suggested = `Batch-${date?.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    setSuggestedBatchName(suggested);
    if (date) {
      onPurchaseDateChange(date.toISOString().split('T')[0]);
    }
  }, [date]);

  return (
    <div className="border rounded-lg p-6 space-y-6 bg-muted/50">
      <h3 className="text-lg font-semibold">Batch Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Batch Name */}
        <div className="space-y-2">
          <Label htmlFor="batchName">Batch Name *</Label>
          <Input
            id="batchName"
            value={batchName}
            onChange={(e) => onBatchNameChange(e.target.value)}
            placeholder="e.g., Dec-2023-Import"
            required
          />
          {suggestedBatchName && (
            <p className="text-xs text-muted-foreground">
              Suggested: <button
                type="button"
                className="hover:underline"
                onClick={() => onBatchNameChange(suggestedBatchName)}
              >
                {suggestedBatchName}
              </button>
            </p>
          )}
        </div>

        {/* Purchase Date */}
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

        {/* Additional Charges */}
        <div className='space-y-2'>
          <Label htmlFor='charges'>Addtional charges</Label>
          <Input
           id='charges'
           value={charges}
           type='number'
           min={0}
           onChange={(e) => onChargesChange(Number(e.target.value))}
          />
        <p className='text-xs text-muted-foreground'>
          Addtional charges you have paid like shipping cost
        </p>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any additional notes about this stock batch (shipping details, quality notes, etc.)..."
          rows={3}
        />
      </div>
    </div>
  );
}