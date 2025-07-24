"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, User, Building, CreditCard, Mail, Bell, Shield, Database, Globe, Printer, Users, UserPlus, Key, PlusCircle } from "lucide-react";
import { useUI } from "@/components/providers";

export default function SettingsPage() {
  // استخدام مكون UI للتنبيهات والتأكيدات والحوارات
  const { showToast, showDeleteConfirmation, showLogoDialog, showUserDialog, showBackupDialog, showRoleDialog, showPermissionsDialog } = useUI();
  // تعريف دالة حفظ معلومات الشركة
  const handleSaveCompanyInfo = () => {
    console.log("تم حفظ معلومات الشركة");
    // استخدام مكون التنبيهات بدلاً من alert التقليدية
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ معلومات الشركة بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات الفواتير
  const handleSaveInvoiceSettings = () => {
    console.log("تم حفظ إعدادات الفواتير");
    // استخدام مكون التنبيهات بدلاً من alert التقليدية
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الفواتير بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات العملة والضرائب
  const handleSaveCurrencySettings = () => {
    console.log("تم حفظ إعدادات العملة والضرائب");
    // استخدام مكون التنبيهات بدلاً من alert التقليدية
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات العملة والضرائب بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة إضافة مستخدم جديد
  const handleAddUser = () => {
    console.log("فتح نموذج إضافة مستخدم جديد");
    // استخدام نافذة حوار إضافة مستخدم
    showUserDialog({
      title: "إضافة مستخدم جديد",
      onSave: (userData) => {
        console.log("تم إضافة مستخدم جديد:", userData);
        // هنا يمكن إضافة منطق حفظ بيانات المستخدم
        showToast({
          title: "تمت الإضافة",
          description: `تم إضافة المستخدم ${userData.name} بنجاح`,
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة تعديل مستخدم
  const handleEditUser = (userName: string, userId: string = "1") => {
    console.log(`تعديل المستخدم: ${userName}`);
    // استخدام نافذة حوار تعديل مستخدم
    showUserDialog({
      title: `تعديل المستخدم: ${userName}`,
      user: {
        id: userId,
        name: userName,
        email: `${userName.replace(/ /g, ".")}@example.com`,
        role: "user",
      },
      onSave: (userData) => {
        console.log("تم تعديل بيانات المستخدم:", userData);
        // هنا يمكن إضافة منطق حفظ بيانات المستخدم المعدلة
        showToast({
          title: "تم التعديل",
          description: `تم تعديل بيانات المستخدم ${userData.name} بنجاح`,
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة حذف مستخدم
  const handleDeleteUser = (userName) => {
    // استخدام مكون تأكيد الحذف بدلاً من confirm التقليدية
    showDeleteConfirmation({
      title: "حذف المستخدم",
      description: `هل أنت متأكد من حذف المستخدم: ${userName}؟`,
      onConfirm: () => {
        console.log(`تم حذف المستخدم: ${userName}`);
        showToast({
          title: "تم الحذف",
          description: `تم حذف المستخدم: ${userName} بنجاح`,
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة إضافة دور جديد
  const handleAddRole = () => {
    showRoleDialog({
      title: "إضافة دور جديد",
      onSave: (roleData) => {
        console.log("تم إضافة دور جديد:", roleData);
        showToast({
          title: "تم بنجاح",
          description: `تم إضافة الدور الجديد: ${roleData.name}`,
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة تعديل دور
  const handleEditRole = (role) => {
    showRoleDialog({
      role: {
        name: role.role,
        description: role.description
      },
      title: `تعديل الدور: ${role.role}`,
      onSave: (roleData) => {
        console.log("تم تحديث الدور:", roleData);
        showToast({
          title: "تم بنجاح",
          description: `تم تحديث الدور: ${roleData.name}`,
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة إدارة صلاحيات دور
  const handleManagePermissions = (role) => {
    // بيانات الصلاحيات الافتراضية للأدوار (في التطبيق الحقيقي ستأتي من قاعدة البيانات)
    const defaultPermissions = {
      "مدير": {
        "products.view": true, "products.create": true, "products.edit": true, "products.delete": true,
        "orders.view": true, "orders.create": true, "orders.edit": true, "orders.delete": true, "orders.approve": true,
        "customers.view": true, "customers.create": true, "customers.edit": true, "customers.delete": true,
        "reports.sales": true, "reports.inventory": true, "reports.customers": true, "reports.financial": true,
        "settings.view": true, "settings.edit": true, "users.manage": true, "roles.manage": true, "backup.manage": true
      },
      "محاسب": {
        "products.view": true, "products.create": false, "products.edit": false, "products.delete": false,
        "orders.view": true, "orders.create": true, "orders.edit": true, "orders.delete": false, "orders.approve": false,
        "customers.view": true, "customers.create": true, "customers.edit": true, "customers.delete": false,
        "reports.sales": true, "reports.inventory": true, "reports.customers": true, "reports.financial": true,
        "settings.view": true, "settings.edit": false, "users.manage": false, "roles.manage": false, "backup.manage": false
      },
      "مشرف مخزون": {
        "products.view": true, "products.create": true, "products.edit": true, "products.delete": true,
        "orders.view": true, "orders.create": false, "orders.edit": false, "orders.delete": false, "orders.approve": false,
        "customers.view": false, "customers.create": false, "customers.edit": false, "customers.delete": false,
        "reports.sales": false, "reports.inventory": true, "reports.customers": false, "reports.financial": false,
        "settings.view": false, "settings.edit": false, "users.manage": false, "roles.manage": false, "backup.manage": false
      }
    };

    // الحصول على الصلاحيات الحالية للدور (إذا كانت موجودة) أو استخدام صلاحيات فارغة
    const initialPermissions = defaultPermissions[role.role] || {};

    showPermissionsDialog({
      roleName: role.role,
      initialPermissions,
      onSave: (permissions) => {
        console.log(`تم تحديث صلاحيات الدور ${role.role}:`, permissions);
        showToast({
          title: "تم بنجاح",
          description: `تم تحديث صلاحيات الدور: ${role.role}`,
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة حفظ الإشعارات
  const handleSaveNotifications = () => {
    // هنا يمكن إضافة منطق حفظ إعدادات الإشعارات
    console.log("تم حفظ إعدادات الإشعارات");
    // استخدام مكون التنبيهات بدلاً من alert التقليدية
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات كلمة المرور
  const handleSavePasswordSettings = () => {
    console.log("تم حفظ إعدادات كلمة المرور");
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات كلمة المرور بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات المصادقة الثنائية
  const handleSave2FASettings = () => {
    console.log("تم حفظ إعدادات المصادقة الثنائية");
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات المصادقة الثنائية بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات النظام
  const handleSaveSystemSettings = () => {
    console.log("تم حفظ إعدادات النظام");
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات النظام بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات الطباعة
  const handleSavePrintSettings = () => {
    console.log("تم حفظ إعدادات الطباعة");
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الطباعة بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة إنشاء نسخة احتياطية
  const handleCreateBackup = () => {
    console.log("جاري إنشاء نسخة احتياطية...");
    showToast({
      title: "جاري العمل",
      description: "جاري إنشاء نسخة احتياطية...",
      variant: "default"
    });
    
    setTimeout(() => {
      showToast({
        title: "تم بنجاح",
        description: "تم إنشاء نسخة احتياطية بنجاح",
        variant: "success"
      });
    }, 1500);
  };

  // تعريف دالة استعادة من نسخة احتياطية
  const handleRestoreBackup = () => {
    // بيانات النسخ الاحتياطية (يمكن استبدالها بطلب API لجلب النسخ الاحتياطية الفعلية)
    const backups = [
      { id: "1", name: "نسخة احتياطية تلقائية", date: "2023-06-15 10:30:00", size: "45.2 MB", type: "تلقائية" },
      { id: "2", name: "نسخة احتياطية يدوية", date: "2023-06-10 14:15:00", size: "44.8 MB", type: "يدوية" },
      { id: "3", name: "نسخة احتياطية قبل التحديث", date: "2023-06-05 09:00:00", size: "43.5 MB", type: "يدوية" },
      { id: "4", name: "نسخة احتياطية تلقائية", date: "2023-06-01 10:30:00", size: "43.2 MB", type: "تلقائية" },
      { id: "5", name: "نسخة احتياطية يدوية", date: "2023-05-25 16:45:00", size: "42.9 MB", type: "يدوية" },
    ];
    
    // عرض حوار النسخ الاحتياطية
    showBackupDialog({
      backups,
      onRestore: (backupId) => {
        // العثور على النسخة الاحتياطية المحددة
        const selectedBackup = backups.find(backup => backup.id === backupId);
        
        console.log(`جاري استعادة النظام من النسخة الاحتياطية: ${selectedBackup?.name}`);
        showToast({
          title: "جاري العمل",
          description: `جاري استعادة النظام من النسخة الاحتياطية: ${selectedBackup?.name}...`,
          variant: "default"
        });
        
        // محاكاة عملية الاستعادة (يمكن استبدالها بطلب API فعلي)
        setTimeout(() => {
          showToast({
            title: "تم بنجاح",
            description: "تم استعادة النظام بنجاح",
            variant: "success"
          });
        }, 2000);
      }
    });
  };

  // تعريف دالة حفظ إعدادات النسخ الاحتياطي
  const handleSaveBackupSettings = () => {
    console.log("تم حفظ إعدادات النسخ الاحتياطي");
    showToast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات النسخ الاحتياطي بنجاح",
      variant: "success"
    });
  };

  // تعريف دالة تغيير شعار الشركة
  const handleChangeLogo = () => {
    console.log("فتح نافذة اختيار شعار الشركة");
    // استخدام نافذة حوار تغيير الشعار
    showLogoDialog({
      currentLogo: "/icons/market-logo.png", // مسار الشعار الحالي
      onSave: (logoFile) => {
        if (logoFile) {
          console.log("تم اختيار شعار جديد:", logoFile.name);
          // هنا يمكن إضافة منطق رفع الملف إلى الخادم
          showToast({
            title: "تم تغيير الشعار",
            description: "تم تغيير شعار الشركة بنجاح",
            variant: "success"
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">الإعدادات</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 h-auto p-1">
          <TabsTrigger value="general" className="py-2">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>عام</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="users" className="py-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>المستخدمين</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>الإشعارات</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="security" className="py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>الأمان</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="system" className="py-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>النظام</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* إعدادات عامة */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الشركة</CardTitle>
              <CardDescription>إدارة معلومات شركتك الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input id="company-name" placeholder="أدخل اسم الشركة" defaultValue="شركة الأفق للتقنية" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-number">الرقم الضريبي</Label>
                  <Input id="tax-number" placeholder="أدخل الرقم الضريبي" defaultValue="300012345600003" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" placeholder="أدخل رقم الهاتف" defaultValue="+966 12 345 6789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="أدخل البريد الإلكتروني" defaultValue="info@example.com" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input id="address" placeholder="أدخل العنوان" defaultValue="شارع الملك فهد، الرياض، المملكة العربية السعودية" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">شعار الشركة</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                    <Building className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Button variant="outline" onClick={handleChangeLogo}>تغيير الشعار</Button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveCompanyInfo}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الفواتير</CardTitle>
              <CardDescription>تخصيص إعدادات الفواتير والمستندات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">بادئة رقم الفاتورة</Label>
                  <Input id="invoice-prefix" placeholder="بادئة رقم الفاتورة" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-prefix">بادئة رقم الطلب</Label>
                  <Input id="order-prefix" placeholder="بادئة رقم الطلب" defaultValue="ORD-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-footer">تذييل الفاتورة</Label>
                  <Input id="invoice-footer" placeholder="نص تذييل الفاتورة" defaultValue="شكراً لتعاملكم معنا" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-due-days">أيام استحقاق الفاتورة</Label>
                  <Input id="invoice-due-days" type="number" placeholder="عدد الأيام" defaultValue="30" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveInvoiceSettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات العملة والضرائب</CardTitle>
              <CardDescription>تكوين العملة وإعدادات الضرائب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">العملة الافتراضية</Label>
                  <Input id="currency" placeholder="العملة" defaultValue="ريال سعودي (SAR)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-symbol">رمز العملة</Label>
                  <Input id="currency-symbol" placeholder="رمز العملة" defaultValue="ريال" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">نسبة الضريبة الافتراضية</Label>
                  <Input id="tax-rate" type="number" placeholder="نسبة الضريبة" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-number-label">مسمى الرقم الضريبي</Label>
                  <Input id="tax-number-label" placeholder="مسمى الرقم الضريبي" defaultValue="الرقم الضريبي" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveCurrencySettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات المستخدمين */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>المستخدمين</CardTitle>
                <CardDescription>إدارة مستخدمي النظام وصلاحياتهم</CardDescription>
              </div>
              <Button className="flex items-center gap-1" onClick={handleAddUser}>
                <UserPlus className="h-4 w-4" />
                <span>إضافة مستخدم</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر تسجيل دخول</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "أحمد محمد", email: "ahmed@example.com", role: "مدير", status: "نشط", lastLogin: "2023-06-15 10:30" },
                    { name: "سارة خالد", email: "sara@example.com", role: "محاسب", status: "نشط", lastLogin: "2023-06-14 14:45" },
                    { name: "محمد علي", email: "mohamed@example.com", role: "مشرف مخزون", status: "نشط", lastLogin: "2023-06-15 09:15" },
                    { name: "فاطمة أحمد", email: "fatima@example.com", role: "مندوب مبيعات", status: "غير نشط", lastLogin: "2023-06-10 11:20" },
                    { name: "خالد عبدالله", email: "khaled@example.com", role: "مدخل بيانات", status: "نشط", lastLogin: "2023-06-15 08:30" }
                  ].map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-block ${user.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {user.status}
                        </div>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user.name)}>تعديل</Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteUser(user.name)}>حذف</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>الأدوار والصلاحيات</CardTitle>
                <CardDescription>إدارة أدوار المستخدمين وصلاحياتهم في النظام</CardDescription>
              </div>
              <Button onClick={handleAddRole}>
                <PlusCircle className="ml-2 h-4 w-4" />
                إضافة دور جديد
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الدور</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>عدد المستخدمين</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { role: "مدير", description: "صلاحيات كاملة للنظام", users: 1 },
                    { role: "محاسب", description: "إدارة الفواتير والمدفوعات والتقارير المالية", users: 2 },
                    { role: "مشرف مخزون", description: "إدارة المنتجات والمخزون", users: 3 },
                    { role: "مندوب مبيعات", description: "إدارة الطلبات والعملاء", users: 5 },
                    { role: "مدخل بيانات", description: "إدخال البيانات الأساسية فقط", users: 2 }
                  ].map((role, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{role.role}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>تعديل</Button>
                          <Button variant="ghost" size="sm" onClick={() => handleManagePermissions(role)}>الصلاحيات</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات الإشعارات */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تخصيص إعدادات الإشعارات والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">إشعارات المخزون</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">تنبيه المخزون المنخفض</div>
                      <div className="text-sm text-muted-foreground">إشعار عند وصول المنتج للحد الأدنى</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="low-stock" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">تنبيه نفاد المخزون</div>
                      <div className="text-sm text-muted-foreground">إشعار عند نفاد المنتج من المخزون</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="out-of-stock" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">إشعارات الطلبات</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">طلب جديد</div>
                      <div className="text-sm text-muted-foreground">إشعار عند إنشاء طلب جديد</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="new-order" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">تغيير حالة الطلب</div>
                      <div className="text-sm text-muted-foreground">إشعار عند تغيير حالة الطلب</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="order-status" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">إشعارات العملاء</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">عميل جديد</div>
                      <div className="text-sm text-muted-foreground">إشعار عند تسجيل عميل جديد</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="new-customer" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">تجاوز حد الائتمان</div>
                      <div className="text-sm text-muted-foreground">إشعار عند تجاوز العميل لحد الائتمان</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="credit-limit" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">طرق الإشعار</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">إشعارات النظام</div>
                      <div className="text-sm text-muted-foreground">إشعارات داخل النظام</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="system-notifications" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">البريد الإلكتروني</div>
                      <div className="text-sm text-muted-foreground">إرسال الإشعارات عبر البريد الإلكتروني</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="email-notifications" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات الأمان */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات كلمة المرور</CardTitle>
              <CardDescription>إدارة سياسات كلمات المرور وأمان الحساب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">الحد الأدنى لطول كلمة المرور</Label>
                  <Input id="min-password-length" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">مدة صلاحية كلمة المرور (بالأيام)</Label>
                  <Input id="password-expiry" type="number" defaultValue="90" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>متطلبات تعقيد كلمة المرور</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-uppercase" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-uppercase" className="text-sm font-normal">يجب أن تحتوي على حرف كبير واحد على الأقل</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-lowercase" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-lowercase" className="text-sm font-normal">يجب أن تحتوي على حرف صغير واحد على الأقل</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-number" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-number" className="text-sm font-normal">يجب أن تحتوي على رقم واحد على الأقل</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-special" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-special" className="text-sm font-normal">يجب أن تحتوي على رمز خاص واحد على الأقل</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSavePasswordSettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المصادقة الثنائية</CardTitle>
              <CardDescription>تكوين إعدادات المصادقة الثنائية لتعزيز أمان الحسابات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">تفعيل المصادقة الثنائية</div>
                  <div className="text-sm text-muted-foreground">طلب رمز تحقق إضافي عند تسجيل الدخول</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="enable-2fa" className="h-4 w-4" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>طرق المصادقة الثنائية</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="2fa-email" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="2fa-email" className="text-sm font-normal">البريد الإلكتروني</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="2fa-sms" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="2fa-sms" className="text-sm font-normal">الرسائل النصية (SMS)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="2fa-app" className="h-4 w-4" />
                    <Label htmlFor="2fa-app" className="text-sm font-normal">تطبيق المصادقة</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSave2FASettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>سجل الدخول</CardTitle>
              <CardDescription>عرض سجل تسجيل الدخول للمستخدمين</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>تاريخ الدخول</TableHead>
                    <TableHead>عنوان IP</TableHead>
                    <TableHead>المتصفح</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { user: "أحمد محمد", date: "2023-06-15 10:30:15", ip: "192.168.1.1", browser: "Chrome / Windows", status: "ناجح" },
                    { user: "سارة خالد", date: "2023-06-14 14:45:22", ip: "192.168.1.5", browser: "Firefox / MacOS", status: "ناجح" },
                    { user: "محمد علي", date: "2023-06-15 09:15:30", ip: "192.168.1.10", browser: "Safari / iOS", status: "ناجح" },
                    { user: "فاطمة أحمد", date: "2023-06-13 11:20:45", ip: "192.168.1.15", browser: "Chrome / Android", status: "فاشل" },
                    { user: "خالد عبدالله", date: "2023-06-15 08:30:10", ip: "192.168.1.20", browser: "Edge / Windows", status: "ناجح" }
                  ].map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.browser}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-block ${log.status === "ناجح" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {log.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات النظام */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النظام</CardTitle>
              <CardDescription>تكوين إعدادات النظام الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">اللغة الافتراضية</Label>
                  <select id="language" className="w-full p-2 border rounded-md">
                    <option value="ar">العربية</option>
                    <option value="en">الإنجليزية</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">المنطقة الزمنية</Label>
                  <select id="timezone" className="w-full p-2 border rounded-md">
                    <option value="asia/riyadh">الرياض (GMT+3)</option>
                    <option value="asia/dubai">دبي (GMT+4)</option>
                    <option value="europe/london">لندن (GMT+0)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">تنسيق التاريخ</Label>
                  <select id="date-format" className="w-full p-2 border rounded-md">
                    <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">بداية السنة المالية</Label>
                  <select id="fiscal-year" className="w-full p-2 border rounded-md">
                    <option value="01-01">1 يناير</option>
                    <option value="04-01">1 أبريل</option>
                    <option value="07-01">1 يوليو</option>
                    <option value="10-01">1 أكتوبر</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveSystemSettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الطباعة</CardTitle>
              <CardDescription>تكوين إعدادات الطباعة للمستندات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paper-size">حجم الورق الافتراضي</Label>
                  <select id="paper-size" className="w-full p-2 border rounded-md">
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orientation">اتجاه الصفحة</Label>
                  <select id="orientation" className="w-full p-2 border rounded-md">
                    <option value="portrait">عمودي</option>
                    <option value="landscape">أفقي</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>خيارات الطباعة</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="print-logo" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="print-logo" className="text-sm font-normal">طباعة شعار الشركة</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="print-footer" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="print-footer" className="text-sm font-normal">طباعة تذييل الصفحة</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="print-page-numbers" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="print-page-numbers" className="text-sm font-normal">طباعة أرقام الصفحات</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSavePrintSettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>النسخ الاحتياطي واستعادة البيانات</CardTitle>
              <CardDescription>إدارة النسخ الاحتياطي واستعادة بيانات النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>النسخ الاحتياطي التلقائي</Label>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="space-y-0.5">
                    <div className="font-medium">تفعيل النسخ الاحتياطي التلقائي</div>
                    <div className="text-sm text-muted-foreground">إنشاء نسخة احتياطية تلقائية بشكل دوري</div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="auto-backup" className="h-4 w-4" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">تكرار النسخ الاحتياطي</Label>
                  <select id="backup-frequency" className="w-full p-2 border rounded-md">
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">مدة الاحتفاظ بالنسخ الاحتياطية (بالأيام)</Label>
                  <Input id="backup-retention" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex items-center gap-1" onClick={handleCreateBackup}>
                  <Database className="h-4 w-4" />
                  <span>إنشاء نسخة احتياطية الآن</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-1" onClick={handleRestoreBackup}>
                  <Database className="h-4 w-4" />
                  <span>استعادة من نسخة احتياطية</span>
                </Button>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveBackupSettings}>
                  <Save className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}