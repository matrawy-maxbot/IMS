"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { UserDropdown } from "@/components/user-dropdown";
import { Package } from "lucide-react";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Header() {
  const t = useTranslations('common');
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4 md:gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
            <Package className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {t('appName')}
            </h1>
            <p className="text-xs text-muted-foreground -mt-0.5">
              {t('appTagline')}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <NotificationsDropdown />
        <ModeToggle />
        <UserDropdown />
      </div>
    </header>
  );
}