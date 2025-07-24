"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Download, Eye, FileEdit, Trash2, Calendar, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Mock data for orders
  const orders = [
    { id: 1, orderNumber: "ORD-1001", customer: "أحمد محمد", date: "2023-06-15", total: 350, status: "مكتمل", items: 3 },
    { id: 2, orderNumber: "ORD-1002", customer: "سارة أحمد", date: "2023-06-14", total: 520, status: "قيد التجهيز", items: 5 },
    { id: 3, orderNumber: "ORD-1003", customer: "محمد علي", date: "2023-06-12", total: 180, status: "قيد الشحن", items: 2 },
    { id: 4, orderNumber: "ORD-1004", customer: "فاطمة حسن", date: "2023-06-10", total: 750, status: "مكتمل", items: 6 },
    { id: 5, orderNumber: "ORD-1005", customer: "خالد عبدالله", date: "2023-06-08", total: 420, status: "ملغي", items: 4 },
  ];

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement actual search functionality here
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting orders data");
    // Implement export functionality here
  };

  // Handle date filter
  const handleDateFilter = () => {
    console.log("Filtering by date:", dateFilter);
    // Implement date filter functionality here
  };

  // Handle filter
  const handleFilter = () => {
    console.log("Opening filter options");
    // Implement filter functionality here
  };

  // Handle view order
  const handleViewOrder = (orderId: number) => {
    console.log("Viewing order with ID:", orderId);
    // Implement view functionality or navigation here
  };

  // Handle edit order
  const handleEditOrder = (orderId: number) => {
    console.log("Editing order with ID:", orderId);
    // Implement edit functionality or navigation here
  };

  // Handle delete order
  const handleDeleteOrder = (orderId: number) => {
    console.log("Deleting order with ID:", orderId);
    // Implement delete functionality here
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">الطلبات</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +12 طلب جديد هذا الأسبوع
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500 ريال</div>
            <p className="text-xs text-muted-foreground">
              +20% مقارنة بالشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">طلبات قيد التجهيز</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              -2 طلب عن الأسبوع الماضي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">طلبات ملغاة</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 طلب عن الأسبوع الماضي
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">قائمة الطلبات</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              <span>تصدير</span>
            </Button>
            <Link href="/add-order">
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>طلب جديد</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Input 
                placeholder="بحث عن طلب..." 
                className="max-w-sm" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button 
                variant="outline"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 ml-2" />
                <span>بحث</span>
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Input 
                  type="date" 
                  className="w-auto" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <Button 
                  variant="outline"
                  onClick={handleDateFilter}
                >
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>تصفية بالتاريخ</span>
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={handleFilter}
              >
                <Filter className="h-4 w-4" />
                <span>تصفية</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المجموع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>عدد المنتجات</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total} ريال</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "مكتمل" ? "bg-green-100 text-green-800" : 
                        order.status === "قيد التجهيز" ? "bg-blue-100 text-blue-800" : 
                        order.status === "قيد الشحن" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditOrder(order.id)}
                        >
                          <FileEdit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => console.log("Previous page")}
            >
              السابق
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
              التالي
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}