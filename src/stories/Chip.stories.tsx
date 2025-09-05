import React from "react";
import { fn } from "storybook/test";
import { X } from "lucide-react";
import { Chip } from "../components/ui/Chip";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Chip 컴포넌트: 태그, 라벨, 상태 표시 등에 사용되는 컴팩트한 요소입니다. 아이콘과 텍스트를 포함할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "rounded"],
      description: "Chip의 스타일 variant",
    },
    asChild: {
      control: { type: "boolean" },
      description: "자식 요소로 렌더링할지 여부",
    },
    children: {
      control: { type: "text" },
      description: "Chip 내부 콘텐츠",
    },
  },
  args: {
    onClick: fn(),
    variant: "default",
    children: "Chip",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: "Default Chip",
  },
};

// 텍스트만 있는 Chip
export const TextOnly: Story = {
  args: {
    children: "텍스트 라벨",
  },
};

// 텍스트만 있는 Chip
export const Rounded: Story = {
  args: {
    children: "999+",
    variant: "rounded",
  },
};

// 닫기 버튼이 있는 Chip (삭제 가능한 태그)
export const WithCloseButton: Story = {
  render: () => {
    const [chips] = React.useState([
      { id: 1, label: "기업 형태 2개" },
      { id: 2, label: "직군 4개" },
      { id: 3, label: "지역 11개" },
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Chip key={chip.id} className="cursor-pointer">
            {chip.label}

            <X className="size-4" />
          </Chip>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "삭제 가능한 Chip 예시입니다. X 버튼을 클릭하면 해당 Chip이 제거됩니다.",
      },
    },
  },
};
