"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Layers,
  FormInput,
  LayoutGrid,
  Webhook,
  Database,
  Settings,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useBoolean } from "usehooks-ts";

// 사이드바 네비게이션 아이템
const sidebarItems = [
  { label: "컴포넌트", href: "/examples/components", icon: Layers },
  { label: "폼", href: "/examples/forms", icon: FormInput },
  { label: "레이아웃", href: "/examples/layouts", icon: LayoutGrid },
  { label: "훅", href: "/examples/hooks", icon: Webhook },
  { label: "데이터 페칭", href: "/examples/data-fetching", icon: Database },
  { label: "설정", href: "/examples/settings", icon: Settings },
];

// 사이드바 네비게이션 컴포넌트
function SidebarNav({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      <Link
        href="/examples"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          pathname === "/examples"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <ChevronRight className="h-4 w-4" />
        전체 보기
      </Link>

      <div className="pt-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          카테고리
        </p>
        {sidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute inset-0 rounded-lg bg-primary -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// 예제 레이아웃
export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndexPage = pathname === "/examples";
  const { value: isOpen, setFalse: close, toggle } = useBoolean(false);

  // 인덱스 페이지에서는 사이드바 없이 전체 너비 사용
  if (isIndexPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* 데스크탑 사이드바 */}
      <aside className="hidden w-64 shrink-0 border-r bg-muted/30 lg:block">
        <ScrollReveal className="sticky top-20 p-6">
          <SidebarNav />
        </ScrollReveal>
      </aside>

      {/* 모바일 사이드바 */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Sheet open={isOpen} onOpenChange={toggle}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Menu className="h-6 w-6" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="mt-6">
              <SidebarNav onItemClick={close} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
