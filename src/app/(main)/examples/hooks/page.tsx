"use client";

import { useState, useEffect } from "react";
import {
  useBoolean,
  useCounter,
  useCopyToClipboard,
  useDebounceValue,
  useLocalStorage,
  useMediaQuery,
  useToggle,
  useIsClient,
  useWindowSize,
  useInterval,
  useHover,
} from "usehooks-ts";
import {
  format,
  formatDistance,
  formatRelative,
  addDays,
  subDays,
  differenceInDays,
  isAfter,
  isBefore,
  startOfWeek,
  endOfWeek,
  parseISO,
} from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";
import {
  Copy,
  Check,
  Plus,
  Minus,
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";

// UI 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// 공유 컴포넌트
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// 섹션 래퍼
function HookSection({
  title,
  description,
  children,
  badge,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <ScrollReveal>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>{title}</CardTitle>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </ScrollReveal>
  );
}

// 훅 예제 페이지
export default function HooksPage() {
  const isClient = useIsClient();

  // useBoolean 예제
  const { value: isEnabled, toggle: toggleEnabled, setTrue, setFalse } = useBoolean(false);

  // useToggle 예제
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  // useCounter 예제
  const { count, increment, decrement, reset, setCount } = useCounter(0);

  // useCopyToClipboard 예제
  const [copiedText, copy] = useCopyToClipboard();
  const textToCopy = "복사할 텍스트입니다!";

  // useDebounceValue 예제
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounceValue(inputValue, 500);

  // useLocalStorage 예제
  const [storedValue, setStoredValue] = useLocalStorage("demo-key", "기본값");

  // useMediaQuery 예제
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  // useWindowSize 예제
  const { width, height } = useWindowSize();

  // useInterval 예제
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  useInterval(() => setTimer((t) => t + 1), isTimerRunning ? 1000 : null);

  // useHover 예제
  const hoverRef = useRef<HTMLDivElement>(null!);
  const isHovered = useHover(hoverRef);

  // date-fns 예제용 상태
  const [selectedDate] = useState(new Date());

  // 클라이언트에서만 렌더링되는 내용
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        {/* 페이지 헤더 */}
        <FadeIn className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">훅</h1>
          <p className="text-lg text-muted-foreground">
            usehooks-ts의 검증된 React 훅과 date-fns 날짜 처리 예제입니다.
            <br />
            모든 훅은 100만+ 주간 다운로드의 검증된 라이브러리입니다.
          </p>
        </FadeIn>

        <Tabs defaultValue="state" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="state">상태 관리</TabsTrigger>
            <TabsTrigger value="browser">브라우저</TabsTrigger>
            <TabsTrigger value="utility">유틸리티</TabsTrigger>
            <TabsTrigger value="date">날짜 (date-fns)</TabsTrigger>
          </TabsList>

          {/* 상태 관리 훅 */}
          <TabsContent value="state" className="space-y-6">
            {/* useBoolean */}
            <HookSection
              title="useBoolean"
              description="boolean 상태와 toggle, setTrue, setFalse 함수를 제공합니다."
              badge="usehooks-ts"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">현재 상태</p>
                    <p className="text-sm text-muted-foreground">
                      {isEnabled ? "활성화됨" : "비활성화됨"}
                    </p>
                  </div>
                  <Badge variant={isEnabled ? "default" : "secondary"}>
                    {isEnabled ? "ON" : "OFF"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={toggleEnabled} variant="outline">Toggle</Button>
                  <Button onClick={setTrue} variant="outline">Set True</Button>
                  <Button onClick={setFalse} variant="outline">Set False</Button>
                </div>
              </div>
            </HookSection>

            {/* useToggle */}
            <HookSection
              title="useToggle"
              description="간단한 toggle 기능을 제공합니다."
              badge="usehooks-ts"
            >
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">다크 모드 (예시)</p>
                  <p className="text-sm text-muted-foreground">
                    {isDarkMode ? "다크 모드" : "라이트 모드"}
                  </p>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              </div>
            </HookSection>

            {/* useCounter */}
            <HookSection
              title="useCounter"
              description="숫자 카운터 상태와 관련 함수들을 제공합니다."
              badge="usehooks-ts"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="text-6xl font-bold tabular-nums">{count}</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Button size="icon" variant="outline" onClick={decrement}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={increment}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={reset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setCount(100)}>
                    Set 100
                  </Button>
                </div>
              </div>
            </HookSection>

            {/* useLocalStorage */}
            <HookSection
              title="useLocalStorage"
              description="localStorage와 동기화되는 상태를 관리합니다."
              badge="usehooks-ts"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    value={storedValue}
                    onChange={(e) => setStoredValue(e.target.value)}
                    placeholder="저장할 값 입력..."
                  />
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm">
                    <span className="font-medium">localStorage[&quot;demo-key&quot;]: </span>
                    <code className="text-primary">{storedValue}</code>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    새로고침해도 값이 유지됩니다!
                  </p>
                </div>
              </div>
            </HookSection>
          </TabsContent>

          {/* 브라우저 훅 */}
          <TabsContent value="browser" className="space-y-6">
            {/* useMediaQuery */}
            <HookSection
              title="useMediaQuery"
              description="CSS 미디어 쿼리의 매칭 상태를 반환합니다."
              badge="usehooks-ts"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <div className={`flex items-center gap-3 rounded-lg border p-4 ${isMobile ? "border-primary bg-primary/10" : ""}`}>
                  <Smartphone className={`h-5 w-5 ${isMobile ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium">모바일</p>
                    <p className="text-xs text-muted-foreground">&lt;= 768px</p>
                  </div>
                  {isMobile && <Check className="ml-auto h-4 w-4 text-primary" />}
                </div>
                <div className={`flex items-center gap-3 rounded-lg border p-4 ${isTablet ? "border-primary bg-primary/10" : ""}`}>
                  <Tablet className={`h-5 w-5 ${isTablet ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium">태블릿</p>
                    <p className="text-xs text-muted-foreground">769px - 1024px</p>
                  </div>
                  {isTablet && <Check className="ml-auto h-4 w-4 text-primary" />}
                </div>
                <div className={`flex items-center gap-3 rounded-lg border p-4 ${isDesktop ? "border-primary bg-primary/10" : ""}`}>
                  <Monitor className={`h-5 w-5 ${isDesktop ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium">데스크탑</p>
                    <p className="text-xs text-muted-foreground">&gt;= 1025px</p>
                  </div>
                  {isDesktop && <Check className="ml-auto h-4 w-4 text-primary" />}
                </div>
              </div>
            </HookSection>

            {/* useWindowSize */}
            <HookSection
              title="useWindowSize"
              description="브라우저 창의 현재 크기를 반환합니다."
              badge="usehooks-ts"
            >
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{width}</p>
                  <p className="text-sm text-muted-foreground">너비 (px)</p>
                </div>
                <div className="text-4xl text-muted-foreground">×</div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{height}</p>
                  <p className="text-sm text-muted-foreground">높이 (px)</p>
                </div>
              </div>
            </HookSection>

            {/* useHover */}
            <HookSection
              title="useHover"
              description="요소의 호버 상태를 감지합니다."
              badge="usehooks-ts"
            >
              <div
                ref={hoverRef}
                className={`flex h-32 items-center justify-center rounded-lg border-2 border-dashed transition-all ${
                  isHovered
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground/30"
                }`}
              >
                <p className="text-lg font-medium">
                  {isHovered ? "호버됨!" : "여기에 마우스를 올려보세요"}
                </p>
              </div>
            </HookSection>
          </TabsContent>

          {/* 유틸리티 훅 */}
          <TabsContent value="utility" className="space-y-6">
            {/* useCopyToClipboard */}
            <HookSection
              title="useCopyToClipboard"
              description="텍스트를 클립보드에 복사합니다."
              badge="usehooks-ts"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input value={textToCopy} readOnly className="flex-1" />
                  <Button
                    onClick={() => {
                      copy(textToCopy);
                      toast.success("클립보드에 복사되었습니다!");
                    }}
                    variant="outline"
                  >
                    {copiedText === textToCopy ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {copiedText && (
                  <p className="text-sm text-muted-foreground">
                    마지막 복사: <code className="text-primary">{copiedText}</code>
                  </p>
                )}
              </div>
            </HookSection>

            {/* useDebounceValue */}
            <HookSection
              title="useDebounceValue"
              description="값의 변경을 지연시켜 성능을 최적화합니다."
              badge="usehooks-ts"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>입력값 (500ms 디바운스)</Label>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="빠르게 입력해보세요..."
                  />
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">실시간 값</p>
                      <p className="font-mono">{inputValue || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">디바운스된 값</p>
                      <p className="font-mono text-primary">{debouncedValue || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </HookSection>

            {/* useInterval */}
            <HookSection
              title="useInterval"
              description="setInterval을 React 훅으로 안전하게 사용합니다."
              badge="usehooks-ts"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="text-6xl font-bold tabular-nums">{timer}초</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    variant={isTimerRunning ? "destructive" : "default"}
                  >
                    {isTimerRunning ? "정지" : "시작"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimer(0);
                    }}
                    variant="outline"
                  >
                    초기화
                  </Button>
                </div>
              </div>
            </HookSection>

            {/* useIsClient */}
            <HookSection
              title="useIsClient"
              description="클라이언트 사이드 렌더링 여부를 확인합니다."
              badge="usehooks-ts"
            >
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <span className="font-medium">isClient: </span>
                  <code className="text-primary">{String(isClient)}</code>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  SSR 환경에서 window/document 접근 전에 체크할 때 유용합니다.
                </p>
              </div>
            </HookSection>
          </TabsContent>

          {/* date-fns 탭 */}
          <TabsContent value="date" className="space-y-6">
            {/* 기본 포맷팅 */}
            <HookSection
              title="format"
              description="날짜를 다양한 형식으로 포맷팅합니다."
              badge="date-fns"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-bold">{format(selectedDate, "yyyy년 MM월 dd일 EEEE", { locale: ko })}</span>
                </div>
                <Separator />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">yyyy-MM-dd</p>
                    <p className="font-mono">{format(selectedDate, "yyyy-MM-dd")}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">yyyy/MM/dd HH:mm</p>
                    <p className="font-mono">{format(selectedDate, "yyyy/MM/dd HH:mm")}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">MMM d, yyyy</p>
                    <p className="font-mono">{format(selectedDate, "MMM d, yyyy", { locale: ko })}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">EEEE (요일)</p>
                    <p className="font-mono">{format(selectedDate, "EEEE", { locale: ko })}</p>
                  </div>
                </div>
              </div>
            </HookSection>

            {/* 상대적 시간 */}
            <HookSection
              title="formatDistance & formatRelative"
              description="상대적인 시간 표현을 생성합니다."
              badge="date-fns"
            >
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <p className="mb-2 text-sm font-medium">formatDistance</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">5분 전</span>
                        <span>{formatDistance(subDays(selectedDate, 0), selectedDate, { locale: ko, addSuffix: true })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">1일 전</span>
                        <span>{formatDistance(subDays(selectedDate, 1), selectedDate, { locale: ko, addSuffix: true })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">1주 전</span>
                        <span>{formatDistance(subDays(selectedDate, 7), selectedDate, { locale: ko, addSuffix: true })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">1개월 전</span>
                        <span>{formatDistance(subDays(selectedDate, 30), selectedDate, { locale: ko, addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="mb-2 text-sm font-medium">formatRelative</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">오늘</span>
                        <span>{formatRelative(selectedDate, selectedDate, { locale: ko })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">어제</span>
                        <span>{formatRelative(subDays(selectedDate, 1), selectedDate, { locale: ko })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">다음 주</span>
                        <span>{formatRelative(addDays(selectedDate, 7), selectedDate, { locale: ko })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </HookSection>

            {/* 날짜 계산 */}
            <HookSection
              title="날짜 계산"
              description="날짜 간의 차이 계산 및 조작 함수들입니다."
              badge="date-fns"
            >
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <p className="mb-3 text-sm font-medium">날짜 더하기/빼기</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">오늘</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="font-mono">{format(selectedDate, "yyyy-MM-dd")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">+7일</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="font-mono">{format(addDays(selectedDate, 7), "yyyy-MM-dd")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">-30일</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="font-mono">{format(subDays(selectedDate, 30), "yyyy-MM-dd")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="mb-3 text-sm font-medium">날짜 차이</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">오늘 ~ 연말</span>
                        <span className="font-mono">
                          {differenceInDays(new Date(selectedDate.getFullYear(), 11, 31), selectedDate)}일
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">이번 주 시작</span>
                        <span className="font-mono">
                          {format(startOfWeek(selectedDate, { locale: ko }), "MM/dd")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">이번 주 끝</span>
                        <span className="font-mono">
                          {format(endOfWeek(selectedDate, { locale: ko }), "MM/dd")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </HookSection>

            {/* 날짜 비교 */}
            <HookSection
              title="날짜 비교"
              description="두 날짜를 비교하는 함수들입니다."
              badge="date-fns"
            >
              <div className="rounded-lg border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">isAfter / isBefore</p>
                    <div className="space-y-1">
                      <p>
                        내일 &gt; 오늘:{" "}
                        <code className="text-primary">
                          {String(isAfter(addDays(selectedDate, 1), selectedDate))}
                        </code>
                      </p>
                      <p>
                        어제 &lt; 오늘:{" "}
                        <code className="text-primary">
                          {String(isBefore(subDays(selectedDate, 1), selectedDate))}
                        </code>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">parseISO</p>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">ISO 문자열 파싱:</p>
                      <p>
                        <code>{format(parseISO("2024-12-25"), "yyyy년 MM월 dd일", { locale: ko })}</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </HookSection>
          </TabsContent>
        </Tabs>

        {/* 라이브러리 정보 */}
        <ScrollReveal className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>사용된 라이브러리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Badge>usehooks-ts</Badge>
                    <span className="text-xs text-muted-foreground">100만+ 주간 다운로드</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    TypeScript로 작성된 검증된 React 훅 모음입니다.
                    Snyk에서 Key ecosystem project로 분류되어 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Badge>date-fns</Badge>
                    <span className="text-xs text-muted-foreground">2000만+ 주간 다운로드</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    함수형 날짜 처리 라이브러리입니다.
                    트리셰이킹이 우수하여 번들 크기를 최소화합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
    </div>
  );
}
