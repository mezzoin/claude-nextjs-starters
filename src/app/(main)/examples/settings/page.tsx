import type { Metadata } from "next";
import {
  FileText,
  Image,
  Type,
  Layers,
  Zap,
  Shield,
  Globe,
  Paintbrush,
  Code,
  CheckCircle2,
} from "lucide-react";

// UI 컴포넌트
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// 공유 컴포넌트
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "설정 및 최적화",
  description: "Next.js 프로젝트 설정과 최적화 가이드입니다.",
};

// 코드 블록 컴포넌트
function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm">
      <code className="text-zinc-100">{code}</code>
    </pre>
  );
}

// 체크리스트 아이템
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
      <span className="text-sm">{children}</span>
    </div>
  );
}

// 설정 페이지
export default function SettingsPage() {
  return (
    <div className="py-12">
      <Container>
        {/* 페이지 헤더 */}
        <FadeIn className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">설정 및 최적화</h1>
          <p className="text-lg text-muted-foreground">
            Next.js 프로젝트의 설정과 성능 최적화 가이드입니다.
            <br />
            메타데이터, 이미지, 폰트, 번들 최적화 등을 다룹니다.
          </p>
        </FadeIn>

        <Tabs defaultValue="metadata" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="metadata">메타데이터</TabsTrigger>
            <TabsTrigger value="images">이미지</TabsTrigger>
            <TabsTrigger value="fonts">폰트</TabsTrigger>
            <TabsTrigger value="performance">성능</TabsTrigger>
            <TabsTrigger value="checklist">체크리스트</TabsTrigger>
          </TabsList>

          {/* 메타데이터 탭 */}
          <TabsContent value="metadata">
            <div className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle>메타데이터 설정</CardTitle>
                    </div>
                    <CardDescription>
                      SEO와 소셜 미디어 공유를 위한 메타데이터 설정 방법입니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 정적 메타데이터 */}
                    <div>
                      <h4 className="mb-3 font-semibold">정적 메타데이터</h4>
                      <CodeBlock
                        code={`// app/layout.tsx 또는 app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "모던 스타터킷",
    template: "%s | 모던 스타터킷",
  },
  description: "Next.js 16 + React 19 기반 스타터킷",
  keywords: ["Next.js", "React", "TypeScript"],
  authors: [{ name: "개발자" }],
  openGraph: {
    title: "모던 스타터킷",
    description: "빠르게 시작하는 웹 개발",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "모던 스타터킷",
  },
};`}
                      />
                    </div>

                    {/* 동적 메타데이터 */}
                    <div>
                      <h4 className="mb-3 font-semibold">동적 메타데이터</h4>
                      <CodeBlock
                        code={`// app/posts/[id]/page.tsx
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.thumbnail],
    },
  };
}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <CardTitle>robots.txt & sitemap.xml</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="mb-3 font-semibold">robots.ts</h4>
                      <CodeBlock
                        code={`// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}`}
                      />
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold">sitemap.ts</h4>
                      <CodeBlock
                        code={`// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://example.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </TabsContent>

          {/* 이미지 탭 */}
          <TabsContent value="images">
            <div className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Image className="h-5 w-5 text-primary" />
                      <CardTitle>Next.js Image 최적화</CardTitle>
                    </div>
                    <CardDescription>
                      자동 이미지 최적화로 성능을 향상시키세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="mb-3 font-semibold">기본 사용법</h4>
                      <CodeBlock
                        code={`import Image from "next/image";

// 정적 이미지 (자동 크기 감지)
import profilePic from "./profile.jpg";

export default function Page() {
  return (
    <>
      {/* 정적 이미지 */}
      <Image
        src={profilePic}
        alt="프로필"
        placeholder="blur" // 블러 플레이스홀더
      />

      {/* 외부 이미지 (크기 필수) */}
      <Image
        src="https://example.com/image.jpg"
        alt="외부 이미지"
        width={500}
        height={300}
        priority // LCP 이미지에 사용
      />

      {/* 반응형 이미지 */}
      <Image
        src="/hero.jpg"
        alt="히어로"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </>
  );
}`}
                      />
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold">next.config.ts 설정</h4>
                      <CodeBlock
                        code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 이미지 도메인 허용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
    // 이미지 포맷 (기본값 권장)
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;`}
                      />
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-semibold">이미지 최적화 혜택</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 자동 WebP/AVIF 변환</li>
                        <li>• 레이지 로딩 기본 적용</li>
                        <li>• 반응형 크기 자동 생성</li>
                        <li>• CLS(Cumulative Layout Shift) 방지</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </TabsContent>

          {/* 폰트 탭 */}
          <TabsContent value="fonts">
            <div className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5 text-primary" />
                      <CardTitle>폰트 최적화</CardTitle>
                    </div>
                    <CardDescription>
                      next/font를 사용하여 웹 폰트를 최적화합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="mb-3 font-semibold">Google Fonts 사용</h4>
                      <CodeBlock
                        code={`// app/layout.tsx
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";

// 한글 폰트
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

// 영문 폰트
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html className={\`\${notoSansKr.variable} \${spaceGrotesk.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`}
                      />
                    </div>

                    <div>
                      <h4 className="mb-3 font-semibold">Tailwind CSS에서 사용</h4>
                      <CodeBlock
                        code={`/* globals.css */
@theme inline {
  --font-sans: var(--font-noto-sans-kr),
               var(--font-space-grotesk),
               ui-sans-serif, system-ui, sans-serif;
}`}
                      />
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-semibold">폰트 최적화 혜택</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 빌드 타임에 폰트 다운로드 (외부 요청 제거)</li>
                        <li>• 자동 font-display: swap 적용</li>
                        <li>• 사용하는 글자만 포함 (서브셋)</li>
                        <li>• FOUT/FOIT 최소화</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </TabsContent>

          {/* 성능 탭 */}
          <TabsContent value="performance">
            <div className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <CardTitle>성능 최적화</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="code-splitting">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            코드 분할 (Code Splitting)
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            dynamic import를 사용하여 필요한 시점에 컴포넌트를 로드합니다.
                          </p>
                          <CodeBlock
                            code={`import dynamic from "next/dynamic";

// 클라이언트 사이드에서만 로드
const HeavyComponent = dynamic(
  () => import("@/components/HeavyComponent"),
  {
    loading: () => <Skeleton />,
    ssr: false // SSR 비활성화 (필요시)
  }
);

// 조건부 로드
const Modal = dynamic(() => import("@/components/Modal"));

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        모달 열기
      </button>
      {showModal && <Modal />}
    </>
  );
}`}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="server-components">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Server Components 활용
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Server Components는 JavaScript 번들에 포함되지 않습니다.
                          </p>
                          <CodeBlock
                            code={`// Server Component (기본값)
// app/posts/page.tsx
async function PostList() {
  const posts = await getPosts(); // 서버에서 실행

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Client Component (필요한 경우만)
// components/LikeButton.tsx
"use client";

export function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  // 클라이언트 상호작용이 필요한 경우만 use client
}`}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="caching">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            캐싱 전략
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <CodeBlock
                            code={`// 데이터 캐싱 (fetch)
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 3600 }, // 1시간마다 재검증
});

// 캐시 비활성화
const freshData = await fetch("https://api.example.com/data", {
  cache: "no-store",
});

// 라우트 세그먼트 설정
// app/dashboard/layout.tsx
export const revalidate = 60; // 60초마다 재검증
export const dynamic = "force-dynamic"; // 항상 동적 렌더링`}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="bundle">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Paintbrush className="h-4 w-4" />
                            번들 분석
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <CodeBlock
                            code={`# 번들 분석기 설치
npm install @next/bundle-analyzer

# next.config.ts
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);

# 분석 실행
ANALYZE=true npm run build`}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </TabsContent>

          {/* 체크리스트 탭 */}
          <TabsContent value="checklist">
            <div className="space-y-6">
              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>프로덕션 배포 체크리스트</CardTitle>
                    <CardDescription>
                      배포 전 확인해야 할 항목들입니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* SEO */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-semibold">
                          <Globe className="h-4 w-4 text-primary" />
                          SEO
                        </h4>
                        <div className="space-y-2">
                          <CheckItem>모든 페이지에 메타데이터 설정</CheckItem>
                          <CheckItem>Open Graph 이미지 설정</CheckItem>
                          <CheckItem>sitemap.xml 생성</CheckItem>
                          <CheckItem>robots.txt 설정</CheckItem>
                          <CheckItem>구조화된 데이터 (JSON-LD)</CheckItem>
                        </div>
                      </div>

                      {/* 성능 */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-semibold">
                          <Zap className="h-4 w-4 text-primary" />
                          성능
                        </h4>
                        <div className="space-y-2">
                          <CheckItem>이미지 최적화 (next/image)</CheckItem>
                          <CheckItem>폰트 최적화 (next/font)</CheckItem>
                          <CheckItem>불필요한 JavaScript 제거</CheckItem>
                          <CheckItem>LCP 이미지에 priority 속성</CheckItem>
                          <CheckItem>번들 크기 분석</CheckItem>
                        </div>
                      </div>

                      {/* 접근성 */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-semibold">
                          <Shield className="h-4 w-4 text-primary" />
                          접근성
                        </h4>
                        <div className="space-y-2">
                          <CheckItem>모든 이미지에 alt 속성</CheckItem>
                          <CheckItem>키보드 네비게이션 지원</CheckItem>
                          <CheckItem>적절한 색상 대비</CheckItem>
                          <CheckItem>ARIA 레이블 적용</CheckItem>
                          <CheckItem>스크린 리더 테스트</CheckItem>
                        </div>
                      </div>

                      {/* 보안 */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-semibold">
                          <Shield className="h-4 w-4 text-primary" />
                          보안
                        </h4>
                        <div className="space-y-2">
                          <CheckItem>환경 변수 분리 (.env)</CheckItem>
                          <CheckItem>HTTPS 적용</CheckItem>
                          <CheckItem>CSP 헤더 설정</CheckItem>
                          <CheckItem>입력값 유효성 검증</CheckItem>
                          <CheckItem>의존성 취약점 검사</CheckItem>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal>
                <Card>
                  <CardHeader>
                    <CardTitle>유용한 명령어</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`# 프로덕션 빌드
npm run build

# 빌드 결과 확인
npm run start

# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit

# 번들 분석
ANALYZE=true npm run build

# 의존성 취약점 검사
npm audit

# 의존성 업데이트 확인
npm outdated`}
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
