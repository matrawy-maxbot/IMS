"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Permission {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

interface PermissionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: { [key: string]: boolean }) => void;
  roleName: string;
  initialPermissions?: { [key: string]: boolean };
}

export function PermissionsDialog({
  isOpen,
  onClose,
  onSave,
  roleName,
  initialPermissions = {},
}: PermissionsDialogProps) {
  // مجموعات الصلاحيات المتاحة في النظام
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      name: "المنتجات",
      permissions: [
        { id: "products.view", name: "عرض المنتجات", description: "عرض قائمة المنتجات وتفاصيلها", checked: false },
        { id: "products.create", name: "إضافة منتج", description: "إضافة منتجات جديدة", checked: false },
        { id: "products.edit", name: "تعديل منتج", description: "تعديل بيانات المنتجات", checked: false },
        { id: "products.delete", name: "حذف منتج", description: "حذف المنتجات من النظام", checked: false },
      ],
    },
    {
      name: "الطلبات",
      permissions: [
        { id: "orders.view", name: "عرض الطلبات", description: "عرض قائمة الطلبات وتفاصيلها", checked: false },
        { id: "orders.create", name: "إنشاء طلب", description: "إنشاء طلبات جديدة", checked: false },
        { id: "orders.edit", name: "تعديل طلب", description: "تعديل بيانات الطلبات", checked: false },
        { id: "orders.delete", name: "حذف طلب", description: "حذف الطلبات من النظام", checked: false },
        { id: "orders.approve", name: "اعتماد طلب", description: "اعتماد الطلبات وتغيير حالتها", checked: false },
      ],
    },
    {
      name: "العملاء",
      permissions: [
        { id: "customers.view", name: "عرض العملاء", description: "عرض قائمة العملاء وتفاصيلهم", checked: false },
        { id: "customers.create", name: "إضافة عميل", description: "إضافة عملاء جدد", checked: false },
        { id: "customers.edit", name: "تعديل عميل", description: "تعديل بيانات العملاء", checked: false },
        { id: "customers.delete", name: "حذف عميل", description: "حذف العملاء من النظام", checked: false },
      ],
    },
    {
      name: "التقارير",
      permissions: [
        { id: "reports.sales", name: "تقارير المبيعات", description: "عرض وطباعة تقارير المبيعات", checked: false },
        { id: "reports.inventory", name: "تقارير المخزون", description: "عرض وطباعة تقارير المخزون", checked: false },
        { id: "reports.customers", name: "تقارير العملاء", description: "عرض وطباعة تقارير العملاء", checked: false },
        { id: "reports.financial", name: "التقارير المالية", description: "عرض وطباعة التقارير المالية", checked: false },
      ],
    },
    {
      name: "الإعدادات",
      permissions: [
        { id: "settings.view", name: "عرض الإعدادات", description: "عرض إعدادات النظام", checked: false },
        { id: "settings.edit", name: "تعديل الإعدادات", description: "تعديل إعدادات النظام", checked: false },
        { id: "users.manage", name: "إدارة المستخدمين", description: "إضافة وتعديل وحذف المستخدمين", checked: false },
        { id: "roles.manage", name: "إدارة الأدوار", description: "إضافة وتعديل وحذف الأدوار والصلاحيات", checked: false },
        { id: "backup.manage", name: "إدارة النسخ الاحتياطية", description: "إنشاء واستعادة النسخ الاحتياطية", checked: false },
      ],
    },
  ]);

  // تحديث حالة الصلاحيات عند فتح الديالوج
  useEffect(() => {
    if (isOpen && initialPermissions) {
      setPermissionGroups((prevGroups) => {
        return prevGroups.map((group) => ({
          ...group,
          permissions: group.permissions.map((permission) => ({
            ...permission,
            checked: initialPermissions[permission.id] || false,
          })),
        }));
      });
    }
  }, [isOpen, initialPermissions]);

  // تغيير حالة صلاحية معينة
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setPermissionGroups((prevGroups) => {
      return prevGroups.map((group) => ({
        ...group,
        permissions: group.permissions.map((permission) =>
          permission.id === permissionId
            ? { ...permission, checked }
            : permission
        ),
      }));
    });
  };

  // تغيير حالة جميع الصلاحيات في مجموعة
  const handleGroupChange = (groupName: string, checked: boolean) => {
    setPermissionGroups((prevGroups) => {
      return prevGroups.map((group) =>
        group.name === groupName
          ? {
              ...group,
              permissions: group.permissions.map((permission) => ({
                ...permission,
                checked,
              })),
            }
          : group
      );
    });
  };

  // التحقق مما إذا كانت جميع الصلاحيات في مجموعة محددة
  const isGroupChecked = (groupName: string) => {
    const group = permissionGroups.find((g) => g.name === groupName);
    return group ? group.permissions.every((p) => p.checked) : false;
  };

  // التحقق مما إذا كانت بعض الصلاحيات في مجموعة محددة
  const isGroupIndeterminate = (groupName: string) => {
    const group = permissionGroups.find((g) => g.name === groupName);
    if (!group) return false;
    const checkedCount = group.permissions.filter((p) => p.checked).length;
    return checkedCount > 0 && checkedCount < group.permissions.length;
  };

  // حفظ الصلاحيات
  const handleSave = () => {
    const permissions: { [key: string]: boolean } = {};
    permissionGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        permissions[permission.id] = permission.checked;
      });
    });
    onSave(permissions);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-tajawal sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">إدارة صلاحيات {roleName}</DialogTitle>
          <DialogDescription className="text-right">
            حدد الصلاحيات المسموح بها لهذا الدور في النظام.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {permissionGroups.map((group) => (
            <div key={group.name} className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse">
                <Checkbox
                  id={`group-${group.name}`}
                  checked={isGroupChecked(group.name)}
                  data-indeterminate={isGroupIndeterminate(group.name)}
                  onCheckedChange={(checked) =>
                    handleGroupChange(group.name, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`group-${group.name}`}
                  className="text-lg font-medium"
                >
                  {group.name}
                </Label>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-6">
                {group.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start space-x-2 space-x-reverse rtl:space-x-reverse"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={permission.checked}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(permission.id, checked as boolean)
                      }
                    />
                    <div className="grid gap-1">
                      <Label htmlFor={permission.id} className="font-medium">
                        {permission.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>حفظ الصلاحيات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}