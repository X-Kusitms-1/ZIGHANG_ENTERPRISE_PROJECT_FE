import React from "react";
import { fn } from "storybook/test";
import { X } from "lucide-react";
import { FilterButton } from "../components/ui/FilterButton";
import type { Meta } from "@storybook/nextjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/FilterButton",
  component: FilterButton,
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
      options: ["primary", "neutral", "filled"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    children: {
      control: { type: "text" },
    },
    selected: {
      control: { type: "boolean" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    variant: "primary",
    size: "md",
    children: "필터",
  },
} satisfies Meta<typeof FilterButton>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  render: () => {
    const [selected, setSelected] = React.useState(false);

    return (
      <FilterButton
        variant="primary"
        selected={selected}
        onToggle={(isSelected: boolean) => setSelected(isSelected)}
      >
        필터
      </FilterButton>
    );
  },
};

export const Primary = {
  render: () => {
    const [selected, setSelected] = React.useState(false);

    return (
      <FilterButton
        variant="primary"
        selected={selected}
        onToggle={(isSelected: boolean) => setSelected(isSelected)}
      >
        Primary
      </FilterButton>
    );
  },
};

export const Neutral = {
  render: () => {
    const [selected, setSelected] = React.useState(false);

    return (
      <FilterButton
        variant="neutral"
        selected={selected}
        onToggle={(isSelected: boolean) => setSelected(isSelected)}
      >
        Neutral
      </FilterButton>
    );
  },
};

export const Filled = {
  render: () => {
    const [selected, setSelected] = React.useState(false);

    return (
      <FilterButton
        variant="filled"
        selected={selected}
        onToggle={(isSelected: boolean) => setSelected(isSelected)}
      >
        Filled
      </FilterButton>
    );
  },
};

// 모든 사이즈를 보여주는 토글 스토리
export const AllSizes = {
  render: () => {
    const [selected, setSelected] = React.useState({
      small: false,
      medium: false,
      large: false,
    });

    return (
      <div className="grid grid-cols-3 items-center gap-4 p-4">
        <div className="text-center">
          <p className="mb-2 text-xs">Small</p>
          <FilterButton
            variant="primary"
            size="sm"
            selected={selected.small}
            onToggle={(isSelected: boolean) =>
              setSelected((prev) => ({ ...prev, small: isSelected }))
            }
          >
            <X className="size-4" />
            Small
            <X className="size-4" />
          </FilterButton>
        </div>
        <div className="text-center">
          <p className="mb-2 text-xs">Medium</p>
          <FilterButton
            variant="neutral"
            size="md"
            selected={selected.medium}
            onToggle={(isSelected: boolean) =>
              setSelected((prev) => ({ ...prev, medium: isSelected }))
            }
          >
            <X className="size-4" />
            Medium
            <X className="size-4" />
          </FilterButton>
        </div>
        <div className="text-center">
          <p className="mb-2 text-xs">Large</p>
          <FilterButton
            variant="filled"
            size="lg"
            selected={selected.large}
            onToggle={(isSelected: boolean) =>
              setSelected((prev) => ({ ...prev, large: isSelected }))
            }
          >
            <X className="size-4" />
            Large
            <X className="size-4" />
          </FilterButton>
        </div>
      </div>
    );
  },
};
