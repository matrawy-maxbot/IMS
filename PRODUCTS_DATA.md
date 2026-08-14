# بيانات صفحات المنتجات - Products Pages Data

هذا الملف يحتوي على جميع البيانات والحقول الموجودة في صفحات المنتجات في النظام.

---

## 1. صفحة قائمة المنتجات (Products List Page)
**المسار:** `src/app/products/page.tsx`

### التبويبات (Tabs)
1. **المنتجات** (Products)
2. **الفئات** (Categories)

---

### أ. تبويب المنتجات

#### بيانات المنتجات (Mock Products Data)
```javascript
const products = [
  {
    id: 1,
    name: "منتج 1",
    code: "P001",
    price: 100,
    quantity: 50,
    status: "متوفر",
    category: "إلكترونيات"
  },
  {
    id: 2,
    name: "منتج 2",
    code: "P002",
    price: 150,
    quantity: 30,
    status: "متوفر",
    category: "أثاث"
  },
  {
    id: 3,
    name: "منتج 3",
    code: "P003",
    price: 200,
    quantity: 10,
    status: "منخفض المخزون",
    category: "ملابس"
  },
  {
    id: 4,
    name: "منتج 4",
    code: "P004",
    price: 120,
    quantity: 0,
    status: "نفذت الكمية",
    category: "إلكترونيات"
  },
  {
    id: 5,
    name: "منتج 5",
    code: "P005",
    price: 80,
    quantity: 100,
    status: "متوفر",
    category: "أدوات منزلية"
  }
];
```

#### الحقول المعروضة في جدول المنتجات
1. **الصورة** (Image)
2. **الاسم** (Name)
3. **الكود** (Code)
4. **السعر** (Price)
5. **الكمية المتوفرة** (Available Quantity)
6. **الحالة** (Status)
   - متوفر (Available)
   - منخفض المخزون (Low Stock)
   - نفذت الكمية (Out of Stock)
7. **الفئة** (Category)
8. **الإجراءات** (Actions)
   - تعديل (Edit)
   - حذف (Delete)

#### الميزات المتاحة في صفحة المنتجات
- **البحث** (Search)
- **الفلترة** (Filter)
- **التصدير** (Export)
- **إضافة منتج جديد** (Add New Product)
- **ترقيم الصفحات** (Pagination)

---

### ب. تبويب الفئات (Categories Tab)

#### بيانات الفئات (Categories Data)
```javascript
const categories = [
  {
    id: 1,
    name: "إلكترونيات",
    nameEn: "Electronics",
    description: "أجهزة إلكترونية ومعدات",
    icon: "📱",
    productsCount: 15
  },
  {
    id: 2,
    name: "أثاث",
    nameEn: "Furniture",
    description: "أثاث منزلي ومكتبي",
    icon: "🪑",
    productsCount: 8
  },
  {
    id: 3,
    name: "ملابس",
    nameEn: "Clothing",
    description: "ملابس وأزياء",
    icon: "👕",
    productsCount: 23
  },
  {
    id: 4,
    name: "أدوات منزلية",
    nameEn: "Home Appliances",
    description: "أدوات وأجهزة منزلية",
    icon: "🏠",
    productsCount: 12
  }
];
```

#### الحقول المعروضة في جدول الفئات
1. **أيقونة الفئة** (Category Icon)
2. **اسم الفئة** (Category Name)
   - العربية (Arabic)
   - English (الإنجليزية)
3. **وصف الفئة** (Category Description)
4. **عدد المنتجات** (Products Count)
5. **الإجراءات** (Actions)
   - تعديل (Edit)
   - حذف (Delete)

#### نموذج إضافة/تعديل الفئة (Category Form)
```javascript
const categoryForm = {
  name: "",        // اسم الفئة بالعربية
  nameEn: "",      // اسم الفئة بالإنجليزية
  description: "", // وصف الفئة
  icon: "📦"       // أيقونة الفئة (emoji)
};
```

#### الميزات المتاحة في تبويب الفئات
- **البحث** (Search)
- **التصدير** (Export)
- **إضافة فئة جديدة** (Add New Category)
- **تعديل الفئة** (Edit Category)
- **حذف الفئة** (Delete Category) - مع تأكيد

---

## 2. صفحة إضافة منتج (Add Product Page)
**المسار:** `src/app/products/add/page.tsx`

### الأقسام الرئيسية

#### أ. المعلومات الأساسية (Basic Info)

**الحقول:**
1. **اسم المنتج** (Product Name)
   - نوع: نص (Text Input)
   - متغير: `productName`

2. **الوصف** (Description)
   - نوع: نص متعدد الأسطر (Textarea)
   - متغير: `productDescription`

3. **الفئة** (Category)
   - نوع: قائمة منسدلة (Select)
   - متغير: `productCategory`
   - الخيارات:
     * إلكترونيات (Electronics)
     * ملابس (Clothing)
     * أطعمة (Food)
     * أثاث (Furniture)
     * أخرى (Other)

4. **الباركود** (Barcode)
   - نوع: نص (Text Input)
   - متغير: `productBarcode`

5. **رمز التخزين التعريفي** (SKU)
   - نوع: نص (Text Input)
   - متغير: `productSKU`

---

#### ب. صور المنتج (Product Images)

**الحقول:**
- **صور المنتج** (Product Images)
  - نوع: رفع صور (Image Upload)
  - متغير: `productImages` (Array)
  - الحد الأقصى: 6 صور
  - ميزات:
    * رفع صورة جديدة (Upload)
    * حذف صورة (Remove)
    * عرض مصغر للصور (Thumbnail Preview)

---

#### ج. التسعير والمخزون (Pricing and Inventory)

**الحقول:**

1. **سعر البيع** (Sale Price)
   - نوع: رقم (Number Input)
   - متغير: `salePrice`
   - تنسيق: 0.00

2. **تكلفة الشراء** (Purchase Cost)
   - نوع: رقم (Number Input)
   - متغير: `purchaseCost`
   - تنسيق: 0.00

3. **الخصم** (Discount)
   - نوع: رقم (Number Input)
   - متغير: `discount`
   - الوحدة: نسبة مئوية (%)

4. **الضريبة** (Tax)
   - نوع: رقم (Number Input)
   - متغير: `tax`
   - الوحدة: نسبة مئوية (%)
   - القيمة الافتراضية: 15

5. **الكمية المتوفرة** (Available Quantity)
   - نوع: رقم (Number Input)
   - متغير: `quantity`

6. **الحد الأدنى للمخزون** (Minimum Stock)
   - نوع: رقم (Number Input)
   - متغير: `minStock`

7. **حالة المنتج** (Product Status)
   - نوع: قائمة منسدلة (Select)
   - متغير: `productStatus`
   - القيمة الافتراضية: "متوفر"
   - الخيارات:
     * متوفر (Available)
     * غير متوفر (Not Available)
     * قيد الطلب (Pending)

---

### هيكل بيانات المنتج عند الحفظ
```javascript
{
  name: productName,
  description: productDescription,
  category: productCategory,
  barcode: productBarcode,
  sku: productSKU,
  salePrice: salePrice,
  purchaseCost: purchaseCost,
  discount: discount,
  tax: tax,
  quantity: quantity,
  minStock: minStock,
  status: productStatus,
  images: productImages // Array of image URLs
}
```

---

## 3. صفحة تفاصيل المنتج (Product Details Page)
**المسار:** `src/app/products/[id]/page.tsx`

### بيانات المنتج التفصيلية (Product Data)

```javascript
const product = {
  // المعلومات الأساسية
  id: 555,
  name: "لابتوب HP ProBook",
  code: "PRD-555",
  description: "لابتوب HP ProBook بمعالج Intel Core i7، ذاكرة 16 جيجابايت، وقرص SSD سعة 512 جيجابايت. مثالي للاستخدام المكتبي والمهني.",
  
  // التسعير
  price: 3500,
  cost: 2800,
  discount: 0,
  tax: 15,
  
  // المخزون
  quantity: 25,
  minQuantity: 5,
  
  // التصنيف
  category: "إلكترونيات",
  brand: "HP",
  status: "متوفر",
  
  // التواريخ
  createdAt: "2023-01-15",
  updatedAt: "2023-06-10",
  
  // سجل المبيعات
  salesHistory: [
    { month: "يناير", sales: 5 },
    { month: "فبراير", sales: 8 },
    { month: "مارس", sales: 12 },
    { month: "أبريل", sales: 10 },
    { month: "مايو", sales: 15 },
    { month: "يونيو", sales: 7 }
  ],
  
  // المنتجات ذات الصلة
  relatedProducts: [
    { id: 101, name: "حقيبة لابتوب", price: 150 },
    { id: 102, name: "ماوس لاسلكي", price: 120 },
    { id: 103, name: "لوحة مفاتيح", price: 150 }
  ]
};
```

---

### الأقسام المعروضة في صفحة التفاصيل

#### 1. المعلومات الرئيسية (Main Information)
- **الصورة الرئيسية** (Main Image)
- **اسم المنتج** (Product Name)
- **كود المنتج** (Product Code)
- **الحالة** (Status) - مع مؤشر ملون
- **السعر** (Price)
- **التكلفة** (Cost)
- **الربح** (Profit) = السعر - التكلفة
- **هامش الربح** (Profit Margin) = ((السعر - التكلفة) / التكلفة) × 100%

#### 2. معلومات المخزون (Stock Information)
- **الكمية المتوفرة** (Available Quantity)
- **شريط تقدم المخزون** (Stock Progress Bar)
- **تنبيه المخزون المنخفض** (Low Stock Alert) - عند الوصول للحد الأدنى

#### 3. التصنيفات والعلامات (Categories & Tags)
- **الفئة** (Category)
- **العلامة التجارية** (Brand)

#### 4. الوصف (Description)
- **وصف المنتج التفصيلي** (Detailed Product Description)

---

### البطاقات الإضافية (Additional Cards)

#### أ. سجل المبيعات (Sales History)
- **رسم بياني عمودي** (Bar Chart)
- **البيانات:**
  * الشهر (Month)
  * عدد المبيعات (Sales Count)
- **إجمالي المبيعات:** 57 وحدة

#### ب. معلومات إضافية (Additional Info)
- **تاريخ الإنشاء** (Created Date): 2023-01-15
- **آخر تحديث** (Last Update): 2023-06-10
- **الحد الأدنى للمخزون** (Minimum Stock): 5
- **إجمالي المبيعات** (Total Sales): 57 وحدة

#### ج. إجراءات سريعة (Quick Actions)
1. **إضافة إلى طلب** (Add to Order)
2. **طلب مخزون** (Order Stock)
3. **عرض تقرير المبيعات** (View Sales Report)

#### د. المنتجات ذات الصلة (Related Products)
قائمة بالمنتجات المرتبطة:
- **الاسم** (Name)
- **السعر** (Price)
- **رابط سريع** (Quick Link)

مثال:
```javascript
[
  { id: 101, name: "حقيبة لابتوب", price: 150 },
  { id: 102, name: "ماوس لاسلكي", price: 120 },
  { id: 103, name: "لوحة مفاتيح", price: 150 }
]
```

#### هـ. الطلبات الأخيرة (Recent Orders)
قائمة بآخر الطلبات للمنتج:
```javascript
[
  {
    id: 1001,
    date: "2023-06-10",
    customer: "محمد أحمد",
    quantity: 2
  },
  {
    id: 1002,
    date: "2023-06-05",
    customer: "سارة خالد",
    quantity: 1
  },
  {
    id: 1003,
    date: "2023-05-28",
    customer: "فهد عبدالله",
    quantity: 3
  }
]
```

---

### الإجراءات المتاحة (Available Actions)

#### في رأس الصفحة (Page Header)
1. **رجوع** (Back) - العودة لقائمة المنتجات
2. **تعديل** (Edit) - تعديل بيانات المنتج
3. **حذف** (Delete) - حذف المنتج

---

## دالة لون الحالة (Status Color Function)

```javascript
function getStatusColor(status) {
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
```

---

## حسابات إضافية (Additional Calculations)

### في صفحة التفاصيل:
1. **الربح** = السعر - التكلفة
   ```
   Profit = 3500 - 2800 = 700
   ```

2. **هامش الربح** = ((السعر - التكلفة) / التكلفة) × 100
   ```
   Profit Margin = ((3500 - 2800) / 2800) × 100 = 25%
   ```

3. **نسبة المخزون** = (الكمية الحالية / الكمية القصوى) × 100
   ```
   Stock Percentage = (25 / 50) × 100 = 50%
   ```

4. **إجمالي المبيعات** = مجموع المبيعات من السجل
   ```
   Total Sales = 5 + 8 + 12 + 10 + 15 + 7 = 57
   ```

---

## الميزات المشتركة بين الصفحات

### 1. الترجمة (i18n)
- دعم اللغتين العربية والإنجليزية
- استخدام `next-intl` للترجمة
- مفاتيح الترجمة:
  * `products` - للنصوص الخاصة بالمنتجات
  * `productDetails` - لتفاصيل المنتج
  * `common` - للنصوص المشتركة

### 2. الإشعارات (Toasts)
استخدام مكتبة `sonner` للإشعارات:
- **نجاح:** `toast.success()`
- **خطأ:** `toast.error()`

### 3. الحوارات (Dialogs)
- حوار إضافة/تعديل الفئة
- حوار تأكيد الحذف

### 4. الجداول (Tables)
- دعم الاتجاه من اليمين لليسار (RTL) للعربية
- دعم الاتجاه من اليسار لليمين (LTR) للإنجليزية

---

## ملاحظات تقنية (Technical Notes)

### State Management
جميع الصفحات تستخدم React `useState` لإدارة الحالة المحلية:
- `searchQuery` - نص البحث
- `activeTab` - التبويب النشط
- `categories` - قائمة الفئات
- `categoryForm` - بيانات نموذج الفئة
- `productImages` - صور المنتج
- وغيرها...

### التوجيه (Routing)
- `/products` - قائمة المنتجات
- `/products/add` - إضافة منتج جديد
- `/products/[id]` - تفاصيل منتج محدد
- `/products/[id]/edit` - تعديل منتج محدد (مذكور في الكود)

### المكونات المستخدمة (Components)
- Card, CardContent, CardHeader, CardTitle
- Button
- Input
- Label
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Textarea
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Tabs, TabsContent, TabsList, TabsTrigger
- Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
- AlertDialog وتوابعه

### الأيقونات المستخدمة (Icons from lucide-react)
- Package
- Search
- Plus
- Filter
- Download
- FileEdit
- Trash2
- FolderOpen
- Upload
- Minus
- ArrowLeft
- Edit
- BarChart
- ShoppingCart
- AlertTriangle
- Tag
- Truck
- Clock

---

## الخلاصة

هذا الملف يحتوي على:
- ✅ جميع الحقول في صفحة قائمة المنتجات والفئات
- ✅ جميع الحقول في صفحة إضافة منتج
- ✅ جميع الحقول والبيانات في صفحة تفاصيل المنتج
- ✅ هيكل البيانات (Data Structures)
- ✅ الدوال والحسابات
- ✅ الميزات والإجراءات المتاحة
- ✅ المكونات والأيقونات المستخدمة

---

**تاريخ إنشاء الملف:** 2026-08-13  
**المسار:** `PRODUCTS_DATA.md`
