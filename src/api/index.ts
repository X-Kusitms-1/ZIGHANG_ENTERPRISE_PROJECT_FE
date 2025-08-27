/**
 * API 모듈 메인 export 파일
 */

// 스웨거 설정
export {
  SWAGGER_CONFIG,
  getSwaggerUrl,
  validateSwaggerSpec,
} from "./swagger-config";

// 자동 생성된 API 클라이언트들
export * from "./generated";

// 🚀 자동 생성된 API 함수들 (간편한 사용을 위한 독립 함수들)
export * from "./api-functions";

// Axios 클라이언트
export { api, serverApi, apiClient, serverApiClient } from "./axios";

// 서버 액션 (Next.js App Router)
export {
  createUserAction,
  updateUserAction,
  deleteUserAction,
} from "./server-actions";

/**
 * 사용 방법:
 *
 * 1. 스웨거에서 API 클라이언트 생성:
 *    npm run generate-api
 *
 * 2-1. 🚀 간편한 함수 호출 (추천!):
 *    import { getPetsByStatus, getInventory, createUser } from '@/api';
 *
 *    // 기본 사용
 *    const pets = await getPetsByStatus({ status: 'available' });
 *    const inventory = await getInventory();
 *
 *    // 토큰과 함께 사용
 *    const pets = await getPetsByStatus(
 *      { status: 'available' },
 *      { token: 'your-jwt-token' }
 *    );
 *
 *    // 캐시 설정과 함께
 *    const pets = await getPetsByStatus(
 *      { status: 'available' },
 *      {
 *        token: 'your-jwt-token',
 *        revalidate: 3600,
 *        tags: ['pets']
 *      }
 *    );
 *
 * 2-2. 자동 생성된 API 클래스 사용:
 *    import { PetApi } from '@/api/generated';
 *    const petApi = new PetApi();
 *    const pets = await petApi.findPetsByStatus('available');
 *
 * 2-3. 직접 API 호출:
 *    import { api, apiClient } from '@/api';
 *    const users = await api.get('/users');
 */
