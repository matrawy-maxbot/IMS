# User Onboarding System - دليل نظام التعريف بالمستخدم

## نظرة عامة | Overview

تم إنشاء نظام تعريف احترافي وأنيق للمستخدمين الجدد يتضمن:
- **Onboarding Tour** - جولة تعليمية تفاعلية
- **Onboarding Checklist** - قائمة مهام للبدء السريع

---

## المميزات | Features

### 1. Onboarding Tour (الجولة التعليمية)
✅ جولة تفاعلية خطوة بخطوة
✅ تصميم احترافي وأنيق مع تأثيرات انتقالية سلسة
✅ دعم كامل للغتين العربية والإنجليزية
✅ دعم RTL/LTR
✅ تسليط الضوء على العناصر المهمة
✅ شريط تقدم يوضح موقعك في الجولة
✅ إمكانية إعادة الجولة في أي وقت
✅ تخزين حالة الجولة في localStorage

**الخطوات المشمولة:**
1. رسالة ترحيب 👋
2. بطاقات الإحصائيات السريعة 📊
3. الطلبات الأخيرة 🛒
4. تنبيه المخزون المنخفض ⚠️
5. القائمة الجانبية 📋
6. زر إضافة طلب جديد ➕
7. تغيير اللغة 🌐
8. الوضع الليلي/النهاري 🌓
9. رسالة الإكمال 🎉

### 2. Onboarding Checklist (قائمة المهام)
✅ قائمة تفاعلية للمهام الأساسية
✅ تصميم بطاقة أنيق منسدل
✅ شريط تقدم ديناميكي
✅ روابط مباشرة للصفحات
✅ حفظ تلقائي للحالة
✅ إمكانية الإخفاء والإظهار
✅ رسالة تهنئة عند الإكمال

**المهام المتضمنة:**
- ✓ إضافة أول منتج
- ✓ إضافة أول عميل
- ✓ إنشاء أول طلب
- ✓ عرض التقارير
- ✓ تخصيص الإعدادات
- ✓ إكمال الجولة التعليمية

---

## الملفات المنشأة | Created Files

```
src/
├── components/
│   ├── onboarding-tour.tsx          # مكون الجولة التعليمية
│   └── onboarding-checklist.tsx     # مكون قائمة المهام
│
└── styles/
    └── onboarding.css               # تصميمات مخصصة للجولة
```

---

## التثبيت | Installation

### المكتبات المستخدمة:
```bash
npm install driver.js
```

**driver.js** - مكتبة خفيفة وقوية للجولات التفاعلية

---

## الاستخدام | Usage

### 1. في Layout (تم التطبيق بالفعل)

```tsx
import OnboardingTour from "@/components/onboarding-tour";
import "../styles/onboarding.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* ... */}
        <OnboardingTour locale={locale} />
      </body>
    </html>
  );
}
```

### 2. إضافة Data Attributes للعناصر

لتسليط الضوء على عنصر معين في الجولة:

```tsx
<div data-tour="dashboard">المحتوى</div>
```

**العناصر المدعومة:**
- `data-tour="stats-cards"` - بطاقات الإحصائيات
- `data-tour="recent-orders"` - الطلبات الأخيرة
- `data-tour="low-stock"` - المنتجات المنخفضة
- `data-tour="sidebar"` - القائمة الجانبية
- `data-tour="add-order-btn"` - زر إضافة طلب
- `data-tour="language"` - تبديل اللغة
- `data-tour="theme-toggle"` - تبديل المظهر

---

## التخصيص | Customization

### 1. تخصيص الألوان

في `src/styles/onboarding.css`:

```css
/* تغيير اللون الأساسي */
.driver-popover-next-btn {
  background: linear-gradient(135deg, #your-color 0%, #your-color-dark 100%) !important;
}

/* تغيير لون التسليط */
.driver-active-element {
  outline: 3px solid #your-color !important;
}
```

### 2. إضافة خطوات جديدة

في `src/components/onboarding-tour.tsx`:

```tsx
const tourSteps = {
  ar: [
    // ... الخطوات الموجودة
    {
      element: "[data-tour='your-element']",
      popover: {
        title: "العنوان",
        description: "الوصف",
        side: "bottom" as const,
        align: "start" as const,
      },
    },
  ],
  // ... نفس الشيء للإنجليزية
};
```

### 3. تخصيص قائمة المهام

في `src/components/onboarding-checklist.tsx`:

```tsx
const [checklist, setChecklist] = useState<ChecklistItem[]>([
  // ... المهام الموجودة
  {
    id: "new-task",
    title: {
      ar: "مهمة جديدة",
      en: "New Task",
    },
    completed: false,
    link: "/your-page",
  },
]);
```

---

## الوظائف | Functions

### OnboardingTour

#### `startTour()`
بدء الجولة التعليمية

#### `resetTour()`
إعادة تعيين وبدء الجولة من جديد

### OnboardingChecklist

#### `toggleItem(id: string)`
تبديل حالة مهمة معينة

#### `handleDismiss()`
إخفاء قائمة المهام نهائياً

---

## LocalStorage Keys

النظام يستخدم المفاتيح التالية:

- `onboarding-tour-completed` - حالة إكمال الجولة
- `onboarding-checklist` - حالة المهام
- `onboarding-checklist-dismissed` - حالة إخفاء القائمة

---

## التصميم المتجاوب | Responsive Design

✅ متجاوب تماماً على جميع الأحجام
✅ يتكيف مع الشاشات الصغيرة
✅ تصغير تلقائي للنصوص على الموبايل

```css
@media (max-width: 640px) {
  .driver-popover {
    max-width: calc(100vw - 32px) !important;
  }
}
```

---

## دعم RTL | RTL Support

✅ دعم كامل للغة العربية من اليمين لليسار
✅ انعكاس تلقائي للأزرار والعناصر
✅ اتجاه صحيح للأسهم والمؤشرات

```css
[dir="rtl"] .driver-popover-close-btn {
  right: auto !important;
  left: 20px !important;
}
```

---

## الأداء | Performance

⚡ تحميل كسول للمكونات
⚡ تخزين مؤقت في localStorage
⚡ حجم صغير (~20KB gzipped)
⚡ لا يؤثر على أداء التطبيق

---

## إعادة تعيين النظام | Reset System

لإعادة تعيين النظام للمستخدم:

```javascript
// في Console المتصفح
localStorage.removeItem("onboarding-tour-completed");
localStorage.removeItem("onboarding-checklist");
localStorage.removeItem("onboarding-checklist-dismissed");
location.reload();
```

---

## Best Practices

1. **لا تزعج المستخدم** - الجولة تظهر مرة واحدة فقط
2. **اجعلها قصيرة** - 7 خطوات كحد أقصى
3. **الأهم أولاً** - ابدأ بأهم الميزات
4. **وضوح النصوص** - نصوص واضحة ومختصرة
5. **اختبار RTL** - تأكد من التجربة بكلا الاتجاهين

---

## المشاكل الشائعة | Common Issues

### 1. الجولة لا تبدأ
✓ تأكد من وجود العناصر `data-tour` في الصفحة
✓ تأكد من تحميل CSS
✓ افحص console للأخطاء

### 2. العناصر غير مرئية
✓ تأكد من أن العناصر مرئية عند بدء الجولة
✓ أضف تأخير في `setTimeout` إذا لزم الأمر

### 3. مشاكل RTL
✓ تأكد من `dir="rtl"` على HTML
✓ تأكد من تحميل CSS المخصص

---

## التحديثات المستقبلية | Future Enhancements

🔮 إضافة فيديوهات تعليمية
🔮 نظام نقاط وشارات
🔮 تلميحات سياقية
🔮 تتبع تقدم المستخدم
🔮 تخصيص حسب نوع المستخدم

---

## الدعم | Support

للمساعدة أو الأسئلة:
- راجع الكود في `src/components/onboarding-*.tsx`
- اطلع على التوثيق الرسمي لـ [Driver.js](https://driverjs.com/)

---

## الترخيص | License

هذا النظام جزء من مشروع IMS الخاص بك.

---

**تم الإنشاء بواسطة NIXT** 🚀
