import React from "react";
import { fn } from "storybook/test";
import { IconButton } from "../components/ui/IconButton";
import type { Meta, StoryObj } from "@storybook/nextjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/IconButton",
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "inversed", "rounded"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "outlined",
    size: "md",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "outlined",
  },
};

export const Outlined: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "outlined",
  },
};

export const Inversed: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonColor.svg",
    variant: "inversed",
  },
};

export const Rounded: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "rounded",
  },
};

// 모든 variant를 보여주는 스토리
export const AllVariants = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="text-center">
        <p className="mb-2 text-xs">Outlined</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="outlined"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Inversed</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonColor.svg"
          variant="inversed"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Rounded</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="rounded"
        />
      </div>
    </div>
  ),
};
