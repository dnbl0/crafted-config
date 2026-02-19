import { StoryFn, Meta } from "@storybook/react";

import { getValidReactChildrenOrDefault } from "@/utils/reactExtensions";

import { TypographyGroup } from "./TypographyGroup";
import { TypographyContext, defaultTypographyPlugins } from "../common/typographyContext";
import { disclaimerReplacer } from "../Disclaimer/plugins/disclaimersReplacer";
import { Typography } from "../Typography/Typography";

export default {
  title: "Layouts/Typography Group",
  component: TypographyGroup,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TypographyContext.Provider
        value={{
          plugins: [...defaultTypographyPlugins, disclaimerReplacer],
        }}
      >
        <Story />
      </TypographyContext.Provider>
    ),
  ],
} as Meta<typeof TypographyGroup>;

const Template: StoryFn<typeof TypographyGroup> = (args) => <TypographyGroup {...args} />;

export const Ensemble1 = Template.bind({});
Ensemble1.args = {
  children: getValidReactChildrenOrDefault(
    <>
      <Typography variant={"h1"}>This is a level one heading 1l[A1]</Typography>
      <Typography variant={"b1"} component="p">
        This is a B1. It should be rendered as a paragraph.
      </Typography>
      <Typography variant={"b1"} component="p">
        Note that the first direct descendant element in a <code>&lt;TypographyGroup&gt;</code> gets
        its margin-top cleared automatically. Similarly, the bottom margin on the last direct
        descendant element gets cleared 1l[D1].
      </Typography>
      <Typography variant={"b2"} component="p">
        This is a B2. It should be rendered as a paragraph. 120,000 km | Auto | 1.5 L Petrol Hybrid.
      </Typography>
      <Typography variant={"h2"}>Heading 2</Typography>
      <Typography variant={"b1"} component="p">
        This is a B1 / H2 spacing test.
      </Typography>
      <Typography variant={"h3"}>Heading 3</Typography>
      <Typography variant={"b1"} component="p">
        This is a B1 / H3 spacing test.
      </Typography>
      <Typography variant={"h4"}>Heading 4</Typography>
      <Typography variant={"b1"} component="p">
        This is a B1 / H4 spacing test.
      </Typography>
      <Typography variant={"h5"}>Heading 5</Typography>
      <Typography variant={"h6"}>Heading 6</Typography>
      <Typography variant={"b1"} component="p">
        This is a B1 / H5 spacing test.
      </Typography>
      <Typography variant={"h1"}>H1. This is an H1</Typography>
      <Typography variant={"h2"}>H2. This is an H1 / H2 spacing test</Typography>
      <Typography variant={"h3"}>H3. This is an H2 / H3 spacing test</Typography>
      <Typography variant={"h4"}>H4. This is an H3 / H4 spacing test</Typography>
      <Typography variant={"h5"}>H5. This is an H4 / H5 spacing test</Typography>
      <Typography variant={"h6"}>H5. This is an H5 / H6 spacing test</Typography>
    </>,
    []
  ),
};
