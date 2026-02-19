import {
  convertToPrimaryNavData,
  convertToStaticLinksItem,
  convertToMainMenuItem,
  toModalData,
  convertToSearchLinksItem,
} from "./PrimaryNav.mappers";
import {
  PrimaryNavRawData,
  StaticLinksRawItem,
  MainMenuRawItem,
  ModalGenericRawData,
  ModalEncoreRawData,
  ModalDealerRawData,
  SearchQuickLinksRawItem,
} from "../types/PrimaryNav.rawTypes";
import {
  MainMenuType,
  ModalDataType,
  GenericMenu,
  EncoreMenu,
  DealerMenu,
} from "../types/PrimaryNav.types";

import "@testing-library/jest-dom";

//#region tests for convertToPrimaryNavData
test("call convertToPrimaryNavData with empty PrimaryNavData", () => {
  const raw: PrimaryNavRawData = {
    details: {
      children: {
        results: [],
      },
    },
    settings: {
      maxPreviewResults: undefined,
      rfkId: undefined,
      logoLarge: undefined,
      logoSmall: undefined,
      showSearch: undefined,
    },
  };
  const data = convertToPrimaryNavData(raw);
  expect(data.mainMenu).toBeUndefined();
});

test("convertToPrimaryNavData process searchSettings", () => {
  const raw: PrimaryNavRawData = {
    details: {
      children: {
        results: [],
      },
    },
    settings: {
      maxPreviewResults: {
        intValue: 10,
      },
      rfkId: {
        value: "123",
      },
      logoLarge: {
        src: "large.png",
        alt: "Large",
      },
      logoSmall: {
        src: "small.png",
        alt: "Small",
      },
      showSearch: {
        boolValue: true,
      },
      resultsBlockAriaLabel: {
        value: "Results",
      },
      searchAllLinkText: {
        value: "All",
      },
      searchFieldPlaceholder: {
        value: "Search",
      },
      searchSuggestionName: {
        value: "Suggestion",
      },
    },
  };
  const data = convertToPrimaryNavData(raw);
  expect(data.searchSettings?.maxPreviewResults).toBe(10);
  expect(data.searchSettings?.rfkId).toBe("123");
  expect(data.logoLarge?.src).toBe("large.png");
  expect(data.logoLarge?.alt).toBe("Large");
  expect(data.logoSmall?.src).toBe("small.png");
  expect(data.logoSmall?.alt).toBe("Small");
  expect(data.searchSettings?.showSearch).toBeTruthy();
  expect(data.searchSettings?.resultsBlockAriaLabel).toBe("Results");
  expect(data.searchSettings?.searchAllLinkText).toBe("All");
  expect(data.searchSettings?.searchFieldPlaceholder).toBe("Search");
  expect(data.searchSettings?.searchSuggestionName).toBe("Suggestion");
});

test("convertToPrimaryNavData process quickBookSettings", () => {
  const raw: PrimaryNavRawData = {
    details: {
      children: {
        results: [],
      },
    },
    settings: {
      quickBookButtonLabel: {
        value: "Quick Book",
      },
    },
  };
  const data = convertToPrimaryNavData(raw);
  expect(data.quickBookSettings?.quickBookButtonLabel).toBe("Quick Book");
});

test("modal id will be passed into level1MenuItems", () => {
  const raw: PrimaryNavRawData = {
    details: {
      children: {
        results: [
          {
            menuType: MainMenuType.MAIN_MENU,
            logo: {
              src: "/",
            },
            logoMobile: {
              src: "/",
            },
            closeText: {},
            menuTextMobile: {},
            modalData: {
              results: [
                {
                  modalId: "123",
                  type: ModalDataType.GENERIC,
                  displayName: "TT",
                  linkTextMobile: {},
                  menuItems: {
                    results: [],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
  const data = convertToPrimaryNavData(raw);

  expect(data.mainMenu).toBeDefined();
  expect(data.mainMenu?.menus.length).toBe(1);
  expect(data.mainMenu?.menus[0].label).toEqual("TT");
});
//#endregion tests for convertToPrimaryNavData

//#region tests for convertToStaticLinksItem
test("call convertToStaticLinksItem without links", () => {
  const raw: StaticLinksRawItem = {
    menuType: MainMenuType.STATIC_LINKS,
    usedByEncore: {},
    staticLinks: {
      results: [],
    },
  };
  const data = convertToStaticLinksItem(raw);
  expect(data.usedByEncore).toBeFalsy();
  expect(data.links).toEqual([]);
});

test("It is ok to pass the string value into menuType", () => {
  const raw: StaticLinksRawItem = {
    menuType: "StaticLinks",
    usedByEncore: {},
    staticLinks: {
      results: [],
    },
  };
  expect(convertToStaticLinksItem(raw).menuType).toEqual(MainMenuType.STATIC_LINKS);
});

test("It is ok to pass the string value into menuType for SearchLinks", () => {
  const raw: SearchQuickLinksRawItem = {
    menuType: "SearchQuickLinks",
    displayName: "Test",
    links: {
      results: [],
    },
  };
  expect(convertToSearchLinksItem(raw).menuType).toEqual(MainMenuType.SEARCH_LINKS);
});

test("usedByEncore is true when the raw usedByEncore object contains a true value", () => {
  const raw: StaticLinksRawItem = {
    menuType: MainMenuType.STATIC_LINKS,
    usedByEncore: {
      value: true,
    },
    staticLinks: {
      results: [],
    },
  };
  expect(convertToStaticLinksItem(raw).usedByEncore).toBeTruthy();
});

test("show options are true when the raw Search Quick Links object contains a true values", () => {
  const raw: SearchQuickLinksRawItem = {
    menuType: MainMenuType.SEARCH_LINKS,
    showWithBlankInput: {
      boolValue: true,
    },
    showWithNoResults: {
      boolValue: true,
    },
    showWithResults: {
      boolValue: true,
    },
    links: {
      results: [],
    },
  };
  const result = convertToSearchLinksItem(raw);
  expect(result.showWithBlankInput).toBeTruthy();
  expect(result.showWithNoResults).toBeTruthy();
  expect(result.showWithResults).toBeTruthy();
});

test("Display Name processed when the raw Search Quick Links object contains a display name", () => {
  const raw: SearchQuickLinksRawItem = {
    menuType: MainMenuType.SEARCH_LINKS,
    displayName: "Test",
    links: {
      results: [],
    },
  };
  const result = convertToSearchLinksItem(raw);
  expect(result.displayName).toBe("Test");
});

test("usedByEncore is true when the raw usedByEncore object contains a true value", () => {
  const raw: StaticLinksRawItem = {
    menuType: MainMenuType.STATIC_LINKS,
    usedByEncore: {},
    staticLinks: {
      results: [
        {
          link: {
            label: "Test Link",
            url: "http://google.com",
          },
          icon: {
            value: "telephone",
          },
        },
      ],
    },
  };
  const data = convertToStaticLinksItem(raw);
  expect(data.links.length).toBe(1);
  expect(data.links[0].link?.label).toEqual("Test Link");
  expect(data.links[0].icon).toEqual("telephone");
});
//#endregion tests for convertToStaticLinksItem

//#region tests for convertToMainMenuItem
test("call convertToMainMenuItem to get general menu settings", () => {
  const raw: MainMenuRawItem = {
    menuType: MainMenuType.MAIN_MENU,
    logo: {
      src: "/home",
      alt: "Foo",
    },
    logoMobile: {
      src: "//abc.com/bcd.png",
      alt: "Abc",
    },
    closeText: {
      value: "Exit",
    },
    menuTextMobile: {
      value: "NavMenu",
    },
    modalData: {
      results: [],
    },
  };
  const data = convertToMainMenuItem(raw);
  expect(data.logo?.src).toEqual("/home");
  expect(data.logoMobile?.alt).toEqual("Abc");
  expect(data.closeText).toEqual("Exit");
  expect(data.menus).toEqual([]);
});
//#endregion tests for convertToMainMenuItem

//#region tests for toModalGenericData
test("test data conversion for modal generic data", () => {
  const raw: ModalGenericRawData = {
    type: ModalDataType.GENERIC,
    modalId: "101",
    displayName: "Buyer's Guide",
    linkTextMobile: {
      value: "Guide",
    },
    menuItems: {
      results: [],
    },
  };
  const data = toModalData(raw);
  expect(data.label).toEqual("Buyer's Guide");
  expect(data.mobileLabel).toEqual("Guide");
  expect((data as GenericMenu).menuItems).toEqual([]);
});
//#endregion tests for toModalGenericData

//#region tests for toModalEncoreData
test("test data conversion for encore data", () => {
  const raw: ModalEncoreRawData = {
    logoutLabel: {
      value: "Sign Out",
    },
    type: ModalDataType.ENCORE,
    modalId: "104",
    displayName: "Encore Log In",
    linkTextMobile: {
      value: "Log In",
    },
    menuItems: {
      results: [],
    },
    heroTitle: { value: "Lexus Encore App" },
    heroDescription: { value: "Please download the Lexus Encore App" },
    googlePlayImage: {
      src: "google-play.png",
      alt: "Google Play",
    },
    googlePlayLink: {
      target: "_google-play",
      url: "/google-play",
      label: null,
    },
    appStoreLink: {
      target: "_app-store",
      url: "/app-store",
      label: null,
    },
    appStoreImage: {
      src: "app-store.png",
      alt: "App Store",
    },
    heroCta: {
      target: "_blank",
      url: "/encore",
      label: "Learn More",
    },
    heroImage: {
      src: "encore.png",
      alt: "Encore App",
    },
  };
  const data = toModalData(raw);
  expect(data.label).toEqual("Encore Log In");
  expect(data.mobileLabel).toEqual("Log In");

  const encoreData = data as EncoreMenu;
  expect(encoreData.logoutLabel).toEqual("Sign Out");
  expect(encoreData?.encoreAdvert?.title).toEqual("Lexus Encore App");
  expect(encoreData?.encoreAdvert?.description).toEqual("Please download the Lexus Encore App");
  expect(encoreData?.encoreAdvert?.googlePlayImageUrl).toEqual("google-play.png");
  expect(encoreData?.encoreAdvert?.googlePlayImageAlt).toEqual("Google Play");
  expect(encoreData?.encoreAdvert?.googlePlayLinkUrl).toEqual("/google-play");
  expect(encoreData?.encoreAdvert?.googlePlayLinkTarget).toEqual("_google-play");
  expect(encoreData?.encoreAdvert?.appStoreImageUrl).toEqual("app-store.png");
  expect(encoreData?.encoreAdvert?.appStoreImageAlt).toEqual("App Store");
  expect(encoreData?.encoreAdvert?.appStoreLinkUrl).toEqual("/app-store");
  expect(encoreData?.encoreAdvert?.appStoreLinkTarget).toEqual("_app-store");
  expect(encoreData?.encoreAdvert?.heroImageUrl).toEqual("encore.png");
  expect(encoreData?.encoreAdvert?.heroImageAlt).toEqual("Encore App");
  expect(encoreData?.encoreAdvert?.ctaUrl).toEqual("/encore");
  expect(encoreData?.encoreAdvert?.ctaLabel).toEqual("Learn More");
  expect(encoreData?.encoreAdvert?.ctaTarget).toEqual("_blank");
});
//#endregion tests for toModalEncoreData

//#region tests for toModalDealerData
test("test data conversion for dealer data", () => {
  const raw: ModalDealerRawData = {
    type: ModalDataType.DEALER,
    modalId: "105",
    displayName: "Dealership",
    linkTextMobile: {
      value: "Dealer",
    },
    menuItems: {
      results: [],
    },
  };
  const data = toModalData(raw);
  expect(data.label).toEqual("Dealership");
  expect(data.mobileLabel).toEqual("Dealer");
  expect((data as DealerMenu).menuItems).toEqual([]);
});
//#endregion tests for toModalDealerData
