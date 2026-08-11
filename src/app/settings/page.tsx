"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, User, Building, CreditCard, Mail, Bell, Shield, Database, Globe, Printer, Users, UserPlus, Key, PlusCircle } from "lucide-react";
import { useUI } from "@/components/providers";

export default function SettingsPage() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  
  // استخدام مكون UI للتنبيهات والتأكيدات والحوارات
  const { showToast, showDeleteConfirmation, showLogoDialog, showUserDialog, showBackupDialog, showRoleDialog, showPermissionsDialog } = useUI();
  
  // تعريف دالة حفظ معلومات الشركة
  const handleSaveCompanyInfo = () => {
    console.log("تم حفظ معلومات الشركة");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('saveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات الفواتير
  const handleSaveInvoiceSettings = () => {
    console.log("تم حفظ إعدادات الفواتير");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('invoiceSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات العملة والضرائب
  const handleSaveCurrencySettings = () => {
    console.log("تم حفظ إعدادات العملة والضرائب");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('currencySaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة إضافة مستخدم جديد
  const handleAddUser = () => {
    console.log("فتح نموذج إضافة مستخدم جديد");
    showUserDialog({
      title: t('addUser'),
      onSave: (userData) => {
        console.log("تم إضافة مستخدم جديد:", userData);
        showToast({
          title: t('addUserSuccess'),
          description: t('addUserSuccessDesc', { name: userData.name }),
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة تعديل مستخدم
  const handleEditUser = (userName: string, userId: string = "1") => {
    console.log(`تعديل المستخدم: ${userName}`);
    showUserDialog({
      title: `${t('editUser')}: ${userName}`,
      user: {
        id: userId,
        name: userName,
        email: `${userName.replace(/ /g, ".")}@example.com`,
        role: "user",
      },
      onSave: (userData) => {
        console.log("تم تعديل بيانات المستخدم:", userData);
        showToast({
          title: t('editUserSuccess'),
          description: t('editUserSuccessDesc', { name: userData.name }),
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة حذف مستخدم
  const handleDeleteUser = (userName: string) => {
    showDeleteConfirmation({
      title: t('deleteUser'),
      description: t('deleteConfirmationDesc', { name: userName }),
      onConfirm: () => {
        console.log(`تم حذف المستخدم: ${userName}`);
        showToast({
          title: t('deleteUserSuccess'),
          description: t('deleteUserSuccessDesc', { name: userName }),
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة إضافة دور جديد
  const handleAddRole = () => {
    showRoleDialog({
      title: t('addRole'),
      onSave: (roleData) => {
        console.log("تم إضافة دور جديد:", roleData);
        showToast({
          title: t('addRoleSuccess'),
          description: t('addRoleSuccessDesc', { name: roleData.name }),
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة تعديل دور
  const handleEditRole = (role: any) => {
    showRoleDialog({
      role: {
        name: role.role,
        description: role.description
      },
      title: `${t('editRole')}: ${role.role}`,
      onSave: (roleData) => {
        console.log("تم تحديث الدور:", roleData);
        showToast({
          title: t('editRoleSuccess'),
          description: t('editRoleSuccessDesc', { name: roleData.name }),
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة إدارة صلاحيات دور
  const handleManagePermissions = (role: any) => {
    // بيانات الصلاحيات الافتراضية للأدوار
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

    const initialPermissions = defaultPermissions[role.role as keyof typeof defaultPermissions] || {};

    showPermissionsDialog({
      roleName: role.role,
      initialPermissions,
      onSave: (permissions) => {
        console.log(`تم تحديث صلاحيات الدور ${role.role}:`, permissions);
        showToast({
          title: t('updatePermissionsSuccess'),
          description: t('updatePermissionsSuccessDesc', { role: role.role }),
          variant: "success"
        });
      }
    });
  };

  // تعريف دالة حفظ الإشعارات
  const handleSaveNotifications = () => {
    console.log("تم حفظ إعدادات الإشعارات");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('notificationSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات كلمة المرور
  const handleSavePasswordSettings = () => {
    console.log("تم حفظ إعدادات كلمة المرور");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('passwordSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات المصادقة الثنائية
  const handleSave2FASettings = () => {
    console.log("تم حفظ إعدادات المصادقة الثنائية");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('twoFactorSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات النظام
  const handleSaveSystemSettings = () => {
    console.log("تم حفظ إعدادات النظام");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('systemSettingsSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة حفظ إعدادات الطباعة
  const handleSavePrintSettings = () => {
    console.log("تم حفظ إعدادات الطباعة");
    showToast({
      title: t('saveSuccessTitle'),
      description: t('printSettingsSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة إنشاء نسخة احتياطية
  const handleCreateBackup = () => {
    console.log("جاري إنشاء نسخة احتياطية...");
    showToast({
      title: t('creatingBackup'),
      description: t('creatingBackupDesc'),
      variant: "default"
    });
    
    setTimeout(() => {
      showToast({
        title: t('backupSuccess'),
        description: t('backupSuccessDesc'),
        variant: "success"
      });
    }, 1500);
  };

  // تعريف دالة استعادة من نسخة احتياطية
  const handleRestoreBackup = () => {
    const backups = [
      { id: "1", name: "نسخة احتياطية تلقائية", date: "2023-06-15 10:30:00", size: "45.2 MB", type: "تلقائية" },
      { id: "2", name: "نسخة احتياطية يدوية", date: "2023-06-10 14:15:00", size: "44.8 MB", type: "يدوية" },
      { id: "3", name: "نسخة احتياطية قبل التحديث", date: "2023-06-05 09:00:00", size: "43.5 MB", type: "يدوية" },
      { id: "4", name: "نسخة احتياطية تلقائية", date: "2023-06-01 10:30:00", size: "43.2 MB", type: "تلقائية" },
      { id: "5", name: "نسخة احتياطية يدوية", date: "2023-05-25 16:45:00", size: "42.9 MB", type: "يدوية" },
    ];
    
    showBackupDialog({
      backups,
      onRestore: (backupId) => {
        const selectedBackup = backups.find(backup => backup.id === backupId);
        
        console.log(`جاري استعادة النظام من النسخة الاحتياطية: ${selectedBackup?.name}`);
        showToast({
          title: t('restoringBackup'),
          description: t('restoringBackupDesc', { name: selectedBackup?.name || '' }),
          variant: "default"
        });
        
        setTimeout(() => {
          showToast({
            title: t('restoreSuccess'),
            description: t('restoreSuccessDesc'),
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
      title: t('saveSuccessTitle'),
      description: t('backupSettingsSaveSuccessDesc'),
      variant: "success"
    });
  };

  // تعريف دالة تغيير شعار الشركة
  const handleChangeLogo = () => {
    console.log("فتح نافذة اختيار شعار الشركة");
    showLogoDialog({
      currentLogo: "/icons/market-logo.png",
      onSave: (logoFile) => {
        if (logoFile) {
          console.log("تم اختيار شعار جديد:", logoFile.name);
          showToast({
            title: t('logoChangedSuccess'),
            description: t('logoChangedSuccessDesc'),
            variant: "success"
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 h-auto p-1">
          <TabsTrigger value="general" className="py-2">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{t('general')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="users" className="py-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{t('users')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>{t('notifications')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="security" className="py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t('security')}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="system" className="py-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>{t('system')}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* إعدادات عامة */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('companyInfo')}</CardTitle>
              <CardDescription>{t('manageCompanyInfo')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">{t('companyName')}</Label>
                  <Input id="company-name" placeholder={t('companyName')} defaultValue="شركة الأفق للتقنية" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-number">{t('taxNumber')}</Label>
                  <Input id="tax-number" placeholder={t('taxNumber')} defaultValue="300012345600003" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input id="phone" placeholder={t('phone')} defaultValue="+966 12 345 6789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" placeholder={t('email')} defaultValue="info@example.com" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">{t('address')}</Label>
                  <Input id="address" placeholder={t('address')} defaultValue="شارع الملك فهد، الرياض، المملكة العربية السعودية" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">{t('companyLogo')}</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                    <Building className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Button variant="outline" onClick={handleChangeLogo}>{t('changeLogo')}</Button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveCompanyInfo}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('invoiceSettings')}</CardTitle>
              <CardDescription>{t('customizeInvoiceSettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">{t('invoicePrefix')}</Label>
                  <Input id="invoice-prefix" placeholder={t('invoicePrefix')} defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-prefix">{t('orderPrefix')}</Label>
                  <Input id="order-prefix" placeholder={t('orderPrefix')} defaultValue="ORD-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-footer">{t('invoiceFooter')}</Label>
                  <Input id="invoice-footer" placeholder={t('invoiceFooter')} defaultValue="شكراً لتعاملكم معنا" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-due-days">{t('invoiceDueDays')}</Label>
                  <Input id="invoice-due-days" type="number" placeholder="عدد الأيام" defaultValue="30" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveInvoiceSettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('currencyAndTax')}</CardTitle>
              <CardDescription>{t('configureCurrencyAndTax')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">{t('currency')}</Label>
                  <Input id="currency" placeholder={t('currency')} defaultValue="ريال سعودي (SAR)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-symbol">{t('currencySymbol')}</Label>
                  <Input id="currency-symbol" placeholder={t('currencySymbol')} defaultValue="ريال" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">{t('taxRate')}</Label>
                  <Input id="tax-rate" type="number" placeholder={t('taxRate')} defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-number-label">{t('taxNumberLabel')}</Label>
                  <Input id="tax-number-label" placeholder={t('taxNumberLabel')} defaultValue="الرقم الضريبي" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveCurrencySettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
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
                <CardTitle>{t('userManagement')}</CardTitle>
                <CardDescription>{t('manageUsers')}</CardDescription>
              </div>
              <Button className="flex items-center gap-1" onClick={handleAddUser}>
                <UserPlus className="h-4 w-4" />
                <span>{t('addUser')}</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('userName')}</TableHead>
                    <TableHead>{t('userEmail')}</TableHead>
                    <TableHead>{t('userRole')}</TableHead>
                    <TableHead>{t('userStatus')}</TableHead>
                    <TableHead>{t('lastLogin')}</TableHead>
                    <TableHead>{t('actions')}</TableHead>
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
                          {user.status === "نشط" ? t('active') : t('inactive')}
                        </div>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user.name)}>{t('edit')}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteUser(user.name)}>{t('delete')}</Button>
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
                <CardTitle>{t('rolesAndPermissions')}</CardTitle>
                <CardDescription>{t('managePermissions')}</CardDescription>
              </div>
              <Button onClick={handleAddRole}>
                <PlusCircle className="ml-2 h-4 w-4" />
                {t('addRole')}
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('roleName')}</TableHead>
                    <TableHead>{t('roleDescription')}</TableHead>
                    <TableHead>{t('userCount')}</TableHead>
                    <TableHead>{t('actions')}</TableHead>
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
                          <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>{t('edit')}</Button>
                          <Button variant="ghost" size="sm" onClick={() => handleManagePermissions(role)}>{t('manageRolePermissions')}</Button>
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
              <CardTitle>{t('notificationSettings')}</CardTitle>
              <CardDescription>{t('customizeInvoiceSettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('inventoryAlerts')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('lowStockAlert')}</div>
                      <div className="text-sm text-muted-foreground">{t('lowStockAlertDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="low-stock" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('outOfStockAlert')}</div>
                      <div className="text-sm text-muted-foreground">{t('outOfStockAlertDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="out-of-stock" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('orderAlerts')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('newOrderAlert')}</div>
                      <div className="text-sm text-muted-foreground">{t('newOrderAlertDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="new-order" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('orderStatusAlert')}</div>
                      <div className="text-sm text-muted-foreground">{t('orderStatusAlertDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="order-status" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('customerAlerts')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('newCustomerAlert')}</div>
                      <div className="text-sm text-muted-foreground">{t('newCustomerAlertDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="new-customer" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('creditLimitAlert')}</div>
                      <div className="text-sm text-muted-foreground">{t('creditLimitAlertDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="credit-limit" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('notificationMethods')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('systemNotifications')}</div>
                      <div className="text-sm text-muted-foreground">{t('systemNotificationsDesc')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="system-notifications" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium">{t('emailNotifications')}</div>
                      <div className="text-sm text-muted-foreground">{t('emailNotificationsDesc')}</div>
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
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات الأمان */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('passwordSettings')}</CardTitle>
              <CardDescription>{t('manageSecuritySettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">{t('minPasswordLength')}</Label>
                  <Input id="min-password-length" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">{t('passwordExpiry')}</Label>
                  <Input id="password-expiry" type="number" defaultValue="90" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('passwordComplexity')}</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-uppercase" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-uppercase" className="text-sm font-normal">{t('requireUppercase')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-lowercase" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-lowercase" className="text-sm font-normal">{t('requireLowercase')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-number" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-number" className="text-sm font-normal">{t('requireNumber')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-special" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="require-special" className="text-sm font-normal">{t('requireSpecial')}</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSavePasswordSettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('twoFactorAuth')}</CardTitle>
              <CardDescription>{t('enable2FADesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">{t('enable2FA')}</div>
                  <div className="text-sm text-muted-foreground">{t('enable2FADesc')}</div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="enable-2fa" className="h-4 w-4" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('twoFactorMethods')}</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="2fa-email" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="2fa-email" className="text-sm font-normal">{t('twoFactorEmail')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="2fa-sms" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="2fa-sms" className="text-sm font-normal">{t('twoFactorSMS')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="2fa-app" className="h-4 w-4" />
                    <Label htmlFor="2fa-app" className="text-sm font-normal">{t('twoFactorApp')}</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSave2FASettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('loginHistory')}</CardTitle>
              <CardDescription>عرض سجل تسجيل الدخول للمستخدمين</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('user')}</TableHead>
                    <TableHead>{t('loginDate')}</TableHead>
                    <TableHead>{t('ipAddress')}</TableHead>
                    <TableHead>{t('browser')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
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
                          {log.status === "ناجح" ? t('success') : t('failed')}
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
              <CardTitle>{t('systemSettings')}</CardTitle>
              <CardDescription>{t('configureSystemSettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">{t('defaultLanguageLabel')}</Label>
                  <select id="language" className="w-full p-2 border rounded-md">
                    <option value="ar">العربية</option>
                    <option value="en">الإنجليزية</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">{t('timezoneLabel')}</Label>
                  <select id="timezone" className="w-full p-2 border rounded-md">
                    <option value="asia/riyadh">{t('riyadhTimezone')}</option>
                    <option value="asia/dubai">{t('dubaiTimezone')}</option>
                    <option value="europe/london">{t('londonTimezone')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">{t('dateFormatLabel')}</Label>
                  <select id="date-format" className="w-full p-2 border rounded-md">
                    <option value="dd/mm/yyyy">{t('dateFormatDDMMYYYY')}</option>
                    <option value="mm/dd/yyyy">{t('dateFormatMMDDYYYY')}</option>
                    <option value="yyyy-mm-dd">{t('dateFormatYYYYMMDD')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">{t('fiscalYearLabel')}</Label>
                  <select id="fiscal-year" className="w-full p-2 border rounded-md">
                    <option value="01-01">{t('fiscalYearJanuary')}</option>
                    <option value="04-01">{t('fiscalYearApril')}</option>
                    <option value="07-01">{t('fiscalYearJuly')}</option>
                    <option value="10-01">{t('fiscalYearOctober')}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveSystemSettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('printSettings')}</CardTitle>
              <CardDescription>{t('configureePrintSettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paper-size">{t('defaultPaperSize')}</Label>
                  <select id="paper-size" className="w-full p-2 border rounded-md">
                    <option value="a4">{t('paperSizeA4')}</option>
                    <option value="letter">{t('paperSizeLetter')}</option>
                    <option value="legal">{t('paperSizeLegal')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orientation">{t('pageOrientation')}</Label>
                  <select id="orientation" className="w-full p-2 border rounded-md">
                    <option value="portrait">{t('orientationPortrait')}</option>
                    <option value="landscape">{t('orientationLandscape')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('printOptions')}</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="print-logo" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="print-logo" className="text-sm font-normal">{t('printLogo')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="print-footer" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="print-footer" className="text-sm font-normal">{t('printFooter')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="print-page-numbers" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="print-page-numbers" className="text-sm font-normal">{t('printPageNumbers')}</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSavePrintSettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('backupAndRestore')}</CardTitle>
              <CardDescription>{t('manageBackup')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('autoBackup')}</Label>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="space-y-0.5">
                    <div className="font-medium">{t('enableAutoBackupLabel')}</div>
                    <div className="text-sm text-muted-foreground">{t('enableAutoBackupDesc')}</div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="auto-backup" className="h-4 w-4" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">{t('backupFrequencyLabel')}</Label>
                  <select id="backup-frequency" className="w-full p-2 border rounded-md">
                    <option value="daily">{t('backupDaily')}</option>
                    <option value="weekly">{t('backupWeekly')}</option>
                    <option value="monthly">{t('backupMonthly')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">{t('backupRetentionLabel')}</Label>
                  <Input id="backup-retention" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex items-center gap-1" onClick={handleCreateBackup}>
                  <Database className="h-4 w-4" />
                  <span>{t('createBackupNow')}</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-1" onClick={handleRestoreBackup}>
                  <Database className="h-4 w-4" />
                  <span>{t('restoreFromBackup')}</span>
                </Button>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="flex items-center gap-1" onClick={handleSaveBackupSettings}>
                  <Save className="h-4 w-4" />
                  <span>{t('saveChanges')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}