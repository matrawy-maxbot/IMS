import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { NotificationsDropdown } from "@/components/notifications-dropdown";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4 md:gap-6">
        <form className="hidden flex-1 sm:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="بحث..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8 pr-3"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <NotificationsDropdown />
        <ModeToggle />
      </div>
    </header>
  );
}