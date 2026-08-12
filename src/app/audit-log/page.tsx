"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Download,
  FileText,
  Calendar,
  User,
  Activity
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function AuditLog() {
  const t = useTranslations('auditLog');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterUser, setFilterUser] = useState("all");

  // Mock data for audit logs
  const auditLogs = [
    { 
      id: 1, 
      timestamp: "2024-01-15 10:30:25", 
      user: "أحمد محمد", 
      action: "إضافة منتج", 
      actionType: "create",
      details: "تم إضافة منتج جديد: لابتوب HP ProBook",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0"
    },
    { 
      id: 2, 
      timestamp: "2024-01-15 10:25:15", 
      user: "سارة أحمد", 
      action: "تعديل طلب", 
      actionType: "update",
      details: "تم تحديث حالة الطلب #1234 إلى 'مكتمل'",
      ipAddress: "192.168.1.101",
      userAgent: "Firefox 121.0"
    },
    { 
      id: 3, 
      timestamp: "2024-01-15 10:20:40", 
      user: "محمد علي", 
      action: "حذف عميل", 
      actionType: "delete",
      details: "تم حذف العميل: عبدالله سعيد",
      ipAddress: "192.168.1.102",
      userAgent: "Safari 17.2"
    },
    { 
      id: 4, 
      timestamp: "2024-01-15 10:15:30", 
      user: "فاطمة خالد", 
      action: "تسجيل دخول", 
      actionType: "login",
      details: "تسجيل دخول ناجح إلى النظام",
      ipAddress: "192.168.1.103",
      userAgent: "Edge 120.0.0"
    },
    { 
      id: 5, 
      timestamp: "2024-01-15 10:10:20", 
      user: "أحمد محمد", 
      action: "تصدير تقرير", 
      actionType: "export",
      details: "تصدير تقرير المبيعات الشهري",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0"
    },
    { 
      id: 6, 
      timestamp: "2024-01-15 10:05:10", 
      user: "سارة أحمد", 
      action: "إضافة طلب", 
      actionType: "create",
      details: "تم إنشاء طلب جديد #1235",
      ipAddress: "192.168.1.101",
      userAgent: "Firefox 121.0"
    },
    { 
      id: 7, 
      timestamp: "2024-01-15 10:00:00", 
      user: "محمد علي", 
      action: "تعديل إعدادات", 
      actionType: "update",
      details: "تم تحديث إعدادات الشركة",
      ipAddress: "192.168.1.102",
      userAgent: "Safari 17.2"
    },
    { 
      id: 8, 
      timestamp: "2024-01-15 09:55:45", 
      user: "فاطمة خالد", 
      action: "تعديل منتج", 
      actionType: "update",
      details: "تم تحديث سعر المنتج: هاتف iPhone 13 Pro",
      ipAddress: "192.168.1.103",
      userAgent: "Edge 120.0.0"
    },
  ];

  // Get unique users for filter
  const uniqueUsers = Array.from(new Set(auditLogs.map(log => log.user)));

  // Filter logs based on search query, type, and user
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchQuery === "" || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || log.actionType === filterType;
    const matchesUser = filterUser === "all" || log.user === filterUser;
    
    return matchesSearch && matchesType && matchesUser;
  });

  // Handle export
  const handleExport = () => {
    console.log("Exporting audit logs data");
    // Implement export functionality here
  };

  // Get badge variant based on action type
  const getActionBadge = (actionType: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", color: string }> = {
      create: { variant: "default", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
      update: { variant: "secondary", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
      delete: { variant: "destructive", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
      login: { variant: "outline", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
      export: { variant: "outline", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    };
    
    return variants[actionType] || variants.update;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          <span>{tCommon('export')}</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('totalActions')}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('today')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('activeUsers')}
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('uniqueUsers')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('createActions')}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditLogs.filter(log => log.actionType === 'create').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('newRecords')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('deleteActions')}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditLogs.filter(log => log.actionType === 'delete').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('deletedRecords')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('logsList')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex items-center gap-2 w-full md:flex-1">
              <Input 
                placeholder={t('searchPlaceholder')}
                className="flex-1" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline">
                <Search className="h-4 w-4 ml-2" />
                <span>{tCommon('search')}</span>
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder={t('filterByType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allTypes')}</SelectItem>
                  <SelectItem value="create">{t('typeCreate')}</SelectItem>
                  <SelectItem value="update">{t('typeUpdate')}</SelectItem>
                  <SelectItem value="delete">{t('typeDelete')}</SelectItem>
                  <SelectItem value="login">{t('typeLogin')}</SelectItem>
                  <SelectItem value="export">{t('typeExport')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger className="w-[180px]">
                  <User className="h-4 w-4 ml-2" />
                  <SelectValue placeholder={t('filterByUser')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allUsers')}</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="rounded-md border overflow-hidden">
            <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {t('timestamp')}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t('user')}
                    </div>
                  </TableHead>
                  <TableHead>{t('action')}</TableHead>
                  <TableHead className="max-w-md">{t('details')}</TableHead>
                  <TableHead>{t('ipAddress')}</TableHead>
                  <TableHead className="text-left">{t('userAgent')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge className={getActionBadge(log.actionType).color}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="text-sm text-muted-foreground truncate">
                          {log.details}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.ipAddress}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {log.userAgent}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {t('noLogs')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              {t('showing')} {filteredLogs.length} {t('of')} {auditLogs.length} {t('records')}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log("Previous page")}
              >
                {tCommon('previous')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-primary text-primary-foreground"
                onClick={() => console.log("Current page: 1")}
              >
                1
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log("Page 2")}
              >
                2
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log("Page 3")}
              >
                3
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log("Next page")}
              >
                {tCommon('next')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
