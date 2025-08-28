import React from "react";
import { userEvent } from "@storybook/test";
import { Button } from "../components/ui/Button";
import type { StoryObj, Meta } from "@storybook/nextjs";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "버튼 컴포넌트: primary variants, size, shape, left/right icon, loading 지원. 접근성(ARIA) 강화.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "filled",
        "neutral",
        "outlined",
        "inversed",
        "disabled",
      ],
      description: "버튼 테마",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "크기",
    },
    leftIcon: {
      control: "boolean",
      description: "왼쪽 아이콘 표시 (StarIcon 사용)",
    },
    rightIcon: {
      control: "boolean",
      description: "오른쪽 아이콘 표시 (StarIcon 사용)",
    },
    disabled: { control: "boolean", description: "비활성화" },
    children: { control: "text", defaultValue: "Button" },
  },
  tags: ["autodocs"], // 자동 문서화 활성화 (Storybook 8+ 베스트 프랙티스)
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
  },
  play: async () => {
    await userEvent.tab(); // 키보드 포커스 테스트
    await new Promise((resolve) => setTimeout(resolve, 300)); // 지연으로 시각화
  },
};


// ...existing code...

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
    </div>
  ),
};


export const LeftIconOnly: Story = {
  args: {
    leftIcon: true,
    children: "Left Icon Only",
  },
  render: (args) => (
    <Button {...args} leftIcon={true}>
      Left Icon
    </Button>
  ),
};

export const RightIconOnly: Story = {
  args: {
    rightIcon: true,
    children: "Right Icon Only",
  },
  render: (args) => (
    <Button {...args} rightIcon={true}>
      Right Icon
    </Button>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const AllButtons: Story = {
  render: () => {
    const variants = [
      "filled",
      "neutral",
      "outlined",
      "inversed",
    ] as const;
    const sizes = ["sm", "md", "lg"] as const;

    return (
      <div className="flex flex-col gap-8">
        {/* Variant별 버튼 (아이콘 없음, 기본 size/md, shape/default) */}
        <div>
          <h3 className="mb-2 font-bold">
            Variants (No Icon, Default Size/Shape)
          </h3>
          <div className="flex flex-wrap gap-4">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
            <Button variant="filled" disabled={true}>
              Disabled
            </Button>
          </div>
        </div>

        {/* Size별 버튼 (기본 variant/primaryFilled, shape/default, 아이콘 유무 조합) */}
        <div>
          <h3 className="mb-2 font-bold">Sizes (With/Without Icons)</h3>
          <div className="flex flex-col gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-wrap gap-4">
                <Button size={size}>No Icon {size}</Button>
                <Button size={size} leftIcon={true}>
                  Left Icon {size}
                </Button>
                <Button size={size} rightIcon={true}>
                  Right Icon {size}
                </Button>
                <Button size={size} leftIcon={true} rightIcon={true}>
                  Both Icons {size}
                </Button>
                <Button size={size} disabled>
                  Disabled {size}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Shape별 버튼 (기본 variant/primaryFilled, size/md, 아이콘 유무 조합) */}
        
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 경우 커버: variant, size, shape, icons (left/right/both/none), disabled/loading. 카멜케이스 variant 사용.",
      },
    },
  },
};

export const AllButtonsWithIcons: Story = {
  render: () => {
    const variants = [
      "filled",
      "neutral",
      "outlined",
      "inversed",
    ] as const;
    const sizes = ["sm", "md", "lg"] as const;

    return (
      <div className="flex flex-col gap-8">
        {/* Variant별 버튼 */}
        <div>
          <h3 className="mb-2 font-bold">Variants</h3>
          <div className="flex flex-wrap gap-4">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </div>

        {/* Size별 버튼 */}
        <div>
          <h3 className="mb-2 font-bold">Sizes</h3>
          <div className="flex flex-wrap gap-4">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                {size}
              </Button>
            ))}
          </div>
        </div>


        {/* 아이콘 포함 버튼 */}
        <div>
          <h3 className="mb-2 font-bold">Buttons with Icons</h3>
          <div className="flex flex-col gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-wrap gap-4">
                {variants.map((variant) => (
                  <React.Fragment key={`${size}-${variant}`}>
                    <Button size={size} variant={variant} leftIcon>
                      Left Icon
                    </Button>
                    <Button size={size} variant={variant} rightIcon>
                      Right Icon
                    </Button>
                    <Button size={size} variant={variant} leftIcon rightIcon>
                      Both Icons
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 버튼 조합을 보여줍니다: variant, size, shape, 그리고 아이콘 조합 (left, right, both).",
      },
    },
  },
};
