"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Minus, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minStock, setMinStock] = useState("");
  const [productStatus, setProductStatus] = useState("متوفر");
  const [productImages, setProductImages] = useState<string[]>([]);

  // Handle save product
  const handleSaveProduct = () => {
    console.log("Saving product with data:", {
      name: productName,
      description: productDescription,
      category: productCategory,
      barcode: productBarcode,
      sku: productSKU,
      salePrice,
      purchaseCost,
      discount,
      tax,
      quantity,
      minStock,
      status: productStatus,
      images: productImages
    });
    // Implement actual save functionality here
  };

  // Handle image upload
  const handleImageUpload = () => {
    // Simulate adding an image URL
    const newImageUrl = `https://source.unsplash.com/random/300x300?product&${Date.now()}`;
    setProductImages([...productImages, newImageUrl]);
    console.log("Image uploaded:", newImageUrl);
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
    console.log("Image removed at index:", index);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">إضافة منتج جديد</h1>
        <Link href="/products">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>العودة للمنتجات</span>
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>معلومات المنتج الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">اسم المنتج</Label>
              <Input 
                id="product-name" 
                placeholder="أدخل اسم المنتج" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">وصف المنتج</Label>
              <Textarea 
                id="product-description" 
                placeholder="أدخل وصف المنتج" 
                className="min-h-32" 
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-category">الفئة</Label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger id="product-category">
                  <SelectValue placeholder="اختر فئة المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                  <SelectItem value="clothing">ملابس</SelectItem>
                  <SelectItem value="food">مواد غذائية</SelectItem>
                  <SelectItem value="furniture">أثاث</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-barcode">الباركود</Label>
                <Input 
                  id="product-barcode" 
                  placeholder="أدخل الباركود" 
                  value={productBarcode}
                  onChange={(e) => setProductBarcode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-sku">رمز المنتج (SKU)</Label>
                <Input 
                  id="product-sku" 
                  placeholder="أدخل رمز المنتج" 
                  value={productSKU}
                  onChange={(e) => setProductSKU(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>صور المنتج</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <div key={index} className="relative rounded-md overflow-hidden border aspect-square">
                  <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {productImages.length < 6 && (
                <Button 
                  variant="outline" 
                  className="border-dashed aspect-square flex flex-col items-center justify-center gap-2"
                  onClick={handleImageUpload}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">إضافة صورة</span>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">يمكنك إضافة حتى 6 صور للمنتج. الصيغ المدعومة: JPG، PNG.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات التسعير والمخزون</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sale-price">سعر البيع</Label>
                <Input 
                  id="sale-price" 
                  type="number" 
                  placeholder="0.00" 
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-cost">تكلفة الشراء</Label>
                <Input 
                  id="purchase-cost" 
                  type="number" 
                  placeholder="0.00" 
                  value={purchaseCost}
                  onChange={(e) => setPurchaseCost(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">الخصم (%)</Label>
                <Input 
                  id="discount" 
                  type="number" 
                  placeholder="0" 
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax">الضريبة (%)</Label>
                <Input 
                  id="tax" 
                  type="number" 
                  placeholder="15" 
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">الكمية المتوفرة</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  placeholder="0" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stock">الحد الأدنى للمخزون</Label>
                <Input 
                  id="min-stock" 
                  type="number" 
                  placeholder="0" 
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-status">حالة المنتج</Label>
              <Select value={productStatus} onValueChange={setProductStatus}>
                <SelectTrigger id="product-status">
                  <SelectValue placeholder="اختر حالة المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="متوفر">متوفر</SelectItem>
                  <SelectItem value="غير متوفر">غير متوفر</SelectItem>
                  <SelectItem value="قيد الطلب">قيد الطلب</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end md:col-span-2">
          <Button 
            size="lg" 
            className="w-full md:w-auto"
            onClick={handleSaveProduct}
          >
            <Plus className="h-4 w-4 mr-2" />
            حفظ المنتج
          </Button>
        </div>
      </div>
    </div>
  );
}