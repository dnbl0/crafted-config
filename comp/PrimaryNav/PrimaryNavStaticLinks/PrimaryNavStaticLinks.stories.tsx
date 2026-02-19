import { Meta, StoryFn } from "@storybook/react";
import cn from "classnames";

import { ThemeVariantScope } from "@/components/ThemeVariantScope/ThemeVariantScope";

import { PrimaryNavStaticLinks } from "./PrimaryNavStaticLinks";
import {
  PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA,
  PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA_LONG,
} from "./PrimaryNavStaticLinks.stories.data";
import styles from "../stories-common/stories-common.module.scss";

export default {
  title: "Components/Navigation/Primary/Static Links",
  component: PrimaryNavStaticLinks,
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
  decorators: [
    (Story) => (
      <ThemeVariantScope variant="alt">
        <div className={cn(styles.primaryNavCustomPropsAndColours, styles.primaryNavModalProxy)}>
          <Story />
        </div>
      </ThemeVariantScope>
    ),
  ],
} as Meta<typeof PrimaryNavStaticLinks>;

const Template: StoryFn<typeof PrimaryNavStaticLinks> = (args) => (
  <PrimaryNavStaticLinks {...args} />
);

export const PrimaryNavStaticLinksVertical = Template.bind({});
PrimaryNavStaticLinksVertical.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
};

export const PrimaryNavStaticLinksHorizontal = Template.bind({});
PrimaryNavStaticLinksHorizontal.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
  layout: "horizontal",
};

export const PrimaryNavStaticLinksLongTextVertical = Template.bind({});
PrimaryNavStaticLinksLongTextVertical.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA_LONG],
};

export const PrimaryNavStaticLinksLongTextHorizontal = Template.bind({});
PrimaryNavStaticLinksLongTextHorizontal.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA_LONG],
  layout: "horizontal",
};

export const PrimaryNavStaticLinksHoveredVertical = Template.bind({});
PrimaryNavStaticLinksHoveredVertical.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
};
PrimaryNavStaticLinksHoveredVertical.parameters = { pseudo: { hover: true } };

export const PrimaryNavStaticLinksHoveredHorizontal = Template.bind({});
PrimaryNavStaticLinksHoveredHorizontal.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
  layout: "horizontal",
};
PrimaryNavStaticLinksHoveredHorizontal.parameters = { pseudo: { hover: true } };

export const PrimaryNavStaticLinksFocusedVertical = Template.bind({});
PrimaryNavStaticLinksFocusedVertical.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
};
PrimaryNavStaticLinksFocusedVertical.parameters = { pseudo: { focusVisible: true } };

export const PrimaryNavStaticLinksFocusedHorizontal = Template.bind({});
PrimaryNavStaticLinksFocusedHorizontal.args = {
  items: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
  layout: "horizontal",
};
PrimaryNavStaticLinksFocusedHorizontal.parameters = { pseudo: { focusVisible: true } };
