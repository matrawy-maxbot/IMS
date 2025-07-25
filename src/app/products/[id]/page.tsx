"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Trash2, Package, BarChart, ShoppingCart, AlertTriangle, Tag, Truck, Clock } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  // في الواقع، ستقوم بجلب بيانات المنتج باستخدام معرف المنتج (id)
  // هذه بيانات تجريبية فقط
  const product = {
    id,
    name: "لابتوب HP ProBook",
    code: "PRD-" + id,
    description: "لابتوب HP ProBook بمعالج Intel Core i7، ذاكرة 16 جيجابايت، وقرص SSD سعة 512 جيجابايت. مثالي للاستخدام المكتبي والمهني.",
    price: 3500,
    cost: 2800,
    discount: 0,
    tax: 15,
    quantity: 25,
    minQuantity: 5,
    category: "إلكترونيات",
    brand: "HP",
    status: "متوفر",
    createdAt: "2023-01-15",
    updatedAt: "2023-06-10",
    salesHistory: [
      { month: "يناير", sales: 5 },
      { month: "فبراير", sales: 8 },
      { month: "مارس", sales: 12 },
      { month: "أبريل", sales: 10 },
      { month: "مايو", sales: 15 },
      { month: "يونيو", sales: 7 }
    ],
    relatedProducts: [
      { id: 101, name: "حقيبة لابتوب", price: 150 },
      { id: 102, name: "ماوس لاسلكي", price: 120 },
      { id: 103, name: "لوحة مفاتيح", price: 150 }
    ]
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/products">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">تفاصيل المنتج</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/products/${product.id}/edit`}>
            <Button className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              <span>تعديل</span>
            </Button>
          </Link>
          <Button variant="destructive" className="flex items-center gap-1">
            <Trash2 className="h-4 w-4" />
            <span>حذف</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex justify-center items-center bg-muted/20 rounded-lg p-6 h-[300px]">
                  <Package className="h-32 w-32 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-muted-foreground">{product.code}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(product.status)}`}></div>
                    <span>{product.status}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">السعر:</span>
                      <span className="font-bold">{product.price} ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">التكلفة:</span>
                      <span>{product.cost} ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">الربح:</span>
                      <span className="text-green-600">{product.price - product.cost} ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">نسبة الربح:</span>
                      <span className="text-green-600">{Math.round(((product.price - product.cost) / product.cost) * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">الكمية المتوفرة:</span>
                      <span className="font-bold">{product.quantity}</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-2">
                      <div 
                        className={`h-2 rounded-full ${product.quantity <= product.minQuantity ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min((product.quantity / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                    {product.quantity <= product.minQuantity && (
                      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>المخزون منخفض</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-2 flex flex-wrap gap-2">
                    <div className="bg-muted/50 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span>{product.category}</span>
                    </div>
                    <div className="bg-muted/50 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <span>{product.brand}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">وصف المنتج</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">مبيعات المنتج</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {product.salesHistory.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-primary rounded-t-sm" 
                        style={{ height: `${(item.sales / 15) * 150}px` }}
                      ></div>
                      <div className="text-xs mt-2 text-muted-foreground">{item.month}</div>
                      <div className="text-xs font-medium">{item.sales}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">معلومات إضافية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">تاريخ الإضافة:</span>
                  <span>{product.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">آخر تحديث:</span>
                  <span>{product.updatedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">الحد الأدنى للمخزون:</span>
                  <span>{product.minQuantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">إجمالي المبيعات:</span>
                  <span>{product.salesHistory.reduce((sum, item) => sum + item.sales, 0)} وحدة</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full flex items-center gap-1" variant="outline">
                <ShoppingCart className="h-4 w-4" />
                <span>إضافة للطلب</span>
              </Button>
              <Button className="w-full flex items-center gap-1" variant="outline">
                <Truck className="h-4 w-4" />
                <span>طلب مخزون إضافي</span>
              </Button>
              <Button className="w-full flex items-center gap-1" variant="outline">
                <BarChart className="h-4 w-4" />
                <span>عرض تقرير المبيعات</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">منتجات ذات صلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.relatedProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.price} ريال</div>
                    </div>
                    <Link href={`/products/${item.id}`}>
                      <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">آخر الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1001, date: "2023-06-10", customer: "محمد أحمد", quantity: 2 },
                  { id: 1002, date: "2023-06-05", customer: "سارة خالد", quantity: 1 },
                  { id: 1003, date: "2023-05-28", customer: "فهد عبدالله", quantity: 3 }
                ].map((order) => (
                  <div key={order.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">طلب #{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.date} • {order.customer} • {order.quantity} وحدة
                      </div>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "متوفر":
      return "bg-green-500";
    case "نفذت الكمية":
      return "bg-red-500";
    case "متوقف":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
}