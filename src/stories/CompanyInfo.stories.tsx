import CompanyInfo from "../components/news/CompanyInfo";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof CompanyInfo> = {
  title: "Components/CompanyInfo",
  component: CompanyInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["main", "sub", "company"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터 (컴포넌트 기대 타입에 맞춘 필드명)
const sampleCompanyData = {
  id: "1",
  companyNameKr: "Viva Republica Inc.",
  companyThumbnailUrl: "/icons/storybook/toss.jpg",
  companyTypeLabel: "중견기업",
  isSubscribed: false,
};

// Main Variant - 데스크탑
export const MainDesktop: Story = {
  args: {
    companyInfo: sampleCompanyData,
    variant: "main",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// Sub Variant - 데스크탑
export const SubDesktop: Story = {
  args: {
    companyInfo: sampleCompanyData,
    variant: "sub",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// Company Variant - 데스크탑
export const CompanyDesktop: Story = {
  args: {
    companyInfo: sampleCompanyData,
    variant: "company",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
