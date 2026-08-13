"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { WelcomeToast } from "@/components/welcome-toast";

export default function Home() {
  const t = useTranslations('dashboard');
  const tOrders = useTranslations('orders');
  const tProducts = useTranslations('products');
  const tCustomers = useTranslations('customers');

  return (
    <div className="flex flex-col gap-8">
      <WelcomeToast />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-tour="stats-cards">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRevenue')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500 ريال</div>
            <p className="text-xs text-muted-foreground">
              {t('revenueComparison')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalOrders')}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              {t('newOrdersThisWeek')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalProducts')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              {t('lowStockProductsCount')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalCustomers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">
              {t('newCustomersThisMonth')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4" data-tour="recent-orders">
          <CardHeader>
            <CardTitle>{t('recentOrders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div className="flex flex-col">
                    <div className="font-medium">{t('orderNumberPrefix')} #{10001 + i}</div>
                    <div className="text-sm text-muted-foreground">{tCustomers('customerName')} {i + 1}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-medium">{(i + 1) * 100} ريال</div>
                    <div className="text-sm text-muted-foreground">{`${10 + i}/05/2023`}</div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${i % 3 === 0 ? 'bg-green-100 text-green-800' : i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {i % 3 === 0 ? tOrders('completed') : i % 3 === 1 ? tOrders('pending') : t('newOrder')}
                  </span>
                </div>
              ))}
              <div className="mt-4">
                <Link href="/orders">
                  <Button variant="outline" className="w-full">
                    <span>{t('viewAllOrders')}</span>
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3" data-tour="low-stock">
          <CardHeader>
            <CardTitle>{t('lowStockProducts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div className="flex flex-col">
                    <div className="font-medium">{tProducts('title')} {i + 1}</div>
                    <div className="text-sm text-muted-foreground">PRD-{1000 + i}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium">{i + 2} {t('remaining')}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    <span>{t('viewAllProducts')}</span>
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
