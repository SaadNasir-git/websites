import { MainNavItem } from '@/types/navigation';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Package, 
  Plus, 
  Eye, 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  BarChart3, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react'

export const mainNav: MainNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />, // Render as JSX element
  },
  {
    title: 'Products',
    href: '/products',
    icon: <ShoppingBag className="h-4 w-4" />, // Render as JSX element
  },
  {
    title: 'Stock',
    href: '/stock',
    icon: <Package className="h-4 w-4" />, // Render as JSX element
    items: [
      {
        title: 'Add New Stock',
        href: '/stock/add',
        icon: <Plus className="h-4 w-4" />, // Render as JSX element
      },
      {
        title: 'View Stock',
        href: '/stock',
        icon: <Eye className="h-4 w-4" />, // Render as JSX element
      },
      {
        title: 'Stock History',
        href: '/stock/history',
        icon: <BookOpen className="h-4 w-4" />, // Render as JSX element
      },
    ],
  },
  {
    title: 'Sales',
    href: '/sales',
    icon: <CreditCard className="h-4 w-4" />, // Render as JSX element
    items: [
      {
        title: 'New Sale',
        href: '/sales/new',
        icon: <Plus className="h-4 w-4" />, // Render as JSX element
      },
      {
        title: 'Sales History',
        href: '/sales',
        icon: <TrendingUp className="h-4 w-4" />, // Render as JSX element
      },
    ],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="h-4 w-4" />, // Render as JSX element
    items: [
      {
        title: 'Profit & Loss',
        href: '/reports/profit-loss',
        icon: <TrendingUp className="h-4 w-4" />, // Render as JSX element
      },
      {
        title: 'Inventory Report',
        href: '/reports/inventory',
        icon: <BarChart3 className="h-4 w-4" />, // Render as JSX element
      },
    ],
  },
];

export const userNav: MainNavItem[] = [
  {
    title: 'Profile',
    href: '/profile',
    icon: <User className="h-4 w-4" />, // Render as JSX element
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />, // Render as JSX element
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: <LogOut className="h-4 w-4" />, // Render as JSX element
  },
];