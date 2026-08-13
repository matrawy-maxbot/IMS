# 🚀 تشغيل المشروع

## المتطلبات

قبل البدء، تأكد من تثبيت:
- **Node.js** (الإصدار 18 أو أحدث)
- **npm** أو **yarn** أو **pnpm**

## خطوات التشغيل

### 1️⃣ تثبيت المكتبات (إذا لم تكن مثبتة)

```powershell
npm install
```

أو إذا كنت تستخدم yarn:
```powershell
yarn install
```

أو إذا كنت تستخدم pnpm:
```powershell
pnpm install
```

### 2️⃣ تشغيل المشروع في وضع التطوير

```powershell
npm run dev
```

أو:
```powershell
yarn dev
```

أو:
```powershell
pnpm dev
```

### 3️⃣ فتح المتصفح

بعد تشغيل المشروع، افتح المتصفح واذهب إلى:
```
http://localhost:3000
```

## 🎯 الوصول إلى صفحة المخازن

بعد تشغيل المشروع:
1. افتح `http://localhost:3000`
2. من القائمة الجانبية، اضغط على **"المخازن"**
3. أو اذهب مباشرة إلى: `http://localhost:3000/warehouses`

## 📦 أوامر أخرى مفيدة

### بناء المشروع للإنتاج
```powershell
npm run build
```

### تشغيل المشروع في وضع الإنتاج
```powershell
npm run start
```

### فحص الأخطاء (Linting)
```powershell
npm run lint
```

## 🔧 في حالة وجود مشاكل

### مشكلة: Module not found
```powershell
# احذف مجلد node_modules و package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json

# أعد تثبيت المكتبات
npm install
```

### مشكلة: Port 3000 is already in use
```powershell
# استخدم منفذ آخر
npm run dev -- -p 3001
```

### مشكلة: الترجمة لا تعمل
تأكد من وجود ملفات الترجمة:
- `src/i18n/messages/ar/warehouses.json`
- `src/i18n/messages/en/warehouses.json`

## 🌐 تغيير اللغة

اللغة الافتراضية هي العربية. لتغيير اللغة:
1. اذهب إلى **الإعدادات**
2. اختر اللغة (العربية أو الإنجليزية)

## 💡 نصائح

- استخدم **Turbopack** للتطوير الأسرع (تم تفعيله افتراضيًا)
- افتح أدوات المطور في المتصفح (F12) لمشاهدة console logs
- البيانات محفوظة في localStorage - لحذفها افتح Console واكتب:
  ```javascript
  localStorage.clear()
  ```

## 📱 الأجهزة المدعومة

المشروع متجاوب ويعمل على:
- 💻 أجهزة الكمبيوتر
- 📱 الهواتف الذكية
- 📲 الأجهزة اللوحية

## 🎨 الأوضاع المدعومة

- ☀️ الوضع النهاري (Light Mode)
- 🌙 الوضع الليلي (Dark Mode)
- 🔄 تلقائي حسب نظام التشغيل

---

**استمتع بالعمل! 🎉**
