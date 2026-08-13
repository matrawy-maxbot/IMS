# 🏭 Multi-Warehouse Management System | نظام إدارة المخازن المتعددة

<div dir="rtl">

## 🎯 نظرة عامة

تم إضافة ميزة **إدارة المخازن المتعددة** إلى نظام إدارة المخزون (IMS). هذه الميزة تتيح لك إدارة عدة مخازن، التبديل بينها بسهولة، ومتابعة الإحصائيات لكل مخزن.

## ✨ المميزات

### 📊 الإحصائيات الشاملة
- إجمالي المخازن والمخازن النشطة
- إجمالي المنتجات عبر جميع المخازن
- قيمة المخزون الإجمالية
- تنبيهات المخزون المنخفض

### 🎨 واجهة احترافية
- تصميم عصري مع بطاقات جميلة
- تدرجات لونية وأيقونات ملونة
- تأثيرات تفاعلية عند التمرير
- متجاوب مع جميع أحجام الشاشات

### 🔧 وظائف كاملة
- ➕ إضافة مخازن جديدة
- ✏️ تعديل معلومات المخازن
- 🗑️ حذف المخازن
- 🔄 التبديل السريع بين المخازن
- 💾 حفظ تلقائي للبيانات

### 🌍 دعم متعدد اللغات
- العربية (RTL)
- الإنجليزية (LTR)

## 🚀 البدء السريع

### 1. تشغيل المشروع
```bash
npm run dev
```

### 2. الوصول إلى الميزة
افتح المتصفح واذهب إلى:
```
http://localhost:3000/warehouses
```

أو من القائمة الجانبية اختر **"المخازن"**

### 3. التبديل بين المخازن
استخدم القائمة المنسدلة في أعلى الشريط الجانبي

## 📁 هيكل الملفات

```
IMS/
├── src/
│   ├── app/
│   │   └── warehouses/
│   │       └── page.tsx                  # صفحة المخازن
│   ├── contexts/
│   │   └── warehouse-context.tsx         # إدارة حالة المخازن
│   ├── hooks/
│   │   └── use-current-warehouse.ts      # Hooks مخصصة
│   ├── components/
│   │   ├── sidebar.tsx                   # تحديث: Select Box
│   │   └── warehouse-stats-card.tsx      # بطاقة إحصائيات
│   └── i18n/
│       └── messages/
│           ├── ar/warehouses.json        # ترجمة عربية
│           └── en/warehouses.json        # ترجمة إنجليزية
```

## 💻 استخدام الـ API

### الحصول على المخزن الحالي
```tsx
import { useCurrentWarehouse } from "@/hooks/use-current-warehouse";

function MyComponent() {
  const currentWarehouse = useCurrentWarehouse();
  
  return (
    <div>
      <h1>{currentWarehouse?.name}</h1>
      <p>المنتجات: {currentWarehouse?.totalProducts}</p>
    </div>
  );
}
```

### الحصول على الإحصائيات
```tsx
import { useWarehouseStats } from "@/hooks/use-current-warehouse";

function StatsComponent() {
  const stats = useWarehouseStats();
  
  return (
    <div>
      <p>إجمالي المخازن: {stats.totalWarehouses}</p>
      <p>إجمالي المنتجات: {stats.totalProducts}</p>
      <p>القيمة الإجمالية: {stats.totalValue} ريال</p>
    </div>
  );
}
```

### إدارة المخازن
```tsx
import { useWarehouse } from "@/contexts/warehouse-context";

function ManageWarehouse() {
  const { warehouses, addWarehouse, updateWarehouse, deleteWarehouse } = useWarehouse();
  
  const newWarehouse = {
    id: "4",
    name: "مخزن جديد",
    location: "الرياض",
    // ... باقي البيانات
  };
  
  // إضافة
  addWarehouse(newWarehouse);
  
  // تحديث
  updateWarehouse("4", { name: "اسم جديد" });
  
  // حذف
  deleteWarehouse("4");
}
```

## 🎨 التخصيص

### الألوان
يمكنك تخصيص الألوان في `warehouse-stats-card.tsx`:
```tsx
<WarehouseStatsCard
  iconColor="text-blue-500"
  borderColor="border-l-blue-500"
/>
```

### البيانات الافتراضية
عدّل البيانات في `warehouse-context.tsx`:
```tsx
const [warehouses, setWarehouses] = useState<Warehouse[]>([
  // أضف مخازنك هنا
]);
```

## 📚 الوثائق الإضافية

- [دليل البدء السريع](./WAREHOUSES_QUICK_START.md)
- [شرح تفصيلي كامل](./WAREHOUSES_FEATURE.md)
- [أمثلة التكامل](./WAREHOUSE_INTEGRATION_EXAMPLE.md)
- [تعليمات التشغيل](./RUN_PROJECT.md)

## 🐛 حل المشاكل

### المخزن لا يظهر في Select Box
تأكد من أن `WarehouseProvider` موجود في `layout.tsx`

### البيانات لا تُحفظ
تحقق من أن localStorage ممكّن في المتصفح

### الترجمة لا تعمل
تأكد من وجود ملفات الترجمة في:
- `src/i18n/messages/ar/warehouses.json`
- `src/i18n/messages/en/warehouses.json`

## 🔮 التطويرات المستقبلية

- [ ] ربط مع API وقاعدة بيانات
- [ ] نقل المنتجات بين المخازن
- [ ] تقارير مقارنة متقدمة
- [ ] خريطة لمواقع المخازن
- [ ] نظام الصلاحيات
- [ ] إشعارات ذكية

## 📞 الدعم

للحصول على المساعدة:
1. راجع ملفات التوثيق
2. تحقق من الأمثلة في `WAREHOUSE_INTEGRATION_EXAMPLE.md`

## 📄 الترخيص

هذا المشروع جزء من نظام IMS

---

</div>

<div dir="ltr">

## 🎯 Overview

**Multi-Warehouse Management** feature has been added to the Inventory Management System (IMS). This feature allows you to manage multiple warehouses, switch between them easily, and track statistics for each warehouse.

## ✨ Features

### 📊 Comprehensive Statistics
- Total and active warehouses
- Total products across all warehouses
- Total inventory value
- Low stock alerts

### 🎨 Professional Interface
- Modern design with beautiful cards
- Color gradients and colored icons
- Interactive hover effects
- Responsive for all screen sizes

### 🔧 Full Functionality
- ➕ Add new warehouses
- ✏️ Edit warehouse information
- 🗑️ Delete warehouses
- 🔄 Quick switching between warehouses
- 💾 Automatic data saving

### 🌍 Multi-language Support
- Arabic (RTL)
- English (LTR)

## 🚀 Quick Start

### 1. Run the Project
```bash
npm run dev
```

### 2. Access the Feature
Open your browser and go to:
```
http://localhost:3000/warehouses
```

Or from the sidebar select **"Warehouses"**

### 3. Switch Between Warehouses
Use the dropdown menu at the top of the sidebar

## 💻 API Usage

### Get Current Warehouse
```tsx
import { useCurrentWarehouse } from "@/hooks/use-current-warehouse";

function MyComponent() {
  const currentWarehouse = useCurrentWarehouse();
  
  return (
    <div>
      <h1>{currentWarehouse?.name}</h1>
      <p>Products: {currentWarehouse?.totalProducts}</p>
    </div>
  );
}
```

### Get Statistics
```tsx
import { useWarehouseStats } from "@/hooks/use-current-warehouse";

function StatsComponent() {
  const stats = useWarehouseStats();
  
  return (
    <div>
      <p>Total Warehouses: {stats.totalWarehouses}</p>
      <p>Total Products: {stats.totalProducts}</p>
      <p>Total Value: {stats.totalValue} SAR</p>
    </div>
  );
}
```

## 📚 Additional Documentation

- [Quick Start Guide](./WAREHOUSES_QUICK_START.md)
- [Detailed Feature Guide](./WAREHOUSES_FEATURE.md)
- [Integration Examples](./WAREHOUSE_INTEGRATION_EXAMPLE.md)
- [Run Instructions](./RUN_PROJECT.md)

## 📄 License

This project is part of the IMS system

---

**Developed by**: Kiro AI  
**Version**: 1.0.0  
**Status**: ✅ Complete and Tested

</div>
