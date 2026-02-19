import { GenericData, ImageData, ImageDataDetailed } from "@/types/graphqlResponse";

import {
  BodyTypeRawData,
  PrimaryNavRawData,
  MainMenuRawItem,
  StaticLinksRawItem,
  MenuItemWithIconRawData,
  MenuRawItemTyped,
  ModalRawData,
  ModelRawData,
  ModelsModalRawData,
  ModalGenericRawData,
  ModalEncoreRawData,
  ModalDealerRawData,
  isMainMenuRaw,
  isStaticLinksRaw,
  isSearchQuickLinksRaw,
  SearchQuickLinksRawItem,
  MenuRawItemData,
} from "../types/PrimaryNav.rawTypes";
import {
  BodyTypeData,
  MenuItemTyped,
  MenuItemData,
  MenuItemType,
  MenuItemWithIconData,
  PrimaryNavData,
  MainMenuType,
  ModalDataType,
  Menu,
  ModelData,
  MainMenuItem,
  StaticLinksItem,
  ModelsMenu,
  GenericMenu,
  EncoreMenu,
  DealerMenu,
  SearchQuickLinksItem,
} from "../types/PrimaryNav.types";

export const menuItemDataToMenuItemTyped = (menuItem: MenuItemData): MenuItemTyped => ({
  ...menuItem,
  type: MenuItemType.LEAF,
});

const normaliseMediaPath = (p?: string): string | undefined => (p?.startsWith("-/") ? "/" + p : p);

export const imageDataDetailedToImageData = (rawImageData: ImageDataDetailed): ImageData => ({
  src: normaliseMediaPath(rawImageData?.jsonValue?.value?.src) ?? rawImageData?.src,
  alt: rawImageData?.alt,
});

const getMainMenuRawData = (data: PrimaryNavRawData) =>
  data.details.children.results.find(isMainMenuRaw);

const toMenuItemTyped = (raw: MenuRawItemTyped): MenuItemTyped => {
  switch (raw.type) {
    case MenuItemType.WITHCHILDREN:
      return {
        ...raw,
        menuItems: raw.menuItems?.results,
      };
    case MenuItemType.LEAF:
      return {
        ...raw,
      };
  }
};

const toString = (raw: GenericData): string => raw.value || "";

export const toModelData = (raw: ModelRawData): ModelData => ({
  ...raw,
  backgroundImage: imageDataDetailedToImageData(raw.backgroundImage),
  displayImage: imageDataDetailedToImageData(raw.displayImage),
  bodyType: raw.bodyType?.value || "",
  modelName: raw.modelName?.value,
  fuelTypes: raw.fuelTypes.targetItems.map(toString),
  lifestyle: raw.lifestyle?.value || "",
  seats: raw.seats.targetItems.map(toString),
  contentPath: raw.contentPath?.value,
  hideFromMenu: raw.hideFromMenu?.value,
  cta1: raw.cta1 || { url: "", label: "" },
  cta2: raw.cta2 || { url: "", label: "" },
});

const toBodyTypeData = (raw: BodyTypeRawData): BodyTypeData => ({
  ...raw,
  models: raw.models.results.map(toModelData),
});

const toModelsModalData = (raw: ModelsModalRawData): ModelsMenu => ({
  ...raw,
  menuId: raw.modalId,
  label: raw.displayName,
  mobileLabel: raw.linkTextMobile?.value,
  filterButtonText: raw.filterButtonText?.value || "",
  applyFilterButtonText: raw.applyFilterButtonText?.value || "",
  resetFilterButtonText: raw.resetFilterButtonText?.value || "",
  clearCtaText: raw.clearCtaText?.value,
  showCtaText: raw.showCtaText?.value,
  scrollIndicatorDescription: raw.scrollIndicatorDescription?.value,
  availableBodyTypes: raw.availableBodyTypes.targetItems?.map(toBodyTypeData),
  fuelFilterLabel: raw.fuelFilterLabel?.value || "",
  seatsFilterLabel: raw.seatsFilterLabel?.value || "",
  lifestyleFilterLabel: raw.lifestyleFilterLabel?.value || "",
  hideFuelFilter: raw.hideFuelFilter.value || false,
  hideSeatsFilter: raw.hideSeatsFilter.value || false,
  hideLifestyleFilter: raw.hideLifestyleFilter.value || false,
});

const toModalGenericData = (raw: ModalGenericRawData): GenericMenu => ({
  ...raw,
  menuId: raw.modalId,
  label: raw.displayName,
  mobileLabel: raw.linkTextMobile?.value,
  menuItems: raw.menuItems.results.map(toMenuItemTyped),
});

const toModalEncoreData = (raw: ModalEncoreRawData): EncoreMenu => ({
  ...raw,
  menuId: raw.modalId,
  label: raw.displayName,
  mobileLabel: raw.linkTextMobile?.value,
  menuItems: raw.menuItems.results,
  logoutLabel: raw.logoutLabel?.value || "",
  encoreAdvert: {
    title: raw.heroTitle?.value || "",
    description: raw.heroDescription?.value || "",
    googlePlayImageUrl:
      (normaliseMediaPath(raw.googlePlayImage?.jsonValue?.value?.src) ??
        raw.googlePlayImage?.src) ||
      undefined,
    googlePlayImageAlt: raw.googlePlayImage?.alt,
    googlePlayLinkUrl: raw.googlePlayLink?.url,
    googlePlayLinkTarget: raw.googlePlayLink?.target || "_self",
    appStoreImageUrl:
      (normaliseMediaPath(raw.appStoreImage?.jsonValue?.value?.src) ?? raw.appStoreImage?.src) ||
      undefined,
    appStoreImageAlt: raw.appStoreImage?.alt,
    appStoreLinkUrl: raw.appStoreLink?.url,
    appStoreLinkTarget: raw.appStoreLink?.target || "_self",
    heroImageUrl:
      (normaliseMediaPath(raw.heroImage?.jsonValue?.value?.src) ?? raw.heroImage?.src) || undefined,
    heroImageAlt: raw.heroImage?.alt,
    ctaLabel: raw.heroCta?.label || undefined,
    ctaTarget: raw.heroCta?.target || "_self",
    ctaUrl: raw.heroCta?.url,
  },
});

const toModalDealerData = (raw: ModalDealerRawData): DealerMenu => ({
  ...raw,
  menuId: raw.modalId,
  label: raw.displayName,
  mobileLabel: raw.linkTextMobile?.value,
  menuItems: raw.menuItems.results,
});

export const toModalData = (raw: ModalRawData): Menu => {
  switch (raw.type) {
    case ModalDataType.MODELS:
      return toModelsModalData(raw);
    case ModalDataType.GENERIC:
      return toModalGenericData(raw);
    case ModalDataType.ENCORE:
      return toModalEncoreData(raw);
    case ModalDataType.DEALER:
      return toModalDealerData(raw);
  }
};

export const convertToMainMenuItem = (rawMenuItem: MainMenuRawItem): MainMenuItem => ({
  menuType: MainMenuType.MAIN_MENU,
  logo: imageDataDetailedToImageData(rawMenuItem.logo),
  logoMobile: imageDataDetailedToImageData(rawMenuItem.logoMobile),
  menuTextMobile: rawMenuItem.menuTextMobile?.value,
  closeText: rawMenuItem.closeText?.value,
  menus: rawMenuItem.modalData.results.map(toModalData),
});

const toStaticLink = (raw: MenuItemWithIconRawData): MenuItemWithIconData => ({
  link: raw.link,
  icon: raw.icon?.value,
});

const toLink = (raw: MenuRawItemData): MenuItemData => ({
  link: raw.link,
});

export const convertToStaticLinksItem = (rawStaticLinks: StaticLinksRawItem): StaticLinksItem => {
  return {
    menuType: MainMenuType.STATIC_LINKS,
    usedByEncore: rawStaticLinks.usedByEncore?.value || false,
    links: rawStaticLinks.staticLinks.results.map(toStaticLink),
  };
};

export const convertToSearchLinksItem = (
  rawSearchLinks: SearchQuickLinksRawItem
): SearchQuickLinksItem => {
  return {
    menuType: MainMenuType.SEARCH_LINKS,
    displayName: rawSearchLinks.displayName || undefined,
    showWithResults: rawSearchLinks.showWithResults?.boolValue || false,
    showWithNoResults: rawSearchLinks.showWithNoResults?.boolValue || false,
    showWithBlankInput: rawSearchLinks.showWithBlankInput?.boolValue || false,
    links: rawSearchLinks.links.results.map(toLink),
  };
};

export const convertToPrimaryNavData = (rawData: PrimaryNavRawData): PrimaryNavData => {
  const mainMenuRaw = getMainMenuRawData(rawData);

  const { children } = rawData.details;
  const {
    logoLarge,
    logoSmall,
    showSearch,
    rfkId,
    maxPreviewResults,
    resultsBlockAriaLabel,
    searchAllLinkText,
    searchSuggestionName,
    searchFieldPlaceholder,
    quickBookButtonLabel,
  } = rawData.settings || {};

  const staticLinks = children.results.filter(isStaticLinksRaw).map(convertToStaticLinksItem);
  const mainMenu = mainMenuRaw ? convertToMainMenuItem(mainMenuRaw) : undefined;
  const searchLinks = children.results.filter(isSearchQuickLinksRaw).map(convertToSearchLinksItem);

  return {
    mainMenu,
    staticLinks,
    searchLinks,
    logoLarge: logoLarge ? imageDataDetailedToImageData(logoLarge) : undefined,
    logoSmall: logoSmall ? imageDataDetailedToImageData(logoSmall) : undefined,
    searchSettings: {
      showSearch: !!showSearch?.boolValue,
      rfkId: rfkId?.value,
      resultsBlockAriaLabel: resultsBlockAriaLabel?.value,
      searchAllLinkText: searchAllLinkText?.value,
      searchFieldPlaceholder: searchFieldPlaceholder?.value,
      searchSuggestionName: searchSuggestionName?.value,
      maxPreviewResults: maxPreviewResults?.intValue || undefined,
    },
    quickBookSettings: {
      quickBookButtonLabel: quickBookButtonLabel?.value,
    },
  };
};
