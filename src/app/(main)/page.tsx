"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Palette, Sparkles, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { features, siteConfig } from "@/lib/constants";

// 아이콘 매핑
const iconMap = {
  Rocket: Rocket,
  Palette: Palette,
  Sparkles: Sparkles,
};

// 홈페이지
export default function HomePage() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* 배경 장식 - 웜 베이지 톤에 조화로운 그라디언트 */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* 테라코타 블롭 (좌상단) */}
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl" />
          {/* 세이지 그린 블롭 (우하단) */}
          <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-accent/20 via-accent/5 to-transparent blur-3xl" />
          {/* 앰버 액센트 (중앙) */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-200/10 to-orange-200/10 blur-3xl dark:from-amber-500/5 dark:to-orange-500/5" />

          {/* 노이즈 텍스처 오버레이 - 따뜻한 톤 */}
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {/* 배지 */}
            <FadeIn delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span>Next.js 16 + React 19 기반</span>
              </div>
            </FadeIn>

            {/* 메인 타이틀 */}
            <FadeIn delay={0.2}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                빠르게 시작하는
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  모던 웹 개발
                </span>
              </h1>
            </FadeIn>

            {/* 설명 */}
            <FadeIn delay={0.3}>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                {siteConfig.description}
                <br />
                최신 기술 스택과 아름다운 UI로 프로젝트를 시작하세요.
              </p>
            </FadeIn>

            {/* CTA 버튼 */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    시작하기
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Features 섹션 */}
      <section className="border-t bg-muted/30 py-24">
        <Container>
          <ScrollReveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              왜 이 스타터킷인가요?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              검증된 최신 기술 스택과 개발 경험을 바탕으로 구축된 스타터킷입니다.
            </p>
          </ScrollReveal>

          <StaggerChildren className="grid gap-6 md:grid-cols-3" staggerDelay={0.15}>
            {features.map((feature) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];

              return (
                <StaggerItem key={feature.title}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Card className="group h-full border-2 transition-colors hover:border-primary/50">
                      <CardContent className="p-6">
                        {/* 아이콘 */}
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-6 w-6" />
                        </div>

                        {/* 제목 */}
                        <h3 className="mb-2 text-xl font-semibold">
                          {feature.title}
                        </h3>

                        {/* 설명 */}
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </Container>
      </section>

      {/* CTA 섹션 */}
      <section className="relative overflow-hidden py-24">
        {/* 그라디언트 배경 - 웜 톤 조화 */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/30" />

        <Container>
          <ScrollReveal className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              궁금한 점이 있으시거나 협업을 원하신다면 언제든 연락해 주세요.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                연락하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
