import type { StoryObj, Meta } from "@storybook/react";

import { keyLightModesOnly } from "@/stories/parameters/modes";

import { SecondaryNav } from "./SecondaryNav";

export default {
  title: "Components/Navigation/Secondary",
  component: SecondaryNav,
  decorators: [(Story) => <Story />],
  argTypes: {
    title: {
      type: "string",
    },
  },
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/nQwqOohi5ePpozhDJPt693/Content-Migration-Project?node-id=2489-64504",
    },
    chromatic: { modes: keyLightModesOnly },
  },
} satisfies Meta<typeof SecondaryNav>;

type Story = StoryObj<typeof SecondaryNav>;

export const Default: Story = {
  args: {
    currentPageHref: "#1",
    items: Array.from({ length: 5 }).map((_, index) => ({
      label: `Link to page ${index + 1}`,
      href: `#${index + 1}`,
    })),
    title: "Secondary Nav",
    titleHref: "#title",
  },
};

export const LongItemList: Story = {
  args: {
    currentPageHref: "#1",
    items: Array.from({ length: 10 }).map((_, index) => ({
      label: `Link to page ${index + 1}`,
      href: `#${index + 1}`,
    })),
    title: "Secondary Nav with long list",
  },
};

export const Mobile: Story = {
  args: {
    items: Array.from({ length: 5 }).map((_, index) => ({
      label: `Link to page ${index + 1}`,
      href: `#${index + 1}`,
    })),
    title: "Secondary Nav Mobile",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};
