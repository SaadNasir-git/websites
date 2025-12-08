'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SalesFilters as SalesFilterComponent } from '@/types/sales';

interface SalesFiltersProps {
  filters: SalesFilterComponent;
  onFiltersChange: (filters: SalesFilterComponent) => void;
  onReset: () => void;
}

export function SalesFilters({ filters, onFiltersChange, onReset }: SalesFiltersProps) {
  const updateFilter = (key: keyof SalesFilterComponent, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateDateRange = (key: 'from' | 'to', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters.dateRange, [key]: value }
    });
  };

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
      <h3 className="text-lg font-semibold">Filter Sales</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Date Range - From */}
        <div className="space-y-2">
          <Label htmlFor="dateFrom">From Date</Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateRange.from}
            onChange={(e) => updateDateRange('from', e.target.value)}
          />
        </div>

        {/* Date Range - To */}
        <div className="space-y-2">
          <Label htmlFor="dateTo">To Date</Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateRange.to}
            onChange={(e) => updateDateRange('to', e.target.value)}
          />
        </div>

        {/* Platform Filter */}
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={filters.platform}
            onValueChange={(value) => updateFilter('platform', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search customers, products, or notes..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}