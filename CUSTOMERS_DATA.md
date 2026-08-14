# بيانات صفحات العملاء - Customers Pages Data

هذا الملف يحتوي على جميع البيانات والحقول الموجودة في صفحات العملاء في النظام.

---

## 1. صفحة قائمة العملاء (Customers List Page)
**المسار:** `src/app/customers/page.tsx`

### بطاقات الإحصائيات (Statistics Cards)

#### 1. إجمالي العملاء (Total Customers)
```javascript
{
  label: "إجمالي العملاء",
  value: 128,
  description: "عملاء جدد هذا الشهر",
  icon: "Users"
}
```

#### 2. عملاء جدد (New Customers)
```javascript
{
  label: "عملاء جدد",
  value: 12,
  description: "مقارنة بالشهر الماضي",
  icon: "UserPlus"
}
```

#### 3. متوسط الطلبات لكل عميل (Average Orders Per Customer)
```javascript
{
  label: "متوسط الطلبات لكل عميل",
  value: 3.5,
  description: "مقارنة بالمتوسط",
  icon: "Phone"
}
```

---

### بيانات العملاء (Customers Data)

```javascript
const customers = [
  {
    id: 1,
    name: "أحمد محمد",
    phone: "0512345678",
    email: "ahmed@example.com",
    orders: 5,
    totalSpent: 1250,
    lastOrder: "2023-06-15"
  },
  {
    id: 2,
    name: "سارة أحمد",
    phone: "0523456789",
    email: "sara@example.com",
    orders: 3,
    totalSpent: 850,
    lastOrder: "2023-06-10"
  },
  {
    id: 3,
    name: "محمد علي",
    phone: "0534567890",
    email: "mohamed@example.com",
    orders: 8,
    totalSpent: 2100,
    lastOrder: "2023-06-14"
  },
  {
    id: 4,
    name: "فاطمة حسن",
    phone: "0545678901",
    email: "fatima@example.com",
    orders: 2,
    totalSpent: 450,
    lastOrder: "2023-06-08"
  },
  {
    id: 5,
    name: "خالد عبدالله",
    phone: "0556789012",
    email: "khaled@example.com",
    orders: 6,
    totalSpent: 1800,
    lastOrder: "2023-06-12"
  }
];
```

---

### الحقول المعروضة في جدول العملاء

1. **الاسم** (Name)
   - اسم العميل الكامل

2. **الهاتف** (Phone)
   - رقم الهاتف
   - تنسيق: 05XXXXXXXX

3. **البريد الإلكتروني** (Email)
   - عنوان البريد الإلكتروني

4. **عدد الطلبات** (Orders Count)
   - إجمالي عدد الطلبات للعميل

5. **إجمالي الإنفاق** (Total Spent)
   - المبلغ الإجمالي الذي أنفقه العميل
   - العملة: ريال سعودي

6. **آخر طلب** (Last Order)
   - تاريخ آخر طلب
   - تنسيق: YYYY-MM-DD

7. **الإجراءات** (Actions)
   - **عرض** (View) - عرض تفاصيل العميل
   - **تعديل** (Edit) - تعديل بيانات العميل
   - **حذف** (Delete) - حذف العميل

---

### الميزات المتاحة في صفحة العملاء

#### 1. البحث (Search)
- نوع: نص (Text Input)
- متغير: `searchQuery`
- البحث بالضغط على Enter أو زر البحث

#### 2. الفلترة (Filter)
- زر لفتح خيارات الفلترة

#### 3. التصدير (Export)
- تصدير بيانات العملاء

#### 4. إضافة عميل جديد (Add New Customer)
- رابط إلى: `/customers/add`

#### 5. ترقيم الصفحات (Pagination)
- صفحات متعددة للتنقل بين العملاء

---

## 2. صفحة إضافة عميل (Add Customer Page)
**المسار:** `src/app/customers/add/page.tsx`

### الأقسام الرئيسية

---

#### أ. المعلومات الأساسية (Basic Information)

**الحقول:**

1. **اسم العميل** (Customer Name)
   - نوع: نص (Text Input)
   - أيقونة: User
   - مطلوب

2. **البريد الإلكتروني** (Email)
   - نوع: بريد إلكتروني (Email Input)
   - أيقونة: Mail
   - مطلوب

3. **الهاتف** (Phone)
   - نوع: نص (Text Input)
   - أيقونة: Phone
   - مطلوب

4. **نوع العميل** (Customer Type)
   - نوع: قائمة منسدلة (Select)
   - الخيارات:
     * **فرد** (Individual) - `value: "individual"`
     * **شركة** (Company) - `value: "company"`
     * **جهة حكومية** (Government) - `value: "government"`

5. **الجنس** (Gender)
   - نوع: قائمة منسدلة (Select)
   - الخيارات:
     * **ذكر** (Male) - `value: "male"`
     * **أنثى** (Female) - `value: "female"`

---

#### ب. العنوان (Address)

**الحقول:**

1. **العنوان** (Address)
   - نوع: نص (Text Input)
   - أيقونة: MapPin
   - الوصف: العنوان التفصيلي (الشارع، رقم المبنى)

2. **المدينة** (City)
   - نوع: نص (Text Input)
   - مثال: الرياض، جدة، الدمام

3. **المنطقة/الولاية** (State)
   - نوع: نص (Text Input)
   - مثال: منطقة الرياض، منطقة مكة المكرمة

4. **الرمز البريدي** (Postal Code)
   - نوع: نص (Text Input)
   - تنسيق: 5 أرقام

5. **الدولة** (Country)
   - نوع: قائمة منسدلة (Select)
   - الخيارات:
     * **المملكة العربية السعودية** (Saudi Arabia) - `value: "sa"`
     * **الإمارات العربية المتحدة** (UAE) - `value: "ae"`
     * **الكويت** (Kuwait) - `value: "kw"`
     * **البحرين** (Bahrain) - `value: "bh"`
     * **قطر** (Qatar) - `value: "qa"`
     * **عمان** (Oman) - `value: "om"`

---

### هيكل بيانات العميل عند الحفظ

```javascript
{
  // المعلومات الأساسية
  name: string,          // اسم العميل
  email: string,         // البريد الإلكتروني
  phone: string,         // الهاتف
  type: string,          // نوع العميل (individual/company/government)
  gender: string,        // الجنس (male/female)
  
  // العنوان
  address: string,       // العنوان التفصيلي
  city: string,          // المدينة
  state: string,         // المنطقة
  postalCode: string,    // الرمز البريدي
  country: string        // الدولة (sa/ae/kw/etc)
}
```

---

### مثال على بيانات عميل كامل

```javascript
{
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "0512345678",
  type: "individual",
  gender: "male",
  address: "شارع الملك فهد، حي النخيل",
  city: "الرياض",
  state: "منطقة الرياض",
  postalCode: "12345",
  country: "sa"
}
```

---

## 3. صفحة تفاصيل العميل (Customer Details Page)
**المسار:** `src/app/customers/[id]/page.tsx`

### بيانات العميل التفصيلية (Customer Data)

```javascript
const customer = {
  // المعلومات الأساسية
  id: "123",
  name: "محمد أحمد",
  email: "mohammed@example.com",
  phone: "0512345678",
  type: "فرد",
  status: "نشط",
  
  // العنوان
  address: "شارع الملك فهد",
  city: "الرياض",
  state: "منطقة الرياض",
  postalCode: "12345",
  country: "المملكة العربية السعودية",
  
  // المعلومات المالية
  taxNumber: "300000000000003",
  paymentTerms: "30 يوم",
  creditLimit: 10000,
  totalSpent: 25650,
  
  // التواريخ
  joinDate: "2022-03-15",
  lastPurchase: "2023-06-10",
  
  // الإحصائيات
  totalOrders: 12,
  
  // ملاحظات
  notes: "عميل مهم. يفضل المنتجات الإلكترونية عالية الجودة.",
  
  // الطلبات الأخيرة
  orders: [
    {
      id: 1001,
      date: "2023-06-10",
      total: 3500,
      status: "مكتمل",
      items: 3
    },
    {
      id: 1002,
      date: "2023-05-22",
      total: 1200,
      status: "مكتمل",
      items: 2
    },
    {
      id: 1003,
      date: "2023-04-15",
      total: 4800,
      status: "مكتمل",
      items: 5
    },
    {
      id: 1004,
      date: "2023-03-08",
      total: 950,
      status: "مكتمل",
      items: 1
    },
    {
      id: 1005,
      date: "2023-02-17",
      total: 2700,
      status: "مكتمل",
      items: 3
    }
  ],
  
  // سجل المشتريات الشهري
  purchaseHistory: [
    { month: "يناير", amount: 0 },
    { month: "فبراير", amount: 2700 },
    { month: "مارس", amount: 950 },
    { month: "أبريل", amount: 4800 },
    { month: "مايو", amount: 1200 },
    { month: "يونيو", amount: 3500 }
  ]
};
```

---

### الأقسام المعروضة في صفحة التفاصيل

#### 1. رأس الصفحة (Page Header)

**العناصر:**
- **الصورة الرمزية** (Avatar)
  - أيقونة افتراضية (User Icon)
  - دائرية مع خلفية رمادية

- **المعلومات الأساسية:**
  * الاسم (Name)
  * البريد الإلكتروني (Email) مع أيقونة
  * الهاتف (Phone) مع أيقونة
  * الحالة (Status) - نشط/غير نشط مع مؤشر ملون
  * النوع (Type) - فرد/شركة/جهة حكومية

- **أزرار الإجراءات:**
  * **تعديل** (Edit)
  * **حذف** (Delete)

---

#### 2. معلومات العميل (Customer Information)

**الحقول:**

##### أ. البيانات الأساسية

1. **تاريخ الانضمام** (Join Date)
   - القيمة: 2022-03-15

2. **آخر عملية شراء** (Last Purchase)
   - القيمة: 2023-06-10

3. **عدد الطلبات** (Orders Count)
   - القيمة: 12

4. **إجمالي الإنفاق** (Total Spent)
   - القيمة: 25,650 ريال

##### ب. المعلومات المالية

5. **شروط الدفع** (Payment Terms)
   - أيقونة: CreditCard
   - القيمة: 30 يوم

6. **الحد الائتماني** (Credit Limit)
   - القيمة: 10,000 ريال
   - **شريط التقدم:**
     * يعرض نسبة الإنفاق من الحد الائتماني
     * الحساب: (totalSpent / creditLimit) × 100
     * مثال: (25,650 / 10,000) × 100 = 257% (تجاوز الحد)

7. **الرقم الضريبي** (Tax Number)
   - القيمة: 300000000000003
   - اختياري

8. **الملاحظات** (Notes)
   - نص حر
   - اختياري

---

#### 3. العنوان (Address Section)

**الحقول:**

- أيقونة: MapPin
- **عنوان كامل:**
  * الشارع/المبنى
  * المدينة، المنطقة
  * الرمز البريدي
  * الدولة

**زر:**
- **عرض على الخريطة** (View on Map)

---

#### 4. سجل المشتريات (Purchase History)

**رسم بياني عمودي** (Bar Chart)

- **البيانات:**
  * المحور الأفقي: الأشهر (يناير - يونيو)
  * المحور الرأسي: المبلغ (0 - 5000)

```javascript
purchaseHistory: [
  { month: "يناير", amount: 0 },
  { month: "فبراير", amount: 2700 },
  { month: "مارس", amount: 950 },
  { month: "أبريل", amount: 4800 },
  { month: "مايو", amount: 1200 },
  { month: "يونيو", amount: 3500 }
]
```

- **الحساب:**
  * ارتفاع العمود = (amount / 5000) × 150px
  * إجمالي المشتريات = 13,150 ريال

- **زر:**
  * **عرض الكل** (View All)

---

#### 5. الإجراءات السريعة (Quick Actions)

**الأزرار:**

1. **إنشاء طلب جديد** (Create New Order)
   - أيقونة: ShoppingCart
   - رابط: `/add-order?customer={customer.id}`

2. **إرسال بريد إلكتروني** (Send Email)
   - أيقونة: Mail

3. **تحديث الحد الائتماني** (Update Credit Limit)
   - أيقونة: CreditCard

---

#### 6. الطلبات الأخيرة (Recent Orders)

**قائمة الطلبات:**

كل طلب يحتوي على:
- **أيقونة:** ShoppingCart في مربع رمادي
- **رقم الطلب** (Order Number): #1001
- **التفاصيل:**
  * التاريخ (Date)
  * عدد الأصناف (Items Count)
  * المبلغ الإجمالي (Total)
- **حالة الطلب** (Status) - شارة ملونة

**مثال:**
```javascript
{
  id: 1001,
  date: "2023-06-10",
  total: 3500,
  status: "مكتمل",
  items: 3
}
```

**زر:**
- **عرض جميع الطلبات** (View All Orders)
  - يظهر إذا كان عدد الطلبات > 5
  - رابط: `/customers/{id}/orders`

---

#### 7. سجل النشاطات (Activity Log)

**سجل الأحداث:**

```javascript
[
  {
    date: "2023-06-10 14:30",
    action: "إنشاء طلب",
    details: "طلب رقم #1001"
  },
  {
    date: "2023-05-22 11:15",
    action: "إنشاء طلب",
    details: "طلب رقم #1002"
  },
  {
    date: "2023-05-05 09:45",
    action: "تحديث المعلومات",
    details: "تحديث رقم الهاتف"
  },
  {
    date: "2023-04-15 16:20",
    action: "إنشاء طلب",
    details: "طلب رقم #1003"
  },
  {
    date: "2022-03-15 10:00",
    action: "إنشاء الحساب",
    details: "تسجيل العميل"
  }
]
```

**الحقول لكل حدث:**
- **مؤشر ملون** (Colored Dot) - أزرق
- **الإجراء** (Action) - نص غامق
- **التفاصيل** (Details) - نص رمادي
- **التاريخ والوقت** (Date & Time) - مع أيقونة Clock

---

## دالة ألوان حالة الطلب (Order Status Color Function)

```javascript
function getStatusColor(status) {
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
```

---

## الحسابات والصيغ (Calculations & Formulas)

### 1. نسبة استخدام الحد الائتماني:
```
Credit Usage % = (Total Spent / Credit Limit) × 100
```

**مثال:**
```
Credit Usage = (25,650 / 10,000) × 100 = 257%
```

### 2. متوسط قيمة الطلب:
```
Average Order Value = Total Spent / Total Orders
```

**مثال:**
```
Average Order Value = 25,650 / 12 = 2,137.5 ريال
```

### 3. إجمالي المشتريات الشهرية:
```
Total Monthly Purchases = Σ(Purchase History Amounts)
```

**مثال:**
```
Total = 0 + 2700 + 950 + 4800 + 1200 + 3500 = 13,150 ريال
```

### 4. ارتفاع عمود الرسم البياني:
```
Bar Height = (amount / max_amount) × chart_height
```

**مثال:**
```
Bar Height (أبريل) = (4800 / 5000) × 150 = 144px
```

---

## أنواع العملاء (Customer Types)

| النوع | القيمة | الوصف |
|-------|--------|-------|
| **فرد** (Individual) | `individual` | عميل فردي عادي |
| **شركة** (Company) | `company` | شركة أو مؤسسة |
| **جهة حكومية** (Government) | `government` | جهة حكومية أو رسمية |

---

## الجنس (Gender Options)

| الجنس | القيمة |
|-------|--------|
| **ذكر** (Male) | `male` |
| **أنثى** (Female) | `female` |

---

## الدول المتاحة (Available Countries)

| الدولة | الرمز | القيمة |
|--------|-------|--------|
| **المملكة العربية السعودية** (Saudi Arabia) | 🇸🇦 | `sa` |
| **الإمارات العربية المتحدة** (UAE) | 🇦🇪 | `ae` |
| **الكويت** (Kuwait) | 🇰🇼 | `kw` |
| **البحرين** (Bahrain) | 🇧🇭 | `bh` |
| **قطر** (Qatar) | 🇶🇦 | `qa` |
| **عمان** (Oman) | 🇴🇲 | `om` |

---

## حالات العميل (Customer Status)

| الحالة | اللون | الوصف |
|--------|-------|-------|
| **نشط** (Active) | أخضر `bg-green-500` | عميل نشط يقوم بالشراء |
| **غير نشط** (Inactive) | أحمر `bg-red-500` | عميل متوقف عن الشراء |

---

## أنواع النشاطات (Activity Types)

1. **إنشاء طلب** (Create Order)
   - عند إنشاء طلب جديد للعميل

2. **تحديث المعلومات** (Update Information)
   - عند تعديل بيانات العميل

3. **إنشاء الحساب** (Account Created)
   - عند تسجيل العميل لأول مرة

4. **تغيير الحالة** (Status Change)
   - عند تغيير حالة العميل

5. **تحديث الحد الائتماني** (Credit Limit Update)
   - عند تعديل الحد الائتماني

---

## الميزات المشتركة بين الصفحات

### 1. الترجمة (i18n)
- دعم اللغتين العربية والإنجليزية
- استخدام `next-intl` للترجمة
- مفاتيح الترجمة:
  * `customers` - للنصوص الخاصة بالعملاء
  * `common` - للنصوص المشتركة
  * `orders` - لنصوص الطلبات في صفحة تفاصيل العميل

### 2. الجداول (Tables)
- دعم الاتجاه من اليمين لليسار (RTL) للعربية
- دعم الاتجاه من اليسار لليمين (LTR) للإنجليزية

### 3. التحقق من الصحة (Validation)
- جميع الحقول الأساسية مطلوبة:
  * الاسم
  * البريد الإلكتروني
  * الهاتف

---

## ملاحظات تقنية (Technical Notes)

### State Management
استخدام React `useState` لإدارة الحالة المحلية:
- `searchQuery` - نص البحث

### التوجيه (Routing)
- `/customers` - قائمة العملاء
- `/customers/add` - إضافة عميل جديد
- `/customers/[id]` - تفاصيل عميل محدد
- `/customers/[id]/edit` - تعديل عميل محدد (مذكور في الكود)
- `/customers/[id]/orders` - طلبات عميل محدد (مذكور في الكود)

### المكونات المستخدمة (Components)
- Card, CardContent, CardHeader, CardTitle
- Button
- Input
- Label
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow

### الأيقونات المستخدمة (Icons from lucide-react)
- Plus
- Search
- Filter
- Download
- Eye
- FileEdit
- Trash2
- Users
- UserPlus
- Phone
- ArrowLeft
- Save
- User
- Mail
- MapPin
- ShoppingCart
- CreditCard
- Calendar
- Clock
- Edit

---

## سير العمل (Workflow)

### إضافة عميل جديد:

1. **الانتقال لصفحة إضافة عميل** → `/customers/add`
2. **إدخال المعلومات الأساسية:**
   - الاسم الكامل
   - البريد الإلكتروني
   - رقم الهاتف
   - اختيار نوع العميل
   - اختيار الجنس
3. **إدخال العنوان:**
   - العنوان التفصيلي
   - المدينة
   - المنطقة
   - الرمز البريدي
   - اختيار الدولة
4. **الحفظ** → حفظ بيانات العميل

### عرض تفاصيل العميل:

1. **من قائمة العملاء** → النقر على زر "عرض" 👁️
2. **مراجعة جميع التفاصيل:**
   - المعلومات الشخصية
   - المعلومات المالية
   - العنوان
   - سجل المشتريات (رسم بياني)
   - الطلبات الأخيرة
   - سجل النشاطات
3. **إجراءات إضافية:**
   - إنشاء طلب جديد للعميل
   - إرسال بريد إلكتروني
   - تحديث الحد الائتماني
   - تعديل البيانات
   - حذف العميل

---

## معايير الأداء (Performance Metrics)

### مؤشرات الأداء الرئيسية (KPIs):

1. **متوسط قيمة الطلب** (Average Order Value - AOV)
   ```
   AOV = Total Spent / Total Orders
   ```

2. **تكرار الشراء** (Purchase Frequency)
   ```
   Purchase Frequency = Total Orders / Months Since Join
   ```

3. **القيمة الدائمة للعميل** (Customer Lifetime Value - CLV)
   ```
   CLV = Average Order Value × Purchase Frequency × Customer Lifespan
   ```

4. **معدل العودة** (Return Rate)
   ```
   Return Rate = (Customers with > 1 Order / Total Customers) × 100
   ```

---

## التقارير المتاحة (Available Reports)

1. **تقرير أفضل العملاء** (Top Customers Report)
   - الترتيب حسب إجمالي الإنفاق
   - الترتيب حسب عدد الطلبات

2. **تقرير العملاء الجدد** (New Customers Report)
   - عملاء الشهر الحالي
   - مقارنة شهرية

3. **تقرير النشاط** (Activity Report)
   - آخر نشاط لكل عميل
   - العملاء غير النشطين

4. **تقرير الحد الائتماني** (Credit Limit Report)
   - العملاء القريبين من الحد
   - العملاء المتجاوزين للحد

---

## الخلاصة

هذا الملف يحتوي على:
- ✅ جميع الحقول في صفحة قائمة العملاء
- ✅ بطاقات الإحصائيات
- ✅ جميع الحقول في صفحة إضافة عميل
- ✅ جميع الحقول والبيانات في صفحة تفاصيل العميل
- ✅ هيكل البيانات (Data Structures)
- ✅ الدوال والحسابات
- ✅ أنواع العملاء والدول المتاحة
- ✅ سجل النشاطات والطلبات
- ✅ الرسوم البيانية والإحصائيات
- ✅ معايير الأداء والتقارير
- ✅ سير العمل الكامل
- ✅ المكونات والأيقونات المستخدمة

---

**تاريخ إنشاء الملف:** 2026-08-13  
**المسار:** `CUSTOMERS_DATA.md`
