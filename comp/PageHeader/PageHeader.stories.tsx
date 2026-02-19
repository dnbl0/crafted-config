import { StoryFn, Meta } from "@storybook/react";

import { DemoEditableText } from "@/stories/presentation/DemoEditableText";

import { PageHeader } from "./PageHeader";

export default {
  title: "Components/Page Header (DEPRECATED)",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "!!! Use composition/PageHeader !!!",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YoHOVEYxZAcqH88L3jXBas/Lexus-%2F-Design-System?type=design&node-id=4325-5580&mode=dev",
    },
  },
} as Meta<typeof PageHeader>;

const Template: StoryFn<typeof PageHeader> = (args) => <PageHeader {...args} />;

export const PageHeaderWithDefault = Template.bind({});
PageHeaderWithDefault.args = {
  children: "A new kind of crossover",
};

export const PageHeaderWithDemoEditableText = Template.bind({});
PageHeaderWithDemoEditableText.args = {
  children: <DemoEditableText value={"My editable heading"} />,
};

export const PageHeaderLimitedTo8Col = Template.bind({});
PageHeaderLimitedTo8Col.args = {
  children: "This line wraps at 8 columns and it is still centered properly",
};
