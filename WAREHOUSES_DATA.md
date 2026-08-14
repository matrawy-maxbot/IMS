# بيانات صفحة المستودعات - Warehouses Page Data

هذا الملف يحتوي على جميع البيانات والحقول الموجودة في صفحة المستودعات (Warehouses).

---

## صفحة المستودعات (Warehouses Page)
**المسار:** `src/app/warehouses/page.tsx`

**الوصف:** صفحة لإدارة المستودعات، مع إمكانية إضافة وتعديل وحذف المستودعات، وعرض إحصائيات شاملة عن كل مستودع.

---

## هيكل بيانات المستودع (Warehouse Data Structure)

```typescript
type Warehouse = {
  id: string;                // معرف المستودع (timestamp)
  name: string;              // اسم المستودع
  location: string;          // الموقع/العنوان
  manager: string;           // اسم المدير
  phone: string;             // رقم الهاتف
  email: string;             // البريد الإلكتروني
  description: string;       // الوصف
  totalProducts: number;     // إجمالي المنتجات
  totalValue: number;        // إجمالي القيمة
  lowStockItems: number;     // عدد الأصناف المنخفضة المخزون
  status: "active" | "inactive";  // الحالة
  createdAt: string;         // تاريخ الإنشاء (YYYY-MM-DD)
};
```

---

## نموذج البيانات (Form Data)

```typescript
type FormData = {
  name: string;              // اسم المستودع
  location: string;          // الموقع
  manager: string;           // المدير
  phone: string;             // الهاتف
  email: string;             // البريد الإلكتروني
  description: string;       // الوصف
};
```

---

## بطاقات الإحصائيات (Statistics Cards)

### 1. إجمالي المستودعات (Total Warehouses)

```javascript
{
  label: "إجمالي المستودعات",
  value: stats.totalWarehouses,     // عدد جميع المستودعات
  detail: `${stats.activeWarehouses} نشط`,
  icon: "Building2",
  color: "primary"
}
```

**الميزات:**
- أيقونة: Building2
- خلفية أيقونة: `bg-muted`
- لون الأيقونة: `text-primary`
- تفاصيل إضافية: عدد المستودعات النشطة

---

### 2. إجمالي المنتجات (Total Products)

```javascript
{
  label: "إجمالي المنتجات",
  value: stats.totalProducts,       // مجموع المنتجات في جميع المستودعات
  detail: "في جميع المستودعات",
  icon: "Package",
  color: "primary"
}
```

**الحساب:**
```javascript
const totalProducts = warehouses.reduce((sum, w) => sum + w.totalProducts, 0);
```

---

### 3. إجمالي قيمة المخزون (Total Inventory Value)

```javascript
{
  label: "إجمالي قيمة المخزون",
  value: stats.totalValue.toLocaleString(),  // القيمة بالريال السعودي
  detail: "ريال سعودي",
  icon: "DollarSign",
  color: "primary"
}
```

**الحساب:**
```javascript
const totalValue = warehouses.reduce((sum, w) => sum + w.totalValue, 0);
```

---

### 4. تنبيهات المخزون المنخفض (Low Stock Alerts)

```javascript
{
  label: "تنبيهات المخزون المنخفض",
  value: stats.totalLowStockItems,   // عدد الأصناف التي تحتاج إعادة تخزين
  detail: "صنف يحتاج إعادة تخزين",
  icon: "TrendingUp",
  color: "primary"
}
```

**الحساب:**
```javascript
const totalLowStockItems = warehouses.reduce((sum, w) => sum + w.lowStockItems, 0);
```

---

## تصميم البطاقات الإحصائية (Card Design)

### الميزات:
- **تأثير الـ Hover:** `hover:shadow-lg transition-all duration-300`
- **التخطيط:**
  * أيقونة في مربع مستدير: `p-3 rounded-xl bg-muted`
  * نص العنوان: `text-xs font-medium text-muted-foreground uppercase tracking-wide`
  * القيمة الكبيرة: `text-2xl font-bold`
  * التفاصيل: `text-xs text-muted-foreground`

---

## بطاقة إضافة مستودع جديد (Add New Warehouse Card)

### التصميم:
```jsx
<Card className="group relative overflow-hidden border-2 border-dashed border-muted-foreground/25 hover:border-primary hover:bg-accent transition-all duration-300 cursor-pointer">
```

### الميزات:
- **حدود منقطة:** `border-2 border-dashed`
- **تأثير الـ Hover:**
  * تغيير اللون: `hover:border-primary`
  * خلفية مميزة: `hover:bg-accent`
- **الأيقونة:**
  * تكبير: `group-hover:scale-110`
  * دوران: `group-hover:rotate-90`
  * مدة الانتقال: `transition-transform duration-300`
- **الحد الأدنى للارتفاع:** `min-h-[280px]`

### المحتوى:
- أيقونة Plus كبيرة
- نص: "إضافة مستودع جديد"
- وصف: "انقر لإضافة مستودع"

---

## بطاقات المستودعات الموجودة (Warehouse Cards)

### هيكل البطاقة:

```jsx
<Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
```

### رأس البطاقة (Header):

1. **أيقونة المستودع:**
   - `p-3 rounded-xl bg-muted`
   - أيقونة: Warehouse
   - لون: `text-primary`

2. **معلومات أساسية:**
   - **اسم المستودع:** `text-lg font-semibold`
   - **الموقع:** `text-sm text-muted-foreground`

3. **قائمة الإجراءات (Dropdown Menu):**
   - زر: MoreVertical
   - الخيارات:
     * **تعديل** (Edit) - أيقونة Edit
     * **حذف** (Delete) - أيقونة Trash2 (أحمر)

---

### محتوى البطاقة (Content):

#### 1. شبكة الإحصائيات (Statistics Grid):

```jsx
<div className="flex items-center justify-between gap-6 py-4">
```

**الأقسام الثلاثة:**

| القسم | القيمة | الوصف |
|-------|--------|-------|
| **المنتجات** | `totalProducts` | عدد المنتجات في المستودع |
| **القيمة** | `(totalValue / 1000).toFixed(0)K` | قيمة المخزون بالآلاف |
| **مخزون منخفض** | `lowStockItems` | عدد الأصناف المنخفضة |

**التصميم:**
- نص كبير: `text-2xl font-bold`
- وصف: `text-sm text-muted-foreground font-medium`
- فواصل عمودية: `h-12 w-px bg-border`

---

#### 2. أزرار الإجراءات (Action Buttons):

```jsx
<div className="flex items-center gap-2">
```

**الأزرار:**
1. **عرض التفاصيل** (View Details)
   - أيقونة: Eye
   - نوع: outline
   - حجم: icon (10x10)

2. **إدارة المستودع** (Manage Warehouse)
   - نص كامل
   - نوع: default
   - عرض كامل: `flex-1`
   - ارتفاع: `h-10`

---

## نافذة إضافة مستودع (Add Warehouse Dialog)

### حالة النافذة:
```javascript
const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
```

### الحقول:

1. **اسم المستودع** (Warehouse Name)
   - نوع: نص (Text Input)
   - مطلوب
   - Placeholder: "مستودع الرياض الرئيسي"

2. **الموقع** (Location)
   - نوع: نص (Text Input)
   - مطلوب
   - Placeholder: "شارع الملك فهد، الرياض"

3. **المدير** (Manager)
   - نوع: نص (Text Input)
   - مطلوب
   - Placeholder: "أحمد محمد"

4. **الهاتف** (Phone)
   - نوع: نص (Text Input)
   - تخطيط: نصف العرض (grid-cols-2)
   - Placeholder: "0512345678"

5. **البريد الإلكتروني** (Email)
   - نوع: بريد إلكتروني (Email Input)
   - تخطيط: نصف العرض (grid-cols-2)
   - Placeholder: "manager@example.com"

6. **الوصف** (Description)
   - نوع: نص متعدد الأسطر (Textarea)
   - عدد الأسطر: 4
   - غير قابل لتغيير الحجم: `resize-none`
   - Placeholder: "وصف المستودع والملاحظات"

### التصميم:
- الحد الأقصى للعرض: `max-w-2xl`
- الحد الأقصى للارتفاع: `max-h-[90vh]`
- قابل للتمرير: `overflow-y-auto`
- المسافات: `gap-5` و `py-6`

### الأزرار:
- **إلغاء** (Cancel) - Outline
- **حفظ** (Save) - Primary

---

## منطق إضافة المستودع (Add Warehouse Logic)

```javascript
const handleAddWarehouse = () => {
  const newWarehouse: Warehouse = {
    id: String(Date.now()),          // معرف فريد
    ...formData,                      // جميع بيانات النموذج
    totalProducts: 0,                 // قيمة افتراضية
    totalValue: 0,                    // قيمة افتراضية
    lowStockItems: 0,                 // قيمة افتراضية
    status: "active",                 // حالة افتراضية
    createdAt: new Date().toISOString().split("T")[0],  // التاريخ الحالي
  };
  addWarehouse(newWarehouse);
  setIsAddDialogOpen(false);
  // إعادة تعيين النموذج
  setFormData({
    name: "",
    location: "",
    manager: "",
    phone: "",
    email: "",
    description: "",
  });
};
```

---

## نافذة تعديل المستودع (Edit Warehouse Dialog)

### حالة النافذة:
```javascript
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
```

### الميزات:
- نفس حقول نافذة الإضافة
- تعبئة البيانات الحالية للمستودع المحدد
- نفس التصميم والتخطيط

### منطق فتح النافذة:

```javascript
const openEditDialog = (warehouse: Warehouse) => {
  setSelectedWarehouse(warehouse);
  setFormData({
    name: warehouse.name,
    location: warehouse.location,
    manager: warehouse.manager,
    phone: warehouse.phone,
    email: warehouse.email,
    description: warehouse.description,
  });
  setIsEditDialogOpen(true);
};
```

### منطق التعديل:

```javascript
const handleEditWarehouse = () => {
  if (selectedWarehouse) {
    updateWarehouse(selectedWarehouse.id, formData);
    setIsEditDialogOpen(false);
    setSelectedWarehouse(null);
    // إعادة تعيين النموذج
    setFormData({
      name: "",
      location: "",
      manager: "",
      phone: "",
      email: "",
      description: "",
    });
  }
};
```

---

## نافذة تفاصيل المستودع (Warehouse Details Dialog)

### حالة النافذة:
```javascript
const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
```

### التصميم:
- الحد الأقصى للعرض: `max-w-4xl` (أكبر من النوافذ الأخرى)
- الحد الأقصى للارتفاع: `max-h-[90vh]`
- قابل للتمرير: `overflow-y-auto`

---

### رأس النافذة (Dialog Header):

**المحتوى:**
1. **أيقونة كبيرة:**
   - حجم: `h-8 w-8`
   - خلفية: `p-4 rounded-2xl bg-primary`
   - لون: `text-primary-foreground`

2. **اسم المستودع:**
   - حجم الخط: `text-3xl font-bold`

3. **الموقع:**
   - أيقونة: MapPin
   - حجم: `text-base`
   - لون: `text-muted-foreground`

4. **شارة الحالة:**
   - نوع: Badge
   - ألوان:
     * نشط: `variant="default"`
     * غير نشط: `variant="secondary"`

---

### نظرة عامة على الإحصائيات (Statistics Overview):

شبكة من 3 بطاقات:

#### 1. إجمالي المنتجات

```jsx
<Card className="bg-primary/5">
  <CardContent className="p-6 text-center">
    <Package className="h-8 w-8 text-primary mx-auto mb-3" />
    <div className="text-3xl font-bold mb-1">
      {totalProducts}
    </div>
    <div className="text-sm text-muted-foreground font-medium">
      إجمالي المنتجات
    </div>
  </CardContent>
</Card>
```

#### 2. إجمالي القيمة

```jsx
<Card className="bg-primary/5">
  <CardContent className="p-6 text-center">
    <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
    <div className="text-3xl font-bold mb-1">
      {totalValue.toLocaleString()}
    </div>
    <div className="text-sm text-muted-foreground font-medium">
      إجمالي القيمة (ريال سعودي)
    </div>
  </CardContent>
</Card>
```

#### 3. المخزون المنخفض

```jsx
<Card className="bg-primary/5">
  <CardContent className="p-6 text-center">
    <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-3" />
    <div className="text-3xl font-bold mb-1">
      {lowStockItems}
    </div>
    <div className="text-sm text-muted-foreground font-medium">
      أصناف مخزون منخفض
    </div>
  </CardContent>
</Card>
```

**الميزات:**
- خلفية ملونة: `bg-primary/5`
- أيقونات كبيرة: `h-8 w-8`
- نص مركزي: `text-center`
- قيمة كبيرة: `text-3xl font-bold`

---

### معلومات المستودع (Warehouse Information):

شبكة معلومات بـ 2 أعمدة:

#### العمود الأول:

1. **المدير** (Manager)
   - أيقونة: User
   - عنوان: "المدير" (uppercase, tracking-wide, text-xs)
   - قيمة: `text-base font-medium`

2. **الهاتف** (Phone)
   - أيقونة: Phone
   - عنوان: "الهاتف"
   - قيمة: رقم الهاتف

#### العمود الثاني:

3. **البريد الإلكتروني** (Email)
   - أيقونة: Mail
   - عنوان: "البريد الإلكتروني"
   - قيمة: البريد (مع كسر النص: `break-all`)

4. **تاريخ الإنشاء** (Created At)
   - أيقونة: Calendar
   - عنوان: "تاريخ الإنشاء"
   - قيمة: التاريخ

#### الوصف (Description):

```jsx
{selectedWarehouse.description && (
  <div className="pt-4 border-t">
    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
      الوصف
    </div>
    <div className="text-base leading-relaxed">
      {selectedWarehouse.description}
    </div>
  </div>
)}
```

**الميزات:**
- يظهر فقط إذا كان هناك وصف
- حد علوي: `border-t`
- تباعد أسطر مريح: `leading-relaxed`

---

### تذييل النافذة (Dialog Footer):

**الأزرار:**

1. **إغلاق** (Close)
   - نوع: outline

2. **تعديل** (Edit)
   - نوع: outline
   - أيقونة: Edit
   - يفتح نافذة التعديل

3. **إدارة المستودع** (Manage Warehouse)
   - نوع: default (primary)
   - أيقونة: Settings

---

## منطق الحذف (Delete Logic)

```javascript
const handleDeleteWarehouse = (id: string) => {
  if (confirm(t("confirmDelete"))) {
    deleteWarehouse(id);
  }
};
```

**الميزات:**
- رسالة تأكيد قبل الحذف
- حذف من السياق العام (Context)

---

## السياق العام (Warehouse Context)

### الخطافات المستخدمة (Hooks):

```javascript
const { warehouses, addWarehouse, updateWarehouse, deleteWarehouse } = useWarehouse();
const stats = useWarehouseStats();
```

### الوظائف:
- `addWarehouse(warehouse)` - إضافة مستودع
- `updateWarehouse(id, data)` - تحديث مستودع
- `deleteWarehouse(id)` - حذف مستودع
- `useWarehouseStats()` - الحصول على الإحصائيات

---

## إحصائيات النظام (System Statistics)

```typescript
type WarehouseStats = {
  totalWarehouses: number;      // إجمالي المستودعات
  activeWarehouses: number;     // المستودعات النشطة
  totalProducts: number;        // إجمالي المنتجات
  totalValue: number;           // إجمالي القيمة
  totalLowStockItems: number;   // إجمالي الأصناف المنخفضة
};
```

---

## أمثلة على البيانات (Data Examples)

### مستودع نموذجي:

```javascript
{
  id: "1705311025000",
  name: "مستودع الرياض الرئيسي",
  location: "شارع الملك فهد، حي العليا، الرياض",
  manager: "أحمد محمد السعيد",
  phone: "0512345678",
  email: "riyadh@warehouse.com",
  description: "المستودع الرئيسي في مدينة الرياض، يخدم جميع فروع المنطقة الوسطى",
  totalProducts: 450,
  totalValue: 1250000,
  lowStockItems: 12,
  status: "active",
  createdAt: "2024-01-15"
}
```

---

## التأثيرات الحركية (Animations)

### 1. بطاقات المستودعات:
```jsx
style={{
  animationDelay: `${index * 100}ms`,
}}
```
- تأخير متدرج بناءً على الفهرس
- 100ms بين كل بطاقة

### 2. تأثيرات الـ Hover:
- `hover:shadow-lg` - ظل أكبر
- `hover:border-primary` - تغيير لون الحدود
- `hover:bg-accent` - تغيير الخلفية
- `transition-all duration-300` - انتقال سلس

### 3. تحويلات الأيقونات:
- `group-hover:scale-110` - تكبير 110%
- `group-hover:rotate-90` - دوران 90 درجة
- `transition-transform duration-300` - انتقال سلس

---

## حالات المستودع (Warehouse Status)

| الحالة | القيمة | الوصف | اللون |
|--------|--------|-------|-------|
| **نشط** (Active) | `active` | المستودع يعمل بشكل طبيعي | `variant="default"` |
| **غير نشط** (Inactive) | `inactive` | المستودع متوقف مؤقتاً | `variant="secondary"` |

---

## المكونات المستخدمة (Components)

- Card, CardContent, CardDescription, CardHeader, CardTitle
- Button
- Input
- Label
- Textarea
- Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
- DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
- Badge

---

## الأيقونات المستخدمة (Icons)

- Warehouse - مستودع
- Plus - إضافة
- MoreVertical - قائمة الإجراءات
- Edit - تعديل
- Trash2 - حذف
- Package - منتجات
- TrendingUp - اتجاه صاعد
- DollarSign - عملة
- Building2 - مبنى
- MapPin - موقع
- User - مستخدم
- Phone - هاتف
- Mail - بريد إلكتروني
- Calendar - تقويم
- AlertTriangle - تحذير
- Settings - إعدادات
- Eye - عرض

---

## الميزات المشتركة

### 1. الترجمة (i18n)
- دعم اللغتين العربية والإنجليزية
- استخدام `next-intl`
- مفاتيح الترجمة:
  * `warehouses` - نصوص المستودعات
  * `common` - النصوص المشتركة

### 2. التصميم المتجاوب (Responsive Design)
- شبكة متجاوبة:
  * موبايل: عمود واحد
  * تابلت: عمودان (`md:grid-cols-2`)
  * سطح المكتب: 3 أعمدة (`lg:grid-cols-3`)

### 3. الوضع الداكن (Dark Mode)
- دعم كامل للوضع الداكن
- استخدام متغيرات CSS
- ألوان تتكيف تلقائياً

---

## الخلاصة

هذا الملف يحتوي على:
- ✅ هيكل بيانات المستودع الكامل
- ✅ 4 بطاقات إحصائية مفصلة
- ✅ تصميم بطاقة إضافة مستودع
- ✅ بطاقات المستودعات مع جميع التفاصيل
- ✅ 3 نوافذ منبثقة (إضافة، تعديل، تفاصيل)
- ✅ منطق الإضافة والتعديل والحذف
- ✅ نافذة تفاصيل شاملة مع إحصائيات
- ✅ التأثيرات الحركية والانتقالات
- ✅ حالات المستودع
- ✅ أمثلة على البيانات
- ✅ السياق العام والخطافات
- ✅ التصميم المتجاوب والوضع الداكن

---

**تاريخ إنشاء الملف:** 2026-08-13  
**المسار:** `WAREHOUSES_DATA.md`
