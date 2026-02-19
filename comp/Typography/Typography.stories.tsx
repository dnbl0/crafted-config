import { StoryFn, Meta } from "@storybook/react";
import type { Decorator } from "@storybook/react";
import { fn } from "@storybook/test";

import { mergeProps } from "@/utils/reactExtensions";

import { Typography } from "./Typography";
import { TypographyContext, defaultTypographyPlugins } from "../common/typographyContext";
import { disclaimerReplacer } from "../Disclaimer/plugins/disclaimersReplacer";
import { getLinkStyles } from "../GenericLink/getLinkStyles";
import { TypographyGroup } from "../TypographyGroup/TypographyGroup";

const withSuperscript: Decorator = (Story) => (
  <TypographyContext.Provider
    value={{
      plugins: [...defaultTypographyPlugins, disclaimerReplacer],
    }}
  >
    <Story />
  </TypographyContext.Provider>
);

export default {
  title: "Components/Typography",
  component: Typography,
  decorators: [withSuperscript],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/YoHOVEYxZAcqH88L3jXBas/Lexus-%2F-Design-System?node-id=2176-12697",
    },
  },
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => <Typography {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  variant: "h1",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading1WithBook = Template.bind({});
Heading1WithBook.args = {
  variant: "h1",
  fontWeight: "book",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading1WithRegular = Template.bind({});
Heading1WithRegular.args = {
  variant: "h1",
  fontWeight: "regular",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading1WithBold = Template.bind({});
Heading1WithBold.args = {
  variant: "h1",
  fontWeight: "bold",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading2 = Template.bind({});
Heading2.args = {
  variant: "h2",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading3 = Template.bind({});
Heading3.args = {
  variant: "h3",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading4 = Template.bind({});
Heading4.args = {
  variant: "h4",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading5 = Template.bind({});
Heading5.args = {
  variant: "h5",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Heading6 = Template.bind({});
Heading6.args = {
  variant: "h6",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const SubTitle1 = Template.bind({});
SubTitle1.args = {
  component: "p",
  variant: "s1",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const SubTitle2 = Template.bind({});
SubTitle2.args = {
  component: "p",
  variant: "s2",
  children: "Welcome to LexusKit",
  isIndented: false,
};

export const Body1 = Template.bind({});
Body1.args = {
  component: "p",
  variant: "b1",
  children:
    "Toyota Australia acknowledges the Traditional Owners & Custodians of lands throughout Australia. We pay our respects to Elders past, present, and emerging, and the continuation of cultural, spiritual and educational practices of Aboriginal and Torres Strait Islander peoples.",
};

export const Body1WithSuperscript = Template.bind({});
Body1WithSuperscript.args = {
  component: "p",
  variant: "b1",
  children:
    "High performance ventilated brakes, Anti-lock Brake System, Automatic Emergency Braking (AT only)[S1] and enhanced Vehicle Stability Control for added safety[S2]",
};

export const Body2 = Template.bind({});
Body2.args = {
  component: "p",
  variant: "b2",
  children:
    "Toyota Australia acknowledges the Traditional Owners & Custodians of lands throughout Australia. We pay our respects to Elders past, present, and emerging, and the continuation of cultural, spiritual and educational practices of Aboriginal and Torres Strait Islander peoples.",
};

export const Caption = Template.bind({});
Caption.args = {
  component: "span",
  variant: "c1",
  children: "Discover more from Toyota",
};

export const Disclaimer = Template.bind({});
Disclaimer.args = {
  component: "p",
  variant: "d1",
  children:
    "Indicative model and pricing only. Due to extended wait times, the final vehicle we can offer you and its price are likely to be different.",
};

export const Pricing = Template.bind({});
Pricing.args = {
  component: "p",
  variant: "p1",
  children: "$47,932",
};

export const Label1 = Template.bind({});
Label1.args = {
  variant: "l1",
  children: "This is l1",
};

export const Label2 = Template.bind({});
Label2.args = {
  variant: "l2",
  children: "This is l2",
};

export const TextLink = Template.bind({});
TextLink.args = {
  variant: "textLink",
  href: "/",
  children: "About Page",
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  variant: "textLink",
  href: "//google.com.au/",
  target: "_blank",
  children: "Google",
};

export const LinkAsH1 = Template.bind({});
LinkAsH1.args = {
  variant: "h1",
  component: "a",
  href: "/",
  children: "Link as H1",
};

export const Heading1WithSenkeiLine = Template.bind({});
Heading1WithSenkeiLine.args = {
  variant: "h1",
  children: "Welcome to LexusKit",
  hasSenkeiLine: true,
};

export const IsMultilineString = Template.bind({});
IsMultilineString.args = {
  component: "p",
  variant: "b1",
  children: `This is a single Typography instance using the 'isMultilineString' attribute.
Line breaks and the usual text[W8] treatments apply.
- A single line-break translates to a <br /> tag.
- This whole block of text is driven by a normal string with linebreaks.`,
};
IsMultilineString.decorators = [
  (Story) => (
    <TypographyGroup>
      <Story />
    </TypographyGroup>
  ),
];

export const IsMultilineStringWithParagraphs = Template.bind({});
IsMultilineStringWithParagraphs.args = {
  component: "p",
  variant: "b1",
  children: `This is a single Typography instance using the 'isMultilineString' attribute.

Line breaks.

It is sitting in a TypographyGroup so that spacing between paragraphs is visualised.

- A double line-break (as above) translates to a Typography split (i.e. a new paragraph).
- A single line-break translates to a <br /> tag.
- This whole block of text is driven by a normal string with linebreaks.`,
};
IsMultilineStringWithParagraphs.decorators = [
  (Story) => (
    <TypographyGroup>
      <Story />
    </TypographyGroup>
  ),
];

const LinkButtonTemplate: StoryFn<typeof Typography> = (args) => (
  <span {...args}>
    <Typography fontWeight="regular">+Show</Typography>
  </span>
);

export const LinkButtonSc = LinkButtonTemplate.bind({});
LinkButtonSc.args = mergeProps(getLinkStyles({ hideExternalIcon: true }), {
  role: "link",
  tabIndex: 0,
  fontWeight: "regular" as const,
  children: "+Show",
  onClick: fn(),
});
