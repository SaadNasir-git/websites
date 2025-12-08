import { ReactNode } from "react";

export interface NavItem {
  title: string;
  href: string;
  icon?: ReactNode;
  description?: string;
}

export interface MainNavItem extends NavItem {
  items?: NavItem[];
}