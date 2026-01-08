import { z } from "zod";

// Contact 폼 유효성 검증 스키마
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
    .max(50, { message: "이름은 최대 50자까지 입력 가능합니다." }),
  email: z
    .string()
    .email({ message: "올바른 이메일 주소를 입력해주세요." }),
  message: z
    .string()
    .min(10, { message: "메시지는 최소 10자 이상이어야 합니다." })
    .max(1000, { message: "메시지는 최대 1000자까지 입력 가능합니다." }),
});

// 스키마에서 타입 추론
export type ContactFormValues = z.infer<typeof contactSchema>;
