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
import { Building, Upload } from "lucide-react";

interface LogoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (logoFile: File | null) => void;
  currentLogo?: string;
}

export function LogoDialog({
  isOpen,
  onClose,
  onSave,
  currentLogo,
}: LogoDialogProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogo || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLogoFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSave = () => {
    onSave(logoFile);
    onClose();
  };

  const handleCancel = () => {
    setLogoFile(null);
    if (previewUrl && !currentLogo) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(currentLogo || null);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="font-tajawal sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تعديل شعار الشركة</DialogTitle>
          <DialogDescription>
            قم بتحميل شعار الشركة الجديد. يفضل استخدام صورة بخلفية شفافة بصيغة PNG أو SVG.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-32 w-32 rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="شعار الشركة" 
                  className="h-full w-full object-contain" 
                />
              ) : (
                <Building className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="logo" className="text-center">اختر صورة الشعار</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="logo" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("logo")?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 ml-2" />
                  تحميل صورة
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>إلغاء</Button>
          <Button onClick={handleSave}>حفظ التغييرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}