import type { Metadata } from "next";
import { Code2, Users, Target, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

export const metadata: Metadata = {
  title: "소개",
  description: "모던 웹 스타터킷에 대해 알아보세요.",
};

// 가치 항목
const values = [
  {
    icon: Code2,
    title: "최신 기술",
    description:
      "Next.js 16, React 19, TypeScript 등 최신 기술 스택을 사용하여 현대적인 웹 애플리케이션을 구축합니다.",
  },
  {
    icon: Users,
    title: "개발자 경험",
    description:
      "개발자가 빠르게 시작하고 효율적으로 작업할 수 있도록 최적화된 환경을 제공합니다.",
  },
  {
    icon: Target,
    title: "성능 최적화",
    description:
      "서버 컴포넌트, 이미지 최적화, 코드 분할 등 Next.js의 최신 기능을 활용합니다.",
  },
  {
    icon: Lightbulb,
    title: "확장 가능",
    description:
      "모듈화된 구조로 설계되어 프로젝트 규모에 맞게 쉽게 확장할 수 있습니다.",
  },
];

// About 페이지
export default function AboutPage() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="py-24">
        <Container>
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              모던 웹 개발의
              <br />
              <span className="text-primary">새로운 시작</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              이 스타터킷은 최신 웹 기술을 활용하여 빠르고 효율적인 웹 개발을
              시작할 수 있도록 설계되었습니다. 검증된 라이브러리와 모범 사례를
              바탕으로 구축되었습니다.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="border-t bg-muted/30 py-24">
        <Container>
          <ScrollReveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              기술 스택
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              업계에서 검증된 최신 기술들로 구성되어 있습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {/* 웜 베이지 톤에 조화로운 그라디언트 팔레트 */}
              {[
                { name: "Next.js 16", color: "from-stone-700 to-stone-500" },
                { name: "React 19", color: "from-sky-700 to-sky-500" },
                { name: "TypeScript", color: "from-blue-700 to-blue-500" },
                { name: "Tailwind CSS", color: "from-teal-700 to-teal-500" },
                { name: "ShadcnUI", color: "from-stone-600 to-stone-400" },
                { name: "Framer Motion", color: "from-rose-700 to-rose-500" },
                { name: "Zod", color: "from-indigo-700 to-indigo-500" },
                { name: "date-fns", color: "from-amber-600 to-amber-400" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`rounded-lg bg-gradient-to-br ${tech.color} p-4 text-center font-medium text-white shadow-lg transition-transform hover:scale-105`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 가치 섹션 */}
      <section className="py-24">
        <Container>
          <ScrollReveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              핵심 가치
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              이 스타터킷이 추구하는 핵심 가치입니다.
            </p>
          </ScrollReveal>

          <StaggerChildren className="grid gap-6 md:grid-cols-2" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>
    </>
  );
}
