# API Service 사용 가이드

이 서비스는 Next.js의 fetch 함수와 axios를 연결하여 Next.js의 캐싱 기능을 활용할 수 있도록 설정되었습니다.

## 📁 파일 구조

```
src/service/
├── index.ts          # 메인 export 파일
├── apiClient.ts      # Axios 클라이언트 설정
├── fetchAdapter.ts   # Next.js fetch 어댑터
├── types.ts          # 타입 정의
└── README.md         # 사용 가이드
```

## 🚀 사용 방법

### 1. 기본 사용법

```typescript
import { api } from "@/service";

// GET 요청
const response = await api.get("/users");

// POST 요청
const newUser = await api.post("/users", {
  name: "홍길동",
  email: "hong@example.com",
});
```

### 2. Next.js 캐싱 옵션 사용

```typescript
import { apiClient } from "@/service";

// 10초마다 재검증
const response = await apiClient.get("/users", {
  revalidate: 10,
});

// 특정 태그로 캐시 관리
const response = await apiClient.get("/posts", {
  tags: ["posts"],
  revalidate: false,
});

// 캐시 없이 항상 최신 데이터
const response = await apiClient.get("/live-data", {
  cache: "no-store",
});
```

### 3. 서버 사이드에서 사용

```typescript
import { serverApi } from '@/service';

// 서버 컴포넌트에서 사용 (캐싱 미지원)
export default async function ServerComponent() {
  const users = await serverApi.get('/users');

  return (
    <div>
      {users.data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## ⚙️ 환경 변수 설정

`.env.local` 파일에 API 기본 URL을 설정하세요:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

## 🔧 커스터마이징

### 인증 토큰 설정

`apiClient.ts`의 `getAuthToken()` 함수를 수정하여 토큰 저장 방식을 변경할 수 있습니다:

```typescript
function getAuthToken(): string | null {
  // 쿠키에서 토큰 가져오기
  if (typeof document !== "undefined") {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1] || null
    );
  }
  return null;
}
```

### 에러 처리 커스터마이징

`handleAuthError()` 함수를 수정하여 인증 실패 시 동작을 변경할 수 있습니다.

## 📝 타입 안전성

모든 API 호출에 대해 타입을 지정할 수 있습니다:

```typescript
import { api, type User, type ApiResponse } from "@/service";

const response = await api.get<ApiResponse<User[]>>("/users");
// response.data는 ApiResponse<User[]> 타입
```

## 🔍 디버깅

개발 환경에서는 모든 API 요청과 응답이 콘솔에 로그됩니다:

- 🚀 요청 로그
- ✅ 성공 응답 로그
- ❌ 에러 로그
