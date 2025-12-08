import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      title: 'New Sale',
      description: 'Record a new sale',
      href: '/sales/new',
      icon: '🛒',
      variant: 'default' as const,
    },
    {
      title: 'Add Stock',
      description: 'Add new inventory',
      href: '/stock/add',
      icon: '📦',
      variant: 'outline' as const,
    },
    {
      title: 'Add Product',
      description: 'Add new product type',
      href: '/products/add',
      icon: '➕',
      variant: 'outline' as const,
    },
    {
      title: 'View Reports',
      description: 'See detailed reports',
      href: '/reports',
      icon: '📊',
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button variant={action.variant} className="w-full h-16 flex flex-col gap-1">
                <span className="text-lg">{action.icon}</span>
                <span className="text-xs font-medium">{action.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}