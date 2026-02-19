import { Meta, type StoryFn } from "@storybook/react";
import MockDate from "mockdate";
import { useCallback, useEffect, useRef } from "react";

import { Box, getBoxProps } from "@/components/Box/Box";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Container } from "@/components/Container/Container";
import { DEALER_CONFIG_SALES_SERVICE_IN_BOTH_LOCATION } from "@/components/DealerContactTile/DealerConfig.stories.data";
import { DEALER_DATA_SALES_SERVICE_IN_BOTH_LOCATION } from "@/components/DealerContactTile/DealerContactTile.stories.data";
import { Divider } from "@/components/Divider/Divider";
import { FormContainer } from "@/components/FormContainer/FormContainer";
import { GenericLink } from "@/components/GenericLink/GenericLink";
import { IconButton } from "@/components/IconButton/IconButton";
import { IconLink } from "@/components/IconLink/IconLink";
import { Label } from "@/components/Label/Label";
import { Oriented } from "@/components/Oriented/Oriented";
import { usePrimaryNavContainerCssCustomProps } from "@/components/PrimaryNavContainer/usePrimaryNavContainerCssCustomProps";
import { Responsive } from "@/components/Responsive/Responsive";
import { getStackProps, Stack } from "@/components/Stack/Stack";
import { getSurfaceProps } from "@/components/Surface/Surface";
import { SVGCross } from "@/components/SVGIcon/static/SVGCross";
import { SVGSearchThin } from "@/components/SVGIcon/static/SVGSearchThin";
import { TextField } from "@/components/TextField/TextField";
import { TextFieldWithPopover } from "@/components/TextFieldWithPopover/TextFieldWithPopover";
import { Typography } from "@/components/Typography/Typography";
import { keyLightModesOnly, smallModes } from "@/stories/parameters/modes";
import { AuthenticationContextProvider } from "@/utils/Authentication/authenticationContext";
import { IDTOKEN_STORAGE_KEY } from "@/utils/Authentication/utils";
import { DealerContext } from "@/utils/DealerContext";
import { getValidReactChildrenOrDefault } from "@/utils/reactExtensions";
import { mergeProps } from "@/utils/reactExtensions";

import { PrimaryNav, PrimaryNavProps } from "./PrimaryNav";
import { usePrimaryNavControls, usePrimaryNavQuickBookContext } from "./PrimaryNavContext";
import {
  IDTOKEN_SAMPLE_DATA,
  PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG_INCLUDING_SPECIAL_ITEMS,
} from "./PrimaryNavLevel1/PrimaryNavLevel1.stories.data";
import { AUTHENTICATION_DATA } from "./stories-common/authentication-stories-data";
import {
  PRIMARY_NAV_DEFAULT_ARGS,
  PRIMARY_NAV_SAMPLE_DATA,
  SVG_IMAGE_DATA,
} from "./stories-common/PrimaryNav.stories.data";
import styles from "./stories-common/stories-common.module.scss";

const SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING = {
  SVGLexusDealerLogoWithTagline: SVG_IMAGE_DATA.svgLexusDealerLogoWithTagline,
  SVGLexusDealerLogoWithoutTagline: SVG_IMAGE_DATA.svgLexusDealerLogoWithoutTagline,
  SVGLexusLogoWithTagline: SVG_IMAGE_DATA.svgLexusLogoWithTagline,
  None: null,
} as const;

export default {
  title: "Components/Navigation/Primary",
  component: PrimaryNav,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: "2000px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/YoHOVEYxZAcqH88L3jXBas/Lexus-%2F-Design-System?node-id=2175-1042",
    },
  },
  argTypes: {
    offset: { control: { type: "number" } },
    overrideDataMainMenuLogo: {
      control: {
        type: "select",
      },
      options: [
        "SVGLexusDealerLogoWithTagline",
        "SVGLexusDealerLogoWithoutTagline",
        "SVGLexusLogoWithTagline",
        "None",
      ],
      mapping: SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING,
    },
    overrideDataMainMenuLogoMobile: {
      control: {
        type: "select",
      },
      options: [
        "SVGLexusDealerLogoWithTagline",
        "SVGLexusDealerLogoWithoutTagline",
        "SVGLexusLogoWithTagline",
        "None",
      ],
      mapping: SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING,
    },
  },
} as Meta<typeof PrimaryNav>;

const isKeyOfSvgImageDataArgToPropMapping = (
  key: unknown
): key is keyof typeof SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING => {
  return typeof key === "string" && Object.hasOwn(SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING, key);
};

const resolveArgsToProps = (
  args:
    | PrimaryNavProps
    | Override<
        PrimaryNavProps,
        {
          overrideDataMainMenuLogoMobile?: string;
          overrideDataMainMenuLogo?: string;
        }
      >
): PrimaryNavProps => ({
  ...args,
  overrideDataMainMenuLogo: isKeyOfSvgImageDataArgToPropMapping(args.overrideDataMainMenuLogo)
    ? SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING[args.overrideDataMainMenuLogo] || undefined
    : typeof args.overrideDataMainMenuLogo === "object"
      ? args.overrideDataMainMenuLogo
      : undefined,
  overrideDataMainMenuLogoMobile: isKeyOfSvgImageDataArgToPropMapping(
    args.overrideDataMainMenuLogoMobile
  )
    ? SVG_IMAGE_DATA_ARG_TO_PROP_MAPPING[args.overrideDataMainMenuLogoMobile] || undefined
    : typeof args.overrideDataMainMenuLogoMobile === "object"
      ? args.overrideDataMainMenuLogoMobile
      : undefined,
});

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

const Template: StoryFn<
  | PrimaryNavProps
  | Override<
      PrimaryNavProps,
      {
        overrideDataMainMenuLogoMobile?: string;
        overrideDataMainMenuLogo?: string;
      }
    >
> = (
  args:
    | PrimaryNavProps
    | Override<
        PrimaryNavProps,
        {
          overrideDataMainMenuLogoMobile?: string | undefined;
          overrideDataMainMenuLogo?: string | undefined;
        }
      >
) => {
  return (
    <AuthenticationContextProvider {...AUTHENTICATION_DATA}>
      <PrimaryNav {...resolveArgsToProps(args)} />
    </AuthenticationContextProvider>
  );
};

const MockPrimaryNavContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const containerRef = usePrimaryNavContainerCssCustomProps();

  return (
    <div
      ref={containerRef}
      className={styles.mockPrimaryNavContainer}
      style={{ position: "sticky" }}
      data-primary-nav-modal-open-scrollto-target=""
    >
      {children}
    </div>
  );
};

const defaultDecorator = (ChildComponent: StoryFn) => (
  <DealerContext.Provider
    value={{
      dealerConfig: DEALER_CONFIG_SALES_SERVICE_IN_BOTH_LOCATION,
      dealer: DEALER_DATA_SALES_SERVICE_IN_BOTH_LOCATION,
    }}
  >
    <MockPrimaryNavContainer>
      {/* Workaround for: https://github.com/storybookjs/storybook/issues/12596 */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {<ChildComponent />}
    </MockPrimaryNavContainer>
  </DealerContext.Provider>
);

const mobileOnlyDecorator = (ChildComponent: StoryFn) => (
  <>
    <DealerContext.Provider
      value={{
        dealerConfig: DEALER_CONFIG_SALES_SERVICE_IN_BOTH_LOCATION,
        dealer: DEALER_DATA_SALES_SERVICE_IN_BOTH_LOCATION,
      }}
    >
      <Responsive breakpoint="small">
        {/* Workaround for: https://github.com/storybookjs/storybook/issues/12596 */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {<ChildComponent />}
      </Responsive>
      <Responsive breakpoint="large">
        Switch to a mobile or tablet preview viewport to view this story
      </Responsive>
    </DealerContext.Provider>
  </>
);

const loggedOutDecorator = (ChildComponent: StoryFn) => {
  // Linter complaining that IDTOKEN_STORAGE_KEY is of type any, but is implicitly set as string

  window.sessionStorage.removeItem(IDTOKEN_STORAGE_KEY);

  // Workaround for: https://github.com/storybookjs/storybook/issues/12596
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <ChildComponent />;
};

const loggedInDecorator = (ChildComponent: StoryFn) => {
  // Linter complaining that IDTOKEN_STORAGE_KEY is of type any, but is implicitly set as string

  window.sessionStorage.setItem(IDTOKEN_STORAGE_KEY, IDTOKEN_SAMPLE_DATA);

  // Workaround for: https://github.com/storybookjs/storybook/issues/12596
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <ChildComponent />;
};

const baseConfig = {
  parameters: {
    chromatic: { modes: keyLightModesOnly },
  },
  decorators: [defaultDecorator, loggedOutDecorator],
};

const baseConfigLoggedIn = {
  ...baseConfig,
  decorators: [defaultDecorator, loggedInDecorator],
};

const baseConfigMobile = {
  ...baseConfig,
  parameters: {
    chromatic: { modes: smallModes },
  },
  decorators: [defaultDecorator, mobileOnlyDecorator, loggedOutDecorator],
};

export const Default = Template.bind({});
Default.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
};
Default.parameters = baseConfig.parameters;
Default.decorators = baseConfig.decorators;

const PresentationItem: React.FC<React.ComponentPropsWithoutRef<typeof GenericLink>> = ({
  children,
  ...rest
}) => (
  <li role="presentation">
    <GenericLink
      variant="quiet"
      {...mergeProps(
        rest,
        getBoxProps({ px: "2xs", py: "3xs" }),
        getSurfaceProps("none", undefined, true),
        { style: { display: "block" } }
      )}
    >
      <Typography variant="b1">{children}</Typography>
    </GenericLink>
  </li>
);

const SearchTrigger: React.FC = () => {
  const { pushActiveMenuId } = usePrimaryNavControls();

  // On focus we open full search page
  const handleFocus = useCallback(() => {
    pushActiveMenuId("search-menu");
  }, [pushActiveMenuId]);

  return (
    <FormContainer>
      <TextField placeholder="Search" prefixIcon={<SVGSearchThin />} onFocus={handleFocus} />
    </FormContainer>
  );
};

const SearchList: React.FC<React.PropsWithChildren<{ label?: string; ariaLabel?: string }>> = ({
  children,
  label,
  ariaLabel,
}) => (
  <div>
    {label && (
      <Box px="2xs" py="4xs" aria-hidden={true}>
        <Label>{label}</Label>
      </Box>
    )}
    <ul
      role="listbox"
      aria-label={ariaLabel}
      {...getStackProps({ direction: "column", spacing: "4xs" })}
    >
      {children}
    </ul>
  </div>
);

const DemoSeeAlsoBlock: React.FC = () => (
  <SearchList label="See also" ariaLabel="See also">
    <PresentationItem href="#">Recent news</PresentationItem>
    <PresentationItem href="#">All models</PresentationItem>
    <PresentationItem href="#">Service</PresentationItem>
  </SearchList>
);

const DemoMoreLinksBlock: React.FC = () => (
  <SearchList label="More links" ariaLabel="More links">
    <PresentationItem href="#">Our vehicles</PresentationItem>
    <PresentationItem href="#">Book a service</PresentationItem>
    <PresentationItem href="#">About Lexus</PresentationItem>
  </SearchList>
);

const SearchMenu: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 2000);
  }, []);

  return (
    <FormContainer>
      <TextField inputRef={inputRef} placeholder="Search" prefixIcon={<SVGSearchThin />} />
      <Box py="xs" component={Stack} direction="column" spacing="2xs">
        <Stack direction="column" spacing="4xs">
          <SearchList ariaLabel="Suggested options">
            <PresentationItem href="#">Result 1</PresentationItem>
            <PresentationItem aria-atomic="true" aria-label="Result 2" href="#">
              Result 2
            </PresentationItem>
            <PresentationItem href="https://www.google.com">Result 3</PresentationItem>
          </SearchList>
          <IconLink
            iconPosition="end"
            aria-label="Search what is written"
            href="https://www.google.com"
            {...mergeProps(
              getBoxProps({ px: "2xs", py: "xs" }),
              getSurfaceProps("none", undefined, true),
              {
                style: { maxWidth: "none", display: "block" },
              }
            )}
          >
            Search what is written
          </IconLink>
        </Stack>
        <Divider variant="light" />
        <Box px="none" py="2xs">
          <DemoSeeAlsoBlock />
        </Box>
      </Box>
    </FormContainer>
  );
};

const SearchPopover: React.FC = () => (
  <FormContainer>
    <TextFieldWithPopover placeholder="Search" prefixIcon={<SVGSearchThin />}>
      <Box px="3xs" component={Stack} direction="column" spacing="2xs">
        <Stack direction="column" spacing="4xs">
          <SearchList ariaLabel="Suggested options">
            <PresentationItem href="#">Result 1</PresentationItem>
            <PresentationItem aria-atomic="true" aria-label="Result 2" href="#">
              Result 2
            </PresentationItem>
            <PresentationItem href="https://www.lexus.com.au">Result 3</PresentationItem>
          </SearchList>
          <IconLink
            iconPosition="end"
            aria-label="Search what is written"
            href="https://www.lexus.com.au"
            {...mergeProps(
              getBoxProps({ px: "2xs", py: "xs" }),
              getSurfaceProps("none", undefined, true),
              {
                style: { maxWidth: "none", display: "block" },
              }
            )}
          >
            Search what is written
          </IconLink>
        </Stack>
        <Divider variant="light" />
        <DemoSeeAlsoBlock />
        <DemoMoreLinksBlock />
      </Box>
    </TextFieldWithPopover>
  </FormContainer>
);

export const DefaultWithSearchEnabled = Template.bind({});
DefaultWithSearchEnabled.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenuTrigger>
        <SearchPopover />
      </PrimaryNav.SearchMenuTrigger>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
  openSearchRowByDefault: true,
};
DefaultWithSearchEnabled.parameters = baseConfig.parameters;
DefaultWithSearchEnabled.decorators = baseConfig.decorators;

export const DefaultWithTwoStepSearchEnabled = Template.bind({});
DefaultWithTwoStepSearchEnabled.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenu>
        <SearchMenu />
      </PrimaryNav.SearchMenu>
      <PrimaryNav.SearchMenuTrigger>
        <SearchTrigger />
      </PrimaryNav.SearchMenuTrigger>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
  openSearchRowByDefault: true,
};
DefaultWithTwoStepSearchEnabled.parameters = baseConfig.parameters;
DefaultWithTwoStepSearchEnabled.decorators = baseConfig.decorators;

export const DefaultLoggedIn = Template.bind({});
DefaultLoggedIn.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
};
DefaultLoggedIn.parameters = baseConfigLoggedIn.parameters;
DefaultLoggedIn.decorators = baseConfigLoggedIn.decorators;

export const DefaultLoggedInWithSearchEnabled = Template.bind({});
DefaultLoggedInWithSearchEnabled.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenuTrigger>
        <SearchPopover />
      </PrimaryNav.SearchMenuTrigger>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
};
DefaultLoggedInWithSearchEnabled.parameters = baseConfigLoggedIn.parameters;
DefaultLoggedInWithSearchEnabled.decorators = baseConfigLoggedIn.decorators;

export const LongText = Template.bind({});
// Tried structuredClone, but it doesn't exist on Chromatic, probably they run Node below 17

const LONG_TEXT_DATA = JSON.parse(
  JSON.stringify(PRIMARY_NAV_SAMPLE_DATA)
) as typeof PRIMARY_NAV_SAMPLE_DATA;

if (LONG_TEXT_DATA.mainMenu) {
  LONG_TEXT_DATA.mainMenu.menus = PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG_INCLUDING_SPECIAL_ITEMS;
}

LongText.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  ...LONG_TEXT_DATA,
};

LongText.parameters = baseConfig.parameters;
LongText.decorators = baseConfig.decorators;

export const LongTextWithSearchEnabled = Template.bind({});
LongTextWithSearchEnabled.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  ...LONG_TEXT_DATA,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenuTrigger>
        <SearchPopover />
      </PrimaryNav.SearchMenuTrigger>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
};
LongTextWithSearchEnabled.parameters = baseConfig.parameters;
LongTextWithSearchEnabled.decorators = baseConfig.decorators;

export const NoDealerName = Template.bind({});
NoDealerName.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  overrideDataMainMenuLogo: "SVGLexusLogoWithTagline",
  overrideDataMainMenuLogoMobile: "SVGLexusLogoWithTagline",
};
NoDealerName.parameters = baseConfig.parameters;
NoDealerName.decorators = baseConfig.decorators;

export const WithOpenMobileMenuModal = Template.bind({});
WithOpenMobileMenuModal.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "mobile-menu",
};
WithOpenMobileMenuModal.parameters = baseConfigMobile.parameters;
WithOpenMobileMenuModal.decorators = baseConfigMobile.decorators;

export const WithOpenMobileMenuModalWithSearchEnabled = Template.bind({});
WithOpenMobileMenuModalWithSearchEnabled.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "mobile-menu",
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenuTrigger>
        <SearchPopover />
      </PrimaryNav.SearchMenuTrigger>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
};
WithOpenMobileMenuModalWithSearchEnabled.parameters = baseConfigMobile.parameters;
WithOpenMobileMenuModalWithSearchEnabled.decorators = baseConfigMobile.decorators;

export const WithOpenDealershipMenuModal = Template.bind({});
WithOpenDealershipMenuModal.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "dealer",
};
WithOpenDealershipMenuModal.parameters = baseConfig.parameters;
WithOpenDealershipMenuModal.decorators = [
  ...baseConfig.decorators,
  (Story) => {
    // Force dealership to have open hours in story
    // reset mock after generating rendered component
    MockDate.set("2024-05-28");

    const rendered = <Story />;

    MockDate.reset();

    return rendered;
  },
];

export const WithOpenVehiclesMenuModal = Template.bind({});
WithOpenVehiclesMenuModal.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "models",
};

WithOpenVehiclesMenuModal.parameters = baseConfig.parameters;
WithOpenVehiclesMenuModal.decorators = baseConfig.decorators;

export const WithOpenGenericModal = Template.bind({});
WithOpenGenericModal.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "gen1",
};
WithOpenGenericModal.parameters = baseConfig.parameters;
WithOpenGenericModal.decorators = baseConfig.decorators;

export const WithOpenEncoreModalLoggedOut = Template.bind({});
WithOpenEncoreModalLoggedOut.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "encore",
};
WithOpenEncoreModalLoggedOut.parameters = baseConfig.parameters;
WithOpenEncoreModalLoggedOut.decorators = baseConfig.decorators;

export const WithOpenEncoreModalLoggedIn = Template.bind({});
WithOpenEncoreModalLoggedIn.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  initialOpenModalId: "encore",
};
WithOpenEncoreModalLoggedIn.parameters = baseConfigLoggedIn.parameters;
WithOpenEncoreModalLoggedIn.decorators = baseConfigLoggedIn.decorators;

const QuickBookModalContent: React.FC = () => {
  const { onClose } = usePrimaryNavQuickBookContext();

  return (
    <Stack direction="column" spacing="none">
      <Stack component={Box} px="l" py="xs" justifyContent="flex-end">
        <IconButton
          aria-label="close button"
          data-testid={`lk-iconButton`}
          icon={<SVGCross width={16} height={16} />}
          onClick={() => onClose(false)}
          className={styles.quickBookCloseButton}
        />
      </Stack>
      <Box px="s">
        <Typography variant="h3">This is quick book placeholder</Typography>
      </Box>
    </Stack>
  );
};

const QuickBookModal: React.FC = () => (
  <Oriented defaultOrientation="landscape">
    <Oriented.Landscape>
      <Container style={{ width: "360px" }} maxWidth="4col">
        <QuickBookModalContent />
      </Container>
    </Oriented.Landscape>
    <Oriented.Portrait>
      <Container style={{ width: "100vw" }} maxWidth="12col">
        <QuickBookModalContent />
      </Container>
    </Oriented.Portrait>
  </Oriented>
);

export const DefaultWithQuickBookEnabled = Template.bind({});
DefaultWithQuickBookEnabled.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenuTrigger>
        <SearchPopover />
      </PrimaryNav.SearchMenuTrigger>
      <PrimaryNav.QuickBookModal>
        <QuickBookModal />
      </PrimaryNav.QuickBookModal>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
  quickBookSettings: {
    quickBookButtonLabel: "Quick book",
  },
};
DefaultWithQuickBookEnabled.parameters = baseConfig.parameters;
DefaultWithQuickBookEnabled.decorators = baseConfig.decorators;

export const WithBreadcrumbs = Template.bind({});
WithBreadcrumbs.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.FixedChildren>
        <Breadcrumbs
          items={[{ href: "#1", label: "News" }, { label: "Synthesis of Personal Luxury" }]}
        />
      </PrimaryNav.FixedChildren>
    </>,
    []
  ),
};
WithBreadcrumbs.parameters = baseConfig.parameters;
WithBreadcrumbs.decorators = baseConfig.decorators;

export const WithBreadcrumbsAndQuickBookAndSearch = Template.bind({});
WithBreadcrumbsAndQuickBookAndSearch.args = {
  ...PRIMARY_NAV_DEFAULT_ARGS,
  children: getValidReactChildrenOrDefault(
    <>
      <PrimaryNav.FixedChildren>
        <Breadcrumbs
          items={[{ href: "#1", label: "News" }, { label: "Synthesis of Personal Luxury" }]}
        />
      </PrimaryNav.FixedChildren>
      <PrimaryNav.SearchPopover>
        <SearchPopover />
      </PrimaryNav.SearchPopover>
      <PrimaryNav.SearchMenuTrigger>
        <SearchPopover />
      </PrimaryNav.SearchMenuTrigger>
      <PrimaryNav.QuickBookModal>
        <QuickBookModal />
      </PrimaryNav.QuickBookModal>
    </>,
    []
  ),
  searchSettings: {
    showSearch: true,
  },
  quickBookSettings: {
    quickBookButtonLabel: "Quick book",
  },
};
WithBreadcrumbsAndQuickBookAndSearch.parameters = baseConfig.parameters;
WithBreadcrumbsAndQuickBookAndSearch.decorators = baseConfig.decorators;
