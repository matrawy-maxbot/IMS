"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Warehouse,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  DollarSign,
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  Settings,
  Eye,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { useWarehouse } from "@/contexts/warehouse-context";
import { useWarehouseStats } from "@/hooks/use-current-warehouse";
import { WarehouseStatsCard } from "@/components/warehouse-stats-card";
import type { Warehouse as WarehouseData } from "@/contexts/warehouse-context";

export default function WarehousesPage() {
  const t = useTranslations("warehouses");
  const tCommon = useTranslations("common");
  const { warehouses, addWarehouse, updateWarehouse, deleteWarehouse } = useWarehouse();
  const stats = useWarehouseStats();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    manager: "",
    phone: "",
    email: "",
    description: "",
  });

  const handleAddWarehouse = () => {
    const newWarehouse: WarehouseData = {
      id: String(Date.now()),
      ...formData,
      totalProducts: 0,
      totalValue: 0,
      lowStockItems: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    addWarehouse(newWarehouse);
    setIsAddDialogOpen(false);
    setFormData({
      name: "",
      location: "",
      manager: "",
      phone: "",
      email: "",
      description: "",
    });
  };

  const handleEditWarehouse = () => {
    if (selectedWarehouse) {
      updateWarehouse(selectedWarehouse.id, formData);
      setIsEditDialogOpen(false);
      setSelectedWarehouse(null);
      setFormData({
        name: "",
        location: "",
        manager: "",
        phone: "",
        email: "",
        description: "",
      });
    }
  };

  const handleDeleteWarehouse = (id: string) => {
    if (confirm(t("confirmDelete"))) {
      deleteWarehouse(id);
    }
  };

  const openEditDialog = (warehouse: WarehouseData) => {
    setSelectedWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      location: warehouse.location,
      manager: warehouse.manager,
      phone: warehouse.phone,
      email: warehouse.email,
      description: warehouse.description,
    });
    setIsEditDialogOpen(true);
  };

  const openDetailsDialog = (warehouse: WarehouseData) => {
    setSelectedWarehouse(warehouse);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div>
      <div className="mx-auto space-y-8">
        
        {/* Header Section - Clean & Minimal */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {t("title")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Add Warehouse Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{t("addNewWarehouse")}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">{t("addWarehouseDescription")}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-sm font-medium">{t("warehouseName")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("warehouseNamePlaceholder")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="location" className="text-sm font-medium">{t("location")}</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={t("locationPlaceholder")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="manager" className="text-sm font-medium">{t("manager")}</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder={t("managerPlaceholder")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="phone" className="text-sm font-medium">{t("phone")}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t("phonePlaceholder")}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("emailPlaceholder")}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description" className="text-sm font-medium">{t("description")}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t("descriptionPlaceholder")}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  {tCommon("cancel")}
                </Button>
                <Button 
                  onClick={handleAddWarehouse}
                >
                  {tCommon("save")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        {/* Statistics Cards - Polished & Professional */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Warehouses Card */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted flex-shrink-0">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    {t("totalWarehouses")}
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalWarehouses}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stats.activeWarehouses} {t("active")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Products Card */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted flex-shrink-0">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    {t("totalProducts")}
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalProducts}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("acrossAllWarehouses")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Value Card */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    {t("totalInventoryValue")}
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("sar")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Card */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    {t("lowStockAlerts")}
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.totalLowStockItems}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("itemsNeedRestock")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warehouses Grid - Minimal Clean Design */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add New Warehouse Card */}
          <Card
            onClick={() => setIsAddDialogOpen(true)}
            className="group relative overflow-hidden border-2 border-dashed border-muted-foreground/25 hover:border-primary hover:bg-accent transition-all duration-300 cursor-pointer"
          >
            <CardContent className="flex flex-col items-center justify-center p-12 min-h-[280px]">
              <div className="p-6 rounded-2xl bg-primary group-hover:scale-110 transition-transform duration-300 mb-4 opacity-30">
                <Plus className="h-10 w-10 text-primary-foreground group-hover:rotate-90 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("addNewWarehouse")}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {t("clickToAddWarehouse")}
              </p>
            </CardContent>
          </Card>

          {/* Existing Warehouses */}
          {warehouses.map((warehouse, index) => (
            <Card
              key={warehouse.id}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader className="pb-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-muted">
                      <Warehouse className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {warehouse.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {warehouse.location}
                      </p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => openEditDialog(warehouse)}
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {t("edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteWarehouse(warehouse.id)}
                        className="text-destructive cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t("delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                {/* Statistics Grid - Clean & Spacious */}
                <div className="flex items-center justify-between gap-6 py-4">
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold">
                      {warehouse.totalProducts}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">
                      {t("products")}
                    </div>
                  </div>
                  
                  <div className="h-12 w-px bg-border" />
                  
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold">
                      {(warehouse.totalValue / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">
                      {t("value")}
                    </div>
                  </div>
                  
                  <div className="h-12 w-px bg-border" />
                  
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold">
                      {warehouse.lowStockItems}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">
                      {t("lowStock")}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => openDetailsDialog(warehouse)}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 flex-shrink-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    className="flex-1 h-10 opacity-90"
                    variant="default"
                  >
                    {t("manageWarehouse")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog with Clean Styling */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{t("editWarehouse")}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">{t("editWarehouseDescription")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-6">
              <div className="grid gap-3">
                <Label htmlFor="edit-name" className="text-sm font-medium">{t("warehouseName")}</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("warehouseNamePlaceholder")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="edit-location" className="text-sm font-medium">{t("location")}</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={t("locationPlaceholder")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="edit-manager" className="text-sm font-medium">{t("manager")}</Label>
                <Input
                  id="edit-manager"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  placeholder={t("managerPlaceholder")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="edit-phone" className="text-sm font-medium">{t("phone")}</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t("phonePlaceholder")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="edit-email" className="text-sm font-medium">{t("email")}</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("emailPlaceholder")}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="edit-description" className="text-sm font-medium">{t("description")}</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t("descriptionPlaceholder")}
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
              >
                {tCommon("cancel")}
              </Button>
              <Button 
                onClick={handleEditWarehouse}
              >
                {tCommon("save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Details Dialog - Large & Comprehensive */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedWarehouse && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-2xl bg-primary flex-shrink-0">
                      <Warehouse className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-3xl font-bold mb-2">
                        {selectedWarehouse.name}
                      </DialogTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-base">{selectedWarehouse.location}</span>
                      </div>
                      <div className="mt-3">
                        <Badge 
                          variant={selectedWarehouse.status === "active" ? "default" : "secondary"}
                          className="text-xs px-3 py-1"
                        >
                          {selectedWarehouse.status === "active" ? t("active") : t("inactive")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 py-6">
                  {/* Statistics Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <Package className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold mb-1">
                          {selectedWarehouse.totalProducts}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {t("totalProducts")}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold mb-1">
                          {selectedWarehouse.totalValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {t("totalValue")} ({t("sar")})
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardContent className="p-6 text-center">
                        <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold mb-1">
                          {selectedWarehouse.lowStockItems}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {t("lowStockItems")}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Warehouse Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        {t("warehouseInformation")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                {t("manager")}
                              </div>
                              <div className="text-base font-medium">
                                {selectedWarehouse.manager}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                {t("phone")}
                              </div>
                              <div className="text-base font-medium">
                                {selectedWarehouse.phone}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                {t("email")}
                              </div>
                              <div className="text-base font-medium break-all">
                                {selectedWarehouse.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                {t("createdAt")}
                              </div>
                              <div className="text-base font-medium">
                                {selectedWarehouse.createdAt}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedWarehouse.description && (
                        <div className="pt-4 border-t">
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                            {t("description")}
                          </div>
                          <div className="text-base leading-relaxed">
                            {selectedWarehouse.description}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter className="gap-3 flex-wrap">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDetailsDialogOpen(false)}
                  >
                    {tCommon("close")}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsDetailsDialogOpen(false);
                      openEditDialog(selectedWarehouse);
                    }}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    {t("edit")}
                  </Button>
                  <Button 
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    {t("manageWarehouse")}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
