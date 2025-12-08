'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InventoryFilters as InventoryFilterComponent } from '@/types/inventory-reports';
import { categories } from '@/lib/inventory-reports-data';

interface InventoryFiltersProps {
  filters: InventoryFilterComponent;
  onFiltersChange: (filters: InventoryFilterComponent) => void;
  onExport: () => void;
}

export function InventoryFilters({ filters, onFiltersChange, onExport }: InventoryFiltersProps) {
  const updateFilter = (key: keyof InventoryFilterComponent, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const periods = [
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last 1 Year' },
    { value: 'all', label: 'All Time' },
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'optimal', label: 'Optimal' },
    { value: 'low', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'overstock', label: 'Overstock' },
  ];

  const views = [
    { value: 'overview', label: 'Overview' },
    { value: 'levels', label: 'Stock Levels' },
    { value: 'turnover', label: 'Turnover Analysis' },
    { value: 'forecast', label: 'Demand Forecast' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Period Selector */}
        <div className="space-y-2">
          <Label htmlFor="period" className="text-sm">Time Period</Label>
          <Select
            value={filters.period}
            onValueChange={(value) => updateFilter('period', value)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value} className="text-sm">
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-sm">
                  {category === 'all' ? 'All Categories' : category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm">Stock Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value} className="text-sm">
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Selector */}
        <div className="space-y-2">
          <Label htmlFor="view" className="text-sm">View Type</Label>
          <Select
            value={filters.view}
            onValueChange={(value) => updateFilter('view', value)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              {views.map((view) => (
                <SelectItem key={view.value} value={view.value} className="text-sm">
                  {view.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Label className="text-sm invisible sm:visible">Actions</Label>
          <Button 
            variant="outline" 
            className="w-full text-sm" 
            onClick={onExport}
            size="sm"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Mobile-only reset button */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onFiltersChange({
          period: '30days',
          category: 'all',
          status: 'all',
          view: 'overview',
        })}
        className="sm:hidden text-muted-foreground self-start"
      >
        Reset Filters
      </Button>
    </div>
  );
}