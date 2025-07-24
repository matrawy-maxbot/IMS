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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Clock, Calendar, FileText } from "lucide-react";

// نموذج بيانات النسخة الاحتياطية
interface BackupItem {
  id: string;
  name: string;
  date: string;
  size: string;
  type: string;
}

interface BackupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (backupId: string) => void;
  backups?: BackupItem[];
}

export function BackupDialog({
  isOpen,
  onClose,
  onRestore,
  backups = [
    { id: "1", name: "نسخة احتياطية تلقائية", date: "2023-06-15 10:30:00", size: "45.2 MB", type: "تلقائية" },
    { id: "2", name: "نسخة احتياطية يدوية", date: "2023-06-10 14:15:00", size: "44.8 MB", type: "يدوية" },
    { id: "3", name: "نسخة احتياطية قبل التحديث", date: "2023-06-05 09:00:00", size: "43.5 MB", type: "يدوية" },
    { id: "4", name: "نسخة احتياطية تلقائية", date: "2023-06-01 10:30:00", size: "43.2 MB", type: "تلقائية" },
    { id: "5", name: "نسخة احتياطية يدوية", date: "2023-05-25 16:45:00", size: "42.9 MB", type: "يدوية" },
  ],
}: BackupDialogProps) {
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);

  const handleSelectBackup = (backupId: string) => {
    setSelectedBackupId(backupId === selectedBackupId ? null : backupId);
  };

  const handleRestore = () => {
    if (selectedBackupId) {
      onRestore(selectedBackupId);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedBackupId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="font-tajawal sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>استعادة من نسخة احتياطية</DialogTitle>
          <DialogDescription>
            اختر النسخة الاحتياطية التي ترغب في استعادة النظام منها. سيتم إعادة تشغيل النظام بعد الاستعادة.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>اسم النسخة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحجم</TableHead>
                <TableHead>النوع</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow 
                  key={backup.id} 
                  className={selectedBackupId === backup.id ? "bg-muted/50" : ""}
                  onClick={() => handleSelectBackup(backup.id)}
                >
                  <TableCell>
                    <input 
                      type="radio" 
                      checked={selectedBackupId === backup.id} 
                      onChange={() => handleSelectBackup(backup.id)}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      {backup.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {backup.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {backup.size}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`px-2 py-1 rounded-full text-xs inline-block ${backup.type === "تلقائية" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                      {backup.type}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>إلغاء</Button>
          <Button 
            onClick={handleRestore} 
            disabled={!selectedBackupId}
            className="flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            <span>استعادة النسخة المحددة</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}