"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { useLocale } from "next-intl";

interface SubTask {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  completed: boolean;
}

interface ChecklistItem {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description?: {
    ar: string;
    en: string;
  };
  completed: boolean;
  link?: string;
  subTasks?: SubTask[];
}

type SnapPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

interface OnboardingChecklistProps {
  // No props needed anymore
}

export function OnboardingChecklist({}: OnboardingChecklistProps = {}) {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [snapPosition, setSnapPosition] = useState<SnapPosition>('bottom-left');
  const [hasMoved, setHasMoved] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "add-product",
      title: {
        ar: "إضافة أول منتج",
        en: "Add your first product",
      },
      description: {
        ar: "تعلم كيفية إضافة وإدارة المنتجات في المخزون",
        en: "Learn how to add and manage products in inventory",
      },
      completed: false,
      link: "/products/add",
      subTasks: [
        {
          id: "product-1",
          title: {
            ar: "انتقل إلى صفحة المنتجات",
            en: "Navigate to products page",
          },
          completed: false,
        },
        {
          id: "product-2",
          title: {
            ar: "اضغط على زر 'إضافة منتج'",
            en: "Click 'Add Product' button",
          },
          completed: false,
        },
        {
          id: "product-3",
          title: {
            ar: "أدخل معلومات المنتج",
            en: "Enter product information",
          },
          completed: false,
        },
        {
          id: "product-4",
          title: {
            ar: "احفظ المنتج",
            en: "Save the product",
          },
          completed: false,
        },
      ],
    },
    {
      id: "add-customer",
      title: {
        ar: "إضافة أول عميل",
        en: "Add your first customer",
      },
      description: {
        ar: "أنشئ قاعدة بيانات العملاء الخاصة بك",
        en: "Build your customer database",
      },
      completed: false,
      link: "/customers/add",
      subTasks: [
        {
          id: "customer-1",
          title: {
            ar: "افتح صفحة العملاء",
            en: "Open customers page",
          },
          completed: false,
        },
        {
          id: "customer-2",
          title: {
            ar: "اضغط 'إضافة عميل'",
            en: "Click 'Add Customer'",
          },
          completed: false,
        },
        {
          id: "customer-3",
          title: {
            ar: "أدخل بيانات العميل",
            en: "Enter customer details",
          },
          completed: false,
        },
      ],
    },
    {
      id: "create-order",
      title: {
        ar: "إنشاء أول طلب",
        en: "Create your first order",
      },
      description: {
        ar: "ابدأ في معالجة الطلبات وإدارة المبيعات",
        en: "Start processing orders and managing sales",
      },
      completed: false,
      link: "/add-order",
      subTasks: [
        {
          id: "order-1",
          title: {
            ar: "انتقل إلى صفحة الطلبات",
            en: "Go to orders page",
          },
          completed: false,
        },
        {
          id: "order-2",
          title: {
            ar: "اختر العميل",
            en: "Select customer",
          },
          completed: false,
        },
        {
          id: "order-3",
          title: {
            ar: "أضف المنتجات للطلب",
            en: "Add products to order",
          },
          completed: false,
        },
        {
          id: "order-4",
          title: {
            ar: "أكمل الطلب",
            en: "Complete the order",
          },
          completed: false,
        },
      ],
    },
    {
      id: "view-reports",
      title: {
        ar: "عرض التقارير",
        en: "View reports",
      },
      description: {
        ar: "اطلع على تحليلات الأداء والإحصائيات",
        en: "Review performance analytics and statistics",
      },
      completed: false,
      link: "/reports",
      subTasks: [
        {
          id: "report-1",
          title: {
            ar: "افتح صفحة التقارير",
            en: "Open reports page",
          },
          completed: false,
        },
        {
          id: "report-2",
          title: {
            ar: "استعرض التقارير المختلفة",
            en: "Browse different reports",
          },
          completed: false,
        },
      ],
    },
    {
      id: "customize-settings",
      title: {
        ar: "تخصيص الإعدادات",
        en: "Customize settings",
      },
      description: {
        ar: "قم بتهيئة النظام حسب احتياجاتك",
        en: "Configure the system to your needs",
      },
      completed: false,
      link: "/settings",
      subTasks: [
        {
          id: "settings-1",
          title: {
            ar: "افتح الإعدادات",
            en: "Open settings",
          },
          completed: false,
        },
        {
          id: "settings-2",
          title: {
            ar: "قم بتخصيص اللغة والمظهر",
            en: "Customize language and theme",
          },
          completed: false,
        },
        {
          id: "settings-3",
          title: {
            ar: "احفظ التغييرات",
            en: "Save changes",
          },
          completed: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    const savedChecklist = localStorage.getItem("onboarding-checklist");
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist));
      } catch (e) {
        console.error("Failed to parse checklist:", e);
      }
    }

    const dismissed = localStorage.getItem("onboarding-checklist-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }

    // Load saved position
    const savedPosition = localStorage.getItem("onboarding-checklist-position");
    if (savedPosition) {
      setSnapPosition(savedPosition as SnapPosition);
    }
  }, []);

  // Calculate position based on snap point
  useEffect(() => {
    const calculatePosition = () => {
      if (!dragRef.current) return;

      const boxWidth = 380;
      const boxHeight = dragRef.current.offsetHeight;
      const margin = 24; // 1.5rem = 24px

      const positions: Record<SnapPosition, { x: number; y: number }> = {
        'top-left': { x: margin, y: margin },
        'top-center': { x: (window.innerWidth - boxWidth) / 2, y: margin },
        'top-right': { x: window.innerWidth - boxWidth - margin, y: margin },
        'bottom-left': { x: margin, y: window.innerHeight - boxHeight - margin },
        'bottom-center': { x: (window.innerWidth - boxWidth) / 2, y: window.innerHeight - boxHeight - margin },
        'bottom-right': { x: window.innerWidth - boxWidth - margin, y: window.innerHeight - boxHeight - margin },
      };

      setPosition(positions[snapPosition]);
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [snapPosition, isOpen]);

  // Find nearest snap position
  const findNearestSnap = (x: number, y: number): SnapPosition => {
    const boxWidth = 380;
    const boxHeight = dragRef.current?.offsetHeight || 400;
    const margin = 24;

    const snapPoints: Record<SnapPosition, { x: number; y: number }> = {
      'top-left': { x: margin, y: margin },
      'top-center': { x: (window.innerWidth - boxWidth) / 2, y: margin },
      'top-right': { x: window.innerWidth - boxWidth - margin, y: margin },
      'bottom-left': { x: margin, y: window.innerHeight - boxHeight - margin },
      'bottom-center': { x: (window.innerWidth - boxWidth) / 2, y: window.innerHeight - boxHeight - margin },
      'bottom-right': { x: window.innerWidth - boxWidth - margin, y: window.innerHeight - boxHeight - margin },
    };

    let nearestSnap: SnapPosition = 'bottom-left';
    let minDistance = Infinity;

    Object.entries(snapPoints).forEach(([snap, point]) => {
      const distance = Math.sqrt(
        Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestSnap = snap as SnapPosition;
      }
    });

    return nearestSnap;
  };

  // Mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    
    setIsDragging(true);
    setHasMoved(false);
    const rect = dragRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;

      // Check if moved more than 20px
      const deltaX = Math.abs(e.clientX - startPosRef.current.x);
      const deltaY = Math.abs(e.clientY - startPosRef.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 20) {
        setHasMoved(true);
      }

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;

      setIsDragging(false);
      const nearestSnap = findNearestSnap(position.x, position.y);
      setSnapPosition(nearestSnap);
      localStorage.setItem("onboarding-checklist-position", nearestSnap);

      // Reset hasMoved after a short delay to allow click event to check it
      setTimeout(() => {
        setHasMoved(false);
      }, 100);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!dragRef.current) return;
    
    setIsDragging(true);
    setHasMoved(false);
    const touch = e.touches[0];
    const rect = dragRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
    startPosRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const newX = touch.clientX - offsetRef.current.x;
      const newY = touch.clientY - offsetRef.current.y;

      // Check if moved more than 20px
      const deltaX = Math.abs(touch.clientX - startPosRef.current.x);
      const deltaY = Math.abs(touch.clientY - startPosRef.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 20) {
        setHasMoved(true);
      }

      setPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;

      setIsDragging(false);
      const nearestSnap = findNearestSnap(position.x, position.y);
      setSnapPosition(nearestSnap);
      localStorage.setItem("onboarding-checklist-position", nearestSnap);

      // Reset hasMoved after a short delay to allow click event to check it
      setTimeout(() => {
        setHasMoved(false);
      }, 100);
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, position]);

  const saveChecklist = (newChecklist: ChecklistItem[]) => {
    setChecklist(newChecklist);
    localStorage.setItem("onboarding-checklist", JSON.stringify(newChecklist));
  };

  const toggleSubTask = (taskId: string, subTaskId: string) => {
    const newChecklist = checklist.map((item) => {
      if (item.id === taskId && item.subTasks) {
        const newSubTasks = item.subTasks.map((subTask) =>
          subTask.id === subTaskId
            ? { ...subTask, completed: !subTask.completed }
            : subTask
        );
        
        // Check if all subtasks are completed
        const allSubTasksCompleted = newSubTasks.every((st) => st.completed);
        
        return {
          ...item,
          subTasks: newSubTasks,
          completed: allSubTasksCompleted,
        };
      }
      return item;
    });
    saveChecklist(newChecklist);
  };

  const toggleItem = (id: string) => {
    const newChecklist = checklist.map((item) => {
      if (item.id === id) {
        const newCompleted = !item.completed;
        // If marking as completed, mark all subtasks as completed
        // If marking as incomplete, mark all subtasks as incomplete
        const newSubTasks = item.subTasks?.map((subTask) => ({
          ...subTask,
          completed: newCompleted,
        }));
        
        return { ...item, completed: newCompleted, subTasks: newSubTasks };
      }
      return item;
    });
    saveChecklist(newChecklist);
  };

  const toggleExpanded = (id: string) => {
    setExpandedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDismiss = () => {
    localStorage.setItem("onboarding-checklist-dismissed", "true");
    setIsVisible(false);
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progress = (completedCount / totalCount) * 100;

  const isRTL = locale === "ar";

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dragRef}
        className={`fixed z-50 w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 ${
          isDragging ? 'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] scale-105' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: isDragging ? 'grabbing' : 'default',
          userSelect: isDragging ? 'none' : 'auto',
        }}
      >
      {/* Header */}
      <div
        className="onboarding-header p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={(e) => {
          // Only toggle if not dragging and hasn't moved
          if (!hasMoved) {
            setIsOpen(!isOpen);
          }
        }}
        aria-label={isOpen ? "Collapse checklist" : "Expand checklist"}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 cursor-pointer select-none transition-all hover:opacity-80">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {isRTL ? "قائمة البدء السريع" : "Quick Start Checklist"}
              </h3>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                {isRTL ? "جديد" : "New"}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isRTL ? "ابدأ رحلتك معنا" : "Get started with your journey"}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!hasMoved) {
                  handleDismiss();
                }
              }}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!hasMoved) {
                  setIsOpen(!isOpen);
                }
              }}
              className={`p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-label="Toggle"
            >
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {completedCount} {isRTL ? "من" : "of"} {totalCount}{" "}
                {isRTL ? "مكتمل" : "complete"}
              </span>
              {completedCount === totalCount && (
                <span className="text-xs">🎉</span>
              )}
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-700 ease-out rounded-full ${
                completedCount === totalCount
                  ? "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"
                  : "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      {isOpen && (
        <div className="p-5 space-y-2.5 max-h-[420px] overflow-y-auto custom-scrollbar">
          {checklist.map((item, index) => {
            const hasSubTasks = item.subTasks && item.subTasks.length > 0;
            const isExpanded = expandedTasks.has(item.id);
            const completedSubTasks = item.subTasks?.filter(st => st.completed).length || 0;
            const totalSubTasks = item.subTasks?.length || 0;

            return (
              <div
                key={item.id}
                className="space-y-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Main Task */}
                <div
                  className={`group flex items-start gap-3.5 p-3.5 rounded-xl transition-all duration-300 ${
                    hasSubTasks ? "cursor-pointer" : ""
                  } ${
                    item.completed
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10 border border-green-200/50 dark:border-green-800/30"
                      : "bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                  }`}
                  onClick={(e) => {
                    // Only toggle if clicking on the card itself, not on buttons or links
                    if (
                      hasSubTasks &&
                      e.target === e.currentTarget ||
                      (e.target as HTMLElement).closest('.task-content')
                    ) {
                      toggleExpanded(item.id);
                    }
                  }}
                >
                  <div className="flex-1 flex items-start gap-3.5 task-content">
                    {/* Checkbox */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(item.id);
                      }}
                      className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        item.completed
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 border-blue-600 shadow-lg shadow-blue-500/30 scale-105"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110 hover:shadow-md"
                      }`}
                    >
                      {item.completed && (
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      )}
                    </button>

                    {/* Title and Description */}
                    <div className="flex-1 pointer-events-none">
                      <div
                        className={`text-sm font-medium transition-all duration-300 ${
                          item.completed
                            ? "text-gray-400 dark:text-gray-500 line-through"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {item.title[locale as keyof typeof item.title]}
                      </div>
                      {item.description && !item.completed && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.description[locale as keyof typeof item.description]}
                        </div>
                      )}
                      {hasSubTasks && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1.5 font-medium">
                          {completedSubTasks}/{totalSubTasks} {isRTL ? "مكتمل" : "completed"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Expand/Collapse Indicator */}
                    {hasSubTasks && (
                      <div className={`p-1.5 transition-all pointer-events-none ${
                        isExpanded ? "rotate-180" : ""
                      }`}>
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}

                    {/* Action Button */}
                    {!item.completed && item.link && (
                      <a
                        href={item.link}
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 px-2 py-1"
                      >
                        {isRTL ? "انتقل" : "Go"} →
                      </a>
                    )}
                  </div>
                </div>

                {/* SubTasks */}
                {hasSubTasks && isExpanded && (
                  <div className="ml-8 mr-4 space-y-1.5">
                    {item.subTasks!.map((subTask) => (
                      <div
                        key={subTask.id}
                        className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 ${
                          subTask.completed
                            ? "bg-green-50/50 dark:bg-green-950/10"
                            : "bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        }`}
                      >
                        {/* SubTask Checkbox */}
                        <button
                          onClick={() => toggleSubTask(item.id, subTask.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            subTask.completed
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
                          }`}
                        >
                          {subTask.completed && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </button>

                        {/* SubTask Title */}
                        <span
                          className={`text-xs transition-all duration-200 ${
                            subTask.completed
                              ? "text-gray-400 dark:text-gray-500 line-through"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {subTask.title[locale as keyof typeof subTask.title]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      {isOpen && completedCount === totalCount && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-t border-green-200 dark:border-green-900">
          <div className="text-center">
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
              {isRTL ? "رائع! لقد أكملت جميع المهام" : "Great! You've completed all tasks"}
            </p>
            <p className="text-xs text-green-600 dark:text-green-500">
              {isRTL ? "أنت الآن جاهز لاستخدام النظام بالكامل" : "You're now ready to use the system fully"}
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
