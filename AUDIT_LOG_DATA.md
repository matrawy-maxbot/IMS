# بيانات صفحة سجل المراجعة - Audit Log Page Data

هذا الملف يحتوي على جميع البيانات والحقول الموجودة في صفحة سجل المراجعة (Audit Log).

---

## صفحة سجل المراجعة (Audit Log Page)
**المسار:** `src/app/audit-log/page.tsx`

**الوصف:** صفحة لتتبع جميع الإجراءات والنشاطات التي تتم في النظام، مع تسجيل تفاصيل المستخدم والوقت والعملية المنفذة.

---

## أنواع الإجراءات (Action Types)

| النوع | القيمة | الوصف | اللون | CSS Class |
|-------|--------|-------|-------|-----------|
| **إنشاء** (Create) | `create` | إضافة سجل جديد | أخضر زمردي | `bg-emerald-100 text-emerald-900` |
| **تحديث** (Update) | `update` | تعديل سجل موجود | أزرق سماوي | `bg-cyan-100 text-cyan-900` |
| **حذف** (Delete) | `delete` | حذف سجل | أحمر وردي | `bg-rose-100 text-rose-900` |
| **تسجيل دخول** (Login) | `login` | تسجيل دخول للنظام | بنفسجي | `bg-violet-100 text-violet-900` |
| **تصدير** (Export) | `export` | تصدير بيانات | أصفر عنبري | `bg-amber-100 text-amber-900` |

### ألوان الوضع الداكن (Dark Mode):

| النوع | CSS Class (Dark Mode) |
|-------|----------------------|
| **إنشاء** | `dark:bg-emerald-900/30 dark:text-emerald-400` |
| **تحديث** | `dark:bg-cyan-900/30 dark:text-cyan-400` |
| **حذف** | `dark:bg-rose-900/30 dark:text-rose-400` |
| **تسجيل دخول** | `dark:bg-violet-900/30 dark:text-violet-400` |
| **تصدير** | `dark:bg-amber-900/30 dark:text-amber-400` |

---

## هيكل بيانات سجل المراجعة (Audit Log Data Structure)

```typescript
type AuditLog = {
  id: number;              // معرف السجل
  timestamp: string;       // التاريخ والوقت (YYYY-MM-DD HH:MM:SS)
  user: string;            // اسم المستخدم
  action: string;          // نوع العملية (بالعربية)
  actionType: string;      // نوع العملية (بالإنجليزية للفلترة)
  details: string;         // تفاصيل العملية
  ipAddress: string;       // عنوان IP
  userAgent: string;       // متصفح/جهاز المستخدم
};
```

---

## بيانات سجل المراجعة (Mock Audit Logs Data)

```javascript
const auditLogs = [
  { 
    id: 1, 
    timestamp: "2024-01-15 10:30:25", 
    user: "أحمد محمد", 
    action: "إضافة منتج", 
    actionType: "create",
    details: "تم إضافة منتج جديد: لابتوب HP ProBook",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0"
  },
  { 
    id: 2, 
    timestamp: "2024-01-15 10:25:15", 
    user: "سارة أحمد", 
    action: "تعديل طلب", 
    actionType: "update",
    details: "تم تحديث حالة الطلب #1234 إلى 'مكتمل'",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox 121.0"
  },
  { 
    id: 3, 
    timestamp: "2024-01-15 10:20:40", 
    user: "محمد علي", 
    action: "حذف عميل", 
    actionType: "delete",
    details: "تم حذف العميل: عبدالله سعيد",
    ipAddress: "192.168.1.102",
    userAgent: "Safari 17.2"
  },
  { 
    id: 4, 
    timestamp: "2024-01-15 10:15:30", 
    user: "فاطمة خالد", 
    action: "تسجيل دخول", 
    actionType: "login",
    details: "تسجيل دخول ناجح إلى النظام",
    ipAddress: "192.168.1.103",
    userAgent: "Edge 120.0.0"
  },
  { 
    id: 5, 
    timestamp: "2024-01-15 10:10:20", 
    user: "أحمد محمد", 
    action: "تصدير تقرير", 
    actionType: "export",
    details: "تصدير تقرير المبيعات الشهري",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0"
  },
  { 
    id: 6, 
    timestamp: "2024-01-15 10:05:10", 
    user: "سارة أحمد", 
    action: "إضافة طلب", 
    actionType: "create",
    details: "تم إنشاء طلب جديد #1235",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox 121.0"
  },
  { 
    id: 7, 
    timestamp: "2024-01-15 10:00:00", 
    user: "محمد علي", 
    action: "تعديل إعدادات", 
    actionType: "update",
    details: "تم تحديث إعدادات الشركة",
    ipAddress: "192.168.1.102",
    userAgent: "Safari 17.2"
  },
  { 
    id: 8, 
    timestamp: "2024-01-15 09:55:45", 
    user: "فاطمة خالد", 
    action: "تعديل منتج", 
    actionType: "update",
    details: "تم تحديث سعر المنتج: هاتف iPhone 13 Pro",
    ipAddress: "192.168.1.103",
    userAgent: "Edge 120.0.0"
  }
];
```

**عدد السجلات:** 8 سجلات

---

## بطاقات الإحصائيات (Statistics Cards)

### 1. إجمالي الإجراءات (Total Actions)

```javascript
{
  label: "إجمالي الإجراءات",
  value: 8,              // عدد جميع السجلات
  description: "اليوم",
  icon: "Activity"
}
```

**الحساب:**
```javascript
const totalActions = auditLogs.length;
// = 8
```

---

### 2. المستخدمون النشطون (Active Users)

```javascript
{
  label: "المستخدمون النشطون",
  value: 4,              // عدد المستخدمين الفريدين
  description: "مستخدمون فريدون",
  icon: "User"
}
```

**الحساب:**
```javascript
const uniqueUsers = Array.from(new Set(auditLogs.map(log => log.user)));
// = ["أحمد محمد", "سارة أحمد", "محمد علي", "فاطمة خالد"]
const activeUsers = uniqueUsers.length;
// = 4
```

---

### 3. إجراءات الإنشاء (Create Actions)

```javascript
{
  label: "إجراءات الإنشاء",
  value: 2,              // عدد عمليات الإنشاء
  description: "سجلات جديدة",
  icon: "FileText"
}
```

**الحساب:**
```javascript
const createActions = auditLogs.filter(log => log.actionType === 'create').length;
// = 2 (إضافة منتج، إضافة طلب)
```

---

### 4. إجراءات الحذف (Delete Actions)

```javascript
{
  label: "إجراءات الحذف",
  value: 1,              // عدد عمليات الحذف
  description: "سجلات محذوفة",
  icon: "FileText"
}
```

**الحساب:**
```javascript
const deleteActions = auditLogs.filter(log => log.actionType === 'delete').length;
// = 1 (حذف عميل)
```

---

## جدول سجل المراجعة (Audit Log Table)

### الأعمدة المعروضة:

1. **الوقت والتاريخ** (Timestamp)
   - أيقونة: Calendar
   - العرض: 180px
   - تنسيق: YYYY-MM-DD HH:MM:SS
   - خط: Monospace (font-mono)
   - حجم: صغير (text-sm)
   - مثال: `2024-01-15 10:30:25`

2. **المستخدم** (User)
   - أيقونة: User
   - نص غامق (font-medium)
   - أسماء المستخدمين:
     * أحمد محمد
     * سارة أحمد
     * محمد علي
     * فاطمة خالد

3. **الإجراء** (Action)
   - شارة ملونة (Badge) حسب نوع الإجراء
   - تصميم دائري (rounded-full)
   - حشوة: px-3 py-1
   - وزن خط: font-medium
   - الأنواع:
     * إضافة منتج (أخضر)
     * تعديل طلب (أزرق)
     * حذف عميل (أحمر)
     * تسجيل دخول (بنفسجي)
     * تصدير تقرير (أصفر)
     * إضافة طلب (أخضر)
     * تعديل إعدادات (أزرق)
     * تعديل منتج (أزرق)

4. **التفاصيل** (Details)
   - العرض الأقصى: md (max-w-md)
   - حجم الخط: صغير (text-sm)
   - لون: رمادي (text-muted-foreground)
   - قص النص: truncate
   - أمثلة:
     * "تم إضافة منتج جديد: لابتوب HP ProBook"
     * "تم تحديث حالة الطلب #1234 إلى 'مكتمل'"
     * "تم حذف العميل: عبدالله سعيد"
     * "تسجيل دخول ناجح إلى النظام"

5. **عنوان IP** (IP Address)
   - خط: Monospace (font-mono)
   - حجم: صغير جداً (text-xs)
   - لون: رمادي (text-muted-foreground)
   - نطاق IP: 192.168.1.x
   - أمثلة:
     * 192.168.1.100
     * 192.168.1.101
     * 192.168.1.102
     * 192.168.1.103

6. **متصفح/جهاز المستخدم** (User Agent)
   - حجم: صغير جداً (text-xs)
   - لون: رمادي (text-muted-foreground)
   - أمثلة:
     * Chrome 120.0.0
     * Firefox 121.0
     * Safari 17.2
     * Edge 120.0.0

---

## ميزات الفلترة (Filtering Features)

### 1. البحث (Search)

```javascript
const [searchQuery, setSearchQuery] = useState("");
```

**معايير البحث:**
- اسم المستخدم
- نوع الإجراء
- التفاصيل

**الكود:**
```javascript
const matchesSearch = searchQuery === "" || 
  log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
  log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
  log.details.toLowerCase().includes(searchQuery.toLowerCase());
```

---

### 2. فلترة حسب نوع الإجراء (Filter by Action Type)

```javascript
const [filterType, setFilterType] = useState("all");
```

**الخيارات:**
- الكل (All) - `value: "all"`
- إنشاء (Create) - `value: "create"`
- تحديث (Update) - `value: "update"`
- حذف (Delete) - `value: "delete"`
- تسجيل دخول (Login) - `value: "login"`
- تصدير (Export) - `value: "export"`

**المكون:**
```jsx
<Select value={filterType} onValueChange={setFilterType}>
  <SelectTrigger className="w-[180px]">
    <Filter className="h-4 w-4 ml-2" />
    <SelectValue placeholder={t('filterByType')} />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">{t('allTypes')}</SelectItem>
    <SelectItem value="create">{t('typeCreate')}</SelectItem>
    <SelectItem value="update">{t('typeUpdate')}</SelectItem>
    <SelectItem value="delete">{t('typeDelete')}</SelectItem>
    <SelectItem value="login">{t('typeLogin')}</SelectItem>
    <SelectItem value="export">{t('typeExport')}</SelectItem>
  </SelectContent>
</Select>
```

---

### 3. فلترة حسب المستخدم (Filter by User)

```javascript
const [filterUser, setFilterUser] = useState("all");
```

**الخيارات:**
- الكل (All Users) - `value: "all"`
- أحمد محمد
- سارة أحمد
- محمد علي
- فاطمة خالد

**الحساب:**
```javascript
const uniqueUsers = Array.from(new Set(auditLogs.map(log => log.user)));
```

**المكون:**
```jsx
<Select value={filterUser} onValueChange={setFilterUser}>
  <SelectTrigger className="w-[180px]">
    <User className="h-4 w-4 ml-2" />
    <SelectValue placeholder={t('filterByUser')} />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">{t('allUsers')}</SelectItem>
    {uniqueUsers.map(user => (
      <SelectItem key={user} value={user}>{user}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## منطق الفلترة الكامل (Complete Filtering Logic)

```javascript
const filteredLogs = auditLogs.filter(log => {
  // البحث في النص
  const matchesSearch = searchQuery === "" || 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase());
  
  // فلترة حسب النوع
  const matchesType = filterType === "all" || log.actionType === filterType;
  
  // فلترة حسب المستخدم
  const matchesUser = filterUser === "all" || log.user === filterUser;
  
  return matchesSearch && matchesType && matchesUser;
});
```

---

## دالة ألوان الشارات (Badge Color Function)

```javascript
const getActionBadge = (actionType: string, action: string) => {
  const styles: Record<string, string> = {
    create: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-400 border-0",
    update: "bg-cyan-100 text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-400 border-0",
    delete: "bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-400 border-0",
    login: "bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-400 border-0",
    export: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-400 border-0",
  };
  
  return styles[actionType] || styles.update;
};
```

---

## الإحصائيات حسب نوع الإجراء (Statistics by Action Type)

### التوزيع:

```javascript
// عمليات الإنشاء (Create): 2
- إضافة منتج
- إضافة طلب

// عمليات التحديث (Update): 3
- تعديل طلب
- تعديل إعدادات
- تعديل منتج

// عمليات الحذف (Delete): 1
- حذف عميل

// تسجيل الدخول (Login): 1
- تسجيل دخول

// التصدير (Export): 1
- تصدير تقرير
```

**مخطط دائري:**
```
Create:  25% (2/8)
Update:  37.5% (3/8)
Delete:  12.5% (1/8)
Login:   12.5% (1/8)
Export:  12.5% (1/8)
```

---

## الإحصائيات حسب المستخدم (Statistics by User)

```javascript
// أحمد محمد: 2 إجراءات
- إضافة منتج (10:30:25)
- تصدير تقرير (10:10:20)

// سارة أحمد: 2 إجراءات
- تعديل طلب (10:25:15)
- إضافة طلب (10:05:10)

// محمد علي: 2 إجراءات
- حذف عميل (10:20:40)
- تعديل إعدادات (10:00:00)

// فاطمة خالد: 2 إجراءات
- تسجيل دخول (10:15:30)
- تعديل منتج (09:55:45)
```

**توزيع متساوٍ:** كل مستخدم قام بـ 2 إجراءات (25%)

---

## الإحصائيات حسب المتصفح (Statistics by Browser)

```javascript
// Chrome: 2 إجراءات (25%)
- أحمد محمد

// Firefox: 2 إجراءات (25%)
- سارة أحمد

// Safari: 2 إجراءات (25%)
- محمد علي

// Edge: 2 إجراءات (25%)
- فاطمة خالد
```

---

## الإحصائيات حسب عنوان IP (Statistics by IP Address)

```javascript
// 192.168.1.100: 2 إجراءات - أحمد محمد
// 192.168.1.101: 2 إجراءات - سارة أحمد
// 192.168.1.102: 2 إجراءات - محمد علي
// 192.168.1.103: 2 إجراءات - فاطمة خالد
```

---

## الخط الزمني (Timeline)

```
10:30:25 ─ أحمد محمد     ─ إضافة منتج
10:25:15 ─ سارة أحمد     ─ تعديل طلب
10:20:40 ─ محمد علي      ─ حذف عميل
10:15:30 ─ فاطمة خالد    ─ تسجيل دخول
10:10:20 ─ أحمد محمد     ─ تصدير تقرير
10:05:10 ─ سارة أحمد     ─ إضافة طلب
10:00:00 ─ محمد علي      ─ تعديل إعدادات
09:55:45 ─ فاطمة خالد    ─ تعديل منتج
```

**الفترة الزمنية:** من 09:55:45 إلى 10:30:25 (35 دقيقة)

**المعدل:** ~4.4 دقيقة بين كل إجراء

---

## ميزات إضافية (Additional Features)

### 1. التصدير (Export)
- زر لتصدير بيانات سجل المراجعة
- أيقونة: Download

### 2. الترقيم (Pagination)
- عرض عدد السجلات المفلترة
- عرض إجمالي السجلات
- صيغة: "عرض X من Y سجل"
- أزرار التنقل:
  * السابق (Previous)
  * 1, 2, 3 (أرقام الصفحات)
  * التالي (Next)

### 3. رسالة عدم وجود سجلات:
```jsx
<TableRow>
  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
    {t('noLogs')}
  </TableCell>
</TableRow>
```

---

## إدارة الحالة (State Management)

```javascript
const [searchQuery, setSearchQuery] = useState("");      // نص البحث
const [filterType, setFilterType] = useState("all");     // فلتر النوع
const [filterUser, setFilterUser] = useState("all");     // فلتر المستخدم
```

---

## المكونات المستخدمة (Components)

- Card, CardContent, CardHeader, CardTitle
- Button
- Input
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Badge

---

## الأيقونات المستخدمة (Icons)

- Search - بحث
- Filter - فلترة
- Download - تصدير
- FileText - ملف نصي
- Calendar - تقويم
- User - مستخدم
- Activity - نشاط

---

## أمثلة على التفاصيل (Details Examples)

### إنشاء (Create):
- "تم إضافة منتج جديد: لابتوب HP ProBook"
- "تم إنشاء طلب جديد #1235"
- "تم إضافة عميل جديد: محمد سعيد"
- "تم إنشاء تقرير: تقرير المبيعات الأسبوعي"

### تحديث (Update):
- "تم تحديث حالة الطلب #1234 إلى 'مكتمل'"
- "تم تحديث إعدادات الشركة"
- "تم تحديث سعر المنتج: هاتف iPhone 13 Pro"
- "تم تغيير صلاحيات المستخدم: أحمد محمد"

### حذف (Delete):
- "تم حذف العميل: عبدالله سعيد"
- "تم حذف المنتج: سماعات بلوتوث"
- "تم إلغاء الطلب #1236"
- "تم حذف المستخدم: سارة خالد"

### تسجيل دخول (Login):
- "تسجيل دخول ناجح إلى النظام"
- "محاولة تسجيل دخول فاشلة"
- "تسجيل خروج من النظام"

### تصدير (Export):
- "تصدير تقرير المبيعات الشهري"
- "تصدير قائمة العملاء"
- "تصدير سجل المعاملات"

---

## الميزات المشتركة

### 1. الترجمة (i18n)
- دعم اللغتين العربية والإنجليزية
- استخدام `next-intl`
- مفاتيح الترجمة:
  * `auditLog` - نصوص سجل المراجعة
  * `common` - النصوص المشتركة

### 2. الجداول (Tables)
- دعم RTL للعربية
- دعم LTR للإنجليزية

### 3. الوضع الداكن (Dark Mode)
- دعم كامل للوضع الداكن
- ألوان مخصصة لكل نوع إجراء

---

## حالات الاستخدام (Use Cases)

1. **مراقبة الأمن:**
   - تتبع محاولات تسجيل الدخول
   - مراقبة عناوين IP المشبوهة
   - تحديد الأنشطة غير المصرح بها

2. **التدقيق والامتثال:**
   - توثيق جميع التغييرات
   - إثبات الامتثال للوائح
   - تتبع سلسلة التغييرات

3. **استكشاف الأخطاء:**
   - تحديد متى حدث الخطأ
   - معرفة من قام بالتغيير
   - فهم سياق المشكلة

4. **التحليل والإحصاءات:**
   - تحليل نشاط المستخدمين
   - تحديد أوقات الذروة
   - مراقبة أنماط الاستخدام

---

## الخلاصة

هذا الملف يحتوي على:
- ✅ 5 أنواع من الإجراءات مع الألوان
- ✅ 8 سجلات مراجعة كاملة
- ✅ 4 بطاقات إحصائية
- ✅ جدول سجل المراجعة بـ 6 أعمدة
- ✅ 3 ميزات فلترة (بحث، نوع، مستخدم)
- ✅ دالة ألوان الشارات
- ✅ إحصائيات حسب النوع والمستخدم والمتصفح و IP
- ✅ الخط الزمني للأحداث
- ✅ ميزات التصدير والترقيم
- ✅ دعم الوضع الداكن
- ✅ أمثلة على التفاصيل
- ✅ حالات الاستخدام

---

**تاريخ إنشاء الملف:** 2026-08-13  
**المسار:** `AUDIT_LOG_DATA.md`
