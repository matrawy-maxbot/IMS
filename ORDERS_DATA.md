# بيانات صفحات الطلبات - Orders Pages Data

هذا الملف يحتوي على جميع البيانات والحقول الموجودة في صفحات الطلبات في النظام.

---

## 1. صفحة قائمة الطلبات (Orders List Page)
**المسار:** `src/app/orders/page.tsx`

### بطاقات الإحصائيات (Statistics Cards)

#### 1. إجمالي الطلبات (Total Orders)
```javascript
{
  label: "إجمالي الطلبات",
  value: 45,
  change: "+12 قيد المعالجة",
  icon: "ShoppingCart"
}
```

#### 2. إجمالي المبيعات (Total Sales)
```javascript
{
  label: "إجمالي المبيعات",
  value: "12,500",
  change: "+20%",
  icon: "TrendingUp"
}
```

#### 3. الطلبات قيد المعالجة (Processing Orders)
```javascript
{
  label: "الطلبات قيد المعالجة",
  value: 8,
  change: "-2 طلب جديد",
  icon: "ShoppingCart"
}
```

#### 4. الطلبات الملغاة (Cancelled Orders)
```javascript
{
  label: "الطلبات الملغاة",
  value: 3,
  change: "+1 طلب جديد",
  icon: "AlertCircle"
}
```

---

### بيانات الطلبات (Orders Data)

```javascript
const orders = [
  {
    id: 1,
    orderNumber: "ORD-1001",
    customer: "أحمد محمد",
    date: "2023-06-15",
    total: 350,
    status: "مكتمل",
    items: 3
  },
  {
    id: 2,
    orderNumber: "ORD-1002",
    customer: "سارة أحمد",
    date: "2023-06-14",
    total: 520,
    status: "قيد التجهيز",
    items: 5
  },
  {
    id: 3,
    orderNumber: "ORD-1003",
    customer: "محمد علي",
    date: "2023-06-12",
    total: 180,
    status: "قيد الشحن",
    items: 2
  },
  {
    id: 4,
    orderNumber: "ORD-1004",
    customer: "فاطمة حسن",
    date: "2023-06-10",
    total: 750,
    status: "مكتمل",
    items: 6
  },
  {
    id: 5,
    orderNumber: "ORD-1005",
    customer: "خالد عبدالله",
    date: "2023-06-08",
    total: 420,
    status: "ملغي",
    items: 4
  }
];
```

---

### الحقول المعروضة في جدول الطلبات

1. **رقم الطلب** (Order Number)
   - مثال: ORD-1001

2. **العميل** (Customer)
   - اسم العميل

3. **التاريخ** (Date)
   - تاريخ إنشاء الطلب
   - تنسيق: YYYY-MM-DD

4. **الإجمالي** (Total)
   - إجمالي قيمة الطلب
   - العملة: ريال سعودي

5. **الحالة** (Status)
   - الحالات المتاحة:
     * **مكتمل** (Completed) - `bg-green-100 text-green-800`
     * **قيد التجهيز** (Processing) - `bg-blue-100 text-blue-800`
     * **قيد الشحن** (Shipping) - `bg-yellow-100 text-yellow-800`
     * **ملغي** (Cancelled) - `bg-red-100 text-red-800`

6. **عدد الأصناف** (Items Count)
   - عدد المنتجات في الطلب

7. **الإجراءات** (Actions)
   - **عرض** (View) - عرض تفاصيل الطلب
   - **تعديل** (Edit) - تعديل الطلب
   - **حذف** (Delete) - حذف الطلب

---

### الميزات المتاحة في صفحة الطلبات

#### 1. البحث (Search)
- نوع: نص (Text Input)
- متغير: `searchQuery`
- البحث بالضغط على Enter أو زر البحث

#### 2. فلتر التاريخ (Date Filter)
- نوع: اختيار تاريخ (Date Input)
- متغير: `dateFilter`

#### 3. الفلترة المتقدمة (Advanced Filter)
- زر لفتح خيارات الفلترة المتقدمة

#### 4. التصدير (Export)
- تصدير بيانات الطلبات

#### 5. إضافة طلب جديد (Add New Order)
- رابط إلى: `/add-order`

#### 6. ترقيم الصفحات (Pagination)
- صفحات متعددة للتنقل بين الطلبات

---

## 2. صفحة إضافة طلب (Add Order Page)
**المسار:** `src/app/add-order/page.tsx`

### الأقسام الرئيسية

---

#### أ. معلومات العميل (Customer Information)

**الحقول:**

1. **البحث عن العميل** (Customer Search)
   - نوع: نص مع زر بحث (Text Input + Search Button)
   - متغير: `customerSearch`
   - الميزة: بحث فوري عند الضغط على Enter

2. **العميل المحدد** (Selected Customer)
   - متغير: `customer`
   - يعرض بعد البحث:
     * **الاسم** (Name)
     * **الهاتف** (Phone): 05XXXXXXXX
     * **البريد الإلكتروني** (Email): customer@example.com

---

#### ب. المنتجات (Products)

**الميزات:**
- **إضافة منتج** (Add Product) - زر لإضافة منتج للطلب
- **عرض قائمة المنتجات** (Products List)

**حقول كل منتج:**

```javascript
{
  id: number,           // معرف المنتج
  name: string,         // اسم المنتج
  price: number,        // السعر
  quantity: number,     // الكمية
  total: number         // الإجمالي (السعر × الكمية)
}
```

**إجراءات المنتج:**
1. **تعديل الكمية** (Change Quantity)
   - نوع: رقم (Number Input)
   - الحد الأدنى: 1

2. **حذف المنتج** (Remove Product)
   - زر حذف

**رسالة عند عدم وجود منتجات:**
- "لم يتم إضافة أي منتجات بعد"

---

#### ج. تفاصيل الطلب (Order Details)

**الحقول:**

1. **تاريخ الطلب** (Order Date)
   - نوع: تاريخ (Date Input)
   - متغير: `orderDate`

2. **طريقة الدفع** (Payment Method)
   - نوع: قائمة منسدلة (Select)
   - متغير: `paymentMethod`
   - الخيارات:
     * **نقدي** (Cash) - `value: "cash"`
     * **بطاقة ائتمان** (Credit Card) - `value: "credit-card"`
     * **تحويل بنكي** (Bank Transfer) - `value: "bank-transfer"`

3. **طريقة الشحن** (Shipping Method)
   - نوع: قائمة منسدلة (Select)
   - متغير: `shippingMethod`
   - الخيارات:
     * **شحن قياسي** (Standard Shipping) - `value: "standard"`
     * **شحن سريع** (Express Shipping) - `value: "express"`
     * **استلام من الفرع** (Pickup) - `value: "pickup"`

4. **ملاحظات** (Notes)
   - نوع: نص متعدد الأسطر (Textarea)
   - متغير: `notes`
   - اختياري

---

#### د. ملخص الطلب (Order Summary)

**الحسابات:**

```javascript
// المتغيرات
const subtotal = products.reduce((sum, product) => sum + product.total, 0);
const tax = subtotal * 0.15;        // الضريبة 15%
const shipping = 15;                // تكلفة الشحن ثابتة
const discount = 0;                 // الخصم (افتراضي: 0)
const total = subtotal + tax + shipping - discount;
```

**الحقول المعروضة:**

1. **المجموع الفرعي** (Subtotal)
   - حساب: مجموع قيم جميع المنتجات

2. **الضريبة** (Tax)
   - حساب: المجموع الفرعي × 15%

3. **الشحن** (Shipping)
   - قيمة ثابتة: 15 ريال

4. **الخصم** (Discount)
   - افتراضي: 0 ريال

5. **الإجمالي** (Total)
   - حساب: المجموع الفرعي + الضريبة + الشحن - الخصم

**زر الحفظ:**
- **تأكيد الطلب** (Confirm Order)
- يتم تعطيله إذا:
  * لم يتم اختيار عميل
  * لم يتم إضافة أي منتجات

---

### هيكل بيانات الطلب عند الحفظ

```javascript
{
  customer: customer,              // معلومات العميل
  orderDate: orderDate,            // تاريخ الطلب
  paymentMethod: paymentMethod,    // طريقة الدفع
  shippingMethod: shippingMethod,  // طريقة الشحن
  notes: notes,                    // ملاحظات
  products: products,              // قائمة المنتجات
  subtotal: subtotal,              // المجموع الفرعي
  tax: tax,                        // الضريبة
  shipping: shipping,              // الشحن
  discount: discount,              // الخصم
  total: total                     // الإجمالي
}
```

---

### مثال على بيانات طلب كامل

```javascript
{
  customer: "عميل أحمد",
  orderDate: "2023-06-15",
  paymentMethod: "credit-card",
  shippingMethod: "standard",
  notes: "يرجى التسليم في الصباح",
  products: [
    {
      id: 1686824567890,
      name: "منتج 1",
      price: 150,
      quantity: 2,
      total: 300
    },
    {
      id: 1686824567891,
      name: "منتج 2",
      price: 200,
      quantity: 1,
      total: 200
    }
  ],
  subtotal: 500,
  tax: 75,        // 500 × 0.15
  shipping: 15,
  discount: 0,
  total: 590      // 500 + 75 + 15 - 0
}
```

---

## 3. صفحة تفاصيل الطلب (Order Details Page)
**المسار:** `src/app/orders/[id]/page.tsx`

### بيانات الطلب التفصيلية (Order Data)

```javascript
const order = {
  // المعلومات الأساسية
  id: "123",
  orderNumber: "ORD-123",
  date: "2023-06-15",
  status: "مكتمل",
  
  // طرق الدفع والشحن
  paymentMethod: "بطاقة ائتمان",
  shippingMethod: "شحن قياسي",
  
  // معلومات العميل
  customer: {
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "0512345678",
    address: "شارع الملك فهد، الرياض"
  },
  
  // المنتجات
  items: [
    {
      id: 1,
      name: "لابتوب HP",
      price: 3500,
      quantity: 1,
      discount: 0,
      total: 3500
    },
    {
      id: 2,
      name: "ماوس لاسلكي",
      price: 120,
      quantity: 2,
      discount: 0,
      total: 240
    },
    {
      id: 3,
      name: "لوحة مفاتيح",
      price: 150,
      quantity: 1,
      discount: 0,
      total: 150
    }
  ],
  
  // الحسابات المالية
  subtotal: 3890,
  tax: 583.5,      // 15% من المجموع الفرعي
  shipping: 50,
  discount: 0,
  total: 4523.5
};
```

---

### الأقسام المعروضة في صفحة التفاصيل

#### 1. رأس الصفحة (Page Header)

**العناصر:**
- **رقم الطلب** (Order Number): ORD-123
- **أزرار الإجراءات:**
  * **طباعة** (Print)
  * **تصدير PDF** (Export PDF)
  * **تعديل** (Edit)

---

#### 2. المنتجات (Products Section)

**جدول المنتجات يحتوي على:**

1. **الصورة** (Image)
   - أيقونة افتراضية (Package Icon)

2. **المنتج** (Product)
   - اسم المنتج

3. **السعر** (Price)
   - سعر الوحدة الواحدة

4. **الكمية** (Quantity)
   - عدد الوحدات المطلوبة

5. **الخصم** (Discount)
   - نسبة الخصم (%)

6. **الإجمالي** (Total)
   - السعر × الكمية - الخصم

**زر تعديل المنتجات:**
- رابط لتعديل منتجات الطلب

---

#### 3. معلومات العميل (Customer Information)

**الحقول:**

1. **الاسم** (Name)
   - أيقونة: User
   - القيمة: محمد أحمد

2. **الهاتف** (Phone)
   - أيقونة: Phone
   - القيمة: 0512345678

3. **البريد الإلكتروني** (Email)
   - أيقونة: Mail
   - القيمة: mohammed@example.com

4. **العنوان** (Address)
   - أيقونة: MapPin
   - القيمة: شارع الملك فهد، الرياض

---

#### 4. الشحن والدفع (Shipping and Payment)

**الحقول:**

1. **تاريخ الطلب** (Order Date)
   - أيقونة: Clock
   - القيمة: 2023-06-15

2. **طريقة الدفع** (Payment Method)
   - أيقونة: CreditCard
   - القيمة: بطاقة ائتمان

3. **طريقة الشحن** (Shipping Method)
   - أيقونة: Truck
   - القيمة: شحن قياسي

4. **حالة الطلب** (Order Status)
   - مؤشر ملون + النص
   - القيمة: مكتمل

---

#### 5. ملخص الطلب (Order Summary)

**الحقول المالية:**

```javascript
{
  subtotal: 3890,     // المجموع الفرعي
  tax: 583.5,         // الضريبة (15%)
  shipping: 50,       // الشحن
  discount: 0,        // الخصم
  total: 4523.5       // الإجمالي
}
```

**الأزرار:**
1. **إرسال الإيصال** (Send Receipt)
   - نوع: Outline

2. **تغيير الحالة** (Change Status)
   - نوع: Default

---

#### 6. سجل الطلب (Order History)

**سجل الأحداث:**

```javascript
[
  {
    date: "2023-06-15 14:30",
    status: "تم إنشاء الطلب",
    user: "أحمد محمد"
  },
  {
    date: "2023-06-15 15:45",
    status: "تمت الموافقة على الطلب",
    user: "سارة خالد"
  },
  {
    date: "2023-06-16 09:15",
    status: "تم شحن الطلب",
    user: "فهد عبدالله"
  },
  {
    date: "2023-06-18 11:30",
    status: "تم تسليم الطلب",
    user: "نظام"
  }
]
```

**الحقول لكل حدث:**
- **التاريخ والوقت** (Date & Time)
- **الحالة/الحدث** (Status/Event)
- **المستخدم** (User)
- **مؤشر ملون** (Colored Indicator)

---

## دالة ألوان الحالة (Status Color Function)

```javascript
function getStatusColor(status) {
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
```

---

## الحسابات والصيغ (Calculations & Formulas)

### في صفحة إضافة طلب:

1. **إجمالي المنتج الواحد:**
   ```
   Product Total = Price × Quantity
   ```

2. **المجموع الفرعي:**
   ```
   Subtotal = Σ(Product Total)
   ```

3. **الضريبة:**
   ```
   Tax = Subtotal × 0.15
   ```

4. **الإجمالي:**
   ```
   Total = Subtotal + Tax + Shipping - Discount
   ```

### مثال حسابي كامل:

```
المنتجات:
- لابتوب HP: 3500 × 1 = 3500
- ماوس لاسلكي: 120 × 2 = 240
- لوحة مفاتيح: 150 × 1 = 150

المجموع الفرعي = 3500 + 240 + 150 = 3890
الضريبة = 3890 × 0.15 = 583.5
الشحن = 50
الخصم = 0

الإجمالي = 3890 + 583.5 + 50 - 0 = 4523.5
```

---

## حالات الطلب المتاحة (Available Order Statuses)

| الحالة | اللون | الفئة CSS |
|--------|-------|-----------|
| **مكتمل** (Completed) | أخضر | `bg-green-100 text-green-800` |
| **قيد التجهيز** (Processing) | أزرق | `bg-blue-100 text-blue-800` |
| **قيد الشحن** (Shipping) | أصفر | `bg-yellow-100 text-yellow-800` |
| **ملغي** (Cancelled) | أحمر | `bg-red-100 text-red-800` |

---

## طرق الدفع المتاحة (Payment Methods)

1. **نقدي** (Cash)
   - القيمة: `cash`

2. **بطاقة ائتمان** (Credit Card)
   - القيمة: `credit-card`

3. **تحويل بنكي** (Bank Transfer)
   - القيمة: `bank-transfer`

---

## طرق الشحن المتاحة (Shipping Methods)

1. **شحن قياسي** (Standard Shipping)
   - القيمة: `standard`
   - التكلفة: 15 ريال

2. **شحن سريع** (Express Shipping)
   - القيمة: `express`

3. **استلام من الفرع** (Pickup)
   - القيمة: `pickup`

---

## الميزات المشتركة بين الصفحات

### 1. الترجمة (i18n)
- دعم اللغتين العربية والإنجليزية
- استخدام `next-intl` للترجمة
- مفاتيح الترجمة:
  * `orders` - للنصوص الخاصة بالطلبات
  * `addOrder` - لصفحة إضافة طلب
  * `orderDetails` - لتفاصيل الطلب
  * `common` - للنصوص المشتركة

### 2. الجداول (Tables)
- دعم الاتجاه من اليمين لليسار (RTL) للعربية
- دعم الاتجاه من اليسار لليمين (LTR) للإنجليزية

### 3. التحقق من الصحة (Validation)
في صفحة إضافة طلب، يتم تعطيل زر الحفظ إذا:
- لم يتم اختيار عميل
- قائمة المنتجات فارغة

---

## ملاحظات تقنية (Technical Notes)

### State Management
جميع الصفحات تستخدم React `useState` لإدارة الحالة المحلية:
- `searchQuery` - نص البحث
- `dateFilter` - فلتر التاريخ
- `customer` - العميل المحدد
- `products` - قائمة المنتجات
- `orderDate` - تاريخ الطلب
- `paymentMethod` - طريقة الدفع
- `shippingMethod` - طريقة الشحن
- وغيرها...

### التوجيه (Routing)
- `/orders` - قائمة الطلبات
- `/add-order` - إضافة طلب جديد
- `/orders/[id]` - تفاصيل طلب محدد
- `/orders/[id]/edit` - تعديل طلب محدد (مذكور في الكود)

### المكونات المستخدمة (Components)
- Card, CardContent, CardHeader, CardTitle
- Button
- Input
- Label
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Textarea
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow

### الأيقونات المستخدمة (Icons from lucide-react)
- Plus
- Search
- Filter
- Download
- Eye
- FileEdit
- Trash2
- Calendar
- ShoppingCart
- TrendingUp
- AlertCircle
- ArrowLeft
- Package
- Printer
- Edit
- Clock
- CreditCard
- Truck
- User
- Phone
- Mail
- MapPin

---

## سير العمل (Workflow)

### إنشاء طلب جديد:

1. **الانتقال لصفحة إضافة طلب** → `/add-order`
2. **البحث عن العميل** → إدخال اسم أو رقم العميل
3. **اختيار العميل** → تأكيد العميل المحدد
4. **إضافة المنتجات:**
   - النقر على "إضافة منتج"
   - اختيار المنتج
   - تحديد الكمية
   - تكرار العملية لإضافة منتجات أخرى
5. **إدخال تفاصيل الطلب:**
   - تحديد تاريخ الطلب
   - اختيار طريقة الدفع
   - اختيار طريقة الشحن
   - إضافة ملاحظات (اختياري)
6. **مراجعة الملخص:**
   - التحقق من المجموع الفرعي
   - مراجعة الضريبة والشحن
   - التحقق من الإجمالي النهائي
7. **تأكيد الطلب** → حفظ الطلب

### عرض تفاصيل الطلب:

1. **من قائمة الطلبات** → النقر على زر "عرض" 👁️
2. **مراجعة جميع التفاصيل:**
   - المنتجات والأسعار
   - معلومات العميل
   - طرق الدفع والشحن
   - الملخص المالي
   - سجل الأحداث
3. **إجراءات إضافية:**
   - طباعة الطلب
   - تصدير PDF
   - تعديل الطلب
   - تغيير الحالة
   - إرسال الإيصال

---

## الخلاصة

هذا الملف يحتوي على:
- ✅ جميع الحقول في صفحة قائمة الطلبات
- ✅ بطاقات الإحصائيات
- ✅ جميع الحقول في صفحة إضافة طلب
- ✅ جميع الحقول والبيانات في صفحة تفاصيل الطلب
- ✅ هيكل البيانات (Data Structures)
- ✅ الدوال والحسابات المالية
- ✅ حالات الطلب وألوانها
- ✅ طرق الدفع والشحن
- ✅ سير العمل الكامل
- ✅ المكونات والأيقونات المستخدمة
- ✅ سجل الأحداث

---

**تاريخ إنشاء الملف:** 2026-08-13  
**المسار:** `ORDERS_DATA.md`
