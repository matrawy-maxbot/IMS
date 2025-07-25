"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Printer, Download, Package, Edit, Trash2, Clock, CreditCard, Truck, User, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  // في الواقع، ستقوم بجلب بيانات الطلب باستخدام معرف الطلب (id)
  // هذه بيانات تجريبية فقط
  const order = {
    id,
    orderNumber: "ORD-" + id,
    date: "2023-06-15",
    status: "مكتمل",
    paymentMethod: "بطاقة ائتمان",
    shippingMethod: "شحن قياسي",
    customer: {
      name: "محمد أحمد",
      email: "mohammed@example.com",
      phone: "0512345678",
      address: "شارع الملك فهد، الرياض"
    },
    items: [
      { id: 1, name: "لابتوب HP", price: 3500, quantity: 1, discount: 0, total: 3500 },
      { id: 2, name: "ماوس لاسلكي", price: 120, quantity: 2, discount: 0, total: 240 },
      { id: 3, name: "لوحة مفاتيح", price: 150, quantity: 1, discount: 0, total: 150 }
    ],
    subtotal: 3890,
    tax: 583.5,
    shipping: 50,
    discount: 0,
    total: 4523.5
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/orders">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">تفاصيل الطلب #{order.orderNumber}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            <span>طباعة</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>تصدير PDF</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            <span>تعديل</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">المنتجات</CardTitle>
              <Link href={`/orders/${order.id}/edit`}>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  <span>تعديل المنتجات</span>
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">الصورة</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>الخصم</TableHead>
                      <TableHead>الإجمالي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.price} ريال</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.discount}%</TableCell>
                        <TableCell className="font-medium">{item.total} ريال</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">معلومات العميل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">الاسم:</span>
                  <span>{order.customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">الهاتف:</span>
                  <span>{order.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">البريد الإلكتروني:</span>
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">العنوان:</span>
                  <span>{order.customer.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">معلومات الشحن والدفع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">تاريخ الطلب:</span>
                  <span>{order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">طريقة الدفع:</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">طريقة الشحن:</span>
                  <span>{order.shippingMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></div>
                  <span className="font-medium">حالة الطلب:</span>
                  <span>{order.status}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">المجموع الفرعي:</span>
                  <span>{order.subtotal} ريال</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">الضريبة (15%):</span>
                  <span>{order.tax} ريال</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">الشحن:</span>
                  <span>{order.shipping} ريال</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">الخصم:</span>
                  <span>{order.discount} ريال</span>
                </div>
              </div>
              
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>الإجمالي:</span>
                <span>{order.total} ريال</span>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button className="w-full" variant="outline">
                  إرسال إيصال للعميل
                </Button>
                <Button className="w-full" variant="default">
                  تغيير حالة الطلب
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">سجل الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { date: "2023-06-15 14:30", status: "تم إنشاء الطلب", user: "أحمد محمد" },
                  { date: "2023-06-15 15:45", status: "تمت الموافقة على الطلب", user: "سارة خالد" },
                  { date: "2023-06-16 09:15", status: "تم شحن الطلب", user: "فهد عبدالله" },
                  { date: "2023-06-18 11:30", status: "تم تسليم الطلب", user: "نظام" }
                ].map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div className="space-y-1">
                      <p className="font-medium">{log.status}</p>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{log.date}</span>
                        <span>•</span>
                        <span>{log.user}</span>
                      </div>
                    </div>
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
    case "مكتمل":
      return "bg-green-500";
    case "قيد المعالجة":
      return "bg-blue-500";
    case "ملغي":
      return "bg-red-500";
    case "قيد الشحن":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}