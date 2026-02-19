import { Meta, StoryFn } from "@storybook/react";
import cn from "classnames";

import { ThemeVariantScope } from "@/components/ThemeVariantScope/ThemeVariantScope";

import { PrimaryNavItems } from "./PrimaryNavItems";
import {
  PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF,
  PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF_WITH_ITEMS_DISABLED,
  PRIMARY_NAV_ITEMS_SAMPLE_DATA_WITH_CHILDREN,
} from "./PrimaryNavItems.stories.data";
import styles from "./PrimaryNavItems.stories.module.scss";
import commonStyles from "../../stories-common/stories-common.module.scss";

export default {
  title: "Components/Navigation/Primary/Navigation Items",
  component: PrimaryNavItems,
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
  decorators: [
    (Story) => (
      <ThemeVariantScope variant="alt">
        <div
          className={cn(
            commonStyles.primaryNavCustomPropsAndColours,
            styles.primaryNavItemsTestContainer
          )}
        >
          <Story />
        </div>
      </ThemeVariantScope>
    ),
  ],
} as Meta<typeof PrimaryNavItems>;

const Template: StoryFn<typeof PrimaryNavItems> = (args) => <PrimaryNavItems {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF,
};

export const PrimaryNavItemsDisabled = Template.bind({});
PrimaryNavItemsDisabled.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF_WITH_ITEMS_DISABLED,
};

export const PrimaryNavItemsFocused = Template.bind({});
PrimaryNavItemsFocused.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF,
};
PrimaryNavItemsFocused.parameters = { pseudo: { focusVisible: true } };

export const PrimaryNavItemsSecondSelected = Template.bind({});
PrimaryNavItemsSecondSelected.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF,
  itemSelected: PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF[1],
};

export const PrimaryNavItemsWithChildren = Template.bind({});
PrimaryNavItemsWithChildren.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_WITH_CHILDREN,
};

export const PrimaryNavItemsHovered = Template.bind({});
PrimaryNavItemsHovered.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF,
};

PrimaryNavItemsHovered.parameters = { pseudo: { hover: true } };

export const PrimaryNavItemsWithChildrenHovered = Template.bind({});
PrimaryNavItemsWithChildrenHovered.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_WITH_CHILDREN,
};
PrimaryNavItemsWithChildrenHovered.parameters = { pseudo: { hover: true } };

export const PrimaryNavItemsWithFocused = Template.bind({});
PrimaryNavItemsWithFocused.args = {
  items: PRIMARY_NAV_ITEMS_SAMPLE_DATA_WITH_CHILDREN,
};

PrimaryNavItemsWithFocused.parameters = {
  pseudo: { focusVisible: true },
};
