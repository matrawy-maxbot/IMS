"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarehouseStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  borderColor?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function WarehouseStatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-blue-500",
  borderColor = "border-l-blue-500",
  trend,
  trendValue,
}: WarehouseStatsCardProps) {
  return (
    <Card className={cn("border-l-4 transition-all hover:shadow-md", borderColor)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div
            className={cn(
              "text-xs font-medium mt-1",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
