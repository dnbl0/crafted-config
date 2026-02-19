// TODO: Point to Prod environment once LEXNW-378 is deployed for lexus-spa-app
import appStoreIcon from "@/assets/stories/app-store-icon.png";
import diagnosticImage from "@/assets/stories/diagnostic-image.jpg";
import encoreAdvertImage from "@/assets/stories/encore-app.png";
import googlePlayIcon from "@/assets/stories/google-play-icon.png";
import lexusDealerLargeSvg from "@/assets/stories/lexus-dealer-large.svg";
import lexusDealerSmallSvg from "@/assets/stories/lexus-dealer-small.svg";
import lexusLogoSvg from "@/assets/stories/lexus-logo.svg";
import vehiclePlaceholder from "@/assets/stories/vehicle-placeholder.png";

import { ENCORE_URL } from "./authentication-stories-data";
import { PrimaryNavProps } from "../PrimaryNav";
import { PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA } from "../PrimaryNavStaticLinks/PrimaryNavStaticLinks.stories.data";
import {
  MainMenuType,
  MenuItemData,
  MenuItemType,
  ModalDataType,
  PrimaryNavData,
} from "../types/PrimaryNav.types";
import { BodyTypeData, ModelData } from "../types/PrimaryNav.types";

const BODYTYPE_SUV_SAMPLE_DATA: ModelData[] = [
  {
    displayName: "UX",
    bodyType: "SUV",
    modelName: "Compact SUV",
    fuelTypes: ["Petrol", "Hybrid", "Electric"],
    seats: ["5"],
    lifestyle: "off-road",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/ux/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/ux",
    },
    contentPath: "/models/ux",
    hideFromMenu: false,
  },
  {
    displayName: "NX",
    bodyType: "SUV",
    modelName: "Medium SUV",
    fuelTypes: ["Petrol", "Hybrid", "Plug-in Hybrid"],
    seats: ["5"],
    lifestyle: "off-road",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/nx/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/nx",
    },
    contentPath: "/models/nx",
    hideFromMenu: false,
  },
  {
    displayName: "LBX",
    bodyType: "SUV",
    modelName: "Compact SUV",
    fuelTypes: ["Hybrid"],
    seats: ["5"],
    lifestyle: "off-road",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/lbx/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/lbx",
    },
    contentPath: "/models/lbx",
    hideFromMenu: false,
  },
  {
    displayName: "GX",
    bodyType: "SUV",
    modelName: "Large SUV",
    fuelTypes: ["Petrol"],
    seats: ["5", "7"],
    lifestyle: "off-road",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/gx/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/gx",
    },
    contentPath: "/models/gx",
    hideFromMenu: false,
  },
  {
    displayName: "LX",
    bodyType: "SUV",
    modelName: "Large SUV",
    fuelTypes: ["Petrol", "Diesel"],
    seats: ["4", "5", "7"],
    lifestyle: "off-road",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/lx/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/lx",
    },
    contentPath: "/models/lx",
    hideFromMenu: false,
  },
];

const BODYTYPE_SEDAN_SAMPLE_DATA: ModelData[] = [
  {
    displayName: "ES",
    bodyType: "Sedan",
    modelName: "Medium Sedan",
    fuelTypes: ["Petrol", "Hybrid"],
    seats: ["5"],
    lifestyle: "city",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/es/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/es",
    },
    contentPath: "/models/es",
    hideFromMenu: false,
  },
  {
    displayName: "LS",
    bodyType: "Sedan",
    modelName: "Flagship Luxury Sedan",
    fuelTypes: ["Petrol", "Hybrid"],
    seats: ["5"],
    lifestyle: "city",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/ls/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/ls",
    },
    contentPath: "/models/ls",
    hideFromMenu: false,
  },
];

const BODYTYPE_COUPE_SAMPLE_DATA: ModelData[] = [
  {
    displayName: "LC",
    bodyType: "Coupe",
    modelName: "Flagship Luxury Coupe",
    fuelTypes: ["Petrol", "Hybrid"],
    seats: ["4"],
    lifestyle: "city",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/lc/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/lc",
    },
    contentPath: "/models/lc",
    hideFromMenu: false,
  },
  {
    displayName: "LC Convertible",
    bodyType: "Coupe",
    modelName: "Flagship Luxury Convertible",
    fuelTypes: ["Petrol"],
    seats: ["4"],
    lifestyle: "city",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/lc-convertible/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/lc-convertible",
    },
    contentPath: "/models/lc-convertible",
    hideFromMenu: false,
  },
];

const BODYTYPE_MOVER_SAMPLE_DATA: ModelData[] = [
  {
    displayName: "LM",
    bodyType: "Mover",
    modelName: "Flagship Luxury Mover",
    fuelTypes: ["Hybrid"],
    seats: ["4", "7"],
    lifestyle: "city",
    displayImage: { src: vehiclePlaceholder },
    backgroundImage: { src: diagnosticImage },
    cta1: {
      label: "Discover",
      url: "/models/lm/overview",
    },
    cta2: {
      label: "Build",
      url: "/models/build-and-price/lm",
    },
    contentPath: "/models/lm",
    hideFromMenu: false,
  },
];

export const BODYTYPE_SAMPLE_DATA: BodyTypeData[] = [
  {
    displayName: "SUV",
    cta: { url: "/models/suv", label: "Explore SUV range" },
    models: [...BODYTYPE_SUV_SAMPLE_DATA],
  },
  {
    displayName: "Sedan",
    cta: { url: "/models/sedan", label: "Explore Sedan range" },
    models: [...BODYTYPE_SEDAN_SAMPLE_DATA],
  },
  {
    displayName: "Coupe",
    cta: { url: "/models/coupe", label: "Explore Coupe range" },
    models: [...BODYTYPE_COUPE_SAMPLE_DATA],
  },
  {
    displayName: "Mover",
    cta: { url: "/models/mover", label: "Explore Mover range" },
    models: [...BODYTYPE_MOVER_SAMPLE_DATA],
  },
];

export const SVG_IMAGE_DATA = {
  svgLexusDealerLogoWithTagline: {
    src: lexusDealerLargeSvg,
    alt: "Lexus Dealer Logo With Tagline",
  },
  svgLexusDealerLogoWithoutTagline: {
    src: lexusDealerSmallSvg,
    alt: "Lexus Dealer Logo Without Tagline",
  },
  svgLexusLogoWithTagline: {
    src: lexusLogoSvg,
    alt: "Lexus Logo With Tagline",
  },
} as const;

const DEALER_MENU_LINKS_SAMPLE_DATA: MenuItemData[] = [
  {
    link: { label: "About", url: "https://lexus.com.au", target: "_self" },
  },
  {
    link: { label: "Preowned Vehicles", url: "https://stock.citylexus.com.au/", target: null },
  },
  {
    link: { label: "Request a Test Drive", url: "https://lexus.com.au/", target: null },
  },
];

const GENERIC_MENU_SAMPLE_DATA1_WITH_SUBITEMS: MenuItemData[] = [
  {
    link: { label: "Gen 1 Link 1 Sub Link 1", url: "http://lexus.com.au" },
  },
];

const GENERIC_MENU_SAMPLE_DATA2_WITH_SUBITEMS: MenuItemData[] = [
  { link: { label: "Gen 1 Link 2 Sub Link 1", url: "http://lexus.com.au" } },
  { link: { label: "Gen 1 Link 2 Sub Link 2", url: "http://lexus.com.au" } },
  { link: { label: "Gen 1 Link 2 Sub Link 3", url: "http://lexus.com.au" } },
  { link: { label: "Gen 1 Link 2 Sub Link 4", url: "http://lexus.com.au" } },
  { link: { label: "Gen 1 Link 2 Sub Link 5", url: "http://lexus.com.au" } },
];

const ENCORE_MENU_LINKS_SAMPLE_DATA: MenuItemData[] = [
  {
    link: {
      label: "My Encore",
      url: ENCORE_URL,
    },
  },
  {
    link: {
      label: "My Vehicle",
      url: `${ENCORE_URL}vehicle`,
    },
  },
  {
    link: {
      label: "My Details",
      url: `${ENCORE_URL}account-settings/account-details`,
    },
  },
];

export const PRIMARY_NAV_SAMPLE_DATA: PrimaryNavData = {
  logoLarge: {
    src: lexusDealerLargeSvg,
    alt: "Lexus Australia",
  },
  logoSmall: {
    src: lexusDealerSmallSvg,
    alt: "Lexus Australia",
  },
  mainMenu: {
    menuType: MainMenuType.MAIN_MENU,
    menuTextMobile: "Menu",
    closeText: "Close",
    menus: [
      {
        type: ModalDataType.DEALER,
        menuId: "dealer",
        label: "Our Dealership",
        mobileLabel: "Dealership",
        menuItems: [...DEALER_MENU_LINKS_SAMPLE_DATA],
      },
      {
        type: ModalDataType.MODELS,
        menuId: "models",
        label: "Our Vehicles",
        mobileLabel: "Vehicles",
        filterButtonText: "Filter",
        applyFilterButtonText: "Apply",
        resetFilterButtonText: "Reset",
        clearCtaText: "Clear",
        showCtaText: "Show",
        scrollIndicatorDescription: "Swipe to view more",
        availableBodyTypes: [...BODYTYPE_SAMPLE_DATA],
        fuelFilterLabel: "fuel type",
        seatsFilterLabel: "seats",
        lifestyleFilterLabel: "lifestyle",
        hideFuelFilter: false,
        hideLifestyleFilter: false,
        hideSeatsFilter: false,
      },
      {
        type: ModalDataType.GENERIC,
        menuId: "gen1",
        label: "Buyer's Guide",
        mobileLabel: "Guide",
        menuItems: [
          {
            type: MenuItemType.WITHCHILDREN,
            name: "Lexus Encore Benefits",
            menuItems: [...GENERIC_MENU_SAMPLE_DATA1_WITH_SUBITEMS],
          },
          {
            type: MenuItemType.WITHCHILDREN,
            name: "Finance",
            menuItems: [...GENERIC_MENU_SAMPLE_DATA2_WITH_SUBITEMS],
          },
          {
            type: MenuItemType.LEAF,
            link: {
              label: "Recall",
              url: "https://www.lexus.com.au/owners/recalls",
              target: null,
            },
          },
        ],
      },
      {
        type: ModalDataType.GENERIC,
        menuId: "gen2",
        label: "Owner's Hub",
        menuItems: [
          {
            type: MenuItemType.WITHCHILDREN,
            name: "Gen 2 Link 1 (has subitems)",
            menuItems: [...GENERIC_MENU_SAMPLE_DATA1_WITH_SUBITEMS],
          },
        ],
      },
      {
        type: ModalDataType.GENERIC,
        menuId: "gen3",
        label: "The Lexus Difference",
        menuItems: [
          {
            type: MenuItemType.WITHCHILDREN,
            name: "Gen 3 Link 1 (has subitems)",
            menuItems: [...GENERIC_MENU_SAMPLE_DATA1_WITH_SUBITEMS],
          },
        ],
      },
      {
        type: ModalDataType.ENCORE,
        menuId: "encore",
        label: "Encore Log In",
        mobileLabel: "Encore Log In",
        menuItems: [...ENCORE_MENU_LINKS_SAMPLE_DATA],
        logoutLabel: "Sign Out",
        encoreAdvert: {
          title: "Lexus Encore App",
          description:
            "The Lexus App allows you to control your ownership experience from your computer or smart device. Manage your personal details and preferences, view the details of your vehicles, and easily access your lifestyle benefits and exclusive offers.",
          googlePlayImageUrl: googlePlayIcon,
          googlePlayImageAlt: "Google Play",
          googlePlayLinkUrl:
            "https://play.google.com/store/apps/details?id=au.com.lexus.mylexus.app",
          googlePlayLinkTarget: "_blank",
          appStoreImageUrl: appStoreIcon,
          appStoreImageAlt: "App Store",
          appStoreLinkUrl: "https://apps.apple.com/au/app/lexus/id1480479318",
          appStoreLinkTarget: "_blank",
          heroImageUrl: encoreAdvertImage,
          heroImageAlt: "Encore App",
          ctaLabel: "Learn More",
          ctaUrl: "https://www.lexus.com.au/owners/owners",
          ctaTarget: "_blank",
        },
      },
    ],
  },
  staticLinks: [
    {
      menuType: MainMenuType.STATIC_LINKS,
      usedByEncore: false,
      links: [...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA],
    },
    {
      menuType: MainMenuType.STATIC_LINKS,
      usedByEncore: true,
      links: [
        {
          link: {
            label: "Logout",
            url: "https://account.lexus.com.au/signout",
            target: null,
          },
          icon: "locatorPin",
        },
      ],
    },
  ],
};

export const PRIMARY_NAV_DEFAULT_PROPS: PrimaryNavProps = {
  overrideDataMainMenuLogo: SVG_IMAGE_DATA.svgLexusDealerLogoWithTagline,
  overrideDataMainMenuLogoMobile: SVG_IMAGE_DATA.svgLexusDealerLogoWithoutTagline,
  ...PRIMARY_NAV_SAMPLE_DATA,
};

export const PRIMARY_NAV_DEFAULT_ARGS = {
  ...PRIMARY_NAV_DEFAULT_PROPS,
  overrideDataMainMenuLogo: "SVGLexusDealerLogoWithTagline",
  overrideDataMainMenuLogoMobile: "SVGLexusDealerLogoWithoutTagline",
};
