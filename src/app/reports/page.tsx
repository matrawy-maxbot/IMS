"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Calendar, Filter, BarChart, LineChart, PieChart, TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function ReportsPage() {
  const t = useTranslations('reports');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{t('selectPeriod')}</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>{tCommon('filter')}</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{tCommon('export')}</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="sales" className="py-2">
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>{t('sales')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="py-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>{t('inventory')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="customers" className="py-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{t('customers')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="financial" className="py-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>{t('financial')}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* تقارير المبيعات */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('totalSales')}</CardTitle>
                <CardDescription>{t('last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount45231')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('trendingUp')} {t('percent125')} {t('fromLastMonth')}</span>
                </div>
                <div className="mt-4 h-[80px] w-full">
                  {/* رسم بياني للمبيعات */}
                  <div className="flex h-full items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-primary flex-1 rounded-sm" 
                        style={{ height: `${Math.round(10 + Math.random() * 90)}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('ordersCount')}</CardTitle>
                <CardDescription>{t('last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('count128')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('trendingUp')} {t('percent82')} {t('fromLastMonth')}</span>
                </div>
                <div className="mt-4 h-[80px] w-full">
                  {/* رسم بياني للطلبات */}
                  <div className="flex h-full items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-primary flex-1 rounded-sm" 
                        style={{ height: `${Math.round(10 + Math.random() * 90)}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('averageOrderValue')}</CardTitle>
                <CardDescription>{t('last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount353')}</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>{t('trendingDown')} {t('percent21')} {t('fromLastMonth')}</span>
                </div>
                <div className="mt-4 h-[80px] w-full">
                  {/* رسم بياني لمتوسط قيمة الطلب */}
                  <div className="flex h-full items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-primary flex-1 rounded-sm" 
                        style={{ height: `${Math.round(10 + Math.random() * 90)}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('monthlySalesAnalysis')}</CardTitle>
              <CardDescription>{t('monthlySalesAnalysisDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* رسم بياني للمبيعات الشهرية */}
                <div className="flex h-full items-end gap-2">
                  {[
                    { month: t('months.january'), current: 12500, previous: 10200 },
                    { month: t('months.february'), current: 15000, previous: 12800 },
                    { month: t('months.march'), current: 18200, previous: 15500 },
                    { month: t('months.april'), current: 22000, previous: 18000 },
                    { month: t('months.may'), current: 25500, previous: 21000 },
                    { month: t('months.june'), current: 28000, previous: 24500 },
                    { month: t('months.july'), current: 32000, previous: 27000 },
                    { month: t('months.august'), current: 35000, previous: 30000 },
                    { month: t('months.september'), current: 38000, previous: 33000 },
                    { month: t('months.october'), current: 42000, previous: 36000 },
                    { month: t('months.november'), current: 45000, previous: 39000 },
                    { month: t('months.december'), current: 50000, previous: 42000 }
                  ].map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 justify-center h-[250px] items-end">
                        <div 
                          className="w-1/3 bg-primary rounded-t-sm" 
                          style={{ height: `${(item.current / 50000) * 100}%` }}
                        ></div>
                        <div 
                          className="w-1/3 bg-muted rounded-t-sm" 
                          style={{ height: `${(item.previous / 50000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-primary"></div>
                  <span className="text-sm">{t('currentYear')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-muted"></div>
                  <span className="text-sm">{t('previousYear')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('topSellingProducts')}</CardTitle>
                <CardDescription>{t('last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('product')}</TableHead>
                      <TableHead>{t('quantity')}</TableHead>
                      <TableHead>{t('sales')}</TableHead>
                      <TableHead>{t('percentage')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: t('topProducts.hp'), quantity: 25, sales: 87500, percentage: 28 },
                      { name: t('topProducts.iphone'), quantity: 18, sales: 72000, percentage: 23 },
                      { name: t('topProducts.sony'), quantity: 42, sales: 37800, percentage: 12 },
                      { name: t('topProducts.samsung'), quantity: 30, sales: 30000, percentage: 10 },
                      { name: t('topProducts.lg'), quantity: 15, sales: 22500, percentage: 7 }
                    ].map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.sales} {t('currency')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-primary rounded-full" 
                                style={{ width: `${product.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{product.percentage}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('salesByCategory')}</CardTitle>
                <CardDescription>{t('last30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  {/* رسم بياني دائري للمبيعات حسب الفئة */}
                  <div className="relative h-[200px] w-[200px] rounded-full border-8 border-primary">
                    <div className="absolute inset-0 rounded-full border-8 border-t-muted border-r-muted border-primary border-l-primary" style={{ transform: 'rotate(45deg)' }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-t-muted border-primary border-b-primary border-l-muted" style={{ transform: 'rotate(135deg)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PieChart className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {[
                    { category: t('categories.electronics'), sales: 125000, percentage: 40, color: "bg-primary" },
                    { category: t('categories.homeAppliances'), sales: 78000, percentage: 25, color: "bg-blue-500" },
                    { category: t('categories.smartphones'), sales: 62500, percentage: 20, color: "bg-green-500" },
                    { category: t('categories.accessories'), sales: 46900, percentage: 15, color: "bg-yellow-500" }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${category.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>{category.category}</span>
                          <span>{category.percentage}%</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full mt-1">
                          <div 
                            className={`h-1 ${category.color} rounded-full`} 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تقارير المخزون */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('totalProducts')}</CardTitle>
                <CardDescription>{t('allProductsInInventory')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('count1254')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('newProductsThisMonthText', { count: 24 })}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('inventoryValue')}</CardTitle>
                <CardDescription>{t('inventoryValueDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount325750')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('trendingUp')} {t('percent52')} {t('fromLastMonth')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('lowStockProducts')}</CardTitle>
                <CardDescription>{t('needsReorder')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('count28')}</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('increaseFromLastMonthText', { count: 12 })}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('inventoryStatus')}</CardTitle>
              <CardDescription>{t('inventoryStatusDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                {/* رسم بياني دائري لحالة المخزون */}
                <div className="relative h-[200px] w-[200px] rounded-full border-8 border-primary">
                  <div className="absolute inset-0 rounded-full border-8 border-t-green-500 border-r-green-500 border-primary border-l-primary" style={{ transform: 'rotate(115deg)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-t-yellow-500 border-primary border-b-primary border-l-yellow-500" style={{ transform: 'rotate(205deg)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-t-red-500 border-primary border-b-red-500 border-l-primary" style={{ transform: 'rotate(335deg)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                {[
                  { status: t('stockStatus.sufficient'), count: 950, percentage: 75, color: "bg-green-500" },
                  { status: t('stockStatus.medium'), count: 276, percentage: 22, color: "bg-yellow-500" },
                  { status: t('stockStatus.low'), count: 28, percentage: 3, color: "bg-red-500" }
                ].map((status, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-sm ${status.color}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span>{status.status}</span>
                        <span>{t('productCountText', { count: status.count, percentage: status.percentage })}</span>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full mt-1">
                        <div 
                          className={`h-1 ${status.color} rounded-full`} 
                          style={{ width: `${status.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('lowStockProducts')}</CardTitle>
              <CardDescription>{t('productsNeedingReorder')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('product')}</TableHead>
                    <TableHead>{t('currentQuantity')}</TableHead>
                    <TableHead>{t('minimumLevel')}</TableHead>
                    <TableHead>{tCommon('status')}</TableHead>
                    <TableHead>{t('lastOrderDate')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: t('lowStockProductsNames.hp'), current: 3, min: 5, status: t('stockStatus.low'), lastOrder: "2023-05-15" },
                    { name: t('lowStockProductsNames.iphone'), current: 2, min: 10, status: t('stockStatus.veryLow'), lastOrder: "2023-06-02" },
                    { name: t('lowStockProductsNames.sony'), current: 4, min: 8, status: t('stockStatus.low'), lastOrder: "2023-05-20" },
                    { name: t('lowStockProductsNames.samsung'), current: 6, min: 10, status: t('stockStatus.low'), lastOrder: "2023-06-10" },
                    { name: t('lowStockProductsNames.lg'), current: 1, min: 5, status: t('stockStatus.veryLow'), lastOrder: "2023-05-25" }
                  ].map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.current}</TableCell>
                      <TableCell>{product.min}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-block ${product.status === t('stockStatus.veryLow') ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {product.status}
                        </div>
                      </TableCell>
                      <TableCell>{product.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تقارير العملاء */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('totalCustomers')}</CardTitle>
                <CardDescription>{t('allRegisteredCustomers')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('count1842')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('newCustomersThisMonthText', { count: 56 })}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('averageCustomerValue')}</CardTitle>
                <CardDescription>{t('averageCustomerValueDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount1250')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('trendingUp')} {t('percent85')} {t('fromLastMonth')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('customerRetentionRate')}</CardTitle>
                <CardDescription>{t('repeatCustomerPercentage')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('percent78')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('trendingUp')} {t('percent23')} {t('fromLastMonth')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('topCustomers')}</CardTitle>
              <CardDescription>{t('topCustomersDescText', { period: 12 })}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('customer')}</TableHead>
                    <TableHead>{t('orderCount')}</TableHead>
                    <TableHead>{t('totalPurchases')}</TableHead>
                    <TableHead>{t('lastOrder')}</TableHead>
                    <TableHead>{t('customerStatus')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: t('topCustomersNames.customer1'), orders: 24, total: 45000, lastOrder: "2023-06-10", status: t('status.active') },
                    { name: t('topCustomersNames.customer2'), orders: 18, total: 38500, lastOrder: "2023-06-05", status: t('status.active') },
                    { name: t('topCustomersNames.customer3'), orders: 15, total: 32000, lastOrder: "2023-05-28", status: t('status.active') },
                    { name: t('topCustomersNames.customer4'), orders: 12, total: 28500, lastOrder: "2023-06-12", status: t('status.active') },
                    { name: t('topCustomersNames.customer5'), orders: 10, total: 22000, lastOrder: "2023-05-15", status: t('status.inactive') }
                  ].map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.total} {t('currency')}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-block ${customer.status === t('status.active') ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {customer.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('customerDistributionByType')}</CardTitle>
                <CardDescription>{t('customerClassification')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  {/* رسم بياني دائري لتوزيع العملاء */}
                  <div className="relative h-[200px] w-[200px] rounded-full border-8 border-primary">
                    <div className="absolute inset-0 rounded-full border-8 border-t-blue-500 border-r-blue-500 border-primary border-l-primary" style={{ transform: 'rotate(145deg)' }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-t-green-500 border-primary border-b-primary border-l-green-500" style={{ transform: 'rotate(255deg)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {[
                    { type: t('customerType.individual'), count: 1250, percentage: 68, color: "bg-primary" },
                    { type: t('customerType.company'), count: 450, percentage: 24, color: "bg-blue-500" },
                    { type: t('customerType.government'), count: 142, percentage: 8, color: "bg-green-500" }
                  ].map((type, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${type.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>{type.type}</span>
                          <span>{type.count} ({type.percentage}%)</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full mt-1">
                          <div 
                            className={`h-1 ${type.color} rounded-full`} 
                            style={{ width: `${type.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('customerGrowth')}</CardTitle>
                <CardDescription>{t('newCustomersMonthly')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* رسم بياني لنمو العملاء */}
                  <div className="flex h-full items-end gap-2">
                    {[
                      { month: t('months.january'), count: 35 },
                      { month: t('months.february'), count: 42 },
                      { month: t('months.march'), count: 38 },
                      { month: t('months.april'), count: 45 },
                      { month: t('months.may'), count: 50 },
                      { month: t('months.june'), count: 56 }
                    ].map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-primary rounded-t-sm" 
                          style={{ height: `${(item.count / 60) * 100}%` }}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-2">{item.month}</div>
                        <div className="text-xs font-medium">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التقارير المالية */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('totalRevenue')}</CardTitle>
                <CardDescription>{t('last12Months')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount542850')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('percentIncrease152')} {t('fromLastYear')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('totalCosts')}</CardTitle>
                <CardDescription>{t('last12Months')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount325710')}</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('percentIncrease87')} {t('fromLastYear')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t('netProfit')}</CardTitle>
                <CardDescription>{t('last12Months')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('amount217140')}</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{t('percentIncrease258')} {t('fromLastYear')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('revenueAndCostsAnalysis')}</CardTitle>
              <CardDescription>{t('monthlyRevenueAndCostsComparison')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* رسم بياني للإيرادات والتكاليف */}
                <div className="flex h-full items-end gap-2">
                  {[
                    { month: t('months.january'), revenue: 35000, cost: 21000, profit: 14000 },
                    { month: t('months.february'), revenue: 42000, cost: 25200, profit: 16800 },
                    { month: t('months.march'), revenue: 38000, cost: 22800, profit: 15200 },
                    { month: t('months.april'), revenue: 45000, cost: 27000, profit: 18000 },
                    { month: t('months.may'), revenue: 50000, cost: 30000, profit: 20000 },
                    { month: t('months.june'), revenue: 56000, cost: 33600, profit: 22400 }
                  ].map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 justify-center h-[250px] items-end">
                        <div 
                          className="w-1/4 bg-primary rounded-t-sm" 
                          style={{ height: `${(item.revenue / 60000) * 100}%` }}
                        ></div>
                        <div 
                          className="w-1/4 bg-red-500 rounded-t-sm" 
                          style={{ height: `${(item.cost / 60000) * 100}%` }}
                        ></div>
                        <div 
                          className="w-1/4 bg-green-500 rounded-t-sm" 
                          style={{ height: `${(item.profit / 60000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-primary"></div>
                  <span className="text-sm">{t('revenue')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-red-500"></div>
                  <span className="text-sm">{t('costs')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                  <span className="text-sm">{t('profit')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('profitMargin')}</CardTitle>
                <CardDescription>{t('profitMarginDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative h-[150px] w-[150px] rounded-full border-[16px] border-muted">
                    <div 
                      className="absolute inset-0 rounded-full border-[16px] border-t-primary border-r-primary border-muted border-l-muted" 
                      style={{ transform: 'rotate(140deg)' }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">40%</div>
                        <div className="text-xs text-muted-foreground">{t('profitMargin')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>{t('totalRevenue')}:</span>
                    <span className="font-medium">{t('amount542850')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('totalCosts')}:</span>
                    <span className="font-medium">{t('amount325710')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('netProfit')}:</span>
                    <span className="font-medium">{t('amount217140')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('costDistribution')}</CardTitle>
                <CardDescription>{t('costDistributionDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  {/* رسم بياني دائري لتوزيع التكاليف */}
                  <div className="relative h-[150px] w-[150px] rounded-full border-8 border-primary">
                    <div className="absolute inset-0 rounded-full border-8 border-t-blue-500 border-r-blue-500 border-primary border-l-primary" style={{ transform: 'rotate(125deg)' }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-t-green-500 border-primary border-b-primary border-l-green-500" style={{ transform: 'rotate(225deg)' }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-t-yellow-500 border-primary border-b-yellow-500 border-l-primary" style={{ transform: 'rotate(315deg)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {[
                    { type: t('costType.productCost'), amount: 227997, percentage: 70, color: "bg-primary" },
                    { type: t('costType.operatingCosts'), amount: 65142, percentage: 20, color: "bg-blue-500" },
                    { type: t('costType.shippingCosts'), amount: 16285.5, percentage: 5, color: "bg-green-500" },
                    { type: t('costType.otherCosts'), amount: 16285.5, percentage: 5, color: "bg-yellow-500" }
                  ].map((cost, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${cost.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>{cost.type}</span>
                          <span>{cost.percentage}%</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full mt-1">
                          <div 
                            className={`h-1 ${cost.color} rounded-full`} 
                            style={{ width: `${cost.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}