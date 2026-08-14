# بيانات صفحة المعاملات المالية - Transactions Page Data

هذا الملف يحتوي على جميع البيانات والحقول الموجودة في صفحة المعاملات المالية.

---

## صفحة المعاملات المالية (Transactions Page)
**المسار:** `src/app/transactions/page.tsx`

---

## أنواع المعاملات (Transaction Types)

```typescript
type TransactionType = "revenue" | "expense" | "return" | "withdrawal";
```

| النوع | القيمة | الوصف | الأيقونة | اللون |
|-------|--------|-------|---------|-------|
| **إيرادات** (Revenue) | `revenue` | دخل من المبيعات والخدمات | ArrowUpCircle | أخضر `text-green-500` |
| **مصروفات** (Expense) | `expense` | مصاريف وتكاليف | ArrowDownCircle | أحمر `text-red-400` |
| **مرتجعات** (Returns) | `return` | إرجاع مبالغ للعملاء | RotateCcw | أصفر `text-yellow-500` |
| **سحوبات** (Withdrawals) | `withdrawal` | سحب نقدي من المالك | Wallet | أزرق `text-blue-400` |

---

## هيكل بيانات المعاملة (Transaction Data Structure)

```typescript
type Transaction = {
  id: number;                  // معرف المعاملة
  type: TransactionType;       // نوع المعاملة
  amount: number;              // المبلغ
  category: string;            // الفئة/التصنيف
  description: string;         // الوصف
  date: string;                // التاريخ
  reference?: string;          // رقم المرجع (اختياري)
  paymentMethod?: string;      // طريقة الدفع (اختياري)
  status: string;              // الحالة
};
```

---

## بيانات المعاملات (Mock Transactions Data)

```javascript
const transactions = [
  {
    id: 1,
    type: "revenue",
    amount: 15000,
    category: "مبيعات منتجات",
    description: "مبيعات شهر يونيو",
    date: "2023-06-15",
    reference: "REV-001",
    paymentMethod: "نقدي",
    status: "مكتمل"
  },
  {
    id: 2,
    type: "expense",
    amount: 5000,
    category: "رواتب",
    description: "رواتب الموظفين",
    date: "2023-06-10",
    reference: "EXP-001",
    paymentMethod: "تحويل بنكي",
    status: "مكتمل"
  },
  {
    id: 3,
    type: "revenue",
    amount: 8500,
    category: "خدمات",
    description: "إيرادات الخدمات",
    date: "2023-06-12",
    reference: "REV-002",
    paymentMethod: "بطاقة",
    status: "مكتمل"
  },
  {
    id: 4,
    type: "expense",
    amount: 3200,
    category: "إيجار",
    description: "إيجار المحل",
    date: "2023-06-05",
    reference: "EXP-002",
    paymentMethod: "شيك",
    status: "مكتمل"
  },
  {
    id: 5,
    type: "return",
    amount: 1500,
    category: "مرتجعات منتجات",
    description: "إرجاع طلب #1045",
    date: "2023-06-08",
    reference: "RET-001",
    paymentMethod: "نقدي",
    status: "معالج"
  },
  {
    id: 6,
    type: "expense",
    amount: 2500,
    category: "مشتريات",
    description: "شراء مخزون",
    date: "2023-06-11",
    reference: "EXP-003",
    paymentMethod: "نقدي",
    status: "مكتمل"
  },
  {
    id: 7,
    type: "withdrawal",
    amount: 10000,
    category: "سحب مالك",
    description: "سحب نقدي",
    date: "2023-06-14",
    reference: "WTH-001",
    paymentMethod: "نقدي",
    status: "مكتمل"
  },
  {
    id: 8,
    type: "revenue",
    amount: 12000,
    category: "مبيعات جملة",
    description: "مبيعات للموزعين",
    date: "2023-06-13",
    reference: "REV-003",
    paymentMethod: "تحويل بنكي",
    status: "مكتمل"
  }
];
```

---

## بطاقات الإحصائيات (Statistics Cards)

### 1. إجمالي الإيرادات (Total Revenue)

```javascript
{
  label: "إجمالي الإيرادات / شهر",
  value: 35500,    // مجموع جميع الإيرادات
  display: "35.5k",
  trend: "+23%",
  trendType: "up",  // ارتفاع
  color: "purple",  // #8B5CF6
  sparklineColor: "#8B5CF6"
}
```

**الحساب:**
```javascript
const totalRevenue = transactions
  .filter(t => t.type === "revenue")
  .reduce((sum, t) => sum + t.amount, 0);
// = 15000 + 8500 + 12000 = 35,500
```

**مميزات البطاقة:**
- رسم بياني صغير (Sparkline) بنفسجي منحني
- نسبة التغيير: +23%
- مقارنة مع: الأسبوع الماضي
- أيقونة سهم صاعد

---

### 2. إجمالي المصروفات (Total Expenses)

```javascript
{
  label: "إجمالي المصروفات / شهر",
  value: 10700,    // مجموع جميع المصروفات
  display: "10.7k",
  trend: "-18%",
  trendType: "neutral", // دائرة
  color: "amber",   // #F59E0B
  sparklineColor: "#F59E0B"
}
```

**الحساب:**
```javascript
const totalExpenses = transactions
  .filter(t => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);
// = 5000 + 3200 + 2500 = 10,700
```

**مميزات البطاقة:**
- رسم بياني أصفر منحني
- نسبة التغيير: -18%
- أيقونة دائرة

---

### 3. إجمالي المرتجعات (Total Returns)

```javascript
{
  label: "إجمالي المرتجعات / شهر",
  value: 1500,     // مجموع جميع المرتجعات
  display: "1.5k",
  trend: "+5%",
  trendType: "up",
  color: "cyan",    // #06B6D4
  sparklineColor: "#06B6D4"
}
```

**الحساب:**
```javascript
const totalReturns = transactions
  .filter(t => t.type === "return")
  .reduce((sum, t) => sum + t.amount, 0);
// = 1500
```

**مميزات البطاقة:**
- رسم بياني سماوي منحني
- نسبة التغيير: +5%
- أيقونة سهم صاعد

---

### 4. إجمالي السحوبات (Total Withdrawals)

```javascript
{
  label: "إجمالي السحوبات / شهر",
  value: 10000,    // مجموع جميع السحوبات
  display: "10.0k",
  trend: "-12%",
  trendType: "down",
  color: "blue",    // #3B82F6
  sparklineColor: "#3B82F6"
}
```

**الحساب:**
```javascript
const totalWithdrawals = transactions
  .filter(t => t.type === "withdrawal")
  .reduce((sum, t) => sum + t.amount, 0);
// = 10,000
```

**مميزات البطاقة:**
- رسم بياني أزرق منحني
- نسبة التغيير: -12%
- أيقونة سهم هابط

---

### 5. صافي الربح (Net Profit)

```javascript
{
  label: "صافي الربح / شهر",
  value: 13300,    // الإيرادات - (المصروفات + المرتجعات + السحوبات)
  display: "13.3k",
  trend: "+15%",
  trendType: "up",
  color: "green",   // #10B981 أو red إذا كان سالب
  sparklineColor: "#10B981",
  gradient: "from-green-50 to-white" // تدرج أخضر إذا موجب
}
```

**الحساب:**
```javascript
const netProfit = totalRevenue - totalExpenses - totalReturns - totalWithdrawals;
// = 35,500 - 10,700 - 1,500 - 10,000 = 13,300
```

**مميزات البطاقة:**
- خلفية متدرجة (أخضر إذا موجب، أحمر إذا سالب)
- رسم بياني أخضر/أحمر حسب النتيجة
- نسبة التغيير: +15% أو -15%
- أيقونة سهم صاعد/هابط حسب النتيجة

---

## ميزات الرسومات البيانية الصغيرة (Sparklines)

كل بطاقة تحتوي على:
- **خط منحني SVG** يعرض الاتجاه
- **نسبة مئوية** في نهاية الخط
- **ألوان مخصصة** لكل نوع
- **أبعاد:** 96×64 بكسل

```svg
<!-- مثال: رسم بياني الإيرادات -->
<svg width="96" height="64" viewBox="0 0 96 64" fill="none">
  <path 
    d="M0 48C8 45, 16 38, 24 35C32 32, 40 28, 48 32C56 36, 64 42, 72 38C80 34, 88 28, 96 24" 
    stroke="#8B5CF6" 
    strokeWidth="2" 
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"/>
  <text x="92" y="20" fontSize="10" fill="#8B5CF6" fontWeight="600">23%</text>
</svg>
```

---

## التبويبات (Tabs)

### 1. تبويب الإيرادات (Revenues Tab)
- القيمة: `revenue`
- الأيقونة: ArrowUpCircle
- العدد: 3 معاملات

### 2. تبويب المصروفات (Expenses Tab)
- القيمة: `expense`
- الأيقونة: ArrowDownCircle
- العدد: 3 معاملات

### 3. تبويب المرتجعات (Returns Tab)
- القيمة: `return`
- الأيقونة: RotateCcw
- العدد: 1 معاملة

### 4. تبويب السحوبات (Withdrawals Tab)
- القيمة: `withdrawal`
- الأيقونة: Wallet
- العدد: 1 معاملة

---

## جدول المعاملات (Transactions Table)

### الأعمدة المعروضة:

1. **التاريخ** (Date)
   - تنسيق: YYYY-MM-DD

2. **المرجع** (Reference)
   - أمثلة: REV-001, EXP-001, RET-001, WTH-001
   - نص غامق (font-medium)

3. **الفئة** (Category)
   - مع أيقونة ملونة حسب النوع
   - أمثلة:
     * مبيعات منتجات
     * رواتب
     * إيجار
     * مرتجعات منتجات
     * سحب مالك

4. **الوصف** (Description)
   - نص تفصيلي عن المعاملة

5. **طريقة الدفع** (Payment Method)
   - نقدي (Cash)
   - بطاقة (Card)
   - تحويل بنكي (Bank Transfer)
   - شيك (Check)

6. **المبلغ** (Amount)
   - بالآلاف مع فواصل
   - ملون حسب نوع المعاملة:
     * أخضر للإيرادات
     * أحمر للمصروفات
     * أصفر للمرتجعات
     * أزرق للسحوبات
   - نص غامق (font-bold)

7. **الحالة** (Status)
   - شارة ملونة:
     * مكتمل (Completed) - `bg-green-100 text-green-800`
     * معالج (Processing) - `bg-blue-100 text-blue-800`
     * قيد الانتظار (Pending) - `bg-yellow-100 text-yellow-800`
     * ملغي (Cancelled) - `bg-red-100 text-red-800`

8. **الإجراءات** (Actions)
   - **تعديل** (Edit) - FileEdit Icon
   - **حذف** (Delete) - Trash2 Icon (أحمر)

---

## ميزات البحث والفلترة

### 1. البحث (Search)
- حقل نص للبحث
- متغير: `searchQuery`
- زر بحث مع أيقونة Search

### 2. فلتر التاريخ (Date Filter)
- حقل اختيار تاريخ (Date Input)
- متغير: `dateFilter`
- زر فلترة مع أيقونة Filter

### 3. التصدير (Export)
- زر لتصدير البيانات
- أيقونة: Download

---

## نموذج إضافة معاملة (Add Transaction Dialog)

### الحقول:

1. **نوع المعاملة** (Transaction Type)
   - نوع: قائمة منسدلة (Select)
   - متغير: `formType`
   - الخيارات:
     * إيراد (Revenue)
     * مصروف (Expense)
     * مرتجع (Return)
     * سحب (Withdrawal)
   - القيمة الافتراضية: نفس التبويب النشط

2. **المبلغ** (Amount)
   - نوع: رقم (Number Input)
   - متغير: `formAmount`
   - تنسيق: 0.00
   - مطلوب

3. **الفئة** (Category)
   - نوع: نص (Text Input)
   - متغير: `formCategory`
   - مطلوب

4. **التاريخ** (Date)
   - نوع: تاريخ (Date Input)
   - متغير: `formDate`
   - مطلوب

5. **المرجع** (Reference)
   - نوع: نص (Text Input)
   - متغير: `formReference`
   - اختياري

6. **طريقة الدفع** (Payment Method)
   - نوع: قائمة منسدلة (Select)
   - متغير: `formPaymentMethod`
   - الخيارات:
     * نقدي (Cash) - `value: "cash"`
     * بطاقة (Card) - `value: "card"`
     * تحويل بنكي (Bank Transfer) - `value: "bank"`
     * شيك (Check) - `value: "check"`
   - اختياري

7. **الوصف** (Description)
   - نوع: نص متعدد الأسطر (Textarea)
   - متغير: `formDescription`
   - اختياري

### أزرار النموذج:
- **إلغاء** (Cancel) - Outline Button
- **حفظ** (Save) - Primary Button

---

## نموذج تعديل معاملة (Edit Transaction Dialog)

**نفس حقول نموذج الإضافة مع اختلاف واحد:**
- حقل **نوع المعاملة** معطل (disabled) ولا يمكن تغييره

---

## أمثلة على الفئات (Category Examples)

### إيرادات (Revenue):
- مبيعات منتجات
- خدمات
- مبيعات جملة
- إيجار (دخل)
- استشارات

### مصروفات (Expenses):
- رواتب
- إيجار
- مشتريات
- مرافق (كهرباء، ماء)
- صيانة
- تسويق
- تأمين
- نقل ومواصلات

### مرتجعات (Returns):
- مرتجعات منتجات
- إلغاء خدمة
- استرداد مبالغ

### سحوبات (Withdrawals):
- سحب مالك
- توزيع أرباح
- سحب رأسمال

---

## أنماط المرجع (Reference Patterns)

| النوع | البادئة | مثال |
|-------|---------|------|
| إيراد | REV- | REV-001, REV-002 |
| مصروف | EXP- | EXP-001, EXP-002 |
| مرتجع | RET- | RET-001 |
| سحب | WTH- | WTH-001 |

---

## الحالات المتاحة (Available Statuses)

| الحالة | القيمة | اللون | CSS Class |
|--------|--------|-------|-----------|
| **مكتمل** (Completed) | `مكتمل` | أخضر | `bg-green-100 text-green-800` |
| **قيد المعالجة** (Processing) | `معالج` | أزرق | `bg-blue-100 text-blue-800` |
| **قيد الانتظار** (Pending) | `قيد الانتظار` | أصفر | `bg-yellow-100 text-yellow-800` |
| **ملغي** (Cancelled) | `ملغي` | أحمر | `bg-red-100 text-red-800` |

---

## الدوال المساعدة (Helper Functions)

### 1. دالة الأيقونة (Get Transaction Icon)

```javascript
function getTransactionIcon(type: TransactionType) {
  switch (type) {
    case "revenue":
      return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
    case "expense":
      return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
    case "return":
      return <RotateCcw className="h-4 w-4 text-yellow-500" />;
    case "withdrawal":
      return <Wallet className="h-4 w-4 text-blue-500" />;
  }
}
```

### 2. دالة اللون (Get Transaction Color)

```javascript
function getTransactionColor(type: TransactionType) {
  switch (type) {
    case "revenue":
      return "text-green-500";
    case "expense":
      return "text-red-400";
    case "return":
      return "text-yellow-500";
    case "withdrawal":
      return "text-blue-400";
  }
}
```

---

## الحسابات المالية (Financial Calculations)

### 1. إجمالي الإيرادات:
```javascript
const totalRevenue = transactions
  .filter(t => t.type === "revenue")
  .reduce((sum, t) => sum + t.amount, 0);
```

### 2. إجمالي المصروفات:
```javascript
const totalExpenses = transactions
  .filter(t => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);
```

### 3. إجمالي المرتجعات:
```javascript
const totalReturns = transactions
  .filter(t => t.type === "return")
  .reduce((sum, t) => sum + t.amount, 0);
```

### 4. إجمالي السحوبات:
```javascript
const totalWithdrawals = transactions
  .filter(t => t.type === "withdrawal")
  .reduce((sum, t) => sum + t.amount, 0);
```

### 5. صافي الربح:
```javascript
const netProfit = totalRevenue - totalExpenses - totalReturns - totalWithdrawals;
```

---

## مثال حسابي كامل:

```
المعاملات:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 الإيرادات:
   - مبيعات شهر يونيو: 15,000
   - إيرادات الخدمات: 8,500
   - مبيعات للموزعين: 12,000
   ────────────────────────────
   الإجمالي: 35,500 ريال

📉 المصروفات:
   - رواتب الموظفين: 5,000
   - إيجار المحل: 3,200
   - شراء مخزون: 2,500
   ────────────────────────────
   الإجمالي: 10,700 ريال

🔄 المرتجعات:
   - إرجاع طلب #1045: 1,500
   ────────────────────────────
   الإجمالي: 1,500 ريال

💰 السحوبات:
   - سحب نقدي: 10,000
   ────────────────────────────
   الإجمالي: 10,000 ريال

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 صافي الربح:
   35,500 - 10,700 - 1,500 - 10,000 = 13,300 ريال
```

---

## إدارة الحالة (State Management)

### حالة البحث والفلترة:
```javascript
const [searchQuery, setSearchQuery] = useState("");
const [dateFilter, setDateFilter] = useState("");
const [activeTab, setActiveTab] = useState<TransactionType>("revenue");
```

### حالة النوافذ المنبثقة:
```javascript
const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
```

### حالة النموذج:
```javascript
const [formType, setFormType] = useState<TransactionType>("revenue");
const [formAmount, setFormAmount] = useState("");
const [formCategory, setFormCategory] = useState("");
const [formDescription, setFormDescription] = useState("");
const [formDate, setFormDate] = useState("");
const [formReference, setFormReference] = useState("");
const [formPaymentMethod, setFormPaymentMethod] = useState("");
```

---

## الوظائف الرئيسية (Main Functions)

### 1. إضافة معاملة:
```javascript
const handleAddTransaction = () => {
  setFormType(activeTab);
  resetForm();
  setIsAddDialogOpen(true);
};
```

### 2. تعديل معاملة:
```javascript
const handleEditTransaction = (transaction: Transaction) => {
  setCurrentTransaction(transaction);
  setFormType(transaction.type);
  setFormAmount(transaction.amount.toString());
  setFormCategory(transaction.category);
  setFormDescription(transaction.description);
  setFormDate(transaction.date);
  setFormReference(transaction.reference || "");
  setFormPaymentMethod(transaction.paymentMethod || "");
  setIsEditDialogOpen(true);
};
```

### 3. حذف معاملة:
```javascript
const handleDeleteTransaction = (transactionId: number) => {
  console.log("Deleting transaction:", transactionId);
  // سيتم تنفيذ الحذف الفعلي
};
```

### 4. حفظ معاملة:
```javascript
const handleSaveTransaction = () => {
  console.log("Saving transaction:", {
    type: formType,
    amount: formAmount,
    category: formCategory,
    description: formDescription,
    date: formDate,
    reference: formReference,
    paymentMethod: formPaymentMethod
  });
  setIsAddDialogOpen(false);
  setIsEditDialogOpen(false);
  resetForm();
};
```

### 5. إعادة تعيين النموذج:
```javascript
const resetForm = () => {
  setFormAmount("");
  setFormCategory("");
  setFormDescription("");
  setFormDate("");
  setFormReference("");
  setFormPaymentMethod("");
};
```

---

## الميزات المشتركة

### 1. الترجمة (i18n)
- دعم اللغتين العربية والإنجليزية
- استخدام `next-intl`
- مفاتيح الترجمة:
  * `transactions` - نصوص المعاملات
  * `common` - النصوص المشتركة

### 2. الجداول (Tables)
- دعم RTL للعربية
- دعم LTR للإنجليزية

---

## المكونات المستخدمة (Components)

- Card, CardContent, CardDescription, CardHeader, CardTitle
- Button
- Input
- Label
- Tabs, TabsContent, TabsList, TabsTrigger
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Textarea
- Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle

---

## الأيقونات المستخدمة (Icons)

- Plus
- Search
- Filter
- Download
- FileEdit
- Trash2
- TrendingUp
- TrendingDown
- ArrowDownCircle
- ArrowUpCircle
- RotateCcw
- Wallet
- Calendar
- DollarSign

---

## تصميم البطاقات الإحصائية (Card Design)

### الميزات:
1. **خلفية مخصصة:**
   - وضع فاتح: `bg-white`
   - وضع داكن: `bg-[#0b101c]`

2. **تخطيط محسّن:**
   - عنوان مع وحدة الوقت (/ شهر)
   - قيمة كبيرة مع رمز العملة
   - مؤشر الاتجاه مع النسبة
   - رسم بياني في الزاوية

3. **الخطوط:**
   - خط Cairo للأرقام الكبيرة
   - وزن غامق للقيمة الرئيسية

---

## الخلاصة

هذا الملف يحتوي على:
- ✅ جميع أنواع المعاملات (4 أنواع)
- ✅ بيانات المعاملات الوهمية (8 معاملات)
- ✅ 5 بطاقات إحصائية مع رسومات بيانية
- ✅ جدول المعاملات بجميع الأعمدة
- ✅ 4 تبويبات حسب النوع
- ✅ نموذج إضافة معاملة (7 حقول)
- ✅ نموذج تعديل معاملة
- ✅ طرق الدفع (4 طرق)
- ✅ الحالات المتاحة (4 حالات)
- ✅ الحسابات المالية الكاملة
- ✅ الدوال المساعدة
- ✅ مثال حسابي كامل
- ✅ إدارة الحالة
- ✅ الوظائف الرئيسية

---

**تاريخ إنشاء الملف:** 2026-08-13  
**المسار:** `TRANSACTIONS_DATA.md`
