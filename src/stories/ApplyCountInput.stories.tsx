import ApplyCountInput from "../components/today/ApplyCountInput";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ApplyCountInput> = {
  title: "today/ApplyCountInput",
  component: ApplyCountInput,
};
export default meta;

export const Default: StoryObj<typeof ApplyCountInput> = {
  render: () => <ApplyCountInput />,
};
