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
  FileText
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');

  const routes = [
    {
      href: '/',
      icon: LayoutDashboard,
      title: t('dashboard')
    },
    {
      href: '/add-order',
      icon: PlusCircle,
      title: t('addOrder')
    },
    {
      href: '/products',
      icon: Package,
      title: t('products')
    },
    {
      href: '/orders',
      icon: ShoppingCart,
      title: t('orders')
    },
    {
      href: '/customers',
      icon: Users,
      title: t('customers')
    },
    {
      href: '/transactions',
      icon: ArrowRightLeft,
      title: t('transactions')
    },
    {
      href: '/audit-log',
      icon: FileText,
      title: t('auditLog')
    },
    {
      href: '/reports',
      icon: BarChart,
      title: t('reports')
    },
    {
      href: '/settings',
      icon: Settings,
      title: t('settings')
    },
    {
      href: '/help',
      icon: HelpCircle,
      title: t('help')
    }
  ];

  return (
    <div className={cn("pb-12 h-full", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            {tHeader('appName')}
          </h2>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                  pathname === route.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-5 w-5" />
                <span>{route.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}