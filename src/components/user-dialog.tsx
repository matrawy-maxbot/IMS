"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Key, Shield } from "lucide-react";

interface UserData {
  id?: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: UserData) => void;
  user?: UserData; // إذا كان موجودًا، فهذا تعديل لمستخدم موجود
  title?: string;
}

export function UserDialog({
  isOpen,
  onClose,
  onSave,
  user,
  title = "إضافة مستخدم جديد",
}: UserDialogProps) {
  const [userData, setUserData] = useState<UserData>({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
    password: "",
  });

  const isEditMode = !!user;

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // إذا كنا في وضع التعديل، نحتفظ بمعرف المستخدم
    const dataToSave = isEditMode ? { ...userData, id: user.id } : userData;
    
    // إذا كانت كلمة المرور فارغة في وضع التعديل، نحذفها من البيانات المرسلة
    if (isEditMode && !userData.password) {
      const { password, ...dataWithoutPassword } = dataToSave;
      onSave(dataWithoutPassword);
    } else {
      onSave(dataToSave);
    }
    
    onClose();
  };

  const handleCancel = () => {
    // إعادة تعيين البيانات إلى القيم الأصلية أو فارغة
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "user",
      password: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="font-tajawal sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "قم بتعديل بيانات المستخدم. ترك حقل كلمة المرور فارغًا يعني عدم تغييرها." 
              : "قم بإدخال بيانات المستخدم الجديد لإضافته إلى النظام."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">اسم المستخدم</Label>
            <div className="flex items-center">
              <User className="h-4 w-4 ml-2 text-muted-foreground" />
              <Input 
                id="name" 
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="أدخل اسم المستخدم"
              />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="flex items-center">
              <Mail className="h-4 w-4 ml-2 text-muted-foreground" />
              <Input 
                id="email" 
                type="email"
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">{isEditMode ? "كلمة المرور (اتركها فارغة للإبقاء عليها)" : "كلمة المرور"}</Label>
            <div className="flex items-center">
              <Key className="h-4 w-4 ml-2 text-muted-foreground" />
              <Input 
                id="password" 
                type="password"
                value={userData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder={isEditMode ? "اتركها فارغة للإبقاء على كلمة المرور الحالية" : "أدخل كلمة المرور"}
              />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="role">الدور</Label>
            <div className="flex items-center">
              <Shield className="h-4 w-4 ml-2 text-muted-foreground" />
              <Select 
                value={userData.role} 
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر دور المستخدم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">مدير</SelectItem>
                  <SelectItem value="manager">مشرف</SelectItem>
                  <SelectItem value="user">مستخدم</SelectItem>
                  <SelectItem value="accountant">محاسب</SelectItem>
                  <SelectItem value="inventory">أمين مخزن</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>إلغاء</Button>
          <Button onClick={handleSave}>{isEditMode ? "حفظ التغييرات" : "إضافة المستخدم"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}