"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
  email: string;
  description: string;
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  status: "active" | "inactive";
  createdAt: string;
}

interface WarehouseContextType {
  warehouses: Warehouse[];
  selectedWarehouse: Warehouse | null;
  setSelectedWarehouse: (warehouse: Warehouse) => void;
  addWarehouse: (warehouse: Warehouse) => void;
  updateWarehouse: (id: string, warehouse: Partial<Warehouse>) => void;
  deleteWarehouse: (id: string) => void;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

export function WarehouseProvider({ children }: { children: React.ReactNode }) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "1",
      name: "المخزن الرئيسي",
      location: "الرياض، حي الملز",
      manager: "أحمد محمد",
      phone: "+966 50 123 4567",
      email: "main@warehouse.com",
      description: "المخزن الرئيسي للشركة يحتوي على جميع المنتجات الأساسية",
      totalProducts: 450,
      totalValue: 125000,
      lowStockItems: 12,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "مخزن الفرع الشمالي",
      location: "جدة، حي الروضة",
      manager: "خالد علي",
      phone: "+966 55 234 5678",
      email: "north@warehouse.com",
      description: "مخزن فرعي يخدم منطقة جدة والمدن المجاورة",
      totalProducts: 280,
      totalValue: 78000,
      lowStockItems: 8,
      status: "active",
      createdAt: "2024-02-10",
    },
    {
      id: "3",
      name: "مخزن الإلكترونيات",
      location: "الدمام، الكورنيش",
      manager: "سارة أحمد",
      phone: "+966 53 345 6789",
      email: "electronics@warehouse.com",
      description: "مخزن متخصص في الأجهزة الإلكترونية والتقنية",
      totalProducts: 350,
      totalValue: 210000,
      lowStockItems: 15,
      status: "active",
      createdAt: "2024-03-05",
    },
  ]);

  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedWarehouses = localStorage.getItem('warehouses');
    const storedSelectedId = localStorage.getItem('selectedWarehouseId');
    
    if (storedWarehouses) {
      try {
        const parsed = JSON.parse(storedWarehouses);
        setWarehouses(parsed);
        
        if (storedSelectedId) {
          const selected = parsed.find((w: Warehouse) => w.id === storedSelectedId);
          if (selected) {
            setSelectedWarehouse(selected);
          } else {
            setSelectedWarehouse(parsed[0] || null);
          }
        } else {
          setSelectedWarehouse(parsed[0] || null);
        }
      } catch (error) {
        console.error('Failed to load warehouses from localStorage', error);
        setSelectedWarehouse(warehouses[0] || null);
      }
    } else {
      setSelectedWarehouse(warehouses[0] || null);
    }
  }, []);

  // Save to localStorage when warehouses change
  useEffect(() => {
    if (warehouses.length > 0) {
      localStorage.setItem('warehouses', JSON.stringify(warehouses));
    }
  }, [warehouses]);

  // Save selected warehouse ID to localStorage
  useEffect(() => {
    if (selectedWarehouse) {
      localStorage.setItem('selectedWarehouseId', selectedWarehouse.id);
    }
  }, [selectedWarehouse]);

  const addWarehouse = (warehouse: Warehouse) => {
    setWarehouses((prev) => [...prev, warehouse]);
  };

  const updateWarehouse = (id: string, updates: Partial<Warehouse>) => {
    setWarehouses((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
    );
    
    // Update selected warehouse if it's the one being updated
    if (selectedWarehouse?.id === id) {
      setSelectedWarehouse({ ...selectedWarehouse, ...updates });
    }
  };

  const deleteWarehouse = (id: string) => {
    setWarehouses((prev) => prev.filter((w) => w.id !== id));
    
    // If deleted warehouse was selected, select the first available
    if (selectedWarehouse?.id === id) {
      const remaining = warehouses.filter((w) => w.id !== id);
      setSelectedWarehouse(remaining[0] || null);
    }
  };

  return (
    <WarehouseContext.Provider
      value={{
        warehouses,
        selectedWarehouse,
        setSelectedWarehouse,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
}

export function useWarehouse() {
  const context = useContext(WarehouseContext);
  if (context === undefined) {
    throw new Error('useWarehouse must be used within a WarehouseProvider');
  }
  return context;
}
