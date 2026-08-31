"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Home,
  Briefcase,
  FolderKanban,
  Wrench,
  Code2,
  User,
  LogOut,
  Trash2,
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import GlobalLoadingOverlay from "@/components/GlobalLoadingOverlay";
import RouteLoadingBar from "@/components/RouteLoadingBar";
import PageTransition from "@/components/PageTransition";

const menuItems = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: Home,
    title: "Hero / Home",
    href: "/admin/hero",
  },
  {
    icon: User,
    title: "About",
    href: "/admin/about",
  },
  {
    icon: GraduationCap,
    title: "Education",
    href: "/admin/education",
  },
  {
    icon: Code2,
    title: "Tech Stack",
    href: "/admin/techstack",
  },
  {
    icon: Briefcase,
    title: "Experiences",
    href: "/admin/experiences",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    href: "/admin/projects",
  },
  {
    icon: Wrench,
    title: "Services",
    href: "/admin/services",
    disabled: true,
  },
  {
    icon: Trash2,
    title: "Recycle Bin",
    href: "/admin/trash",
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    }
    document.body.classList.add("font-outfit");
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div
      className="flex min-h-screen bg-gray-50 font-outfit dark:bg-gray-900"
      suppressHydrationWarning
    >
      <RouteLoadingBar />
      <GlobalLoadingOverlay />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 dark:bg-gray-800",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex h-16 items-center justify-between border-b px-6">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user?.name || user?.email || "Admin"}
                </p>
                <p className="truncate text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              if (item.disabled) {
                return (
                  <div
                    key={item.href}
                    className="flex cursor-not-allowed select-none items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-400 opacity-60 dark:text-gray-500"
                    title="Services dinonaktifkan sementara"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </div>
                    <span className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                      Off
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-gray-700 hover:translate-x-1 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 transition-all duration-200 hover:scale-[1.02] hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 active:scale-95 dark:hover:border-indigo-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 transition-transform duration-300 hover:-rotate-12" />
                  Dark Mode
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 transition-all duration-200 hover:scale-[1.02] hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:hover:border-red-500 dark:hover:bg-red-950 dark:hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 lg:hidden dark:bg-gray-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="flex-1 text-lg font-semibold">Admin Panel</h1>
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </header>

        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
