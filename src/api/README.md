# 🚀 API 클라이언트 & Swagger 자동화 가이드

이 모듈은 Next.js와 완벽 연동되는 Axios 클라이언트와 Swagger/OpenAPI 스펙에서 TypeScript 클라이언트를 자동으로 생성하는 시스템을 제공합니다.

## 📁 구조

```
src/api/
├── axios/                    # 🔧 Axios 클라이언트 모듈
│   ├── apiClient.ts         # 메인 axios 클라이언트
│   ├── fetchAdapter.ts      # Next.js fetch 어댑터
│   ├── types.ts             # 타입 정의
│   └── index.ts             # Export 파일
├── generated/               # 🤖 자동 생성된 API 클라이언트
│   ├── api/                # API 클래스들
│   ├── models/             # 데이터 모델들
│   └── index.ts            # Export 파일
├── swagger-config.ts        # ⚙️ 스웨거 설정
├── simple-examples.ts       # 📚 사용 예시
├── index.ts                # 📦 메인 export
└── README.md               # 📖 이 파일
```

## 🔧 설정 방법

### 1. 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```env
# API 기본 URL
NEXT_PUBLIC_API_BASE_URL=https://your-api.com

# Swagger 스펙 URL
NEXT_PUBLIC_SWAGGER_URL=https://your-api.com/swagger.json

# 환경별 설정 (옵션)
NEXT_PUBLIC_SWAGGER_URL_DEV=http://localhost:8080/swagger.json
NEXT_PUBLIC_SWAGGER_URL_STAGING=https://staging-api.com/swagger.json
NEXT_PUBLIC_SWAGGER_URL_PROD=https://api.com/swagger.json
```

### 2. API 클라이언트 생성

```bash
# 스웨거에서 API 클라이언트 자동 생성
npm run generate-api

# 또는
npm run api:generate
npm run api:update
```

## 🎯 사용 방법

### 1. Axios 클라이언트 사용법 (추천)

#### 기본 사용법

```typescript
import { api } from "@/api";

// GET 요청
const response = await api.get("/users");

// POST 요청
const newUser = await api.post("/users", {
  name: "홍길동",
  email: "hong@example.com",
});
```

#### Next.js 캐싱과 함께 사용

```typescript
import { apiClient } from "@/api";

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

#### 서버 컴포넌트에서 사용

```typescript
import { serverApi } from '@/api';

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

### 2. 자동 생성된 API 클라이언트 사용법

#### 기본 사용법

```typescript
import { PetApi } from "@/api/generated";

// API 인스턴스 생성
const petApi = new PetApi();

// API 호출
const pets = await petApi.findPetsByStatus("available");
console.log(pets.data);
```

### Next.js 캐싱과 함께 사용

```typescript
import { callApiWithCaching, createGeneratedApiInstance } from "@/api";
import { PetApi } from "@/api/generated";

const petApi = createGeneratedApiInstance(PetApi);

// 1분간 캐시, 'pets' 태그로 관리
const pets = await callApiWithCaching(
  () => petApi.findPetsByStatus(["available"]),
  {
    revalidate: 60,
    tags: ["pets"],
    cache: "force-cache",
  }
);
```

### 서버 컴포넌트에서 사용

```typescript
import { createGeneratedApiInstance } from '@/api';
import { PetApi } from '@/api/generated';

export default async function PetsPage() {
  // 서버용 클라이언트 사용 (isServer: true)
  const petApi = createGeneratedApiInstance(PetApi, true);
  const pets = await petApi.findPetsByStatus(['available']);

  return (
    <div>
      {pets.data.map(pet => (
        <div key={pet.id}>{pet.name}</div>
      ))}
    </div>
  );
}
```

### 서비스 클래스 패턴

```typescript
import { PetService } from "@/api/examples";

// 클라이언트 컴포넌트에서
const petService = new PetService();
const pets = await petService.getAllPets();

// 특정 펫 조회 (캐싱 적용)
const pet = await petService.getPetById(1);

// 펫 추가
const newPet = await petService.addPet({
  name: "Buddy",
  status: "available",
});
```

## 🔄 자동화 워크플로우

### 1. 개발 워크플로우

```bash
# 1. API 스펙 변경 감지 시 자동 재생성
npm run api:update

# 2. 생성된 코드 확인
ls src/api/generated/

# 3. 타입 체크
npm run lint
```

### 2. CI/CD 연동

```yaml
# .github/workflows/api-update.yml
name: Update API Client
on:
  schedule:
    - cron: "0 6 * * *" # 매일 오전 6시
  workflow_dispatch:

jobs:
  update-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run generate-api
      - name: Create PR if changes
        # ... PR 생성 로직
```

## 🎨 고급 사용법

### 1. 인증 토큰 설정

```typescript
// 로컬스토리지에 토큰 저장 (자동으로 모든 요청에 추가됨)
localStorage.setItem("authToken", "your-jwt-token");

// 이후 모든 API 호출에 자동으로 Authorization 헤더 추가
const users = await api.get("/users");
// → Authorization: Bearer your-jwt-token 헤더 자동 추가
```

### 2. 인터셉터 커스터마이징

인증 토큰 저장 방식을 변경하려면 `src/api/axios/apiClient.ts`의 `getAuthToken()` 함수를 수정하세요:

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

### 3. 파일 업로드

```typescript
import { api } from "@/api";

// 파일 업로드
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", "업로드된 파일");

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
```

### 4. React Hook 패턴

```typescript
import { useState, useEffect } from "react";
import { apiClient } from "@/api";

export function useApiData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<T>(url, {
          revalidate: 60,
          tags: [url],
        });

        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "데이터를 가져오는데 실패했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

### 5. 에러 처리

```typescript
import { AxiosError } from "axios";

try {
  const users = await api.get("/users");
} catch (error) {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 404:
        console.log("리소스를 찾을 수 없습니다");
        break;
      case 401:
        console.log("인증이 필요합니다");
        // 자동으로 로그인 페이지로 리다이렉트 (apiClient에서 처리됨)
        break;
      case 403:
        console.log("권한이 없습니다");
        break;
      case 500:
        console.log("서버 오류가 발생했습니다");
        break;
      default:
        console.log("알 수 없는 오류:", error.message);
    }
  }
}
```

### 6. 타입 안전성

```typescript
import type { User, ApiResponse } from "@/api/axios";

// 타입 안전한 API 호출
const getUsers = async (): Promise<User[]> => {
  const response = await api.get<ApiResponse<User[]>>("/users");
  return response.data.data;
};

// 자동 완성과 타입 체크 지원
const createUser = async (
  userData: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  return api.post<ApiResponse<User>>("/users", userData);
};
```

## ⚡ Axios 클라이언트 특별 기능

### Next.js 캐싱 어댑터

이 프로젝트의 Axios 클라이언트는 Next.js의 `fetch` 함수를 사용하여 강력한 캐싱 기능을 제공합니다:

- **자동 캐싱**: 서버 컴포넌트에서 API 호출 시 자동으로 캐싱됨
- **재검증 제어**: `revalidate` 옵션으로 캐시 만료 시간 설정
- **태그 기반 무효화**: `tags` 옵션으로 선택적 캐시 무효화 가능
- **캐시 전략**: `cache` 옵션으로 다양한 캐싱 전략 지원

### 자동 기능들

1. **인증 토큰 자동 추가**: 로컬스토리지의 토큰을 모든 요청에 자동 추가
2. **에러 자동 처리**: 401 에러 시 자동 로그아웃 및 리다이렉트
3. **요청/응답 로깅**: 개발 환경에서 자동 로깅
4. **FormData 자동 처리**: 파일 업로드 시 Content-Type 자동 설정

## 🚨 주의사항

### Axios 클라이언트

1. **인증 토큰**: 로컬스토리지에 `authToken` 키로 토큰을 저장하세요.
2. **서버/클라이언트 구분**: 서버 컴포넌트에서는 `serverApi`, 클라이언트에서는 `api` 사용
3. **캐싱 옵션**: 서버 컴포넌트에서만 캐싱 옵션이 동작합니다.

### Swagger 자동화

1. **자동 생성된 파일 수정 금지**: `src/api/generated/` 폴더의 파일들은 직접 수정하지 마세요.
2. **버전 관리**: 생성된 파일들을 git에 커밋하되, `.gitignore`에서 제외하지 마세요.
3. **API 스펙 변경**: API 스펙이 변경되면 반드시 `npm run generate-api`를 실행하세요.

## 🔧 트러블슈팅

### 생성 실패 시

```bash
# 캐시 정리 후 재시도
rm -rf src/api/generated
npm run generate-api
```

### 타입 오류 시

```bash
# TypeScript 캐시 정리
rm -rf .next
npm run lint
```

### 네트워크 오류 시

```bash
# 로컬 swagger.json 파일 사용
curl -o swagger.json https://your-api.com/swagger.json
# 그 후 스크립트에서 로컬 파일 경로 사용
```

## 📚 참고 자료

- [OpenAPI Generator](https://openapi-generator.tech/)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
