"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";

// UI 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 공유 컴포넌트
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// ===== 폼 스키마 정의 =====

// 기본 폼 스키마
const basicFormSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다.").max(500, "메시지는 500자 이하여야 합니다."),
});

type BasicFormData = z.infer<typeof basicFormSchema>;

// 회원가입 스키마
const signupFormSchema = z.object({
  username: z
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다.")
    .max(20, "사용자명은 20자 이하여야 합니다.")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 밑줄만 사용 가능합니다."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(/[A-Z]/, "대문자를 포함해야 합니다.")
    .regex(/[a-z]/, "소문자를 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다."),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, "이용약관에 동의해주세요."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupFormSchema>;

// 설문조사 스키마
const surveyFormSchema = z.object({
  satisfaction: z.enum(["very_satisfied", "satisfied", "neutral", "dissatisfied", "very_dissatisfied"], {
    message: "만족도를 선택해주세요.",
  }),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  features: z.array(z.string()).min(1, "최소 1개 이상 선택해주세요."),
  newsletter: z.boolean(),
  feedback: z.string().optional(),
});

type SurveyFormData = z.infer<typeof surveyFormSchema>;

// ===== 폼 컴포넌트들 =====

// 기본 폼 컴포넌트
function BasicForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BasicFormData>({
    resolver: zodResolver(basicFormSchema),
  });

  const onSubmit = async (data: BasicFormData) => {
    // 제출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Basic Form Data:", data);
    toast.success("폼이 성공적으로 제출되었습니다!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름 *</Label>
        <Input
          id="name"
          placeholder="홍길동"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="basic-email">이메일 *</Label>
        <Input
          id="basic-email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="basic-message">메시지 *</Label>
        <Textarea
          id="basic-message"
          placeholder="메시지를 입력하세요..."
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "제출 중..." : "제출하기"}
      </Button>
    </form>
  );
}

// 회원가입 폼 컴포넌트
function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      terms: false,
    },
  });

  const password = watch("password", "");

  // 비밀번호 강도 체크
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const onSubmit = async (data: SignupFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Signup Form Data:", data);
    toast.success("회원가입이 완료되었습니다!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">사용자명 *</Label>
        <Input
          id="username"
          placeholder="username"
          {...register("username")}
          className={errors.username ? "border-destructive" : ""}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">이메일 *</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호 *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            {...register("password")}
            className={errors.password ? "border-destructive pr-10" : "pr-10"}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* 비밀번호 강도 표시 */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className={`flex items-center gap-1 ${passwordChecks.length ? "text-green-600" : "text-muted-foreground"}`}>
            <Check className={`h-3 w-3 ${passwordChecks.length ? "opacity-100" : "opacity-30"}`} />
            8자 이상
          </div>
          <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? "text-green-600" : "text-muted-foreground"}`}>
            <Check className={`h-3 w-3 ${passwordChecks.uppercase ? "opacity-100" : "opacity-30"}`} />
            대문자 포함
          </div>
          <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? "text-green-600" : "text-muted-foreground"}`}>
            <Check className={`h-3 w-3 ${passwordChecks.lowercase ? "opacity-100" : "opacity-30"}`} />
            소문자 포함
          </div>
          <div className={`flex items-center gap-1 ${passwordChecks.number ? "text-green-600" : "text-muted-foreground"}`}>
            <Check className={`h-3 w-3 ${passwordChecks.number ? "opacity-100" : "opacity-30"}`} />
            숫자 포함
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" {...register("terms")} />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="terms" className="text-sm font-medium leading-none cursor-pointer">
            이용약관에 동의합니다 *
          </label>
          <p className="text-xs text-muted-foreground">
            서비스 이용약관 및 개인정보처리방침에 동의합니다.
          </p>
        </div>
      </div>
      {errors.terms && (
        <p className="text-sm text-destructive">{errors.terms.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "가입 중..." : "회원가입"}
      </Button>
    </form>
  );
}

// 설문조사 폼 컴포넌트
function SurveyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues: {
      features: [],
      newsletter: false,
    },
  });

  const features = watch("features", []);

  const onSubmit = async (data: SurveyFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Survey Form Data:", data);
    toast.success("설문이 제출되었습니다!");
    reset();
  };

  const featureOptions = [
    { id: "components", label: "UI 컴포넌트" },
    { id: "animations", label: "애니메이션" },
    { id: "darkmode", label: "다크 모드" },
    { id: "forms", label: "폼 유효성 검증" },
    { id: "responsive", label: "반응형 디자인" },
  ];

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const newFeatures = checked
      ? [...features, featureId]
      : features.filter((f) => f !== featureId);
    setValue("features", newFeatures, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 만족도 */}
      <div className="space-y-3">
        <Label>서비스 만족도 *</Label>
        <RadioGroup
          onValueChange={(value) => setValue("satisfaction", value as SurveyFormData["satisfaction"], { shouldValidate: true })}
        >
          {[
            { value: "very_satisfied", label: "매우 만족" },
            { value: "satisfied", label: "만족" },
            { value: "neutral", label: "보통" },
            { value: "dissatisfied", label: "불만족" },
            { value: "very_dissatisfied", label: "매우 불만족" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.satisfaction && (
          <p className="text-sm text-destructive">{errors.satisfaction.message}</p>
        )}
      </div>

      {/* 카테고리 */}
      <div className="space-y-2">
        <Label>관심 카테고리 *</Label>
        <Select
          onValueChange={(value) => setValue("category", value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="development">개발</SelectItem>
            <SelectItem value="design">디자인</SelectItem>
            <SelectItem value="marketing">마케팅</SelectItem>
            <SelectItem value="business">비즈니스</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      {/* 기능 선택 (멀티 체크박스) */}
      <div className="space-y-3">
        <Label>유용한 기능 (복수 선택) *</Label>
        <div className="space-y-2">
          {featureOptions.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={feature.id}
                checked={features.includes(feature.id)}
                onCheckedChange={(checked) =>
                  handleFeatureChange(feature.id, checked as boolean)
                }
              />
              <label
                htmlFor={feature.id}
                className="text-sm font-normal cursor-pointer"
              >
                {feature.label}
              </label>
            </div>
          ))}
        </div>
        {errors.features && (
          <p className="text-sm text-destructive">{errors.features.message}</p>
        )}
      </div>

      {/* 뉴스레터 */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="newsletter" className="cursor-pointer">뉴스레터 구독</Label>
          <p className="text-sm text-muted-foreground">
            새로운 기능과 업데이트 소식을 받아보세요.
          </p>
        </div>
        <Switch
          id="newsletter"
          onCheckedChange={(checked) => setValue("newsletter", checked)}
        />
      </div>

      {/* 피드백 */}
      <div className="space-y-2">
        <Label htmlFor="feedback">추가 의견 (선택)</Label>
        <Textarea
          id="feedback"
          placeholder="개선사항이나 의견을 자유롭게 작성해주세요..."
          {...register("feedback")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "제출 중..." : "설문 제출"}
      </Button>
    </form>
  );
}

// 메인 페이지 컴포넌트
export default function FormsPage() {
  return (
    <div className="py-12">
      <Container>
        {/* 페이지 헤더 */}
        <FadeIn className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">폼</h1>
          <p className="text-lg text-muted-foreground">
            React Hook Form과 Zod를 활용한 폼 유효성 검증 예제입니다.
            <br />
            실시간 유효성 검사, 에러 메시지, 제출 상태 등을 확인하세요.
          </p>
        </FadeIn>

        <ScrollReveal>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="basic">기본 폼</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
              <TabsTrigger value="survey">설문조사</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>기본 연락 폼</CardTitle>
                  <CardDescription>
                    이름, 이메일, 메시지 필드가 있는 기본적인 폼 예제입니다.
                    필수 유효성 검증이 적용되어 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BasicForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>회원가입 폼</CardTitle>
                  <CardDescription>
                    비밀번호 강도 표시, 확인 검증, 약관 동의 등 고급 유효성 검증
                    예제입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="survey">
              <Card>
                <CardHeader>
                  <CardTitle>설문조사 폼</CardTitle>
                  <CardDescription>
                    라디오 그룹, 셀렉트, 체크박스, 스위치 등 다양한 입력 타입을
                    사용하는 예제입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SurveyForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollReveal>

        {/* 코드 설명 */}
        <ScrollReveal className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>사용된 기술</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">React Hook Form</h4>
                <p className="text-sm text-muted-foreground">
                  폼 상태 관리와 제출 처리를 담당합니다. useForm 훅으로 간단하게
                  폼을 구성할 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Zod</h4>
                <p className="text-sm text-muted-foreground">
                  TypeScript 친화적인 스키마 기반 유효성 검증 라이브러리입니다.
                  zodResolver로 React Hook Form과 연동합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">주요 기능</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  <li>실시간 유효성 검사</li>
                  <li>커스텀 에러 메시지</li>
                  <li>비동기 제출 처리</li>
                  <li>폼 상태 (isSubmitting, errors)</li>
                  <li>복합 유효성 검증 (refine)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
    </div>
  );
}
