import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src", ".storybook"], // ESLint가 검사할 디렉토리 지정
  },
  env: {
    // API 서버 URL을 클라이언트에서 사용할 수 있도록 설정
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://stg.ilhaeng.cloud",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
