'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReportFilters as ReportFiltersComponent } from '@/types/reports';
import { periods } from '@/lib/reports-data';

interface ReportFiltersProps {
  filters: ReportFiltersComponent;
  onFiltersChange: (filters: ReportFiltersComponent) => void;
  onExport: () => void;
}

export function ReportFilters({ filters, onFiltersChange, onExport }: ReportFiltersProps) {
  const updateFilter = (key: keyof ReportFiltersComponent, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateDateRange = (key: 'from' | 'to', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters.dateRange, [key]: value }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Period Selector */}
        <div className="space-y-2">
          <Label htmlFor="period" className="text-sm">Time Period</Label>
          <Select
            value={filters.period}
            onValueChange={(value) => updateFilter('period', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range - From */}
        <div className="space-y-2">
          <Label htmlFor="dateFrom" className="text-sm">From Date</Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateRange.from}
            onChange={(e) => updateDateRange('from', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Date Range - To */}
        <div className="space-y-2">
          <Label htmlFor="dateTo" className="text-sm">To Date</Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateRange.to}
            onChange={(e) => updateDateRange('to', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="laptop-bags">Laptop Bags</SelectItem>
              <SelectItem value="handbags">Handbags</SelectItem>
              <SelectItem value="backpacks">Backpacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onExport}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Export Excel
          </Button>
        </div>

        {/* Optional: Add a reset filters button for mobile */}
        <Button
          variant="ghost"
          size="sm"
          className="sm:hidden text-muted-foreground"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}