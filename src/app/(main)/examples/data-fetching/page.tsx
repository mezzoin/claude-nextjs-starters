"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, RefreshCw, AlertCircle, CheckCircle2, Server, Monitor, Clock } from "lucide-react";

// UI 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 공유 컴포넌트
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

// 타입 정의
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// 로딩 스켈레톤 컴포넌트
function PostSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

function UserSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

// 기본 데이터 페칭 예제
function BasicFetchExample() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 인위적인 지연 추가 (로딩 상태 확인용)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

      if (!response.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">JSONPlaceholder API에서 게시글을 가져옵니다.</p>
        <Button onClick={fetchPosts} disabled={isLoading} size="sm">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "로딩 중..." : "데이터 가져오기"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <StaggerChildren className="space-y-3" staggerDelay={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <h4 className="mb-1 font-medium line-clamp-1">{post.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">버튼을 클릭하여 데이터를 가져오세요.</p>
        </div>
      )}
    </div>
  );
}

// 자동 페칭 예제 (useEffect)
function AutoFetchExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=4");

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류 발생");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">useEffect</Badge>
        <p className="text-sm text-muted-foreground">컴포넌트 마운트 시 자동으로 데이터를 가져옵니다.</p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <UserSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-4 rounded-lg border p-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 캐싱 시뮬레이션 예제
function CachingExample() {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cache, setCache] = useState<Record<number, Post>>({});
  const [fetchCount, setFetchCount] = useState(0);
  const [currentId, setCurrentId] = useState(1);

  const fetchPost = async (id: number) => {
    // 캐시 확인
    if (cache[id]) {
      setData(cache[id]);
      return;
    }

    setIsLoading(true);
    setFetchCount((c) => c + 1);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const post = await response.json();

      // 캐시에 저장
      setCache((prev) => ({ ...prev, [id]: post }));
      setData(post);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">캐싱</Badge>
        <p className="text-sm text-muted-foreground">
          한 번 가져온 데이터는 캐시에 저장됩니다.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((id) => (
          <Button
            key={id}
            variant={currentId === id ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCurrentId(id);
              fetchPost(id);
            }}
            disabled={isLoading}
          >
            {cache[id] && <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />}
            게시글 {id}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span>
          실제 API 호출: <strong className="text-primary">{fetchCount}회</strong>
        </span>
        <span>
          캐시된 항목: <strong className="text-primary">{Object.keys(cache).length}개</strong>
        </span>
      </div>

      {isLoading ? (
        <PostSkeleton />
      ) : data ? (
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">ID: {data.id}</Badge>
            {cache[data.id] && (
              <Badge variant="secondary" className="text-xs">
                캐시됨
              </Badge>
            )}
          </div>
          <h4 className="mb-2 font-medium">{data.title}</h4>
          <p className="text-sm text-muted-foreground">{data.body}</p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">버튼을 클릭하여 게시글을 선택하세요.</p>
        </div>
      )}
    </div>
  );
}

// 에러 처리 예제
function ErrorHandlingExample() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [shouldFail, setShouldFail] = useState(false);

  const simulateFetch = async () => {
    setStatus("loading");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error("네트워크 오류가 발생했습니다."));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
            className="rounded"
          />
          오류 시뮬레이션
        </label>
        <Button onClick={simulateFetch} disabled={status === "loading"} size="sm">
          {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          요청 보내기
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className={`rounded-lg border p-4 ${status === "loading" ? "border-primary bg-primary/10" : ""}`}>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${status === "loading" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={status === "loading" ? "font-medium" : "text-muted-foreground"}>로딩 중</span>
          </div>
        </div>
        <div className={`rounded-lg border p-4 ${status === "success" ? "border-green-500 bg-green-500/10" : ""}`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`h-4 w-4 ${status === "success" ? "text-green-500" : "text-muted-foreground"}`} />
            <span className={status === "success" ? "font-medium text-green-700" : "text-muted-foreground"}>성공</span>
          </div>
        </div>
        <div className={`rounded-lg border p-4 ${status === "error" ? "border-destructive bg-destructive/10" : ""}`}>
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-4 w-4 ${status === "error" ? "text-destructive" : "text-muted-foreground"}`} />
            <span className={status === "error" ? "font-medium text-destructive" : "text-muted-foreground"}>오류</span>
          </div>
        </div>
      </div>

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류 발생</AlertTitle>
          <AlertDescription>
            네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                setShouldFail(false);
                simulateFetch();
              }}
            >
              다시 시도
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {status === "success" && (
        <Alert>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>성공</AlertTitle>
          <AlertDescription>데이터를 성공적으로 가져왔습니다!</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// 메인 페이지
export default function DataFetchingPage() {
  return (
    <div className="py-12">
      <Container>
        {/* 페이지 헤더 */}
        <FadeIn className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">데이터 페칭</h1>
          <p className="text-lg text-muted-foreground">
            Next.js에서의 데이터 페칭 패턴과 상태 관리 예제입니다.
            <br />
            로딩, 에러 처리, 캐싱 등 실용적인 패턴을 확인하세요.
          </p>
        </FadeIn>

        {/* 서버/클라이언트 비교 */}
        <ScrollReveal className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Server vs Client Component</CardTitle>
              <CardDescription>Next.js에서 데이터 페칭 위치 선택 가이드</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Server Component</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• SEO가 중요한 데이터</li>
                    <li>• 초기 페이지 로드에 필요한 데이터</li>
                    <li>• 민감한 API 키/토큰 사용 시</li>
                    <li>• 대용량 데이터 처리</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Client Component</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 사용자 인터랙션에 따른 데이터</li>
                    <li>• 실시간 업데이트가 필요한 경우</li>
                    <li>• 무한 스크롤, 페이지네이션</li>
                    <li>• 사용자별 개인화 데이터</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="basic">기본 페칭</TabsTrigger>
            <TabsTrigger value="auto">자동 페칭</TabsTrigger>
            <TabsTrigger value="caching">캐싱</TabsTrigger>
            <TabsTrigger value="error">에러 처리</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>기본 데이터 페칭</CardTitle>
                  <CardDescription>
                    버튼 클릭으로 데이터를 가져오는 기본 패턴입니다.
                    로딩 상태와 에러 처리를 포함합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BasicFetchExample />
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="auto">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>자동 데이터 페칭</CardTitle>
                  <CardDescription>
                    useEffect를 사용하여 컴포넌트 마운트 시 자동으로 데이터를 가져옵니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AutoFetchExample />
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="caching">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>클라이언트 캐싱</CardTitle>
                  <CardDescription>
                    한 번 가져온 데이터를 메모리에 캐싱하여 중복 요청을 방지합니다.
                    실제 프로젝트에서는 React Query, SWR 등을 사용하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CachingExample />
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="error">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>에러 처리</CardTitle>
                  <CardDescription>
                    네트워크 오류 등 예외 상황을 처리하는 패턴입니다.
                    사용자에게 친절한 에러 메시지와 재시도 옵션을 제공합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorHandlingExample />
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>
        </Tabs>

        {/* 추천 라이브러리 */}
        <ScrollReveal className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>권장 라이브러리</CardTitle>
              <CardDescription>
                프로덕션 환경에서는 검증된 데이터 페칭 라이브러리 사용을 권장합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge>TanStack Query</Badge>
                    <span className="text-xs text-muted-foreground">(구 React Query)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    강력한 캐싱, 자동 재시도, 무한 스크롤, 옵티미스틱 업데이트 등
                    엔터프라이즈급 기능을 제공합니다.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2">
                    <Badge>SWR</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vercel에서 만든 가벼운 데이터 페칭 라이브러리입니다.
                    stale-while-revalidate 전략으로 빠른 UX를 제공합니다.
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
