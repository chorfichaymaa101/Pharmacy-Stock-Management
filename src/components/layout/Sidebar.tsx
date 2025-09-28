import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Settings,
  FileText,
  Activity,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/', badge: null },
  { title: 'Medicines', icon: Pill, href: '/medicines', badge: null },
  { title: 'Stock Management', icon: Package, href: '/stock', badge: '3', badgeVariant: 'destructive' as const },
  { title: 'Suppliers', icon: Users, href: '/suppliers', badge: null },
  { title: 'Purchase Orders', icon: ShoppingCart, href: '/orders', badge: '2', badgeVariant: 'secondary' as const },
  { title: 'Sales', icon: TrendingUp, href: '/sales', badge: null },
  { title: 'Reports', icon: FileText, href: '/reports', badge: null },
  { title: 'Alerts', icon: AlertTriangle, href: '/alerts', badge: '5', badgeVariant: 'destructive' as const },
];

const bottomMenuItems = [
  { title: 'Activity Log', icon: Activity, href: '/activity' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
<aside
  className={cn(
    'fixed left-0 z-50 w-64 bg-card border-r shadow-elevated transform transition-transform duration-300 ease-in-out',
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'top-18 h-[calc(100vh-4rem)] md:translate-x-0 md:fixed md:top-18 md:h-[calc(100vh-4rem)] md:shadow-none'
  )}
>
        <div className="flex flex-col h-full">
          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => window.innerWidth < 768 && onClose()}
                  className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-medical' // gradient for active item
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )
                }

              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="px-4 py-4 border-t space-y-2">
            {bottomMenuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-medical' // gradient for active item
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )
                }

              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
