import React from "react";
import { userEvent } from "@storybook/test";
import { Button } from "../app/components/Button";
import type { StoryObj, Meta } from "@storybook/nextjs";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: { description: { component: "버튼 컴포넌트: primary/secondary variants, size, shape, left/right icon, loading 지원. 접근성(ARIA) 강화." } },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary-filled", "primary-neutral", "primary-transparent", "primary-inversed",
        "secondary-filled", "secondary-inversed", "secondary-neutral", "secondary-outlined",
        "secondary-transparent", "secondary-translucent", "disabled",
      ],
      description: "버튼 테마",
    },
    size: { control: "radio", options: ["sm", "md", "lg"], description: "크기" },
    shape: { control: "radio", options: ["default", "rounded"], description: "모양" },
    leftIcon: { control: "boolean", description: "왼쪽 아이콘 표시 (StarIcon 사용)" },
    rightIcon: { control: "boolean", description: "오른쪽 아이콘 표시 (StarIcon 사용)" },
    iconSize: { control: "text", description: "아이콘 크기 (e.g., 20px)" },
    disabled: { control: "boolean", description: "비활성화" },
    loading: { control: "boolean", description: "로딩 상태 (React 19 useTransition과 결합)" },
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
    await new Promise(resolve => setTimeout(resolve, 300)); // 지연으로 시각화
  },
};

export const Focused: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Button variant="primary-filled">Primary Filled Focused</Button>
      <Button variant="secondary-outlined">Secondary Outlined Focused</Button>
      <Button variant="primary-transparent" disabled>Disabled (No Focus)</Button>
    </div>
  ),
  parameters: {
    docs: { description: { story: "포커스 상태 테스트: Tab 키로 확인. 접근성 강화 (ARIA 속성)." } },
  },
  // play 함수 제거: 사용자가 직접 Tab 키로 포커스 테스트 (Storybook 8.5+ Test runner 추천으로 별도 테스트)
};

export const PrimaryVariants: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Button variant="primary-filled">Filled</Button>
      <Button variant="primary-neutral">Neutral</Button>
      <Button variant="primary-transparent">Transparent</Button>
      <Button variant="primary-inversed">Inversed</Button>
      <Button variant="primary-filled" disabled>Disabled Filled</Button>
    </div>
  ),
};

export const SecondaryVariants: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Button variant="secondary-filled">Filled</Button>
      <Button variant="secondary-inversed">Inversed</Button>
      <Button variant="secondary-neutral">Neutral</Button>
      <Button variant="secondary-outlined">Outlined</Button>
      <Button variant="secondary-transparent">Transparent</Button>
      <Button variant="secondary-translucent">Translucent</Button>
      <Button variant="secondary-filled" disabled>Disabled Filled</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button shape="default">Default</Button>
      <Button shape="rounded">Rounded</Button>
    </div>
  ),
};

// WithIcons, LeftIconOnly, RightIconOnly 등에서 leftIcon/rightIcon이 true면 DefaultSvgIcon을 넘김
export const WithIcons: Story = {
  args: {
    leftIcon: true,
    rightIcon: true,
    children: "With Icons",
  },
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} leftIcon={true} rightIcon={true} iconSize="16px">Small Icon</Button>
      <Button {...args} leftIcon={true} rightIcon={true} iconSize="20px">Default Icon</Button>
      <Button {...args} leftIcon={true} rightIcon={true} iconSize="24px">Large Icon</Button>
    </div>
  ),
};

export const LeftIconOnly: Story = {
  args: {
    leftIcon: true,
    children: "Left Icon Only",
  },
  render: (args) => <Button {...args} leftIcon={true}>Left Icon</Button>,
};

export const RightIconOnly: Story = {
  args: {
    rightIcon: true,
    children: "Right Icon Only",
  },
  render: (args) => <Button {...args} rightIcon={true}>Right Icon</Button>,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
  parameters: {
    docs: { description: { story: "로딩 상태: aria-busy=true, React 19 useTransition과 결합 추천." } },
  },
};

export const AllButtons: Story = {
  render: () => {
    const variants = [
      "primary-filled", "primary-neutral", "primary-transparent", "primary-inversed",
      "secondary-filled", "secondary-inversed", "secondary-neutral", "secondary-outlined",
      "secondary-transparent", "secondary-translucent",
    ] as const;
    const sizes = ["sm", "md", "lg"] as const;
    const shapes = ["default", "rounded"] as const;

    return (
      <div className="flex flex-col gap-8">
        {/* Variant별 버튼 (아이콘 없음, 기본 size/md, shape/default) */}
        <div>
          <h3 className="mb-2 font-bold">Variants (No Icon, Default Size/Shape)</h3>
          <div className="grid grid-cols-5 gap-4">
            {variants.map(variant => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
            <Button variant="primary-filled" disabled>Disabled</Button>
            <Button variant="primary-filled" loading>Loading</Button>
          </div>
        </div>

        {/* Variant별 버튼 (Left + Right Icon, 기본 size/md, shape/default) */}
        <div>
          <h3 className="mb-2 font-bold">Variants (With Left + Right Icons)</h3>
          <div className="grid grid-cols-5 gap-4">
            {variants.map(variant => (
              <Button key={variant} variant={variant} leftIcon={true} rightIcon={true} iconSize="20px">
                {variant}
              </Button>
            ))}
            <Button variant="primary-filled" disabled leftIcon={true} rightIcon={true} iconSize="20px">Disabled Icons</Button>
            <Button variant="primary-filled" loading leftIcon={true} rightIcon={true} iconSize="20px">Loading Icons</Button>
          </div>
        </div>

        {/* Variant별 버튼 (Left Icon Only) */}
        <div>
          <h3 className="mb-2 font-bold">Variants (Left Icon Only)</h3>
          <div className="grid grid-cols-5 gap-4">
            {variants.map(variant => (
              <Button key={variant} variant={variant} leftIcon={true} iconSize="20px">
                {variant}
              </Button>
            ))}
          </div>
        </div>

        {/* Variant별 버튼 (Right Icon Only) */}
        <div>
          <h3 className="mb-2 font-bold">Variants (Right Icon Only)</h3>
          <div className="grid grid-cols-5 gap-4">
            {variants.map(variant => (
              <Button key={variant} variant={variant} rightIcon={true} iconSize="20px">
                {variant}
              </Button>
            ))}
          </div>
        </div>

        {/* Size별 버튼 (기본 variant/primary-filled, shape/default, 아이콘 유무 조합) */}
        <div>
          <h3 className="mb-2 font-bold">Sizes (With/Without Icons)</h3>
          <div className="flex flex-col gap-4">
            {sizes.map(size => (
              <div key={size} className="flex gap-4">
                <Button size={size}>No Icon {size}</Button>
                <Button size={size} leftIcon={true} iconSize={size === "sm" ? "16px" : size === "md" ? "20px" : "24px"}>Left Icon {size}</Button>
                <Button size={size} rightIcon={true} iconSize={size === "sm" ? "16px" : size === "md" ? "20px" : "24px"}>Right Icon {size}</Button>
                <Button size={size} leftIcon={true} rightIcon={true} iconSize={size === "sm" ? "16px" : size === "md" ? "20px" : "24px"}>Both Icons {size}</Button>
                <Button size={size} disabled>Disabled {size}</Button>
                <Button size={size} loading>Loading {size}</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Shape별 버튼 (기본 variant/primary-filled, size/md, 아이콘 유무 조합) */}
        <div>
          <h3 className="mb-2 font-bold">Shapes (With/Without Icons)</h3>
          <div className="flex flex-col gap-4">
            {shapes.map(shape => (
              <div key={shape} className="flex gap-4">
                <Button shape={shape}>No Icon {shape}</Button>
                <Button shape={shape} leftIcon={true} iconSize="20px">Left Icon {shape}</Button>
                <Button shape={shape} rightIcon={true} iconSize="20px">Right Icon {shape}</Button>
                <Button shape={shape} leftIcon={true} rightIcon={true} iconSize="20px">Both Icons {shape}</Button>
                <Button shape={shape} disabled>Disabled {shape}</Button>
                <Button shape={shape} loading>Loading {shape}</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Mixed 조합 예시 (e.g., different size + shape + variant + icons) */}
        <div>
          <h3 className="mb-2 font-bold">Mixed Combinations</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary-outlined" size="sm" shape="rounded" leftIcon={true} iconSize="16px">Small Rounded Outlined Left</Button>
            <Button variant="primary-transparent" size="lg" shape="default" rightIcon={true} iconSize="24px">Large Default Transparent Right</Button>
            <Button variant="secondary-translucent" size="md" shape="rounded" leftIcon={true} rightIcon={true} iconSize="20px">Medium Rounded Translucent Both</Button>
            <Button variant="primary-inversed" size="sm" shape="default" disabled>Small Default Inversed Disabled</Button>
            <Button variant="secondary-neutral" size="lg" shape="rounded" loading>Large Rounded Neutral Loading</Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: { description: { story: "모든 경우 커버: variant, size, shape, icons (left/right/both/none), disabled/loading. Grid로 시각화 (Storybook 8.5+ 베스트 프랙티스)." } },
  },
};