import React from "react";
import FilterModal from "../components/filterModal/FilterModal";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/FilterModal",
  component: FilterModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FilterModal 컴포넌트: 다층 구조의 필터 선택을 위한 모달입니다. 기업 형태, 직군, 지역(세부지역 포함) 필터링을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // FilterModal은 props가 없으므로 argTypes 비움
  },
  args: {
    // 기본 args도 필요 없음
  },
} satisfies Meta<typeof FilterModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: () => <FilterModal />,
  parameters: {
    docs: {
      description: {
        story: "기본 FilterModal입니다. 필터 버튼을 클릭하면 모달이 열립니다.",
      },
    },
  },
};

// 사용법 안내 스토리
export const Usage: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">필터 모달 사용법</h3>
        <p className="mb-4 text-gray-600">
          아래 필터 버튼을 클릭해서 다양한 필터 기능을 체험해보세요
        </p>
      </div>
      <div className="flex justify-center">
        <FilterModal />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
FilterModal의 주요 기능:
- **3단계 카테고리**: 기업 형태, 직군, 지역
- **지역 세부 필터**: 서울(25개 구), 경기(31개 시/군) 등
- **실시간 선택 표시**: 선택된 필터가 FilterButton으로 표시
- **선택 개수 표시**: 각 카테고리별 선택 개수 뱃지
- **초기화 기능**: 모든 필터를 한 번에 초기화
        `,
      },
    },
  },
};
