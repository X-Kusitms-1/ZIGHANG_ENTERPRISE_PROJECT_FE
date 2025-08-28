#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

/**
 * 스웨거 API 클라이언트 자동 생성 스크립트
 */
class ApiGenerator {
  constructor() {
    this.swaggerUrl =
      process.env.NEXT_PUBLIC_SWAGGER_URL ||
      "https://stg.ilhaeng.cloud/v3/api-docs";
    this.outputDir = path.join(projectRoot, "src/api/generated");
    this.configFile = path.join(projectRoot, "openapi-generator-config.json");
    this.tempSwaggerFile = path.join(projectRoot, "temp-swagger.json");
  }

  /**
   * 스웨거 스펙 다운로드
   */
  async downloadSwaggerSpec() {
    console.log(`📥 스웨거 스펙 다운로드 중: ${this.swaggerUrl}`);

    try {
      const response = await fetch(this.swaggerUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const spec = await response.json();
      fs.writeFileSync(this.tempSwaggerFile, JSON.stringify(spec, null, 2));

      console.log(
        `✅ 스웨거 스펙 다운로드 완료: ${spec.info?.title || "Unknown"} v${spec.info?.version || "1.0.0"}`
      );
      return true;
    } catch (error) {
      console.error(`❌ 스웨거 스펙 다운로드 실패:`, error.message);
      return false;
    }
  }

  /**
   * 기존 생성된 파일들 정리
   */
  cleanupGeneratedFiles() {
    console.log("🧹 기존 생성된 파일들 정리 중...");

    if (fs.existsSync(this.outputDir)) {
      fs.rmSync(this.outputDir, { recursive: true, force: true });
    }

    fs.mkdirSync(this.outputDir, { recursive: true });
    console.log("✅ 정리 완료");
  }

  /**
   * OpenAPI Generator 실행
   */
  generateApiClient() {
    console.log("🚀 API 클라이언트 생성 중...");

    const command = [
      "npx @openapitools/openapi-generator-cli generate",
      `-i ${this.tempSwaggerFile}`,
      "-g typescript-axios",
      `-o ${this.outputDir}`,
      `-c ${this.configFile}`,
      "--skip-validate-spec",
      "--enable-post-process-file",
    ].join(" ");

    try {
      console.log(`실행 명령어: ${command}`);
      execSync(command, {
        stdio: "inherit",
        cwd: projectRoot,
        env: { ...process.env, JAVA_OPTS: "-Xmx1024m" },
      });
      console.log("✅ API 클라이언트 생성 완료");
      return true;
    } catch (error) {
      console.error("❌ API 클라이언트 생성 실패:", error.message);
      return false;
    }
  }

  /**
   * 생성된 파일 후처리
   */
  postProcessFiles() {
    console.log("🔧 생성된 파일 후처리 중...");

    try {
      // index.ts 파일이 있는지 확인하고 없으면 생성
      const indexPath = path.join(this.outputDir, "index.ts");
      if (!fs.existsSync(indexPath)) {
        const indexContent = `// Auto-generated API client exports
export * from './api';
export * from './models';
export * from './configuration';
`;
        fs.writeFileSync(indexPath, indexContent);
      }

      // .gitignore 파일은 생성하지 않음 (git에서 추적하도록 함)

      // 생성된 API 분석 및 문서화
      this.generateDocumentation();

      // 따옴표 통일 처리
      this.fixQuotesInGeneratedFiles();

      console.log("✅ 후처리 완료");
      return true;
    } catch (error) {
      console.error("❌ 후처리 실패:", error.message);
      return false;
    }
  }

  /**
   * API 분석 및 문서 자동 생성
   */
  generateDocumentation() {
    console.log("📚 API 문서 자동 생성 중...");

    try {
      // API 파일들 스캔
      const apiDir = path.join(this.outputDir, "api");
      const modelDir = path.join(this.outputDir, "models");

      const apis = this.scanApiFiles(apiDir);
      const models = this.scanModelFiles(modelDir);

      // 사용 예시 코드 생성
      this.generateUsageExamples(apis, models);

      // README 생성
      this.generateReadme(apis, models);

      console.log("📚 API 문서 생성 완료");
    } catch (error) {
      console.error("❌ API 문서 생성 실패:", error.message);
    }
  }

  /**
   * API 파일들 스캔
   */
  scanApiFiles(apiDir) {
    if (!fs.existsSync(apiDir)) return [];

    const apiFiles = fs
      .readdirSync(apiDir)
      .filter((file) => file.endsWith(".ts") && file !== "index.ts");

    return apiFiles.map((file) => {
      const content = fs.readFileSync(path.join(apiDir, file), "utf8");
      const className = this.extractClassName(content);
      const methods = this.extractApiMethods(content);

      return {
        fileName: file,
        className,
        methods,
        description: this.extractDescription(content),
      };
    });
  }

  /**
   * 모델 파일들 스캔
   */
  scanModelFiles(modelDir) {
    if (!fs.existsSync(modelDir)) return [];

    const modelFiles = fs
      .readdirSync(modelDir)
      .filter((file) => file.endsWith(".ts") && file !== "index.ts");

    return modelFiles.map((file) => {
      const content = fs.readFileSync(path.join(modelDir, file), "utf8");
      const interfaceName = this.extractInterfaceName(content);
      const properties = this.extractProperties(content);

      return {
        fileName: file,
        interfaceName,
        properties,
        description: this.extractDescription(content),
      };
    });
  }

  /**
   * 클래스명 추출
   */
  extractClassName(content) {
    const match = content.match(/export class (\w+)/);
    return match ? match[1] : "UnknownApi";
  }

  /**
   * API 메소드들 추출
   */
  extractApiMethods(content) {
    const methodRegex = /public (\w+)\([^)]*\)/g;
    const methods = [];
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      methods.push({
        name: match[1],
        description: this.extractMethodDescription(content, match.index),
      });
    }

    return methods;
  }

  /**
   * 인터페이스명 추출
   */
  extractInterfaceName(content) {
    const match = content.match(/export interface (\w+)/);
    return match ? match[1] : "UnknownModel";
  }

  /**
   * 속성들 추출
   */
  extractProperties(content) {
    const propertyRegex = /(\w+)(\?)?:\s*([^;]+);/g;
    const properties = [];
    let match;

    while ((match = propertyRegex.exec(content)) !== null) {
      properties.push({
        name: match[1],
        optional: !!match[2],
        type: match[3].trim(),
      });
    }

    return properties;
  }

  /**
   * 설명 추출
   */
  extractDescription(content) {
    const match = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\n/);
    return match ? match[1] : "";
  }

  /**
   * 메소드 설명 추출
   */
  extractMethodDescription(content, startIndex) {
    const beforeMethod = content.substring(0, startIndex);
    const commentMatch = beforeMethod.match(/\/\*\*[\s\S]*?\*\/\s*$/);
    if (commentMatch) {
      const comment = commentMatch[0];
      const descMatch = comment.match(/\*\s*(.+?)(?:\n|\*\/)/);
      return descMatch ? descMatch[1] : "";
    }
    return "";
  }

  /**
   * 생성된 파일들의 따옴표 통일 (작은 따옴표 → 큰 따옴표)
   */
  fixQuotesInGeneratedFiles() {
    console.log("🔧 따옴표 통일 처리 중...");

    const processFile = (filePath) => {
      if (fs.existsSync(filePath) && filePath.endsWith(".ts")) {
        let content = fs.readFileSync(filePath, "utf8");

        // 작은 따옴표를 큰 따옴표로 변경 (단, 문자열 내부의 따옴표는 제외)
        content = content.replace(/'/g, '"');

        // ESLint/TSLint 비활성화 주석 제거
        content = content.replace(/^\/\* tslint:disable \*\/\n?/gm, "");
        content = content.replace(/^\/\* eslint-disable \*\/\n?/gm, "");
        // 빈 줄로만 남은 경우도 정리
        content = content.replace(/^\n+/, "");

        fs.writeFileSync(filePath, content);
      }
    };

    const processDirectory = (dirPath) => {
      if (!fs.existsSync(dirPath)) return;

      const items = fs.readdirSync(dirPath);
      items.forEach((item) => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          processDirectory(fullPath);
        } else if (item.endsWith(".ts")) {
          processFile(fullPath);
        }
      });
    };

    // generated 폴더 전체 처리
    processDirectory(this.outputDir);

    console.log("✅ 따옴표 통일 완료");
  }

  /**
   * 실제로 사용되는 타입들만 추출
   */
  getUsedTypes(apis) {
    const usedTypes = new Set();

    apis.forEach((api) => {
      api.methods.forEach((method) => {
        const parameterName = this.getParameterName(method.name);
        if (parameterName) {
          // 매개변수 이름에서 타입 추출 (예: userOnboardingInfoDto -> PostUserOnboardingDto)
          const typeName = this.parameterNameToTypeName(parameterName);
          if (typeName && typeName !== "string") {
            // TypeScript 기본 타입은 import하지 않음
            usedTypes.add(typeName);
          }
        }
      });
    });

    return Array.from(usedTypes);
  }

  /**
   * 매개변수 이름을 타입 이름으로 변환
   */
  parameterNameToTypeName(parameterName) {
    // userOnboardingInfoDto -> PostUserOnboardingDto
    if (parameterName.endsWith("Dto")) {
      let baseName = parameterName.replace(/Dto$/, "");
      // Info 제거 (userOnboardingInfoDto -> userOnboarding)
      baseName = baseName.replace(/Info$/, "");
      // camelCase를 PascalCase로 변환하고 Post 접두사 추가
      const pascalCase = baseName.charAt(0).toUpperCase() + baseName.slice(1);
      return "Post" + pascalCase + "Dto";
    }
    // code 파라미터는 string 타입
    if (parameterName === "code") {
      return "string";
    }
    return null;
  }

  /**
   * 사용 예시 코드 생성
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateUsageExamples(apis, models) {
    const examplesPath = path.join(this.outputDir, "../api-functions.ts");

    let content = "";

    // 헤더
    content += "// 자동 생성된 API 함수들\n";
    content +=
      "// 이 파일은 자동으로 생성됩니다. 수동으로 편집하지 마세요.\n\n";

    // imports
    content += 'import { apiClient } from "./axios";\n';

    apis.forEach((api) => {
      const apiFileName = api.fileName.replace(".ts", "");
      content += `import { ${api.className} } from "./generated/api/${apiFileName}";\n`;
    });

    // 타입 imports
    const usedTypes = this.getUsedTypes(apis);
    if (usedTypes.length > 0) {
      content += "import type {\n";
      usedTypes.forEach((type) => {
        content += `  ${type},\n`;
      });
      content += '} from "./generated/models";\n';
    }
    content += "\n";

    // 인터페이스
    content += "export interface ApiRequestOptions {\n";
    content += "  token?: string;\n";
    content += "  headers?: Record<string, string>;\n";
    content += '  cache?: "force-cache" | "no-store";\n';
    content += "  revalidate?: number | false;\n";
    content += "  tags?: string[];\n";
    content += "}\n\n";

    // createApiClient 함수
    content += "function createApiClient(options: ApiRequestOptions = {}) {\n";
    content += "  const headers: Record<string, string> = {\n";
    content += '    "Content-Type": "application/json",\n';
    content += "    ...options.headers,\n";
    content += "  };\n\n";
    content += "  if (options.token) {\n";
    content += "    headers.Authorization = `Bearer ${options.token}`;\n";
    content += "  }\n\n";
    content += "  const client = apiClient.create({\n";
    content += "    ...apiClient.defaults,\n";
    content += "    headers: { ...apiClient.defaults.headers, ...headers },\n";
    content += "    cache: options.cache,\n";
    content += "    revalidate: options.revalidate,\n";
    content += "    tags: options.tags,\n";
    content += "  });\n\n";
    content += "  return client;\n";
    content += "}\n\n";

    // API 함수들
    apis.forEach((apiInfo) => {
      content += `// ${apiInfo.className} 함수들\n`;

      apiInfo.methods.forEach((method) => {
        content += this.generateApiMethodFunction(apiInfo.className, method);
      });

      content += "\n";
    });

    fs.writeFileSync(examplesPath, content);
    console.log("📝 API 함수들 생성 완료");
  }

  /**
   * API 메소드를 함수로 자동 생성
   */
  generateApiMethodFunction(apiClassName, method) {
    const functionName = this.convertToFunctionName(method.name);
    const parameterName = this.getParameterName(method.name);
    const description = method.description || method.name;

    let result = "/**\n";
    result += " * " + description + "\n";
    result += " */\n";
    result += "export async function " + functionName + "(\n";

    if (parameterName) {
      const typeName = this.parameterNameToTypeName(parameterName);
      result +=
        "  params: { " + parameterName + ": " + (typeName || "any") + " },\n";
    }

    result += "  options: ApiRequestOptions = {}\n";
    result += ") {\n";
    result += "  const client = createApiClient(options);\n";
    result +=
      "  const api = new " + apiClassName + "(undefined, undefined, client);\n";

    if (parameterName) {
      result +=
        "  const response = await api." +
        method.name +
        "(params." +
        parameterName +
        ");\n";
    } else {
      result += "  const response = await api." + method.name + "();\n";
    }

    result += "  return response.data;\n";
    result += "}\n\n";

    return result;
  }

  /**
   * 메소드 이름을 함수 이름으로 변환
   */
  convertToFunctionName(methodName) {
    // post, get, put, delete 등의 prefix 제거하고 camelCase로 변환
    return (
      methodName
        .replace(/^(post|get|put|delete|patch)/, "")
        .charAt(0)
        .toLowerCase() +
      methodName.replace(/^(post|get|put|delete|patch)/, "").slice(1)
    );
  }

  /**
   * 메소드에 필요한 매개변수 이름 추출
   */
  getParameterName(methodName) {
    // post로 시작하는 메소드는 보통 DTO를 받음
    if (methodName.startsWith("post")) {
      const baseName = methodName.replace(/^post/, "");
      return baseName.charAt(0).toLowerCase() + baseName.slice(1) + "Dto";
    }
    // kakaoLogin은 code 파라미터가 필요
    if (methodName === "kakaoLogin") {
      return "code";
    }
    // 다른 메소드들은 일단 null (매개변수 없음)
    return null;
  }

  /**
   * 짧은 편의 함수 이름 생성
   */
  getShortFunctionName(methodName) {
    if (methodName.startsWith("post")) {
      const baseName = methodName.replace(/^post/, "");
      return "create" + baseName;
    }
    if (methodName.startsWith("get")) {
      return methodName;
    }
    if (methodName.startsWith("put")) {
      const baseName = methodName.replace(/^put/, "");
      return "update" + baseName;
    }
    if (methodName.startsWith("delete")) {
      const baseName = methodName.replace(/^delete/, "");
      return "remove" + baseName;
    }
    return methodName;
  }

  // 기존 하드코딩된 함수들 제거 - 이제 완전 자동화로 대체됨

  /**
   * README 자동 생성
   */
  generateReadme(apis, models) {
    const readmePath = path.join(this.outputDir, "README.md");

    let readmeContent = "# 자동 생성된 API 클라이언트\n\n";
    readmeContent += "이 폴더의 파일들은 자동으로 생성됩니다.\n\n";
    readmeContent += "생성일시: " + new Date().toLocaleString("ko-KR") + "\n\n";

    readmeContent += "## API 현황\n\n";
    readmeContent += "- API 클래스: " + apis.length + "개\n";
    readmeContent += "- 데이터 모델: " + models.length + "개\n\n";

    fs.writeFileSync(readmePath, readmeContent);
    console.log("📝 README 생성 완료");
  }

  /**
   * 타입별 예시 값 생성
   */
  getExampleValue(type) {
    if (type.includes("string")) return '"example"';
    if (type.includes("number")) return "123";
    if (type.includes("boolean")) return "true";
    if (type.includes("Date")) return "new Date()";
    if (type.includes("[]")) return "[]";
    return "{}";
  }

  /**
   * 임시 파일 정리
   */
  cleanup() {
    if (fs.existsSync(this.tempSwaggerFile)) {
      fs.unlinkSync(this.tempSwaggerFile);
    }
  }

  /**
   * 전체 프로세스 실행
   */
  async run() {
    console.log("🎯 스웨거 API 클라이언트 자동 생성 시작");
    console.log("=".repeat(50));

    try {
      // 1. 스웨거 스펙 다운로드
      const downloaded = await this.downloadSwaggerSpec();
      if (!downloaded) {
        throw new Error("스웨거 스펙 다운로드 실패");
      }

      // 2. 기존 파일 정리
      this.cleanupGeneratedFiles();

      // 3. API 클라이언트 생성
      const generated = this.generateApiClient();
      if (!generated) {
        throw new Error("API 클라이언트 생성 실패");
      }

      // 4. 후처리
      const processed = this.postProcessFiles();
      if (!processed) {
        throw new Error("후처리 실패");
      }

      console.log("=".repeat(50));
      console.log("🎉 API 클라이언트 자동 생성 완료!");
      console.log(`📁 생성된 파일 위치: ${this.outputDir}`);
    } catch (error) {
      console.error("💥 생성 프로세스 실패:", error.message);
      process.exit(1);
    } finally {
      this.cleanup();
    }
  }
}

// 스크립트 실행
const generator = new ApiGenerator();
generator.run().catch(console.error);
