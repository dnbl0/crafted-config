import { StoryFn, Meta } from "@storybook/react";
import isChromatic from "chromatic/isChromatic";
import cn from "classnames";
import { useState } from "react";

import slide1Image from "@/assets/stories/vertical-scroll-slide-01.png";
import slide2Image from "@/assets/stories/vertical-scroll-slide-02.png";
import slide3Image from "@/assets/stories/vertical-scroll-slide-03.png";
import slide4Image from "@/assets/stories/vertical-scroll-slide-04.png";
import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { PrimaryNav } from "@/components/PrimaryNav/PrimaryNav";
import { PRIMARY_NAV_DEFAULT_PROPS } from "@/components/PrimaryNav/stories-common/PrimaryNav.stories.data";
import {
  PrimaryNavContainer,
  usePrimaryNavContainerContext,
} from "@/components/PrimaryNavContainer/PrimaryNavContainer";
import { Typography } from "@/components/Typography/Typography";
import { TypographyGroup } from "@/components/TypographyGroup/TypographyGroup";
import { VerticalScroll } from "@/components/VerticalScroll/VerticalScroll";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./PrimaryNavContainer.stories.module.scss";

const textLineStyle = {
  ...mergeProps(getBorderRadiusProps("extra-large"), {
    className: styles.textLine,
  }),
};

const codeButtonStyles = {
  ...mergeProps(getBorderRadiusProps("extra-medium"), {
    className: styles.codeButton,
  }),
};

const DemoPrimaryNavContainerChild = () => {
  const ctx = usePrimaryNavContainerContext();

  return (
    <div className={styles.demoPrimaryNavContainerChild}>
      <TypographyGroup>
        <Typography component="h1" variant="s1">
          <span {...textLineStyle}>PrimaryNavContainer demo child component</span>
        </Typography>
        <Typography component="p" variant="b2">
          <span {...textLineStyle}>
            <code>const ctx = usePrimaryNavContainerContext();</code>
          </span>
        </Typography>
        <Typography component="p" variant="b2">
          <span {...textLineStyle}>
            <code>ctx.setIsSolidBackground(</code>
            <button
              onClick={(e) => {
                ctx.setIsSolidBackground(false);
                e.preventDefault();
              }}
              {...codeButtonStyles}
            >
              <code>false</code>
            </button>{" "}
            or{" "}
            <button
              onClick={(e) => {
                ctx.setIsSolidBackground(true);
                e.preventDefault();
              }}
              {...codeButtonStyles}
            >
              <code>true</code>
            </button>
            <code>); {`// currently ${ctx.isSolidBackground ? "true" : "false"}`}</code>
          </span>
        </Typography>
        <Typography component="p" variant="b2">
          <span {...textLineStyle}>
            <code>ctx.setIsSolidContainer(</code>
            <button
              onClick={(e) => {
                ctx.setIsSolidContainer(false);
                e.preventDefault();
              }}
              {...codeButtonStyles}
            >
              <code>false</code>
            </button>{" "}
            or{" "}
            <button
              onClick={(e) => {
                ctx.setIsSolidContainer(true);
                e.preventDefault();
              }}
              {...codeButtonStyles}
            >
              <code>true</code>
            </button>
            <code>); {`// currently ${ctx.isSolidContainer ? "true" : "false"}`}</code>
          </span>
        </Typography>
        <Typography component="p" variant="b2">
          <span {...textLineStyle}>
            <code>ctx.setIsFixedAtTop(</code>
            <button
              onClick={(e) => {
                ctx.setIsFixedAtTop(false);
                e.preventDefault();
              }}
              {...codeButtonStyles}
            >
              <code>false</code>
            </button>{" "}
            or{" "}
            <button
              onClick={(e) => {
                ctx.setIsFixedAtTop(true);
                e.preventDefault();
              }}
              {...codeButtonStyles}
            >
              <code>true</code>
            </button>
            <code>); {`// currently ${ctx.isFixedAtTop ? "true" : "false"}`}</code>
          </span>
        </Typography>
      </TypographyGroup>
    </div>
  );
};

const DemoPrimaryNavContainerNoUseContextChild = () => {
  return (
    <div className={styles.demoPrimaryNavContainerChild}>
      <TypographyGroup>
        <Typography component="h1" variant="s1">
          <span {...textLineStyle}>Another PrimaryNavContainer demo child component</span>
        </Typography>
        <Typography component="p" variant="b2">
          <span {...textLineStyle}>
            This one does not consume context and so should not re-render. Check using React Dev
            Tools &rarr; Highlight updates when components render to ensure this component
            isn&apos;t hit.
          </span>
        </Typography>
      </TypographyGroup>
    </div>
  );
};

const MockSiteBanner = () => {
  const [isClosed, setIsClosed] = useState(false);
  return (
    <div className={cn(styles.mockSiteBanner, { [styles.isClosed]: isClosed })}>
      <div className={styles.mockSiteBannerContent}>
        Mock site banner
        <button
          onClick={() => setIsClosed(true)}
          {...mergeProps(getBorderRadiusProps("extra-medium"), {
            className: styles.mockSiteBannerClose,
          })}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default {
  title: "Layouts/Primary Navigation Container",
  component: PrimaryNavContainer,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "PrimaryNav",
  },
  argTypes: {
    children: {
      control: { type: "select" },
      options: [
        "PrimaryNav and demo child for usePrimaryNavContainerContext",
        "PrimaryNav",
        "PrimaryNavWithSearch",
        "PrimaryNav and mock site banner",
        "None",
      ],
      mapping: {
        ["PrimaryNav and demo child for usePrimaryNavContainerContext"]: (
          <>
            <PrimaryNav {...PRIMARY_NAV_DEFAULT_PROPS} />
            <DemoPrimaryNavContainerChild />
            <DemoPrimaryNavContainerNoUseContextChild />
          </>
        ),
        PrimaryNav: <PrimaryNav {...PRIMARY_NAV_DEFAULT_PROPS} />,
        PrimaryNavWithSearch: <PrimaryNav {...PRIMARY_NAV_DEFAULT_PROPS} showSearch />,
        ["PrimaryNav and mock site banner"]: (
          <>
            <MockSiteBanner />
            <PrimaryNav {...PRIMARY_NAV_DEFAULT_PROPS} />
          </>
        ),
        None: null,
      },
    },
    initialIsSolidBackground: {
      control: { type: "boolean" },
    },
    initialIsFixedAtTop: {
      control: { type: "boolean" },
    },
    initialIsSolidContainer: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof PrimaryNavContainer>;

const Template: StoryFn<typeof PrimaryNavContainer> = (args) => <PrimaryNavContainer {...args} />;

const mockContentDecorator = (storyFn: StoryFn) => {
  return (
    <>
      {/* Workaround for: https://github.com/storybookjs/storybook/issues/12596 */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {storyFn()}
      <div style={{ height: isChromatic() ? "auto" : "1500px" }}>
        <Typography variant="h5">Dummy post-nav content 1</Typography>
        <Typography variant="h5">Dummy post-nav content 2</Typography>
        <Typography variant="h5">Dummy post-nav content 3</Typography>
      </div>
    </>
  );
};

const verticalScrollContentDecorator = (storyFn: StoryFn) => {
  const imageStyles = {
    display: "block",
    width: "100%",
    height: "100vh",
  };

  return (
    <>
      {/* Workaround for: https://github.com/storybookjs/storybook/issues/12596 */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {storyFn()}
      <VerticalScroll>
        <img src={slide1Image} alt="placeholder 1" style={imageStyles} />
        <img src={slide2Image} alt="placeholder 2" style={imageStyles} />
        <img src={slide3Image} alt="placeholder 3" style={imageStyles} />
        <img src={slide4Image} alt="placeholder 4" style={imageStyles} />
      </VerticalScroll>
    </>
  );
};

export const DefaultWithDemoChild = Template.bind({});
DefaultWithDemoChild.args = {
  children: "PrimaryNav and demo child for usePrimaryNavContainerContext",
};
DefaultWithDemoChild.decorators = [mockContentDecorator];

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [mockContentDecorator];

export const IsFixedAtTop = Template.bind({});
IsFixedAtTop.args = {
  initialIsFixedAtTop: true,
};
IsFixedAtTop.decorators = [mockContentDecorator];

export const IsNotSolidBackground = Template.bind({});
IsNotSolidBackground.args = {
  initialIsSolidBackground: false,
};
IsNotSolidBackground.decorators = [mockContentDecorator];

export const IsNotSolidBackgroundAndNotSolidContainer = Template.bind({});
IsNotSolidBackgroundAndNotSolidContainer.args = {
  initialIsSolidBackground: false,
  initialIsSolidContainer: false,
};
IsNotSolidBackgroundAndNotSolidContainer.decorators = [mockContentDecorator];

export const IsNotSolidBackgroundAndFixedAtTop = Template.bind({});
IsNotSolidBackgroundAndFixedAtTop.args = {
  initialIsSolidBackground: false,
  initialIsFixedAtTop: true,
};
IsNotSolidBackgroundAndFixedAtTop.decorators = [mockContentDecorator];

export const IsNotSolidBackgroundWithMockSiteBanner = Template.bind({});
IsNotSolidBackgroundWithMockSiteBanner.args = {
  initialIsSolidBackground: false,
  children: "PrimaryNav and mock site banner",
};
IsNotSolidBackgroundWithMockSiteBanner.parameters = {
  chromatic: { disableSnapshot: true },
};
IsNotSolidBackgroundWithMockSiteBanner.decorators = [mockContentDecorator];

export const IsNotSolidBackgroundWithMockSiteBannerAndFixedAtTop = Template.bind({});
IsNotSolidBackgroundWithMockSiteBannerAndFixedAtTop.args = {
  initialIsSolidBackground: false,
  initialIsFixedAtTop: true,
  children: "PrimaryNav and mock site banner",
};
IsNotSolidBackgroundWithMockSiteBannerAndFixedAtTop.parameters = {
  chromatic: { disableSnapshot: true },
};
IsNotSolidBackgroundWithMockSiteBannerAndFixedAtTop.decorators = [mockContentDecorator];

export const VerticalScrollIntegration = Template.bind({});
VerticalScrollIntegration.args = {
  initialIsSolidContainer: false,
  initialIsSolidBackground: false,
  children: "PrimaryNav and mock site banner",
};
VerticalScrollIntegration.parameters = {
  chromatic: { disableSnapshot: true },
};
VerticalScrollIntegration.decorators = [verticalScrollContentDecorator];

export const VerticalScrollIntegrationFixedAtTop = Template.bind({});
VerticalScrollIntegrationFixedAtTop.args = {
  initialIsSolidContainer: false,
  initialIsSolidBackground: false,
  initialIsFixedAtTop: true,
  children: "PrimaryNav and mock site banner",
};
VerticalScrollIntegrationFixedAtTop.parameters = {
  chromatic: { disableSnapshot: true },
};
VerticalScrollIntegrationFixedAtTop.decorators = [verticalScrollContentDecorator];
