# API 설정 가이드

## 환경 변수 설정

API 서버 URL을 환경별로 설정하려면 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# API 서버 URL 설정
NEXT_PUBLIC_API_BASE_URL=https://stg.ilhaeng.cloud
```

### 환경별 설정 예시

#### 개발 환경

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

#### 스테이징 환경

```bash
NEXT_PUBLIC_API_BASE_URL=https://stg.ilhaeng.cloud
```

#### 프로덕션 환경

```bash
NEXT_PUBLIC_API_BASE_URL=https://prd.ilhaeng.cloud
```

## 현재 설정

- **기본값**: `https://stg.ilhaeng.cloud` (스테이징 서버)
- **환경 변수**: `NEXT_PUBLIC_API_BASE_URL`로 오버라이드 가능

## 파일 구조

- `src/api/generated/base.ts`: OpenAPI Generator가 생성한 기본 설정
- `src/api/axios/apiClient.ts`: Axios 클라이언트 설정
- `src/api/api-functions.ts`: API 함수들 (동적으로 basePath 설정)

## 사용법

```typescript
import { kakaoLogin } from "@/api/api-functions";

// 환경 변수에 따라 자동으로 올바른 서버로 요청
const result = await kakaoLogin({ code: "auth_code" });
```
