# دليل استخدام Sonner - مكتبة Toast الاحترافية 🎉

## نظرة عامة

**Sonner** هي مكتبة Toast الأصلية من ShadCN UI، تم تطويرها بواسطة Emil Kowalski. توفر تأثيرات مذهلة وتجربة مستخدم رائعة مع تأثير التراص (Stacking).

## ✨ المميزات الرئيسية

### 1. تأثير التراص السحري (Magic Stacking)
- **حالة الانكماش (Collapsed):** الإشعار الجديد في المقدمة، والقديمة تتراص خلفه
- **حالة التوسع (Expanded):** عند تمرير الماوس تظهر جميع الإشعارات
- **تصغير تدريجي:** كل إشعار قديم يصغر ويتحرك للخلف بسلاسة

### 2. أنواع الإشعارات
- ✅ Success (نجاح)
- ❌ Error (خطأ)
- ⚠️ Warning (تحذير)
- ℹ️ Info (معلومات)
- ⏳ Promise (عمليات غير متزامنة)
- 📝 Default (افتراضي)

### 3. تأثيرات سلسة
- Spring animations (حركات مرنة)
- Slide & Fade animations
- Smooth transitions
- Rich colors support

## 🚀 الإعداد والتثبيت

### التثبيت
```bash
npm install sonner
```

### الإضافة إلى Layout
```tsx
import { Toaster } from "sonner";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster 
          position="bottom-right" 
          expand={false} 
          richColors 
          closeButton 
        />
      </body>
    </html>
  );
}
```

## 📝 الاستخدام الأساسي

### 1. إشعار بسيط
```tsx
import { toast } from 'sonner';

toast("Event created");
```

### 2. إشعار مع وصف
```tsx
toast("Event created", {
  description: "Sunday, December 3 at 9:00 AM",
});
```

### 3. إشعار مع زر Action
```tsx
toast("Event created", {
  description: "Sunday, December 3 at 9:00 AM",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
});
```

## 🎨 أنواع الإشعارات

### Success (نجاح) ✅
```tsx
toast.success("تم الحفظ بنجاح", {
  description: "تم حفظ التغييرات في قاعدة البيانات",
});
```

### Error (خطأ) ❌
```tsx
toast.error("حدث خطأ!", {
  description: "فشلت عملية الحفظ. يرجى المحاولة مرة أخرى",
});
```

### Warning (تحذير) ⚠️
```tsx
toast.warning("تحذير!", {
  description: "مخزون المنتج أقل من الحد الأدنى",
});
```

### Info (معلومات) ℹ️
```tsx
toast.info("معلومة مفيدة", {
  description: "يمكنك استخدام اختصارات لوحة المفاتيح",
});
```

### Loading & Promise ⏳
```tsx
// عرض حالة التحميل
const promise = () => fetch('/api/data').then(res => res.json());

toast.promise(promise, {
  loading: 'جاري التحميل...',
  success: (data) => `تم تحميل ${data.count} عنصر`,
  error: 'فشل التحميل',
});
```

## ⚙️ خيارات التخصيص

### خيارات Toaster (Component-level)
```tsx
<Toaster
  position="bottom-right"       // موقع الإشعارات
  expand={false}                // تفعيل/تعطيل التراص
  richColors                    // ألوان غنية حسب النوع
  closeButton                   // إظهار زر الإغلاق
  toastOptions={{
    duration: 4000,             // المدة الافتراضية
    className: 'my-toast',      // class مخصص
  }}
/>
```

### المواقع المتاحة
```tsx
position="top-left"
position="top-center"
position="top-right"
position="bottom-left"
position="bottom-center"
position="bottom-right"
```

### خيارات Toast الفردي
```tsx
toast("رسالة", {
  description: "وصف الرسالة",
  duration: 5000,              // المدة بالمللي ثانية
  position: "top-center",      // تجاوز الموقع الافتراضي
  icon: "🎉",                  // أيقونة مخصصة
  action: {                    // زر إجراء
    label: "تراجع",
    onClick: () => {},
  },
  cancel: {                    // زر إلغاء
    label: "إغلاق",
    onClick: () => {},
  },
  onDismiss: () => {},         // عند الإغلاق
  onAutoClose: () => {},       // عند الإغلاق التلقائي
});
```

## 🎯 أمثلة عملية

### مثال 1: نموذج حفظ بيانات
```tsx
const handleSave = async () => {
  const savePromise = fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  toast.promise(savePromise, {
    loading: 'جاري الحفظ...',
    success: 'تم الحفظ بنجاح!',
    error: 'فشل الحفظ',
  });
};
```

### مثال 2: تأكيد حذف
```tsx
const handleDelete = () => {
  toast("هل تريد حذف هذا العنصر؟", {
    description: "لا يمكن التراجع عن هذا الإجراء",
    action: {
      label: "حذف",
      onClick: async () => {
        await deleteItem();
        toast.success("تم الحذف بنجاح");
      },
    },
    cancel: {
      label: "إلغاء",
      onClick: () => toast.info("تم إلغاء العملية"),
    },
  });
};
```

### مثال 3: إشعارات متعددة للتراص
```tsx
const showNotifications = () => {
  toast("إشعار 1", { description: "أول إشعار" });
  
  setTimeout(() => {
    toast("إشعار 2", { description: "ثاني إشعار" });
  }, 500);
  
  setTimeout(() => {
    toast("إشعار 3", { description: "ثالث إشعار" });
  }, 1000);
};
```

### مثال 4: تحديث إشعار موجود
```tsx
const toastId = toast.loading("جاري المعالجة...");

// بعد انتهاء العملية
setTimeout(() => {
  toast.success("اكتمل!", { id: toastId });
}, 2000);
```

## 🎨 التصميم المخصص

### CSS Variables
يمكنك تخصيص التصميم عبر CSS Variables:

```css
:root {
  --normal-bg: white;
  --normal-border: hsl(0, 0%, 90%);
  --normal-text: hsl(0, 0%, 10%);
}

.dark {
  --normal-bg: hsl(0, 0%, 10%);
  --normal-border: hsl(0, 0%, 20%);
  --normal-text: white;
}
```

### Custom Classes
```tsx
toast("رسالة مخصصة", {
  className: "my-custom-toast",
  descriptionClassName: "my-custom-description",
});
```

```css
.my-custom-toast {
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  border: none;
}
```

## 🔧 API متقدم

### إغلاق جميع الإشعارات
```tsx
import { toast } from 'sonner';

toast.dismiss();
```

### إغلاق إشعار محدد
```tsx
const id = toast("رسالة");
toast.dismiss(id);
```

### التحقق من وجود إشعارات نشطة
```tsx
// استخدم useToast hook
import { useToast } from 'sonner';

function MyComponent() {
  const { toasts } = useToast();
  
  return (
    <div>
      عدد الإشعارات النشطة: {toasts.length}
    </div>
  );
}
```

## 📱 التوافق

- ✅ React 18+
- ✅ Next.js 13+ (App Router & Pages Router)
- ✅ TypeScript
- ✅ RTL Support (العربية)
- ✅ Dark Mode
- ✅ جميع المتصفحات الحديثة

## 🎯 أفضل الممارسات

### 1. استخدم الأنواع المناسبة
```tsx
// ❌ خطأ
toast("تم الحفظ");

// ✅ صحيح
toast.success("تم الحفظ بنجاح");
```

### 2. أضف وصف للسياق
```tsx
// ❌ قليل المعلومات
toast.error("خطأ");

// ✅ واضح ومفيد
toast.error("فشل الحفظ", {
  description: "تحقق من اتصال الإنترنت وحاول مرة أخرى",
});
```

### 3. استخدم Promise للعمليات غير المتزامنة
```tsx
// ❌ يدوي ومعقد
toast.loading("جاري الحفظ...");
try {
  await save();
  toast.success("تم الحفظ");
} catch {
  toast.error("فشل الحفظ");
}

// ✅ أبسط وأوضح
toast.promise(save(), {
  loading: "جاري الحفظ...",
  success: "تم الحفظ",
  error: "فشل الحفظ",
});
```

### 4. لا تفرط في الإشعارات
```tsx
// ❌ إشعارات كثيرة ومزعجة
onChange={(e) => toast.info("تم التغيير")}

// ✅ إشعارات عند الإنجاز فقط
onSave={() => toast.success("تم الحفظ")}
```

## 🆚 مقارنة مع Toast التقليدي

| الميزة | Toast التقليدي | Sonner |
|--------|----------------|---------|
| تأثير التراص | ❌ | ✅ |
| Rich Colors | ❌ | ✅ |
| Promise Support | ❌ | ✅ |
| Action Buttons | محدود | ✅ متقدم |
| Animations | أساسية | احترافية |
| حجم المكتبة | أكبر | أصغر (3KB) |
| الأداء | جيد | ممتاز |

## 📚 موارد إضافية

- [Sonner على GitHub](https://github.com/emilkowalski/sonner)
- [Sonner في ShadCN](https://ui.shadcn.com/docs/components/sonner)
- [تجربة حية](https://sonner.emilkowal.ski/)

---

تم التنفيذ بنجاح! 🎊
الآن لديك نظام Toast احترافي مثل ShadCN تماماً!
