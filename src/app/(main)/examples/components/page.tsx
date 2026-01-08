"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Plus,
  Check,
  ChevronDown,
  Info,
  AlertTriangle,
  Terminal,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

// UI 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

// 공유 컴포넌트
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

// 섹션 래퍼 컴포넌트
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-xl border bg-card p-6">{children}</div>
    </ScrollReveal>
  );
}

// 컴포넌트 쇼케이스 페이지
export default function ComponentsPage() {
  const [progress, setProgress] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isLoading, setIsLoading] = useState(false);

  // 로딩 버튼 핸들러
  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <TooltipProvider>
      <div className="py-12">
        <Container>
          {/* 페이지 헤더 */}
          <FadeIn className="mb-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">컴포넌트</h1>
            <p className="text-lg text-muted-foreground">
              ShadcnUI 기반의 모든 UI 컴포넌트를 확인하세요. 각 컴포넌트는 다양한
              변형과 상태를 지원합니다.
            </p>
          </FadeIn>

          <div className="space-y-16">
            {/* 버튼 섹션 */}
            <Section
              title="Button"
              description="다양한 변형, 크기, 상태를 지원하는 버튼 컴포넌트입니다."
            >
              <div className="space-y-6">
                {/* 변형 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Variants</p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* 크기 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sizes</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 상태 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">States</p>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button onClick={handleLoadingClick} disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isLoading ? "Loading..." : "Click me"}
                    </Button>
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      With Icon
                    </Button>
                  </div>
                </div>
              </div>
            </Section>

            {/* 카드 섹션 */}
            <Section
              title="Card"
              description="콘텐츠를 그룹화하는 카드 컴포넌트입니다."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>카드 제목</CardTitle>
                    <CardDescription>카드에 대한 설명입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>카드 콘텐츠가 여기에 들어갑니다.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">확인</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">사용자 이름</CardTitle>
                        <CardDescription>@username</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      프로필 카드 예제입니다. Avatar와 함께 사용하면 좋습니다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* 입력 필드 섹션 */}
            <Section
              title="Input & Textarea"
              description="사용자 입력을 받는 컴포넌트입니다."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input id="password" type="password" placeholder="비밀번호" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled">비활성화</Label>
                    <Input id="disabled" disabled placeholder="비활성화됨" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">메시지</Label>
                  <Textarea
                    id="message"
                    placeholder="메시지를 입력하세요..."
                    className="min-h-[160px]"
                  />
                </div>
              </div>
            </Section>

            {/* 선택 컴포넌트 섹션 */}
            <Section
              title="Select, Checkbox, Radio, Switch"
              description="다양한 선택 컴포넌트입니다."
            >
              <div className="grid gap-8 md:grid-cols-2">
                {/* Select */}
                <div className="space-y-2">
                  <Label>Select</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="옵션 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">옵션 1</SelectItem>
                      <SelectItem value="option2">옵션 2</SelectItem>
                      <SelectItem value="option3">옵션 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Checkbox */}
                <div className="space-y-4">
                  <Label>Checkbox</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        이용약관에 동의합니다
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" />
                      <label htmlFor="marketing" className="text-sm">
                        마케팅 정보 수신 동의
                      </label>
                    </div>
                  </div>
                </div>

                {/* Radio Group */}
                <div className="space-y-4">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="r1" />
                      <Label htmlFor="r1">옵션 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="r2" />
                      <Label htmlFor="r2">옵션 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option3" id="r3" />
                      <Label htmlFor="r3">옵션 3</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Switch */}
                <div className="space-y-4">
                  <Label>Switch</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="text-sm font-medium">알림 받기</p>
                        <p className="text-sm text-muted-foreground">
                          새 소식을 이메일로 받습니다.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* 다이얼로그 섹션 */}
            <Section
              title="Dialog & Alert Dialog"
              description="모달 다이얼로그 컴포넌트입니다."
            >
              <div className="flex flex-wrap gap-4">
                {/* Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Dialog 열기</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog 제목</DialogTitle>
                      <DialogDescription>
                        Dialog에 대한 설명입니다. 사용자에게 정보를 제공하거나
                        입력을 받을 수 있습니다.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input placeholder="무언가를 입력하세요..." />
                    </div>
                    <DialogFooter>
                      <Button type="submit">확인</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">삭제하기</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                      <AlertDialogDescription>
                        이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로
                        삭제됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => toast.success("삭제되었습니다.")}
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Section>

            {/* 드롭다운 메뉴 섹션 */}
            <Section
              title="Dropdown Menu"
              description="드롭다운 메뉴 컴포넌트입니다."
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    메뉴 열기 <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    프로필
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    설정
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    알림
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Section>

            {/* 탭 섹션 */}
            <Section
              title="Tabs"
              description="탭 인터페이스 컴포넌트입니다."
            >
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">계정</TabsTrigger>
                  <TabsTrigger value="password">비밀번호</TabsTrigger>
                  <TabsTrigger value="settings">설정</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" defaultValue="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tab-email">이메일</Label>
                    <Input id="tab-email" defaultValue="hong@example.com" />
                  </div>
                </TabsContent>
                <TabsContent value="password" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">현재 비밀번호</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">새 비밀번호</Label>
                    <Input id="new" type="password" />
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">다크 모드</p>
                      <p className="text-sm text-muted-foreground">
                        어두운 테마를 사용합니다.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </TabsContent>
              </Tabs>
            </Section>

            {/* 아코디언 섹션 */}
            <Section
              title="Accordion"
              description="접이식 콘텐츠 컴포넌트입니다."
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>이 스타터킷의 특징은 무엇인가요?</AccordionTrigger>
                  <AccordionContent>
                    Next.js 16, React 19, TypeScript, TailwindCSS, ShadcnUI 등
                    최신 기술 스택으로 구성되어 있으며, 바로 사용할 수 있는
                    컴포넌트와 유틸리티를 제공합니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>다크 모드를 지원하나요?</AccordionTrigger>
                  <AccordionContent>
                    네, next-themes를 사용하여 다크 모드를 기본 지원합니다. 헤더의
                    테마 토글 버튼으로 전환할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>애니메이션은 어떻게 구현되나요?</AccordionTrigger>
                  <AccordionContent>
                    Framer Motion을 사용하여 페이드인, 슬라이드인, 스크롤 트리거
                    등 다양한 애니메이션을 제공합니다. 모션 컴포넌트로 쉽게
                    적용할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Section>

            {/* 배지 & 알림 섹션 */}
            <Section
              title="Badge & Alert"
              description="배지와 알림 컴포넌트입니다."
            >
              <div className="space-y-6">
                {/* Badge */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Badge</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Alert */}
                <div className="space-y-4">
                  <p className="text-sm font-medium">Alert</p>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>알림</AlertTitle>
                    <AlertDescription>
                      기본 알림 메시지입니다. 중요한 정보를 전달할 때 사용합니다.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>오류</AlertTitle>
                    <AlertDescription>
                      오류가 발생했습니다. 다시 시도해 주세요.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Section>

            {/* 진행 상태 섹션 */}
            <Section
              title="Progress & Slider"
              description="진행 상태와 슬라이더 컴포넌트입니다."
            >
              <div className="space-y-8">
                {/* Progress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Progress: {progress}%</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        -10
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                      >
                        +10
                      </Button>
                    </div>
                  </div>
                  <Progress value={progress} />
                </div>

                {/* Slider */}
                <div className="space-y-4">
                  <p className="text-sm font-medium">Slider: {sliderValue[0]}</p>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </Section>

            {/* 스켈레톤 섹션 */}
            <Section
              title="Skeleton"
              description="로딩 상태를 나타내는 스켈레톤 컴포넌트입니다."
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </Section>

            {/* 툴팁 섹션 */}
            <Section
              title="Tooltip"
              description="마우스 호버 시 정보를 표시하는 툴팁 컴포넌트입니다."
            >
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">마우스를 올려보세요</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>툴팁 내용입니다</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>추가 정보를 제공합니다</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </Section>

            {/* Toast 섹션 */}
            <Section
              title="Toast (Sonner)"
              description="알림 메시지를 표시하는 Toast 컴포넌트입니다."
            >
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => toast("기본 Toast 메시지")}>
                  기본 Toast
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => toast.success("성공적으로 저장되었습니다!")}
                >
                  성공 Toast
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => toast.error("오류가 발생했습니다.")}
                >
                  오류 Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("제목이 있는 Toast", {
                      description: "추가 설명 텍스트입니다.",
                    })
                  }
                >
                  설명 포함 Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("액션이 있는 Toast", {
                      action: {
                        label: "실행 취소",
                        onClick: () => console.log("실행 취소됨"),
                      },
                    })
                  }
                >
                  액션 Toast
                </Button>
              </div>
            </Section>

            {/* 애니메이션 컴포넌트 섹션 */}
            <Section
              title="Animation Components"
              description="Framer Motion 기반 애니메이션 컴포넌트입니다."
            >
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  이 페이지의 모든 섹션은 ScrollReveal 컴포넌트로 감싸져 있어
                  스크롤 시 자연스럽게 나타납니다. FadeIn, SlideIn,
                  StaggerChildren 등 다양한 애니메이션 컴포넌트를 제공합니다.
                </p>

                <StaggerChildren className="flex flex-wrap gap-3" staggerDelay={0.1}>
                  {["FadeIn", "SlideIn", "StaggerChildren", "ScrollReveal"].map(
                    (name) => (
                      <StaggerItem key={name}>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                          {name}
                        </Badge>
                      </StaggerItem>
                    )
                  )}
                </StaggerChildren>
              </div>
            </Section>
          </div>
        </Container>
      </div>
    </TooltipProvider>
  );
}
