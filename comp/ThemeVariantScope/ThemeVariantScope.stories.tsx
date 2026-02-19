import { Meta, StoryObj } from "@storybook/react";

import { getSurfaceProps } from "@/components/Surface/Surface";
import { Typography } from "@/components/Typography/Typography";
import { DemoSlot } from "@/stories/presentation/DemoSlot";
import { type KnownThemeVariant } from "@/theming/themingTypes";
import { TupleUnion } from "@/types/helpers";

import { ThemeVariantScope } from "./ThemeVariantScope";

const meta = {
  title: "Components/Theme Variant Scope",
  component: ThemeVariantScope,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "alt"] satisfies TupleUnion<KnownThemeVariant>,
    },
  },
} satisfies Meta<typeof ThemeVariantScope>;

export default meta;

type Story = StoryObj<typeof ThemeVariantScope>;

export const DefaultVariant: Story = {
  args: {
    variant: "default",
    isContents: true,
    children: (
      <div style={{ height: "100px" }} className={getSurfaceProps("canvas", "default").className}>
        <Typography variant="b2">Text and</Typography>
        <DemoSlot />
      </div>
    ),
  },
};

export const AltVariant: Story = {
  args: {
    variant: "alt",
    isContents: false,
    children: (
      <div style={{ height: "100px" }} className={getSurfaceProps("canvas", "default").className}>
        <Typography variant="b2">Text and</Typography>
        <DemoSlot />
      </div>
    ),
  },
};
