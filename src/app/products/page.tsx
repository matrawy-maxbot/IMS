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
  Trash2,
  FolderOpen
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { toast } from "sonner";

export default function Products() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const locale =  useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  
  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, name: "إلكترونيات", nameEn: "Electronics", description: "أجهزة إلكترونية ومعدات", icon: "📱", productsCount: 15 },
    { id: 2, name: "أثاث", nameEn: "Furniture", description: "أثاث منزلي ومكتبي", icon: "🪑", productsCount: 8 },
    { id: 3, name: "ملابس", nameEn: "Clothing", description: "ملابس وأزياء", icon: "👕", productsCount: 23 },
    { id: 4, name: "أدوات منزلية", nameEn: "Home Appliances", description: "أدوات وأجهزة منزلية", icon: "🏠", productsCount: 12 },
  ]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    nameEn: "",
    description: "",
    icon: "📦"
  });
  
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

  // Category handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", nameEn: "", description: "", icon: "📦" });
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      nameEn: category.nameEn,
      description: category.description,
      icon: category.icon
    });
    setIsCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name || !categoryForm.nameEn) {
      toast.error(t('categoryNameRequired'));
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...categoryForm }
          : cat
      ));
      toast.success(t('categoryUpdated'));
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...categoryForm,
        productsCount: 0
      };
      setCategories([...categories, newCategory]);
      toast.success(t('categoryAdded'));
    }
    
    setIsCategoryDialogOpen(false);
    setCategoryForm({ name: "", nameEn: "", description: "", icon: "📦" });
  };

  const handleDeleteCategoryClick = (categoryId: number) => {
    setDeletingCategoryId(categoryId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    if (deletingCategoryId) {
      setCategories(categories.filter(cat => cat.id !== deletingCategoryId));
      toast.success(t('categoryDeleted'));
    }
    setIsDeleteDialogOpen(false);
    setDeletingCategoryId(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir={locale === 'ar' ? 'rtl' : 'ltr' }>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {t('productsTab')}
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            {t('categoriesTab')}
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">{t('list')}</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4" />
                  <span>{tCommon('export')}</span>
                </Button>
                <Link href="/products/add">
                  <Button className="flex items-center gap-1" data-tour="add-product-btn">
                    <Plus className="h-4 w-4" />
                    <span>{t('addProduct')}</span>
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6" data-tour="products-search">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Input 
                    placeholder={tCommon('search')}
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
                    <span>{tCommon('search')}</span>
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1 w-full md:w-auto"
                  onClick={handleFilter}
                >
                  <Filter className="h-4 w-4" />
                  <span>{tCommon('filter')}</span>
                </Button>
              </div>
              <div className="rounded-md border overflow-hidden" data-tour="products-table">
                <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">{tCommon('image')}</TableHead>
                      <TableHead>{tCommon('name')}</TableHead>
                      <TableHead>{t('code')}</TableHead>
                      <TableHead>{tCommon('price')}</TableHead>
                      <TableHead>{t('availableQuantity')}</TableHead>
                      <TableHead>{tCommon('status')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead className="text-left">{tCommon('actions')}</TableHead>
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
                        <TableCell>{product.price} {tCommon('price')}</TableCell>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">{t('categoriesList')}</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4" />
                  <span>{tCommon('export')}</span>
                </Button>
                <Button 
                  className="flex items-center gap-1"
                  onClick={handleAddCategory}
                >
                  <Plus className="h-4 w-4" />
                  <span>{t('addCategory')}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Input 
                    placeholder={tCommon('search')}
                    className="max-w-sm" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    variant="outline"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4 ml-2" />
                    <span>{tCommon('search')}</span>
                  </Button>
                </div>
              </div>
              
              {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t('noCategoriesFound')}</h3>
                  <p className="text-muted-foreground mb-4">{t('createFirstCategory')}</p>
                  <Button onClick={handleAddCategory}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('addCategory')}
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table style={locale === 'en' ? { direction: 'ltr', textAlignLast: 'left' } : { direction: 'rtl', textAlignLast: 'right' }}>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">{t('categoryIcon')}</TableHead>
                        <TableHead>{t('categoryName')}</TableHead>
                        <TableHead>{t('categoryDescription')}</TableHead>
                        <TableHead className="text-center">{t('productsCount')}</TableHead>
                        <TableHead className="text-left">{tCommon('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-2xl">
                              {category.icon}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {locale === 'ar' ? category.name : category.nameEn}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {category.description}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              {category.productsCount}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditCategory(category)}
                              >
                                <FileEdit className="h-4 w-4 text-muted-foreground" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive"
                                onClick={() => handleDeleteCategoryClick(category.id)}
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? t('editCategory') : t('addCategory')}
            </DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? tCommon('editInformation')
                : t('createFirstCategory')
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-icon">{t('categoryIcon')}</Label>
              <Input
                id="category-icon"
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                placeholder="📦"
                maxLength={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-name">{t('categoryName')} (العربية)</Label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="مثال: إلكترونيات"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-name-en">{t('categoryName')} (English)</Label>
              <Input
                id="category-name-en"
                value={categoryForm.nameEn}
                onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                placeholder="Example: Electronics"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-description">{t('categoryDescription')}</Label>
              <Textarea
                id="category-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder={t('categoryDescription')}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              {tCommon('cancel')}
            </Button>
            <Button onClick={handleSaveCategory}>
              {editingCategory ? tCommon('save') : t('addCategory')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteCategory')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmDeleteCategory')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDeleteCategory}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {tCommon('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}