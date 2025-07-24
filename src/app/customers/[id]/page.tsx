"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Trash2, User, Mail, Phone, MapPin, ShoppingCart, CreditCard, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  // في الواقع، ستقوم بجلب بيانات العميل باستخدام معرف العميل (params.id)
  // هذه بيانات تجريبية فقط
  const customer = {
    id: params.id,
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "0512345678",
    type: "فرد",
    status: "نشط",
    address: "شارع الملك فهد",
    city: "الرياض",
    state: "منطقة الرياض",
    postalCode: "12345",
    country: "المملكة العربية السعودية",
    taxNumber: "300000000000003",
    paymentTerms: "30 يوم",
    creditLimit: 10000,
    joinDate: "2022-03-15",
    lastPurchase: "2023-06-10",
    totalOrders: 12,
    totalSpent: 25650,
    notes: "عميل مهم. يفضل المنتجات الإلكترونية عالية الجودة.",
    orders: [
      { id: 1001, date: "2023-06-10", total: 3500, status: "مكتمل", items: 3 },
      { id: 1002, date: "2023-05-22", total: 1200, status: "مكتمل", items: 2 },
      { id: 1003, date: "2023-04-15", total: 4800, status: "مكتمل", items: 5 },
      { id: 1004, date: "2023-03-08", total: 950, status: "مكتمل", items: 1 },
      { id: 1005, date: "2023-02-17", total: 2700, status: "مكتمل", items: 3 }
    ],
    purchaseHistory: [
      { month: "يناير", amount: 0 },
      { month: "فبراير", amount: 2700 },
      { month: "مارس", amount: 950 },
      { month: "أبريل", amount: 4800 },
      { month: "مايو", amount: 1200 },
      { month: "يونيو", amount: 3500 }
    ]
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/customers">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">تفاصيل العميل</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/customers/${customer.id}/edit`}>
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
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">{customer.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`h-2 w-2 rounded-full ${customer.status === "نشط" ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span>{customer.status}</span>
                    <span className="text-muted-foreground">•</span>
                    <span>{customer.type}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">معلومات العميل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ الانضمام</p>
                    <p className="font-medium">{customer.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">آخر عملية شراء</p>
                    <p className="font-medium">{customer.lastPurchase}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                    <p className="font-medium">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المشتريات</p>
                    <p className="font-medium">{customer.totalSpent} ريال</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">شروط الدفع</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.paymentTerms}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">حد الائتمان</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{customer.creditLimit} ريال</span>
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${Math.min((customer.totalSpent / customer.creditLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((customer.totalSpent / customer.creditLimit) * 100)}%
                    </span>
                  </div>
                </div>
                
                {customer.taxNumber && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-1">الرقم الضريبي</p>
                    <p className="font-medium">{customer.taxNumber}</p>
                  </div>
                )}
                
                {customer.notes && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-1">ملاحظات</p>
                    <p className="text-sm">{customer.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">العنوان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{customer.address}</p>
                    <p>{customer.city}، {customer.state}</p>
                    <p>{customer.postalCode}</p>
                    <p>{customer.country}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    عرض على الخريطة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">مشتريات العميل</CardTitle>
              <Link href={`/customers/${customer.id}/orders`}>
                <Button variant="outline" size="sm">
                  عرض الكل
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end gap-2">
                {customer.purchaseHistory.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-primary rounded-t-sm" 
                      style={{ height: `${(item.amount / 5000) * 150}px` }}
                    ></div>
                    <div className="text-xs mt-2 text-muted-foreground">{item.month}</div>
                    <div className="text-xs font-medium">{item.amount > 0 ? `${item.amount} ر.س` : '-'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/add-order?customer=${customer.id}`}>
                <Button className="w-full flex items-center gap-1" variant="outline">
                  <ShoppingCart className="h-4 w-4" />
                  <span>إنشاء طلب جديد</span>
                </Button>
              </Link>
              <Button className="w-full flex items-center gap-1" variant="outline">
                <Mail className="h-4 w-4" />
                <span>إرسال بريد إلكتروني</span>
              </Button>
              <Button className="w-full flex items-center gap-1" variant="outline">
                <CreditCard className="h-4 w-4" />
                <span>تعديل حد الائتمان</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">آخر الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.orders.slice(0, 5).map((order) => (
                  <Link href={`/orders/${order.id}`} key={order.id}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">طلب #{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.date} • {order.items} منتجات • {order.total} ريال
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {customer.orders.length > 5 && (
                <div className="mt-4 pt-4 border-t text-center">
                  <Link href={`/customers/${customer.id}/orders`}>
                    <Button variant="link" className="text-sm">
                      عرض جميع الطلبات ({customer.orders.length})
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">سجل النشاط</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2023-06-10 14:30", action: "إنشاء طلب جديد", details: "طلب #1001" },
                  { date: "2023-05-22 11:15", action: "إنشاء طلب جديد", details: "طلب #1002" },
                  { date: "2023-05-05 09:45", action: "تحديث معلومات العميل", details: "تم تحديث رقم الهاتف" },
                  { date: "2023-04-15 16:20", action: "إنشاء طلب جديد", details: "طلب #1003" },
                  { date: "2022-03-15 10:00", action: "إنشاء حساب", details: "تم تسجيل العميل" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div className="space-y-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{activity.date}</span>
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
      return "bg-green-100 text-green-800";
    case "قيد المعالجة":
      return "bg-blue-100 text-blue-800";
    case "ملغي":
      return "bg-red-100 text-red-800";
    case "قيد الشحن":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}