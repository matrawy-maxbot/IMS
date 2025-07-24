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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface RoleData {
  name: string;
  description: string;
}

interface RoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: RoleData) => void;
  role?: RoleData;
  title?: string;
}

export function RoleDialog({
  isOpen,
  onClose,
  onSave,
  role,
  title = "إضافة دور جديد",
}: RoleDialogProps) {
  const [roleData, setRoleData] = useState<RoleData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (role) {
      setRoleData({
        name: role.name,
        description: role.description,
      });
    } else {
      setRoleData({
        name: "",
        description: "",
      });
    }
  }, [role, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(roleData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-tajawal sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">{title}</DialogTitle>
          <DialogDescription className="text-right">
            أدخل معلومات الدور الوظيفي للمستخدمين في النظام.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              اسم الدور
            </Label>
            <Input
              id="name"
              name="name"
              value={roleData.name}
              onChange={handleChange}
              className="col-span-3"
              placeholder="أدخل اسم الدور"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right col-span-1">
              الوصف
            </Label>
            <Textarea
              id="description"
              name="description"
              value={roleData.description}
              onChange={handleChange}
              className="col-span-3"
              placeholder="أدخل وصف الدور والمسؤوليات"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave} disabled={!roleData.name.trim()}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}