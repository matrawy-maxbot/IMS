"use client";

import { useWarehouse } from "@/contexts/warehouse-context";

/**
 * Custom hook to easily access the current selected warehouse
 * Returns the selected warehouse or null if none is selected
 */
export function useCurrentWarehouse() {
  const { selectedWarehouse } = useWarehouse();
  return selectedWarehouse;
}

/**
 * Custom hook to get warehouse statistics
 */
export function useWarehouseStats() {
  const { warehouses } = useWarehouse();

  const totalWarehouses = warehouses.length;
  const activeWarehouses = warehouses.filter((w) => w.status === "active").length;
  const totalProducts = warehouses.reduce((sum, w) => sum + w.totalProducts, 0);
  const totalValue = warehouses.reduce((sum, w) => sum + w.totalValue, 0);
  const totalLowStockItems = warehouses.reduce((sum, w) => sum + w.lowStockItems, 0);

  return {
    totalWarehouses,
    activeWarehouses,
    totalProducts,
    totalValue,
    totalLowStockItems,
  };
}

/**
 * Custom hook to filter warehouses by status
 */
export function useWarehousesByStatus(status: "active" | "inactive") {
  const { warehouses } = useWarehouse();
  return warehouses.filter((w) => w.status === status);
}
