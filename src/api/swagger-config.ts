/**
 * 스웨거 API 자동화 설정
 */

export const SWAGGER_CONFIG = {
  // 스웨거 스펙 URL (실제 API URL로 변경 필요)
  SWAGGER_URL:
    process.env.NEXT_PUBLIC_SWAGGER_URL ||
    "https://stg.ilhaeng.cloud/v3/api-docs",

  // 로컬 스웨거 파일 경로 (옵션)
  LOCAL_SWAGGER_PATH: "./swagger.json",

  // 생성될 파일들의 출력 경로
  OUTPUT_PATH: "./src/api/generated",

  // OpenAPI Generator 설정
  GENERATOR_CONFIG: {
    generatorName: "typescript-axios",
    inputSpec:
      process.env.NEXT_PUBLIC_SWAGGER_URL ||
      "https://stg.ilhaeng.cloud/v3/api-docs",
    outputDir: "./src/api/generated",
    configFile: "./openapi-generator-config.json",
    additionalProperties: {
      npmName: "@zighang/api-client",
      npmVersion: "1.0.0",
      supportsES6: "true",
      withInterfaces: "true",
      useSingleRequestParameter: "false",
    },
  },
} as const;

/**
 * 환경별 스웨거 URL 설정
 */
export const getSwaggerUrl = (): string => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case "development":
      return (
        process.env.NEXT_PUBLIC_SWAGGER_URL_DEV ||
        "http://localhost:8080/swagger.json"
      );
    // staging 환경은 커스텀 환경 변수로 처리
    case "production":
      return (
        process.env.NEXT_PUBLIC_SWAGGER_URL_PROD ||
        "https://api.example.com/swagger.json"
      );
    default:
      return "https://api.example.com/swagger.json";
  }
};

/**
 * 스웨거 스펙 다운로드 및 검증
 */
export const validateSwaggerSpec = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`스웨거 스펙을 가져올 수 없습니다: ${response.status}`);
      return false;
    }

    const spec = await response.json();

    // 기본 OpenAPI 구조 검증
    if (!spec.openapi && !spec.swagger) {
      console.error("유효하지 않은 OpenAPI/Swagger 스펙입니다.");
      return false;
    }

    console.log(
      `✅ 스웨거 스펙 검증 완료: ${spec.info?.title || "Unknown API"} v${spec.info?.version || "1.0.0"}`
    );
    return true;
  } catch (error) {
    console.error("스웨거 스펙 검증 실패:", error);
    return false;
  }
};
