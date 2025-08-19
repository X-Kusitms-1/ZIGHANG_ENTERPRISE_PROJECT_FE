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
      options: [
        "primaryFill",
        "primaryOutline",
        "primaryTransparent",
        "primaryInvers",
        "secondaryFill",
        "secondaryOutline",
        "secondaryTransparent",
        "secondaryInvers",
        "circleOutline",
        "circleTransparent",
        "circleInvers",
      ],
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
    variant: "primaryFill",
    size: "md",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonColor.svg",
    variant: "primaryFill",
  },
};

export const PrimaryFill: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "primaryFill",
  },
};

export const SecondaryFill: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "secondaryFill",
  },
};

export const CircleOutline: Story = {
  args: {
    iconSrc: "/icons/storybook/iconButtonBlack.svg",
    variant: "circleOutline",
  },
};

// 모든 variant를 보여주는 스토리
export const AllVariants = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="text-center">
        <p className="mb-2 text-xs">Primary Fill</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="primaryFill"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Primary Outline</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonColor.svg"
          variant="primaryOutline"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Primary Transparent</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonColor.svg"
          variant="primaryTransparent"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Primary Invers</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonColor.svg"
          variant="primaryInvers"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Secondary Fill</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="secondaryFill"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Secondary Outline</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="secondaryOutline"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Secondary Transparent</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="secondaryTransparent"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Secondary Invers</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="secondaryInvers"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Circle Outline</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="circleOutline"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Circle Transparent</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="circleTransparent"
        />
      </div>
      <div className="text-center">
        <p className="mb-2 text-xs">Circle Invers</p>
        <IconButton
          iconSrc="/icons/storybook/iconButtonBlack.svg"
          variant="circleInvers"
        />
      </div>
    </div>
  ),
};
