"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  PlusCircle,
  LayoutDashboard,
  BarChart,
  Settings,
  HelpCircle,
  ArrowRightLeft,
  FileText,
  Warehouse,
  ChevronDown,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { useWarehouse } from '@/contexts/warehouse-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');
  const locale = useLocale();
  const { warehouses, selectedWarehouse, setSelectedWarehouse } = useWarehouse();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mainRoutes = [
    {
      href: '/',
      icon: LayoutDashboard,
      title: t('dashboard'),
      section: 'main',
      dataTour: 'dashboard'
    },
    {
      href: '/add-order',
      icon: PlusCircle,
      title: t('addOrder'),
      section: 'main',
      dataTour: 'add-order-btn'
    },
    {
      href: '/products',
      icon: Package,
      title: t('products'),
      section: 'main',
      dataTour: 'products'
    },
    {
      href: '/orders',
      icon: ShoppingCart,
      title: t('orders'),
      section: 'main',
      dataTour: 'orders'
    },
    {
      href: '/customers',
      icon: Users,
      title: t('customers'),
      section: 'main',
      dataTour: 'customers'
    },
  ];

  const orderRoutes = [
    {
      href: '/transactions',
      icon: ArrowRightLeft,
      title: t('transactions'),
      section: 'order'
    },
    {
      href: '/audit-log',
      icon: FileText,
      title: t('auditLog'),
      section: 'order'
    },
    {
      href: '/reports',
      icon: BarChart,
      title: t('reports'),
      section: 'order',
      dataTour: 'reports'
    },
    {
      href: '/warehouses',
      icon: Warehouse,
      title: t('warehouses'),
      section: 'order'
    }
  ];

  const settingsRoutes = [
    {
      href: '/settings',
      icon: Settings,
      title: t('settings'),
      dataTour: 'settings'
    },
    {
      href: '/help',
      icon: HelpCircle,
      title: t('help')
    }
  ];

  return (
    <div className={cn("h-full flex flex-col bg-background", className)} data-tour="sidebar" {...props}>
      {/* Warehouse Selector - في الأعلى */}
      <div className="px-3 pt-4 pb-6">
        {mounted && selectedWarehouse && (
          <Select 
            value={selectedWarehouse.id} 
            dir={locale === 'en' ? "ltr" : "rtl"}
            onValueChange={(value) => {
              const warehouse = warehouses.find((w) => w.id === value);
              if (warehouse) {
                setSelectedWarehouse(warehouse);
              }
            }}
          >
            <SelectTrigger className="w-full h-auto px-3 py-2.5 bg-transparent hover:bg-muted/50 border-0 rounded-lg transition-all group focus:ring-0 focus:ring-offset-0">
              <div className="flex items-center gap-3 w-full">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/15 group-hover:to-primary/10 transition-all">
                  <Warehouse className="h-[18px] w-[18px] text-primary" strokeWidth={2} />
                </div>
                <div className="flex-1 text-start overflow-hidden min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    <SelectValue />
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t('currentWarehouse')}
                  </div>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent className="w-[--radix-select-trigger-width]" dir={locale === 'en' ? "ltr" : "rtl"}>
              <div className="py-1.5">
                {warehouses.map((warehouse) => (
                  <SelectItem 
                    key={warehouse.id} 
                    value={warehouse.id}
                    className="cursor-pointer py-2.5 px-3"
                  >
                    {warehouse.name}
                  </SelectItem>
                ))}
              </div>
              <div className="border-t mx-2 my-1.5"></div>
              <Link href="/warehouses" className="block px-2 pb-1.5">
                <div className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2.5 px-2 text-sm outline-none hover:bg-accent transition-colors">
                  <div className="flex items-center gap-2.5 text-primary font-medium">
                    <Settings className="h-4 w-4" />
                    <span>{t('manageWarehouses')}</span>
                  </div>
                </div>
              </Link>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-2">
        {/* MAIN Section */}
        <div className="mb-6">
          <h3 className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            MAIN
          </h3>
          <div className="space-y-0.5">
            {mainRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                data-tour={route.dataTour}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-all",
                  pathname === route.href
                    ? "bg-muted/80 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <route.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{route.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ORDER Section */}
        <div className="mb-6">
          <h3 className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            ORDER
          </h3>
          <div className="space-y-0.5">
            {orderRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                data-tour={route.dataTour}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-all",
                  pathname === route.href
                    ? "bg-muted/80 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <route.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{route.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* SETTINGS Section */}
        <div>
          <h3 className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            SETTINGS
          </h3>
          <div className="space-y-0.5">
            {settingsRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                data-tour={route.dataTour}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-all",
                  pathname === route.href
                    ? "bg-muted/80 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <route.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{route.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="px-3 py-4 border-t border-[#121d2f12] dark:border-[#97beff12]">
        <a 
          href="https://nixt.work/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors group"
        >
          <p className="font-medium group-hover:underline">© {new Date().getFullYear()} NIXT</p>
          <p className="mt-1">{t('allRightsReserved')}</p>
        </a>
      </div>
    </div>
  );
}