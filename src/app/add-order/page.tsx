"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddOrderPage() {
  const [customer, setCustomer] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [products, setProducts] = useState<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>>([]);

  // Calculate order totals
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const tax = subtotal * 0.15; // 15% tax
  const shipping = 15; // Fixed shipping cost
  const discount = 0; // No discount by default
  const total = subtotal + tax + shipping - discount;

  // Handle customer search
  const handleCustomerSearch = () => {
    console.log("Searching for customer:", customerSearch);
    // Simulate finding a customer
    if (customerSearch.trim() !== "") {
      setCustomer("عميل " + customerSearch);
    }
  };

  // Handle add product
  const handleAddProduct = () => {
    // Add a mock product
    const newProduct = {
      id: Date.now(),
      name: `منتج ${products.length + 1}`,
      price: Math.floor(Math.random() * 200) + 50,
      quantity: 1,
      total: 0
    };
    newProduct.total = newProduct.price * newProduct.quantity;
    setProducts([...products, newProduct]);
    console.log("Added product:", newProduct);
  };

  // Handle remove product
  const handleRemoveProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
    console.log("Removed product with ID:", productId);
  };

  // Handle product quantity change
  const handleQuantityChange = (productId: number, quantity: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const updatedQuantity = Math.max(1, quantity); // Ensure minimum quantity is 1
        return {
          ...product,
          quantity: updatedQuantity,
          total: product.price * updatedQuantity
        };
      }
      return product;
    }));
  };

  // Handle save order
  const handleSaveOrder = () => {
    console.log("Saving order with data:", {
      customer,
      orderDate,
      paymentMethod,
      shippingMethod,
      notes,
      products,
      subtotal,
      tax,
      shipping,
      discount,
      total
    });
    // Implement actual save functionality here
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إضافة طلب جديد</h1>
        <Link href="/orders">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>العودة للطلبات</span>
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="customer-search">بحث عن عميل</Label>
                  <Input 
                    id="customer-search" 
                    placeholder="اسم العميل أو رقم الهاتف" 
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCustomerSearch()}
                  />
                </div>
                <Button 
                  variant="outline"
                  onClick={handleCustomerSearch}
                >
                  <Search className="h-4 w-4 ml-2" />
                  <span>بحث</span>
                </Button>
              </div>
              {customer && (
                <div className="p-4 border rounded-md bg-muted/50">
                  <p className="font-medium">{customer}</p>
                  <p className="text-sm text-muted-foreground">رقم الهاتف: 05XXXXXXXX</p>
                  <p className="text-sm text-muted-foreground">البريد الإلكتروني: customer@example.com</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>المنتجات</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleAddProduct}
              >
                <Plus className="h-4 w-4" />
                <span>إضافة منتج</span>
              </Button>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد منتجات مضافة. اضغط على "إضافة منتج" لإضافة منتجات للطلب.
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-md">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.price} ريال</p>
                      </div>
                      <div className="w-24">
                        <Input 
                          type="number" 
                          min="1" 
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                          className="text-center"
                        />
                      </div>
                      <div className="w-24 text-right font-medium">
                        {product.total} ريال
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-date">تاريخ الطلب</Label>
                <Input 
                  id="order-date" 
                  type="date" 
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">طريقة الدفع</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">نقدي</SelectItem>
                    <SelectItem value="credit-card">بطاقة ائتمان</SelectItem>
                    <SelectItem value="bank-transfer">تحويل بنكي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-method">طريقة الشحن</Label>
                <Select value={shippingMethod} onValueChange={setShippingMethod}>
                  <SelectTrigger id="shipping-method">
                    <SelectValue placeholder="اختر طريقة الشحن" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">شحن قياسي</SelectItem>
                    <SelectItem value="express">شحن سريع</SelectItem>
                    <SelectItem value="pickup">استلام من المتجر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea 
                  id="notes" 
                  placeholder="أي ملاحظات إضافية حول الطلب" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>{subtotal.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الضريبة (15%)</span>
                <span>{tax.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الشحن</span>
                <span>{shipping.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الخصم</span>
                <span>{discount.toFixed(2)} ريال</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>{total.toFixed(2)} ريال</span>
              </div>
              <Button 
                className="w-full mt-4" 
                size="lg"
                disabled={!customer || products.length === 0}
                onClick={handleSaveOrder}
              >
                تأكيد الطلب
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}