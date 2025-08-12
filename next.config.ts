import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src", ".storybook"], // ESLint가 검사할 디렉토리 지정
  },
};

export default nextConfig;
