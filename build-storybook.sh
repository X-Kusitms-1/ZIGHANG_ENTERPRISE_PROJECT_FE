#!/bin/sh

# Node.js와 pnpm 설치 (Alpine Linux 기반)
apk add --no-cache nodejs npm
npm install -g pnpm

# 의존성 설치
pnpm install

# Storybook 빌드
pnpm build-storybook

# storybook-output 디렉토리 생성 및 빌드 결과 복사
mkdir -p storybook-output

# Storybook 빌드 결과물 복사
if [ -d "storybook-static" ]; then
  cp -r storybook-static/* storybook-output/
  echo "Storybook static files copied to storybook-output/"
else
  echo "Error: storybook-static directory not found!"
  exit 1
fi
