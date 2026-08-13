"use client";

import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

export function GetStartedChecklist() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  const [showOnStartup, setShowOnStartup] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    // Load checklist from localStorage
    const savedChecklist = localStorage.getItem("onboarding-checklist");
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist));
      } catch (e) {
        console.error("Failed to parse checklist:", e);
        loadDefaultChecklist();
      }
    } else {
      loadDefaultChecklist();
    }

    // Load show on startup preference
    const dismissed = localStorage.getItem("onboarding-checklist-dismissed");
    setShowOnStartup(dismissed !== "true");
  }, []);

  const loadDefaultChecklist = () => {
    setChecklist([
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
  };

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

  const handleShowOnStartupChange = (checked: boolean) => {
    setShowOnStartup(checked);
    localStorage.setItem("onboarding-checklist-dismissed", checked ? "false" : "true");
  };

  const resetProgress = () => {
    if (confirm(isRTL ? "هل تريد إعادة تعيين جميع المهام؟" : "Do you want to reset all tasks?")) {
      loadDefaultChecklist();
    }
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6" style={ isRTL ? { direction: 'rtl' } : { direction: 'ltr' }}>
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                {isRTL ? "ابدأ رحلتك" : "Start Your Journey"}
              </CardTitle>
              <CardDescription className="mt-2">
                {isRTL
                  ? "أكمل هذه المهام للتعرف على جميع ميزات النظام"
                  : "Complete these tasks to learn all system features"}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {completedCount} / {totalCount} {isRTL ? "مكتمل" : "completed"}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                completedCount === totalCount
                  ? "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"
                  : "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Settings */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Switch
                id="show-on-startup"
                checked={showOnStartup}
                onCheckedChange={handleShowOnStartupChange}
                style={{ direction: 'ltr' }}
              />
              <Label htmlFor="show-on-startup" className="cursor-pointer">
                {isRTL ? "إظهار عند بدء التشغيل" : "Show on startup"}
              </Label>
            </div>
            <Button variant="outline" size="sm" onClick={resetProgress}>
              {isRTL ? "إعادة تعيين" : "Reset Progress"}
            </Button>
          </div>

          {completedCount === totalCount && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎉</div>
                <div>
                  <div className="font-semibold text-green-700 dark:text-green-400">
                    {isRTL ? "رائع! لقد أكملت جميع المهام" : "Congratulations! You've completed all tasks"}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-500">
                    {isRTL ? "أنت الآن جاهز لاستخدام النظام بالكامل" : "You're now ready to use the system fully"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {checklist.map((item, index) => {
          const hasSubTasks = item.subTasks && item.subTasks.length > 0;
          const isExpanded = expandedTasks.has(item.id);
          const completedSubTasks = item.subTasks?.filter(st => st.completed).length || 0;
          const totalSubTasks = item.subTasks?.length || 0;

          return (
            <Card 
              key={item.id} 
              className={`${item.completed ? "border-green-200 dark:border-green-800" : ""} ${hasSubTasks ? "cursor-pointer" : ""}`}
              onClick={(e) => {
                // Only toggle if clicking on the card itself, not on buttons or links
                if (
                  hasSubTasks &&
                  (e.target === e.currentTarget ||
                  (e.target as HTMLElement).closest('.card-clickable'))
                ) {
                  toggleExpanded(item.id);
                }
              }}
            >
              <CardHeader className="pb-4 card-clickable">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1 ${
                      item.completed
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 border-blue-600 shadow-lg shadow-blue-500/30"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110"
                    }`}
                  >
                    {item.completed && (
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pointer-events-none">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className={`text-lg ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                          {item.title[locale as keyof typeof item.title]}
                        </CardTitle>
                        {item.description && (
                          <CardDescription className="mt-1">
                            {item.description[locale as keyof typeof item.description]}
                          </CardDescription>
                        )}
                        {hasSubTasks && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {completedSubTasks}/{totalSubTasks} {isRTL ? "مهام فرعية مكتملة" : "subtasks completed"}
                            </div>
                            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[120px]">
                              <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${(completedSubTasks / totalSubTasks) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pointer-events-auto">
                        {!item.completed && item.link && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={item.link}>
                              {isRTL ? "ابدأ" : "Start"}
                              <ChevronRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
                            </a>
                          </Button>
                        )}
                        {hasSubTasks && (
                          <div className="pointer-events-none">
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* SubTasks */}
              {hasSubTasks && isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-2 pl-12">
                    {item.subTasks!.map((subTask) => (
                      <div
                        key={subTask.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          subTask.completed
                            ? "bg-green-50/50 dark:bg-green-950/10"
                            : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        }`}
                      >
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
                        <span
                          className={`text-sm ${
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
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
