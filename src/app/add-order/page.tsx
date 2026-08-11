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
import { useTranslations } from "next-intl";

export default function AddOrderPage() {
  const t = useTranslations("addOrder");
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
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <Link href="/orders">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>{t("backToOrders")}</span>
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("customerInfo.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="customer-search">{t("customerInfo.searchLabel")}</Label>
                  <Input 
                    id="customer-search" 
                    placeholder={t("customerInfo.searchPlaceholder")}
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
                  <span>{t("customerInfo.searchButton")}</span>
                </Button>
              </div>
              {customer && (
                <div className="p-4 border rounded-md bg-muted/50">
                  <p className="font-medium">{customer}</p>
                  <p className="text-sm text-muted-foreground">{t("customerInfo.phone")}: 05XXXXXXXX</p>
                  <p className="text-sm text-muted-foreground">{t("customerInfo.email")}: customer@example.com</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("products.title")}</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleAddProduct}
              >
                <Plus className="h-4 w-4" />
                <span>{t("products.addButton")}</span>
              </Button>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t("products.emptyMessage")}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-md">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.price} {t("currency")}</p>
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
                        {product.total} {t("currency")}
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
              <CardTitle>{t("orderDetails.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-date">{t("orderDetails.dateLabel")}</Label>
                <Input 
                  id="order-date" 
                  type="date" 
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">{t("orderDetails.paymentLabel")}</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder={t("orderDetails.paymentPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">{t("orderDetails.paymentCash")}</SelectItem>
                    <SelectItem value="credit-card">{t("orderDetails.paymentCard")}</SelectItem>
                    <SelectItem value="bank-transfer">{t("orderDetails.paymentTransfer")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-method">{t("orderDetails.shippingLabel")}</Label>
                <Select value={shippingMethod} onValueChange={setShippingMethod}>
                  <SelectTrigger id="shipping-method">
                    <SelectValue placeholder={t("orderDetails.shippingPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">{t("orderDetails.shippingStandard")}</SelectItem>
                    <SelectItem value="express">{t("orderDetails.shippingExpress")}</SelectItem>
                    <SelectItem value="pickup">{t("orderDetails.shippingPickup")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">{t("orderDetails.notesLabel")}</Label>
                <Textarea 
                  id="notes" 
                  placeholder={t("orderDetails.notesPlaceholder")}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("summary.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("summary.subtotal")}</span>
                <span>{subtotal.toFixed(2)} {t("currency")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("summary.tax")}</span>
                <span>{tax.toFixed(2)} {t("currency")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("summary.shipping")}</span>
                <span>{shipping.toFixed(2)} {t("currency")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("summary.discount")}</span>
                <span>{discount.toFixed(2)} {t("currency")}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>{t("summary.total")}</span>
                <span>{total.toFixed(2)} {t("currency")}</span>
              </div>
              <Button 
                className="w-full mt-4" 
                size="lg"
                disabled={!customer || products.length === 0}
                onClick={handleSaveOrder}
              >
                {t("summary.confirmButton")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}