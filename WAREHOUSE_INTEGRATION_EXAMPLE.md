# أمثلة على دمج المخازن في الصفحات الأخرى

## 1. عرض المخزن الحالي في صفحة المنتجات

```tsx
// src/app/products/page.tsx
"use client";

import { useCurrentWarehouse } from "@/hooks/use-current-warehouse";
import { Badge } from "@/components/ui/badge";
import { Warehouse } from "lucide-react";

export default function ProductsPage() {
  const currentWarehouse = useCurrentWarehouse();

  return (
    <div>
      {/* عرض المخزن الحالي */}
      {currentWarehouse && (
        <div className="mb-4 flex items-center gap-2 p-3 bg-muted rounded-lg">
          <Warehouse className="h-4 w-4 text-primary" />
          <span className="text-sm">
            المنتجات في: <strong>{currentWarehouse.name}</strong>
          </span>
          <Badge variant="outline">{currentWarehouse.location}</Badge>
        </div>
      )}

      {/* باقي محتوى الصفحة */}
    </div>
  );
}
```

## 2. فلترة المنتجات حسب المخزن

```tsx
// src/app/products/page.tsx
"use client";

import { useCurrentWarehouse } from "@/hooks/use-current-warehouse";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const currentWarehouse = useCurrentWarehouse();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (currentWarehouse) {
      // تحميل المنتجات الخاصة بهذا المخزن فقط
      fetchProductsByWarehouse(currentWarehouse.id);
    }
  }, [currentWarehouse]);

  const fetchProductsByWarehouse = async (warehouseId: string) => {
    // API call to get products filtered by warehouse
    // const response = await fetch(`/api/products?warehouseId=${warehouseId}`);
    // const data = await response.json();
    // setProducts(data);
  };

  return (
    <div>
      {/* عرض المنتجات */}
    </div>
  );
}
```

## 3. عرض إحصائيات المخزن في Dashboard

```tsx
// src/app/page.tsx (Dashboard)
"use client";

import { useCurrentWarehouse, useWarehouseStats } from "@/hooks/use-current-warehouse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const currentWarehouse = useCurrentWarehouse();
  const stats = useWarehouseStats();

  return (
    <div>
      {/* بطاقة معلومات المخزن الحالي */}
      {currentWarehouse && (
        <Card>
          <CardHeader>
            <CardTitle>المخزن الحالي: {currentWarehouse.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">عدد المنتجات</p>
                <p className="text-2xl font-bold">{currentWarehouse.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">قيمة المخزون</p>
                <p className="text-2xl font-bold">{currentWarehouse.totalValue.toLocaleString()} ريال</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تنبيهات المخزون</p>
                <p className="text-2xl font-bold text-orange-600">{currentWarehouse.lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* إحصائيات جميع المخازن */}
      <div className="mt-4">
        <h3>إحصائيات عامة</h3>
        <p>إجمالي المخازن: {stats.totalWarehouses}</p>
        <p>إجمالي المنتجات: {stats.totalProducts}</p>
        <p>إجمالي القيمة: {stats.totalValue.toLocaleString()} ريال</p>
      </div>
    </div>
  );
}
```

## 4. إضافة منتج لمخزن محدد

```tsx
// src/app/products/add/page.tsx
"use client";

import { useCurrentWarehouse } from "@/hooks/use-current-warehouse";
import { useWarehouse } from "@/contexts/warehouse-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddProductPage() {
  const currentWarehouse = useCurrentWarehouse();
  const { warehouses, setSelectedWarehouse } = useWarehouse();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(currentWarehouse?.id || "");

  const handleSubmit = async (formData: any) => {
    // إضافة معرف المخزن إلى بيانات المنتج
    const productData = {
      ...formData,
      warehouseId: selectedWarehouseId,
    };

    // حفظ المنتج
    // await saveProduct(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* اختيار المخزن */}
      <div>
        <label>المخزن</label>
        <Select 
          value={selectedWarehouseId} 
          onValueChange={setSelectedWarehouseId}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر المخزن" />
          </SelectTrigger>
          <SelectContent>
            {warehouses.map((warehouse) => (
              <SelectItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* باقي الحقول */}
    </form>
  );
}
```

## 5. نقل منتج بين المخازن

```tsx
// src/components/transfer-product-dialog.tsx
"use client";

import { useState } from "react";
import { useWarehouse } from "@/contexts/warehouse-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TransferProductDialogProps {
  productId: string;
  currentWarehouseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransferProductDialog({
  productId,
  currentWarehouseId,
  open,
  onOpenChange,
}: TransferProductDialogProps) {
  const { warehouses } = useWarehouse();
  const [targetWarehouseId, setTargetWarehouseId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const availableWarehouses = warehouses.filter(
    (w) => w.id !== currentWarehouseId && w.status === "active"
  );

  const handleTransfer = async () => {
    // نقل المنتج
    // await transferProduct(productId, currentWarehouseId, targetWarehouseId, quantity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>نقل منتج بين المخازن</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>المخزن المستهدف</label>
            <Select value={targetWarehouseId} onValueChange={setTargetWarehouseId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المخزن" />
              </SelectTrigger>
              <SelectContent>
                {availableWarehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name} - {warehouse.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>الكمية</label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleTransfer} disabled={!targetWarehouseId}>
            نقل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## 6. تقرير مقارنة المخازن

```tsx
// src/app/reports/warehouses/page.tsx
"use client";

import { useWarehouse } from "@/contexts/warehouse-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function WarehouseComparisonReport() {
  const { warehouses } = useWarehouse();

  const chartData = warehouses.map((w) => ({
    name: w.name,
    products: w.totalProducts,
    value: w.totalValue / 1000, // بالآلاف
    lowStock: w.lowStockItems,
  }));

  return (
    <div>
      <h1>تقرير مقارنة المخازن</h1>

      {/* جدول المقارنة */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>مقارنة الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th>المخزن</th>
                <th>عدد المنتجات</th>
                <th>القيمة (ريال)</th>
                <th>المخزون المنخفض</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.totalProducts}</td>
                  <td>{warehouse.totalValue.toLocaleString()}</td>
                  <td className="text-orange-600">{warehouse.lowStockItems}</td>
                  <td>
                    <span className={warehouse.status === "active" ? "text-green-600" : "text-gray-400"}>
                      {warehouse.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* رسم بياني */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>التمثيل البصري</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="products" fill="#3b82f6" name="المنتجات" />
            <Bar dataKey="value" fill="#10b981" name="القيمة (بالآلاف)" />
            <Bar dataKey="lowStock" fill="#f59e0b" name="مخزون منخفض" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
```

## نصائح التكامل

### 1. استخدم الـ Hooks المخصصة
```tsx
import { useCurrentWarehouse, useWarehouseStats } from "@/hooks/use-current-warehouse";
```

### 2. تحديث البيانات عند تغيير المخزن
```tsx
useEffect(() => {
  if (currentWarehouse) {
    // إعادة تحميل البيانات
    loadData();
  }
}, [currentWarehouse]);
```

### 3. عرض تنبيه إذا لم يكن هناك مخزن محدد
```tsx
if (!currentWarehouse) {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>لم يتم تحديد مخزن</AlertTitle>
      <AlertDescription>
        الرجاء تحديد مخزن من القائمة الجانبية
      </AlertDescription>
    </Alert>
  );
}
```

### 4. حفظ معرف المخزن مع كل عملية
```tsx
const handleCreateOrder = async (orderData) => {
  const order = {
    ...orderData,
    warehouseId: currentWarehouse?.id,
    warehouseName: currentWarehouse?.name,
  };
  await saveOrder(order);
};
```
