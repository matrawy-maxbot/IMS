"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dialogs.permissions");
  const tCommon = useTranslations("common");
  const tPerms = useTranslations("dialogs.permissions.permissions");
  const tGroups = useTranslations("dialogs.permissions.permissionsGroups");

  // مجموعات الصلاحيات المتاحة في النظام
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      name: tGroups("products"),
      permissions: [
        { id: "products.view", name: tPerms("productsView"), description: tPerms("productsViewDesc"), checked: false },
        { id: "products.create", name: tPerms("productsCreate"), description: tPerms("productsCreateDesc"), checked: false },
        { id: "products.edit", name: tPerms("productsEdit"), description: tPerms("productsEditDesc"), checked: false },
        { id: "products.delete", name: tPerms("productsDelete"), description: tPerms("productsDeleteDesc"), checked: false },
      ],
    },
    {
      name: tGroups("orders"),
      permissions: [
        { id: "orders.view", name: tPerms("ordersView"), description: tPerms("ordersViewDesc"), checked: false },
        { id: "orders.create", name: tPerms("ordersCreate"), description: tPerms("ordersCreateDesc"), checked: false },
        { id: "orders.edit", name: tPerms("ordersEdit"), description: tPerms("ordersEditDesc"), checked: false },
        { id: "orders.delete", name: tPerms("ordersDelete"), description: tPerms("ordersDeleteDesc"), checked: false },
        { id: "orders.approve", name: tPerms("ordersApprove"), description: tPerms("ordersApproveDesc"), checked: false },
      ],
    },
    {
      name: tGroups("customers"),
      permissions: [
        { id: "customers.view", name: tPerms("customersView"), description: tPerms("customersViewDesc"), checked: false },
        { id: "customers.create", name: tPerms("customersCreate"), description: tPerms("customersCreateDesc"), checked: false },
        { id: "customers.edit", name: tPerms("customersEdit"), description: tPerms("customersEditDesc"), checked: false },
        { id: "customers.delete", name: tPerms("customersDelete"), description: tPerms("customersDeleteDesc"), checked: false },
      ],
    },
    {
      name: tGroups("reports"),
      permissions: [
        { id: "reports.sales", name: tPerms("reportsSales"), description: tPerms("reportsSalesDesc"), checked: false },
        { id: "reports.inventory", name: tPerms("reportsInventory"), description: tPerms("reportsInventoryDesc"), checked: false },
        { id: "reports.customers", name: tPerms("reportsCustomers"), description: tPerms("reportsCustomersDesc"), checked: false },
        { id: "reports.financial", name: tPerms("reportsFinancial"), description: tPerms("reportsFinancialDesc"), checked: false },
      ],
    },
    {
      name: tGroups("settings"),
      permissions: [
        { id: "settings.view", name: tPerms("settingsView"), description: tPerms("settingsViewDesc"), checked: false },
        { id: "settings.edit", name: tPerms("settingsEdit"), description: tPerms("settingsEditDesc"), checked: false },
        { id: "users.manage", name: tPerms("usersManage"), description: tPerms("usersManageDesc"), checked: false },
        { id: "roles.manage", name: tPerms("rolesManage"), description: tPerms("rolesManageDesc"), checked: false },
        { id: "backup.manage", name: tPerms("backupManage"), description: tPerms("backupManageDesc"), checked: false },
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
          <DialogTitle className="text-right">{t("title")} {roleName}</DialogTitle>
          <DialogDescription className="text-right">
            {t("description")}
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
            {t("cancel")}
          </Button>
          <Button onClick={handleSave}>{t("save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}