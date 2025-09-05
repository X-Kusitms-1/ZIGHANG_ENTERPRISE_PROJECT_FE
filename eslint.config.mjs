// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { rules: {} },
});

const eslintConfig = [
  ...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ),
  // 자동 생성된 API 파일들 - 중요한 오류만 체크
  {
    files: ["src/api/generated/**/*", "src/api/api-functions.ts"],
    rules: {
      // 스타일 관련 규칙들은 무시 (코드 품질에 영향 없음)
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "import/order": "off",
      semi: "off",
      quotes: "off",
      "prefer-const": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      // 중요한 규칙들은 유지 (실제 버그를 잡을 수 있음)
      "@typescript-eslint/no-explicit-any": "off", // any 사용 허용 (자동 생성된 파일)
      "no-undef": "error", // 정의되지 않은 변수 사용
      "no-unreachable": "error", // 도달할 수 없는 코드
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["src/api/generated/**/*", "src/api/api-functions.ts"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-disable-directives": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "react/prop-types": "off",
      "react/no-unused-state": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "array-callback-return": "off",
      "react/self-closing-comp": "warn",
      "react/no-unescaped-entities": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
