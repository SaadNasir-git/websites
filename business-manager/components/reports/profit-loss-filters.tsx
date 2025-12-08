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
import { ProfitLossFilters as ProfitFiltersComponent } from '@/types/profit-loss';

interface ProfitLossFiltersProps {
  filters: ProfitFiltersComponent;
  onFiltersChange: (filters: ProfitFiltersComponent) => void;
  onExport: () => void;
}

export function ProfitLossFilters({ filters, onFiltersChange, onExport }: ProfitLossFiltersProps) {
  const updateFilter = (key: keyof ProfitFiltersComponent, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const periods = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last 1 Year' },
    { value: '2years', label: 'Last 2 Years' },
    { value: 'all', label: 'All Time' },
  ];

  const years = ['2023', '2022', '2021', '2020'];
  const views = [
    { value: 'overview', label: 'Overview' },
    { value: 'detailed', label: 'Detailed View' },
    { value: 'comparison', label: 'Year Comparison' },
  ];

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

        {/* Year Selector */}
        <div className="space-y-2">
          <Label htmlFor="year" className="text-sm">Year</Label>
          <Select
            value={filters.year}
            onValueChange={(value) => updateFilter('year', value)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year} className="text-sm">
                  {year}
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
          period: '1year',
          year: '2023',
          view: 'overview',
        })}
        className="sm:hidden text-muted-foreground self-start"
      >
        Reset Filters
      </Button>
    </div>
  );
}