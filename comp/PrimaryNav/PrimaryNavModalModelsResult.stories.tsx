import { Meta, StoryObj } from "@storybook/react";

import { FilterProvider } from "./modals/PrimaryNavModalModels.context";
import { calcSubfilterOptions } from "./PrimaryNavModalModels.utils";
import { PrimaryNavModalModelsResult } from "./PrimaryNavModalModelsResult";
import { BODYTYPE_SAMPLE_DATA } from "./stories-common/PrimaryNav.stories.data";

type ComponentType = typeof PrimaryNavModalModelsResult;

const meta: Meta<typeof PrimaryNavModalModelsResult> = {
  title: "Components/Navigation/Primary/Models Result",
  component: PrimaryNavModalModelsResult,
  args: {
    bodyTypes: BODYTYPE_SAMPLE_DATA,
    filterButtonText: "filter",
    fuelFilterLabel: "fuel type",
    seatsFilterLabel: "seats",
    lifestyleFilterLabel: "lifestyle",
  },
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/BABnDaLrf7uLky7ta8M4aa/Search-and-Menu?node-id=3106-11036&t=xZ48HFrvzW1wbQTQ-0",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const subfilterOptions = calcSubfilterOptions(args.bodyTypes);
    const hideFilterBooleans = {
      fuel: false,
      seats: false,
      lifestyle: false,
    };
    return (
      <FilterProvider subfilterOptions={subfilterOptions} hideFilterBooleans={hideFilterBooleans}>
        <PrimaryNavModalModelsResult {...args} />
      </FilterProvider>
    );
  },
};

type Story = StoryObj<ComponentType>;

export default meta;

export const PrimaryNavModalModelsResultDefault: Story = {};
