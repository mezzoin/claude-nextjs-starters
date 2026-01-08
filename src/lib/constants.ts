import type { NavItem, SiteConfig, FeatureItem } from "@/types";

// 사이트 설정
export const siteConfig: SiteConfig = {
  name: "모던 스타터킷",
  description: "Next.js 16 + React 19 기반의 모던 웹 스타터킷. 빠르게 웹 개발을 시작하세요.",
  url: "https://example.com",
  author: "개발자",
  keywords: ["Next.js", "React", "TypeScript", "TailwindCSS", "ShadcnUI"],
};

// 네비게이션 메뉴
export const navItems: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "소개", href: "/about" },
  { label: "예제", href: "/examples" },
  { label: "연락처", href: "/contact" },
];

// 예제 페이지 네비게이션
export const exampleNavItems: NavItem[] = [
  { label: "컴포넌트", href: "/examples/components" },
  { label: "폼", href: "/examples/forms" },
  { label: "레이아웃", href: "/examples/layouts" },
  { label: "훅", href: "/examples/hooks" },
  { label: "데이터 페칭", href: "/examples/data-fetching" },
  { label: "설정", href: "/examples/settings" },
];

// 기능 소개 항목
export const features: FeatureItem[] = [
  {
    title: "최신 기술 스택",
    description: "Next.js 16, React 19, TypeScript로 구축된 현대적인 개발 환경을 제공합니다.",
    icon: "Rocket",
  },
  {
    title: "아름다운 UI",
    description: "TailwindCSS와 ShadcnUI로 구현된 세련되고 반응형인 사용자 인터페이스.",
    icon: "Palette",
  },
  {
    title: "부드러운 애니메이션",
    description: "Framer Motion으로 구현된 고품질 애니메이션과 인터랙션을 경험하세요.",
    icon: "Sparkles",
  },
];

// 푸터 링크
export const footerLinks: NavItem[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "문서", href: "/docs" },
  { label: "개인정보처리방침", href: "/privacy" },
];
