'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Package } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { mainNav, userNav } from '@/config/navigation';

// Define proper types for navigation items
interface NavItem {
  href: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
  items?: NavItem[];
}

interface ListItemProps {
  className?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  href: string;
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 px-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetTitle>
            </SheetTitle>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] px-6 py-4 overflow-auto">
              <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
            </SheetContent>
          </Sheet>

          <Link href="/" className="sm:flex items-center space-x-2 hidden">
            <Package className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Business
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNav.map((item: NavItem) => (
                <NavigationMenuItem key={item.href}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger className='bg-transparent'>
                        {item.icon && <span className='mr-2'>{item.icon}</span>}
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem: NavItem) => (
                            <ListItem
                              key={subItem.href}
                              href={subItem.href}
                              title={
                                <div className="flex items-center">
                                  {subItem.icon && (
                                    <span className="mr-2">{subItem.icon}</span>
                                  )}
                                  {subItem.title}
                                </div>
                              }
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                          pathname === item.href
                            ? 'bg-accent text-accent-foreground'
                            : 'transparent'
                        )}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-primary-foreground">
                        A
                      </span>
                    </div>
                    <span className="ml-2 hidden md:inline">Admin</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[150px] gap-3 p-2">
                    {userNav.map((item: NavItem) => (
                      <ListItem
                        key={item.href}
                        href={item.href}
                        title={
                          <div className="flex items-center">
                            {item.icon && (
                              <span className="mr-2">{item.icon}</span>
                            )}
                            {item.title}
                          </div>
                        }
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}

// Fixed ListItem component with proper typing
const ListItem = React.forwardRef<
  HTMLAnchorElement,
  ListItemProps
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-transparent',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

// Mobile Navigation Component with props
interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 pt-6">
      <Link href="/" className="flex items-center space-x-2">
        <Package className="h-6 w-6" />
        <span className="font-bold">Business</span>
      </Link>

      <nav className="flex flex-col gap-6">
        {mainNav.map((item: NavItem, index: number) => (
          <div key={index} className="flex flex-col gap-3">
            <Link
              href={item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.title}
            </Link>

            {item.items && (
              <div className="ml-6 flex flex-col gap-2">
                {item.items.map((subItem: NavItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      'flex items-center text-sm transition-colors hover:text-primary',
                      pathname === subItem.href
                        ? 'text-foreground'
                        : 'text-foreground/60'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile User Menu */}
      <div className="flex flex-col gap-4 pt-6 border-t">
        {userNav.map((item: NavItem) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}