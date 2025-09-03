import NewsCard from "../components/news/NewsCard";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof NewsCard> = {
  title: "Components/NewsCard",
  component: NewsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["main", "sub"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터 (컴포넌트 기대 타입에 맞춘 필드명)
const sampleNewsData = {
  title: "토스, 새로운 금융 서비스 출시",
  url: "https://example.com/news/1",
  publishedAt: "2024.01.15",
  thumbnailUrl: "/news/default.png",
};

const longTitleNewsData = {
  title:
    "매우 긴 뉴스 제목이 들어갈 때의 레이아웃 테스트를 위한 샘플 데이터입니다",
  url: "https://example.com/news/2",
  publishedAt: "2024.01.14",
  thumbnailUrl: "/news/default.png",
};

// Main Variant - 데스크탑
export const MainDesktop: Story = {
  args: {
    newsCard: sampleNewsData,
    variant: "main",
  },
};

// Sub Variant - 데스크탑
export const SubDesktop: Story = {
  args: {
    newsCard: sampleNewsData,
    variant: "sub",
  },
};

// 긴 제목 테스트 - Main
export const MainLongTitle: Story = {
  args: {
    newsCard: longTitleNewsData,
    variant: "main",
  },
};

// 긴 제목 테스트 - Sub
export const SubLongTitle: Story = {
  args: {
    newsCard: longTitleNewsData,
    variant: "sub",
  },
};
