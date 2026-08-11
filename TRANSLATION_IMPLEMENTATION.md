# تنفيذ نظام الترجمة للتطبيق | Translation Implementation

## ✅ ما تم إنجازه

### 1. **ملفات الترجمة المحدثة**
تم تحديث وتوسيع ملفات الترجمة لتشمل جميع الصفحات:

- ✅ `src/i18n/messages/ar.json` - ترجمات عربية محدثة وشاملة
- ✅ `src/i18n/messages/en.json` - ترجمات إنجليزية محدثة وشاملة

### 2. **الصفحات المجهزة للترجمة**

#### ✅ الصفحات الأساسية:
- **Dashboard** (`src/app/page.tsx`) - تم تطبيق الترجمات ✓
- **Header** (`src/components/header.tsx`) - تم تطبيق الترجمات ✓  
- **Sidebar** (`src/components/sidebar.tsx`) - تم تطبيق الترجمات ✓
- **Layout** (`src/app/layout.tsx`) - تم تكوين next-intl ✓

#### 📋 الصفحات الجاهزة لتطبيق الترجمات:

**المنتجات (Products):**
- `src/app/products/page.tsx` - قائمة المنتجات
- `src/app/products/add/page.tsx` - إضافة منتج
- `src/app/products/[id]/page.tsx` - تفاصيل المنتج

**الطلبات (Orders):**
- `src/app/add-order/page.tsx` - إضافة طلب
- `src/app/orders/page.tsx` - قائمة الطلبات  
- `src/app/orders/[id]/page.tsx` - تفاصيل الطلب

**العملاء (Customers):**
- `src/app/customers/page.tsx` - قائمة العملاء
- `src/app/customers/add/page.tsx` - إضافة عميل
- `src/app/customers/[id]/page.tsx` - تفاصيل العميل

**أخرى:**
- `src/app/reports/page.tsx` - التقارير
- `src/app/settings/page.tsx` - الإعدادات
- `src/app/help/page.tsx` - المساعدة والدعم

## 🔧 كيفية تطبيق الترجمات على الصفحات

### الخطوة 1: إضافة "use client" و import الترجمات

```tsx
"use client";

import { useTranslations } from 'next-intl';
```

### الخطوة 2: استخدام hook الترجمة

```tsx
export default function MyPage() {
  const t = useTranslations('products'); // اسم الـ namespace
  const tCommon = useTranslations('common'); // للنصوص المشتركة
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

### الخطوة 3: استبدال النصوص الثابتة

**قبل:**
```tsx
<h1>المنتجات</h1>
<button>إضافة منتج</button>
```

**بعد:**
```tsx
<h1>{t('title')}</h1>
<button>{t('addProduct')}</button>
```

## 📚 دليل مفاتيح الترجمة

### Common (مشترك)
```typescript
tCommon('search')        // "بحث..." / "Search..."
tCommon('save')          // "حفظ" / "Save"
tCommon('edit')          // "تعديل" / "Edit"
tCommon('delete')        // "حذف" / "Delete"
tCommon('export')        // "تصدير" / "Export"
tCommon('filter')        // "تصفية" / "Filter"
```

### Products (المنتجات)
```typescript
t('title')               // "المنتجات" / "Products"
t('addProduct')          // "إضافة منتج" / "Add Product"
t('productName')         // "اسم المنتج" / "Product Name"
t('category')            // "الفئة" / "Category"
t('price')               // "السعر" / "Price"
t('quantity')            // "الكمية" / "Quantity"
```

### Orders (الطلبات)
```typescript
t('title')               // "الطلبات" / "Orders"
t('addOrder')            // "إضافة طلب" / "Add Order"
t('orderNumber')         // "رقم الطلب" / "Order Number"
t('customer')            // "العميل" / "Customer"
t('status')              // "الحالة" / "Status"
t('completed')           // "مكتمل" / "Completed"
t('pending')             // "قيد الانتظار" / "Pending"
```

### Customers (العملاء)
```typescript
t('title')               // "العملاء" / "Customers"
t('addCustomer')         // "إضافة عميل" / "Add Customer"
t('customerName')        // "اسم العميل" / "Customer Name"
t('email')               // "البريد الإلكتروني" / "Email"
t('phone')               // "رقم الهاتف" / "Phone"
```

### Reports (التقارير)
```typescript
t('title')               // "التقارير" / "Reports"
t('salesReport')         // "تقرير المبيعات" / "Sales Report"
t('inventoryReport')     // "تقرير المخزون" / "Inventory Report"
```

### Settings (الإعدادات)
```typescript
t('title')               // "الإعدادات" / "Settings"
t('companyInfo')         // "معلومات الشركة" / "Company Information"
t('users')               // "المستخدمين" / "Users"
```

### Help (المساعدة)
```typescript
t('title')               // "المساعدة والدعم" / "Help & Support"
t('faq')                 // "الأسئلة الشائعة" / "FAQ"
t('guides')              // "أدلة الاستخدام" / "User Guides"
```

## 🎯 أمثلة عملية

### مثال 1: صفحة المنتجات

```tsx
"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <Button>{t('addProduct')}</Button>
      <input placeholder={tCommon('search')} />
    </div>
  );
}
```

### مثال 2: صفحة الطلبات

```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function OrdersPage() {
  const t = useTranslations('orders');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <div>
        <span>{t('status')}: </span>
        <span>{t('completed')}</span>
      </div>
      <button>{tCommon('export')}</button>
    </div>
  );
}
```

### مثال 3: استخدام multiple namespaces

```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function OrderDetailsPage() {
  const tOrders = useTranslations('orders');
  const tCustomers = useTranslations('customers');
  const tProducts = useTranslations('products');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{tOrders('details')}</h1>
      <section>
        <h2>{tCustomers('customerInfo')}</h2>
        {/* ... */}
      </section>
      <section>
        <h2>{tProducts('title')}</h2>
        {/* ... */}
      </section>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

## 🚀 الخطوات التالية

لتطبيق الترجمات على كل صفحة:

1. **افتح الصفحة المطلوبة**
2. **أضف `"use client";` في أول السطر**
3. **استورد `useTranslations`:**
   ```tsx
   import { useTranslations } from 'next-intl';
   ```

4. **أضف الـ hooks:**
   ```tsx
   const t = useTranslations('products'); // أو orders, customers, etc.
   const tCommon = useTranslations('common');
   ```

5. **استبدل النصوص الثابتة:**
   - ابحث عن أي نص عربي أو إنجليزي مكتوب مباشرة
   - استبدله بـ `t('key')` أو `tCommon('key')`
   - تأكد من وجود المفتاح في ملف الترجمة

6. **اختبر الصفحة:**
   - بدّل اللغة من الهيدر
   - تحقق من أن جميع النصوص تتغير بشكل صحيح

## ✨ ميزات إضافية

### استخدام الترجمات مع المتغيرات

```tsx
// في ملف الترجمة:
{
  "welcomeMessage": "مرحباً {name}، لديك {count} طلب جديد"
}

// في الكود:
t('welcomeMessage', { name: 'أحمد', count: 5 })
// النتيجة: "مرحباً أحمد، لديك 5 طلب جديد"
```

### استخدام الترجمات مع Rich Text

```tsx
t.rich('message', {
  b: (chunks) => <strong>{chunks}</strong>,
  br: () => <br />
})
```

## 📁 هيكل الملفات

```
src/
├── i18n/
│   ├── messages/
│   │   ├── ar.json          ✅ محدث
│   │   └── en.json          ✅ محدث
│   ├── request.ts           ✅ موجود
│   └── types.ts             ✅ موجود
├── lib/
│   └── i18n-utils.ts        ✅ موجود
├── components/
│   ├── header.tsx           ✅ مترجم
│   ├── sidebar.tsx          ✅ مترجم
│   └── language-toggle.tsx  ✅ موجود
└── app/
    ├── layout.tsx            ✅ مهيأ
    ├── page.tsx              ✅ مترجم
    ├── products/             📋 جاهز للترجمة
    ├── orders/               📋 جاهز للترجمة
    ├── customers/            📋 جاهز للترجمة
    ├── reports/              📋 جاهز للترجمة
    ├── settings/             📋 جاهز للترجمة
    └── help/                 📋 جاهز للترجمة
```

## 🔍 نصائح مهمة

1. **استخدم namespaces منفصلة** لكل قسم لتنظيم أفضل
2. **لا تنسَ `"use client"`** في أي صفحة تستخدم useTranslations
3. **استخدم `tCommon`** للنصوص المشتركة (save, delete, cancel, etc.)
4. **اختبر الترجمات** بعد كل تعديل بالتبديل بين اللغات
5. **حافظ على تناسق المفاتيح** بين ملفات ar.json و en.json

## ⚙️ الأوامر المتاحة

```bash
# تشغيل التطوير
npm run dev

# بناء المشروع
npm run build

# تشغيل الإنتاج
npm start
```

## ✅ حالة الترجمة

- ✅ نظام i18n مثبت ومهيأ
- ✅ ملفات الترجمة محدثة وشاملة
- ✅ مكون تبديل اللغة جاهز ويعمل
- ✅ Header و Sidebar مترجمان
- ✅ Dashboard مترجم
- 📋 باقي الصفحات جاهزة وتحتاج فقط تطبيق الترجمات

---

**تم إنشاء هذا التوثيق في:** 23 يوليو 2026
