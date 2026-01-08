"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// 데모 박스 컴포넌트
function DemoBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg bg-primary/10 p-4 text-center text-sm font-medium text-primary ${className}`}>
      {children}
    </div>
  );
}

// 레이아웃 예제 페이지
export default function LayoutsPage() {
  return (
    <div className="py-12">
      <Container>
        {/* 페이지 헤더 */}
        <FadeIn className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">레이아웃</h1>
          <p className="text-lg text-muted-foreground">
            Tailwind CSS를 활용한 다양한 레이아웃 패턴 예제입니다.
            <br />
            Container, Grid, Flexbox 등 반응형 레이아웃을 확인하세요.
          </p>
        </FadeIn>

        <Tabs defaultValue="container" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="container">Container</TabsTrigger>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="flexbox">Flexbox</TabsTrigger>
            <TabsTrigger value="responsive">반응형</TabsTrigger>
            <TabsTrigger value="spacing">간격</TabsTrigger>
          </TabsList>

          {/* Container 탭 */}
          <TabsContent value="container">
            <ScrollReveal className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Container 컴포넌트</CardTitle>
                  <CardDescription>
                    콘텐츠를 중앙에 배치하고 최대 너비를 제한하는 래퍼 컴포넌트입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 기본 Container */}
                  <div>
                    <p className="mb-2 text-sm font-medium">기본 Container (max-w-7xl)</p>
                    <div className="border-2 border-dashed border-primary/30 py-4">
                      <Container>
                        <DemoBox>Container 내부 콘텐츠</DemoBox>
                      </Container>
                    </div>
                  </div>

                  {/* Container 비교 */}
                  <div>
                    <p className="mb-2 text-sm font-medium">다양한 max-width 비교</p>
                    <div className="space-y-2">
                      <div className="mx-auto max-w-sm">
                        <DemoBox>max-w-sm (384px)</DemoBox>
                      </div>
                      <div className="mx-auto max-w-md">
                        <DemoBox>max-w-md (448px)</DemoBox>
                      </div>
                      <div className="mx-auto max-w-lg">
                        <DemoBox>max-w-lg (512px)</DemoBox>
                      </div>
                      <div className="mx-auto max-w-xl">
                        <DemoBox>max-w-xl (576px)</DemoBox>
                      </div>
                      <div className="mx-auto max-w-2xl">
                        <DemoBox>max-w-2xl (672px)</DemoBox>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          {/* Grid 탭 */}
          <TabsContent value="grid">
            <ScrollReveal className="space-y-8">
              {/* 기본 그리드 */}
              <Card>
                <CardHeader>
                  <CardTitle>기본 Grid</CardTitle>
                  <CardDescription>
                    CSS Grid를 사용한 다양한 열 구성 예제입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">2열 그리드</p>
                    <div className="grid grid-cols-2 gap-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">3열 그리드</p>
                    <div className="grid grid-cols-3 gap-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">4열 그리드</p>
                    <div className="grid grid-cols-4 gap-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                      <DemoBox>4</DemoBox>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 비대칭 그리드 */}
              <Card>
                <CardHeader>
                  <CardTitle>비대칭 Grid</CardTitle>
                  <CardDescription>
                    col-span을 사용한 비대칭 레이아웃 예제입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">2:1 비율</p>
                    <div className="grid grid-cols-3 gap-4">
                      <DemoBox className="col-span-2">2/3 너비</DemoBox>
                      <DemoBox>1/3 너비</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">사이드바 레이아웃</p>
                    <div className="grid grid-cols-4 gap-4">
                      <DemoBox>사이드바</DemoBox>
                      <DemoBox className="col-span-3">메인 콘텐츠</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">복합 레이아웃</p>
                    <div className="grid grid-cols-4 gap-4">
                      <DemoBox className="col-span-2 row-span-2">Featured</DemoBox>
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                      <DemoBox>4</DemoBox>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Auto-fit 그리드 */}
              <Card>
                <CardHeader>
                  <CardTitle>자동 크기 조절 Grid</CardTitle>
                  <CardDescription>
                    minmax를 사용한 유연한 그리드 레이아웃입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm font-medium">auto-fit + minmax(200px, 1fr)</p>
                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <DemoBox key={i}>아이템 {i}</DemoBox>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          {/* Flexbox 탭 */}
          <TabsContent value="flexbox">
            <ScrollReveal className="space-y-8">
              {/* 방향 */}
              <Card>
                <CardHeader>
                  <CardTitle>Flex Direction</CardTitle>
                  <CardDescription>
                    flex-direction을 사용한 아이템 배치 방향 설정입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">flex-row (기본값)</p>
                    <div className="flex gap-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">flex-row-reverse</p>
                    <div className="flex flex-row-reverse gap-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">flex-col</p>
                    <div className="flex flex-col gap-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 정렬 */}
              <Card>
                <CardHeader>
                  <CardTitle>Justify & Align</CardTitle>
                  <CardDescription>
                    주축과 교차축 정렬 방법입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">justify-start</p>
                    <div className="flex justify-start gap-4 rounded-lg border p-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">justify-center</p>
                    <div className="flex justify-center gap-4 rounded-lg border p-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">justify-end</p>
                    <div className="flex justify-end gap-4 rounded-lg border p-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">justify-between</p>
                    <div className="flex justify-between gap-4 rounded-lg border p-4">
                      <DemoBox>1</DemoBox>
                      <DemoBox>2</DemoBox>
                      <DemoBox>3</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">items-center (수직 중앙)</p>
                    <div className="flex h-24 items-center gap-4 rounded-lg border p-4">
                      <DemoBox className="h-8">작은</DemoBox>
                      <DemoBox className="h-16">중간</DemoBox>
                      <DemoBox className="h-12">큰</DemoBox>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flex Wrap */}
              <Card>
                <CardHeader>
                  <CardTitle>Flex Wrap</CardTitle>
                  <CardDescription>
                    아이템의 줄바꿈 처리 방법입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">flex-wrap</p>
                    <div className="flex flex-wrap gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <DemoBox key={i} className="w-24">아이템 {i}</DemoBox>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          {/* 반응형 탭 */}
          <TabsContent value="responsive">
            <ScrollReveal className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>반응형 Grid</CardTitle>
                  <CardDescription>
                    브라우저 크기에 따라 열 수가 변경되는 반응형 그리드입니다.
                    브라우저 크기를 조절해보세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="mb-2 flex gap-2">
                      <Badge variant="outline">모바일: 1열</Badge>
                      <Badge variant="outline">태블릿: 2열</Badge>
                      <Badge variant="outline">데스크탑: 3열</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <DemoBox key={i}>아이템 {i}</DemoBox>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex gap-2">
                      <Badge variant="outline">모바일: 2열</Badge>
                      <Badge variant="outline">데스크탑: 4열</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <DemoBox key={i}>아이템 {i}</DemoBox>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>반응형 레이아웃 패턴</CardTitle>
                  <CardDescription>
                    모바일에서는 세로, 데스크탑에서는 가로로 배치되는 패턴입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <DemoBox className="lg:w-64">사이드바</DemoBox>
                    <DemoBox className="flex-1">메인 콘텐츠</DemoBox>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>반응형 숨김/표시</CardTitle>
                  <CardDescription>
                    화면 크기에 따라 요소를 숨기거나 표시합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DemoBox className="md:hidden">모바일에서만 표시됨</DemoBox>
                  <DemoBox className="hidden md:block lg:hidden">태블릿에서만 표시됨</DemoBox>
                  <DemoBox className="hidden lg:block">데스크탑에서만 표시됨</DemoBox>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          {/* 간격 탭 */}
          <TabsContent value="spacing">
            <ScrollReveal className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Gap (간격)</CardTitle>
                  <CardDescription>
                    Grid와 Flexbox에서 아이템 간격을 조절합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[2, 4, 6, 8].map((gap) => (
                    <div key={gap}>
                      <p className="mb-2 text-sm font-medium">gap-{gap} ({gap * 4}px)</p>
                      <div className={`flex gap-${gap}`} style={{ gap: `${gap * 4}px` }}>
                        <DemoBox>1</DemoBox>
                        <DemoBox>2</DemoBox>
                        <DemoBox>3</DemoBox>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Padding & Margin</CardTitle>
                  <CardDescription>
                    내부/외부 간격 조절 예제입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">Padding</p>
                    <div className="space-y-2">
                      <div className="bg-primary/10 p-2">
                        <div className="bg-primary/20 p-4 text-center text-sm">p-2 + p-4</div>
                      </div>
                      <div className="bg-primary/10 p-4">
                        <div className="bg-primary/20 p-4 text-center text-sm">p-4 + p-4</div>
                      </div>
                      <div className="bg-primary/10 p-6">
                        <div className="bg-primary/20 p-4 text-center text-sm">p-6 + p-4</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">비대칭 Padding</p>
                    <div className="space-y-2">
                      <DemoBox className="px-8 py-2">px-8 py-2</DemoBox>
                      <DemoBox className="px-2 py-8">px-2 py-8</DemoBox>
                      <DemoBox className="pl-8 pr-2 pt-4 pb-8">pl-8 pr-2 pt-4 pb-8</DemoBox>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Space Between</CardTitle>
                  <CardDescription>
                    자식 요소 사이에 자동으로 간격을 추가합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium">space-y-4</p>
                    <div className="space-y-4">
                      <DemoBox>첫 번째</DemoBox>
                      <DemoBox>두 번째</DemoBox>
                      <DemoBox>세 번째</DemoBox>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">space-x-4 (인라인)</p>
                    <div className="flex space-x-4">
                      <DemoBox>첫 번째</DemoBox>
                      <DemoBox>두 번째</DemoBox>
                      <DemoBox>세 번째</DemoBox>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
