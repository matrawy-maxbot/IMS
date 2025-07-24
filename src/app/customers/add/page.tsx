"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, User, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function AddCustomerPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/customers">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">إضافة عميل جديد</h1>
        </div>
        <Button className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>حفظ العميل</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم العميل</Label>
              <div className="flex gap-2 items-center">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="اسم العميل" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="البريد الإلكتروني" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <div className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input id="phone" placeholder="رقم الهاتف" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">نوع العميل</Label>
              <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="individual">فرد</option>
                <option value="company">شركة</option>
                <option value="government">جهة حكومية</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <select id="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">العنوان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input id="address" placeholder="العنوان التفصيلي" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">المدينة</Label>
                <Input id="city" placeholder="المدينة" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">المنطقة</Label>
                <Input id="state" placeholder="المنطقة" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postal-code">الرمز البريدي</Label>
                <Input id="postal-code" placeholder="الرمز البريدي" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">الدولة</Label>
                <select id="country" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="sa">المملكة العربية السعودية</option>
                  <option value="ae">الإمارات العربية المتحدة</option>
                  <option value="kw">الكويت</option>
                  <option value="bh">البحرين</option>
                  <option value="qa">قطر</option>
                  <option value="om">عمان</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tax-number">الرقم الضريبي</Label>
                <Input id="tax-number" placeholder="الرقم الضريبي" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <textarea id="notes" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="ملاحظات إضافية..."></textarea>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-terms">شروط الدفع</Label>
                <select id="payment-terms" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="immediate">دفع فوري</option>
                  <option value="15-days">15 يوم</option>
                  <option value="30-days">30 يوم</option>
                  <option value="60-days">60 يوم</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credit-limit">حد الائتمان</Label>
                <div className="relative">
                  <Input id="credit-limit" type="number" placeholder="0" />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">ريال</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}