"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// نموذج بيانات الإشعارات
type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

// إشعارات وهمية للعرض
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "طلب جديد",
    message: "تم إضافة طلب جديد #12345 بواسطة أحمد محمد",
    time: "منذ 5 دقائق",
    read: false,
  },
  {
    id: "2",
    title: "تحديث المخزون",
    message: "تم تحديث مخزون المنتج 'لابتوب HP' إلى 15 قطعة",
    time: "منذ 30 دقيقة",
    read: false,
  },
  {
    id: "3",
    title: "تنبيه انخفاض المخزون",
    message: "المنتج 'آيفون 13' وصل إلى الحد الأدنى للمخزون (5 قطع)",
    time: "منذ ساعتين",
    read: true,
  },
  {
    id: "4",
    title: "تسجيل دخول جديد",
    message: "تم تسجيل دخول من جهاز جديد",
    time: "منذ 3 ساعات",
    read: true,
  },
  {
    id: "5",
    title: "تقرير المبيعات الأسبوعي",
    message: "تم إنشاء تقرير المبيعات الأسبوعي بنجاح",
    time: "منذ يوم",
    read: true,
  },
];

export function NotificationsDropdown() {
  const [notifications, setNotifications] = 
    useState<Notification[]>(dummyNotifications);
  
  // عدد الإشعارات غير المقروءة
  const unreadCount = notifications.filter(n => !n.read).length;

  // تعليم الإشعار كمقروء
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  // تعليم جميع الإشعارات كمقروءة
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true,
    })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-lg font-bold">الإشعارات</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary"
            >
              تعليم الكل كمقروء
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`flex flex-col items-start p-3 ${!notification.read ? 'bg-muted/50' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              لا توجد إشعارات
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center p-2 text-center text-primary">
          عرض كل الإشعارات
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}