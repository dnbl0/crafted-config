import { Meta, StoryFn } from "@storybook/react";
import cn from "classnames";

import { ThemeVariantScope } from "@/components/ThemeVariantScope/ThemeVariantScope";

import { PrimaryNavLevel1 } from "./PrimaryNavLevel1";
import {
  PRIMARY_NAV_LEVEL_1_SAMPLE_DATA,
  PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG,
} from "./PrimaryNavLevel1.stories.data";
import styles from "../stories-common/stories-common.module.scss";

export default {
  title: "Components/Navigation/Primary/Navbar Level 1 Items",
  component: PrimaryNavLevel1,
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
  decorators: [
    (Story) => (
      <ThemeVariantScope variant="alt">
        <div className={cn(styles.primaryNavCustomPropsAndColours, styles.primaryNavNavbarProxy)}>
          <Story />
        </div>
      </ThemeVariantScope>
    ),
  ],
} as Meta<typeof PrimaryNavLevel1>;

const Template: StoryFn<typeof PrimaryNavLevel1> = (args) => <PrimaryNavLevel1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  level1Menus: [...PRIMARY_NAV_LEVEL_1_SAMPLE_DATA],
};

export const Hovered = Template.bind({});
Hovered.args = {
  level1Menus: [...PRIMARY_NAV_LEVEL_1_SAMPLE_DATA],
};
Hovered.parameters = { pseudo: { hover: true } };

export const Focused = Template.bind({});
Focused.args = {
  ...Default.args,
};
Focused.parameters = { pseudo: { focusVisible: true } };

export const FirstItemActive = Template.bind({});
FirstItemActive.args = {
  activeMenu: Default.args.level1Menus?.[0],
  ...Default.args,
};

export const LongText = Template.bind({});
LongText.args = {
  level1Menus: [...PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG],
};
