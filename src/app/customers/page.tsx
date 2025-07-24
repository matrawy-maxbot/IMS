"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Download, Eye, FileEdit, Trash2, Users, UserPlus, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for customers
  const customers = [
    { id: 1, name: "أحمد محمد", phone: "0512345678", email: "ahmed@example.com", orders: 5, totalSpent: 1250, lastOrder: "2023-06-15" },
    { id: 2, name: "سارة أحمد", phone: "0523456789", email: "sara@example.com", orders: 3, totalSpent: 850, lastOrder: "2023-06-10" },
    { id: 3, name: "محمد علي", phone: "0534567890", email: "mohamed@example.com", orders: 8, totalSpent: 2100, lastOrder: "2023-06-14" },
    { id: 4, name: "فاطمة حسن", phone: "0545678901", email: "fatima@example.com", orders: 2, totalSpent: 450, lastOrder: "2023-06-08" },
    { id: 5, name: "خالد عبدالله", phone: "0556789012", email: "khaled@example.com", orders: 6, totalSpent: 1800, lastOrder: "2023-06-12" },
  ];

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement actual search functionality here
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting customers data");
    // Implement export functionality here
  };

  // Handle filter
  const handleFilter = () => {
    console.log("Opening filter options");
    // Implement filter functionality here
  };

  // Handle view customer
  const handleViewCustomer = (customerId: number) => {
    console.log("Viewing customer with ID:", customerId);
    // Implement view functionality or navigation here
  };

  // Handle edit customer
  const handleEditCustomer = (customerId: number) => {
    console.log("Editing customer with ID:", customerId);
    // Implement edit functionality or navigation here
  };

  // Handle delete customer
  const handleDeleteCustomer = (customerId: number) => {
    console.log("Deleting customer with ID:", customerId);
    // Implement delete functionality here
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">العملاء</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              +8 عملاء جدد هذا الشهر
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عملاء جدد</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +20% مقارنة بالشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الطلبات لكل عميل</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5</div>
            <p className="text-xs text-muted-foreground">
              +0.5 مقارنة بالشهر الماضي
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">قائمة العملاء</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              <span>تصدير</span>
            </Button>
            <Link href="/customers/add">
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>إضافة عميل</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Input 
                placeholder="بحث عن عميل..." 
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
            <Button 
              variant="outline" 
              className="flex items-center gap-1 w-full md:w-auto"
              onClick={handleFilter}
            >
              <Filter className="h-4 w-4" />
              <span>تصفية</span>
            </Button>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>رقم الهاتف</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>عدد الطلبات</TableHead>
                  <TableHead>إجمالي المشتريات</TableHead>
                  <TableHead>آخر طلب</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.totalSpent} ريال</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewCustomer(customer.id)}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditCustomer(customer.id)}
                        >
                          <FileEdit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDeleteCustomer(customer.id)}
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