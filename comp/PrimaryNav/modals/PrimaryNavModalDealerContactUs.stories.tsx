import { Meta, StoryFn } from "@storybook/react";
import cn from "classnames";
import MockDate from "mockdate";

import { DEALER_CONFIG_SALES_SERVICE_IN_BOTH_LOCATION } from "@/components/DealerContactTile/DealerConfig.stories.data";
import { DEALER_DATA_SALES_SERVICE_IN_BOTH_LOCATION } from "@/components/DealerContactTile/DealerContactTile.stories.data";
import { PrimaryNavModalDealerContactUs } from "@/components/PrimaryNav/modals/PrimaryNavModalDealerContactUs";
import { Responsive } from "@/components/Responsive/Responsive";
import { DealerContext } from "@/utils/DealerContext";

import styles from "../stories-common/stories-common.module.scss";

export default {
  title: "Components/Navigation/Primary/Dealer Contact Us Mobile",
  component: PrimaryNavModalDealerContactUs,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "",
    },
  },
  decorators: [
    (Story) => (
      <DealerContext.Provider
        value={{
          dealerConfig: DEALER_CONFIG_SALES_SERVICE_IN_BOTH_LOCATION,
          dealer: DEALER_DATA_SALES_SERVICE_IN_BOTH_LOCATION,
        }}
      >
        <Responsive breakpoint="small">
          <div className={cn(styles.primaryNavCustomPropsAndColours, styles.primaryNavModalProxy)}>
            <Story />
          </div>
        </Responsive>
        <Responsive breakpoint="large">
          Switch to a mobile or tablet preview viewport to view this story
        </Responsive>
      </DealerContext.Provider>
    ),
  ],
} as Meta<typeof PrimaryNavModalDealerContactUs>;

const Template: StoryFn<typeof PrimaryNavModalDealerContactUs> = (args) => (
  <PrimaryNavModalDealerContactUs {...args} />
);

export const DealerModalContactUsClosed = Template.bind({});
DealerModalContactUsClosed.decorators = [
  (Story) => {
    // Force dealership to have closed hours in story
    // reset mock after generating rendered component
    MockDate.set("2024-05-26");

    const rendered = <Story />;

    MockDate.reset();

    return rendered;
  },
];

export const DealerModalContactUsOpened = Template.bind({});
DealerModalContactUsOpened.decorators = [
  (Story) => {
    // Force dealership to have open hours in story
    // reset mock after generating rendered component
    MockDate.set("2024-05-28");

    const rendered = <Story />;

    MockDate.reset();

    return rendered;
  },
];

DealerModalContactUsOpened.args = {
  showDealerDetailsDefaultValue: true,
};
