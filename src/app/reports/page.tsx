"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Calendar, Filter, BarChart, LineChart, PieChart, TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">التقارير والإحصائيات</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>تحديد الفترة</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>تصفية</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>تصدير</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="sales" className="py-2">
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>المبيعات</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="py-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>المخزون</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="customers" className="py-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>العملاء</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="financial" className="py-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>المالية</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* تقارير المبيعات */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231 ريال</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12.5% من الشهر الماضي</span>
                </div>
                <div className="mt-4 h-[80px] w-full">
                  {/* رسم بياني للمبيعات */}
                  <div className="flex h-full items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-primary flex-1 rounded-sm" 
                        style={{ height: `${10 + Math.random() * 90}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">عدد الطلبات</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+8.2% من الشهر الماضي</span>
                </div>
                <div className="mt-4 h-[80px] w-full">
                  {/* رسم بياني للطلبات */}
                  <div className="flex h-full items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-primary flex-1 rounded-sm" 
                        style={{ height: `${10 + Math.random() * 90}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">متوسط قيمة الطلب</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">353 ريال</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>-2.1% من الشهر الماضي</span>
                </div>
                <div className="mt-4 h-[80px] w-full">
                  {/* رسم بياني لمتوسط قيمة الطلب */}
                  <div className="flex h-full items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-primary flex-1 rounded-sm" 
                        style={{ height: `${10 + Math.random() * 90}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليل المبيعات الشهرية</CardTitle>
              <CardDescription>مقارنة المبيعات الشهرية للعام الحالي مع العام السابق</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* رسم بياني للمبيعات الشهرية */}
                <div className="flex h-full items-end gap-2">
                  {[
                    { month: "يناير", current: 12500, previous: 10200 },
                    { month: "فبراير", current: 15000, previous: 12800 },
                    { month: "مارس", current: 18200, previous: 15500 },
                    { month: "أبريل", current: 22000, previous: 18000 },
                    { month: "مايو", current: 25500, previous: 21000 },
                    { month: "يونيو", current: 28000, previous: 24500 },
                    { month: "يوليو", current: 32000, previous: 27000 },
                    { month: "أغسطس", current: 35000, previous: 30000 },
                    { month: "سبتمبر", current: 38000, previous: 33000 },
                    { month: "أكتوبر", current: 42000, previous: 36000 },
                    { month: "نوفمبر", current: 45000, previous: 39000 },
                    { month: "ديسمبر", current: 50000, previous: 42000 }
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
                  <span className="text-sm">2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-muted"></div>
                  <span className="text-sm">2022</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>المبيعات</TableHead>
                      <TableHead>النسبة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "لابتوب HP ProBook", quantity: 25, sales: 87500, percentage: 28 },
                      { name: "آيفون 13 برو", quantity: 18, sales: 72000, percentage: 23 },
                      { name: "سماعات سوني", quantity: 42, sales: 37800, percentage: 12 },
                      { name: "ساعة سامسونج", quantity: 30, sales: 30000, percentage: 10 },
                      { name: "شاشة LG", quantity: 15, sales: 22500, percentage: 7 }
                    ].map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.sales} ريال</TableCell>
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
                <CardTitle>المبيعات حسب الفئة</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
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
                    { category: "إلكترونيات", sales: 125000, percentage: 40, color: "bg-primary" },
                    { category: "أجهزة منزلية", sales: 78000, percentage: 25, color: "bg-blue-500" },
                    { category: "هواتف ذكية", sales: 62500, percentage: 20, color: "bg-green-500" },
                    { category: "إكسسوارات", sales: 46900, percentage: 15, color: "bg-yellow-500" }
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
                <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
                <CardDescription>جميع المنتجات في المخزون</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,254</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+24 منتج جديد هذا الشهر</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">قيمة المخزون</CardTitle>
                <CardDescription>القيمة الإجمالية للمخزون</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">325,750 ريال</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+5.2% من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">منتجات منخفضة المخزون</CardTitle>
                <CardDescription>تحتاج إلى إعادة الطلب</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12 من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>حالة المخزون</CardTitle>
              <CardDescription>توزيع المنتجات حسب حالة المخزون</CardDescription>
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
                  { status: "مخزون كافي", count: 950, percentage: 75, color: "bg-green-500" },
                  { status: "مخزون متوسط", count: 276, percentage: 22, color: "bg-yellow-500" },
                  { status: "مخزون منخفض", count: 28, percentage: 3, color: "bg-red-500" }
                ].map((status, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-sm ${status.color}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span>{status.status}</span>
                        <span>{status.count} منتج ({status.percentage}%)</span>
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
              <CardTitle>المنتجات منخفضة المخزون</CardTitle>
              <CardDescription>المنتجات التي تحتاج إلى إعادة الطلب</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الكمية الحالية</TableHead>
                    <TableHead>الحد الأدنى</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر طلب</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "لابتوب HP ProBook", current: 3, min: 5, status: "منخفض", lastOrder: "2023-05-15" },
                    { name: "آيفون 13 برو", current: 2, min: 10, status: "منخفض جداً", lastOrder: "2023-06-02" },
                    { name: "سماعات سوني", current: 4, min: 8, status: "منخفض", lastOrder: "2023-05-20" },
                    { name: "ساعة سامسونج", current: 6, min: 10, status: "منخفض", lastOrder: "2023-06-10" },
                    { name: "شاشة LG", current: 1, min: 5, status: "منخفض جداً", lastOrder: "2023-05-25" }
                  ].map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.current}</TableCell>
                      <TableCell>{product.min}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-block ${product.status === "منخفض جداً" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
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
                <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
                <CardDescription>جميع العملاء المسجلين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,842</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+56 عميل جديد هذا الشهر</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">متوسط قيمة العميل</CardTitle>
                <CardDescription>متوسط المشتريات لكل عميل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250 ريال</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+8.5% من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">معدل الاحتفاظ بالعملاء</CardTitle>
                <CardDescription>نسبة العملاء المتكررين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+2.3% من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>أفضل العملاء</CardTitle>
              <CardDescription>العملاء الأكثر إنفاقاً في آخر 12 شهر</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>عدد الطلبات</TableHead>
                    <TableHead>إجمالي المشتريات</TableHead>
                    <TableHead>آخر طلب</TableHead>
                    <TableHead>حالة العميل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "محمد أحمد", orders: 24, total: 45000, lastOrder: "2023-06-10", status: "نشط" },
                    { name: "شركة الأفق", orders: 18, total: 38500, lastOrder: "2023-06-05", status: "نشط" },
                    { name: "سارة خالد", orders: 15, total: 32000, lastOrder: "2023-05-28", status: "نشط" },
                    { name: "مؤسسة النور", orders: 12, total: 28500, lastOrder: "2023-06-12", status: "نشط" },
                    { name: "فهد عبدالله", orders: 10, total: 22000, lastOrder: "2023-05-15", status: "غير نشط" }
                  ].map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.total} ريال</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-block ${customer.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
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
                <CardTitle>توزيع العملاء حسب النوع</CardTitle>
                <CardDescription>تصنيف العملاء</CardDescription>
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
                    { type: "أفراد", count: 1250, percentage: 68, color: "bg-primary" },
                    { type: "شركات", count: 450, percentage: 24, color: "bg-blue-500" },
                    { type: "جهات حكومية", count: 142, percentage: 8, color: "bg-green-500" }
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
                <CardTitle>نمو العملاء</CardTitle>
                <CardDescription>عدد العملاء الجدد شهرياً</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* رسم بياني لنمو العملاء */}
                  <div className="flex h-full items-end gap-2">
                    {[
                      { month: "يناير", count: 35 },
                      { month: "فبراير", count: 42 },
                      { month: "مارس", count: 38 },
                      { month: "أبريل", count: 45 },
                      { month: "مايو", count: 50 },
                      { month: "يونيو", count: 56 }
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
                <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                <CardDescription>آخر 12 شهر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">542,850 ريال</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+15.2% من العام الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">إجمالي التكاليف</CardTitle>
                <CardDescription>آخر 12 شهر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">325,710 ريال</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+8.7% من العام الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">صافي الربح</CardTitle>
                <CardDescription>آخر 12 شهر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">217,140 ريال</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+25.8% من العام الماضي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليل الإيرادات والتكاليف</CardTitle>
              <CardDescription>مقارنة شهرية للإيرادات والتكاليف والأرباح</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* رسم بياني للإيرادات والتكاليف */}
                <div className="flex h-full items-end gap-2">
                  {[
                    { month: "يناير", revenue: 35000, cost: 21000, profit: 14000 },
                    { month: "فبراير", revenue: 42000, cost: 25200, profit: 16800 },
                    { month: "مارس", revenue: 38000, cost: 22800, profit: 15200 },
                    { month: "أبريل", revenue: 45000, cost: 27000, profit: 18000 },
                    { month: "مايو", revenue: 50000, cost: 30000, profit: 20000 },
                    { month: "يونيو", revenue: 56000, cost: 33600, profit: 22400 }
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
                  <span className="text-sm">الإيرادات</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-red-500"></div>
                  <span className="text-sm">التكاليف</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                  <span className="text-sm">الأرباح</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>هامش الربح</CardTitle>
                <CardDescription>نسبة الربح من الإيرادات</CardDescription>
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
                        <div className="text-xs text-muted-foreground">هامش الربح</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>إجمالي الإيرادات:</span>
                    <span className="font-medium">542,850 ريال</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>إجمالي التكاليف:</span>
                    <span className="font-medium">325,710 ريال</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>صافي الربح:</span>
                    <span className="font-medium">217,140 ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع التكاليف</CardTitle>
                <CardDescription>تحليل التكاليف حسب النوع</CardDescription>
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
                    { type: "تكلفة البضاعة", amount: 227997, percentage: 70, color: "bg-primary" },
                    { type: "تكاليف التشغيل", amount: 65142, percentage: 20, color: "bg-blue-500" },
                    { type: "تكاليف الشحن", amount: 16285.5, percentage: 5, color: "bg-green-500" },
                    { type: "تكاليف أخرى", amount: 16285.5, percentage: 5, color: "bg-yellow-500" }
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