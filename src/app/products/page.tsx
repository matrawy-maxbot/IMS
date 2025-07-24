"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Search,
  Plus,
  Filter,
  Download,
  FileEdit,
  Trash2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for products
  const products = [
    { id: 1, name: "منتج 1", code: "P001", price: 100, quantity: 50, status: "متوفر", category: "إلكترونيات" },
    { id: 2, name: "منتج 2", code: "P002", price: 150, quantity: 30, status: "متوفر", category: "أثاث" },
    { id: 3, name: "منتج 3", code: "P003", price: 200, quantity: 10, status: "منخفض المخزون", category: "ملابس" },
    { id: 4, name: "منتج 4", code: "P004", price: 120, quantity: 0, status: "نفذت الكمية", category: "إلكترونيات" },
    { id: 5, name: "منتج 5", code: "P005", price: 80, quantity: 100, status: "متوفر", category: "أدوات منزلية" },
  ];

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement actual search functionality here
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting products data");
    // Implement export functionality here
  };

  // Handle filter
  const handleFilter = () => {
    console.log("Opening filter options");
    // Implement filter functionality here
  };

  // Handle edit product
  const handleEditProduct = (productId: number) => {
    console.log("Editing product with ID:", productId);
    // Implement edit functionality or navigation here
  };

  // Handle delete product
  const handleDeleteProduct = (productId: number) => {
    console.log("Deleting product with ID:", productId);
    // Implement delete functionality here
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">المنتجات</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">قائمة المنتجات</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              <span>تصدير</span>
            </Button>
            <Link href="/products/add">
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>إضافة منتج</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Input 
                placeholder="بحث عن منتج..." 
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
                  <TableHead className="w-[80px]">الصورة</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الرمز</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الكمية المتوفرة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التصنيف</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.price} ريال</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${product.status === "متوفر" ? "bg-green-100 text-green-800" : product.status === "منخفض المخزون" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <FileEdit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
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