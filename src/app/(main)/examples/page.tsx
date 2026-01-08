import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  FormInput,
  LayoutGrid,
  Webhook,
  Database,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

export const metadata: Metadata = {
  title: "예제",
  description: "스타터킷의 모든 기능을 실제 동작하는 예제로 탐색하세요.",
};

// 예제 카테고리 정의
const exampleCategories = [
  {
    title: "컴포넌트",
    description: "Button, Card, Dialog 등 모든 UI 컴포넌트를 확인하세요.",
    href: "/examples/components",
    icon: Layers,
    badge: "24+",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "폼",
    description: "React Hook Form과 Zod를 활용한 폼 유효성 검증 예제.",
    href: "/examples/forms",
    icon: FormInput,
    badge: "필수",
    color: "from-emerald-600 to-teal-500",
  },
  {
    title: "레이아웃",
    description: "Container, Grid, Flexbox 등 반응형 레이아웃 패턴.",
    href: "/examples/layouts",
    icon: LayoutGrid,
    badge: null,
    color: "from-violet-600 to-purple-500",
  },
  {
    title: "훅",
    description: "usehooks-ts의 검증된 React 훅과 활용 예제.",
    href: "/examples/hooks",
    icon: Webhook,
    badge: "인기",
    color: "from-orange-600 to-amber-500",
  },
  {
    title: "데이터 페칭",
    description: "Server/Client Component에서의 데이터 페칭 패턴.",
    href: "/examples/data-fetching",
    icon: Database,
    badge: null,
    color: "from-rose-600 to-pink-500",
  },
  {
    title: "설정",
    description: "메타데이터, 이미지 최적화, 코드 분할 등 최적화 가이드.",
    href: "/examples/settings",
    icon: Settings,
    badge: null,
    color: "from-slate-600 to-zinc-500",
  },
];

// 예제 메인 페이지
export default function ExamplesPage() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="py-24">
        <Container>
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Live Examples
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              실제 동작하는
              <br />
              <span className="text-primary">예제 모음</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              스타터킷에 포함된 모든 기능을 직접 체험하고 코드를 확인하세요.
              <br />
              복사하여 바로 사용할 수 있는 실용적인 예제들입니다.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 카테고리 그리드 */}
      <section className="border-t bg-muted/30 py-24">
        <Container>
          <StaggerChildren
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {exampleCategories.map((category) => (
              <StaggerItem key={category.title}>
                <Link href={category.href} className="group block h-full">
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}
                        >
                          <category.icon className="h-6 w-6" />
                        </div>
                        {category.badge && (
                          <Badge variant="outline">{category.badge}</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4 flex items-center gap-2">
                        {category.title}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* 빠른 시작 섹션 */}
      <section className="py-24">
        <Container>
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold">시작하기</h2>
            <p className="mb-6 text-muted-foreground">
              왼쪽 사이드바 또는 위 카드를 클릭하여 각 카테고리의 예제를
              탐색하세요. 모든 예제에는 설명과 함께 복사 가능한 코드가
              제공됩니다.
            </p>
            <div className="rounded-lg border bg-muted/50 p-4">
              <code className="text-sm">
                npx create-next-app --example{" "}
                <span className="text-primary">modern-starter-kit</span>
              </code>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
