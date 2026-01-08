// 네비게이션 아이템 타입
export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

// 사이트 설정 타입
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: string;
  keywords: string[];
}

// 소셜 링크 타입
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// 기능 카드 타입
export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

// Contact 폼 데이터 타입 (Zod 스키마에서 추론)
// 실제 타입은 @/lib/validations/contact.ts의 ContactFormValues를 사용
export type { ContactFormValues as ContactFormData } from "@/lib/validations/contact";
