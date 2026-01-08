"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

// Contact 페이지
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: ContactFormValues) => {
    try {
      // 실제 API 호출은 여기에 구현
      console.log("폼 데이터:", data);

      // 성공 시뮬레이션 (1초 대기)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("메시지가 전송되었습니다!", {
        description: "빠른 시일 내에 답변 드리겠습니다.",
      });

      reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("전송에 실패했습니다.", {
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <>
      {/* Hero 섹션 */}
      <section className="py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              <span className="text-primary">연락</span>하기
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              궁금한 점이 있으시거나 협업을 원하신다면 아래 양식을 통해 연락해
              주세요. 빠른 시일 내에 답변 드리겠습니다.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* 폼 섹션 */}
      <section className="pb-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    메시지 보내기
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* 이름 필드 */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        이름
                      </Label>
                      <Input
                        id="name"
                        placeholder="홍길동"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* 이메일 필드 */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        이메일
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* 메시지 필드 */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        메시지
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="문의 내용을 입력해주세요..."
                        rows={5}
                        {...register("message")}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </div>

                    {/* 제출 버튼 */}
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                        />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {isSubmitting ? "전송 중..." : "메시지 보내기"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
