import { AvailableIcons } from "@/components/SVGIcon/static/SVGSelector";
import type { LinkData, ImageData } from "@/types/graphqlResponse";

export const MODAL_TRANSITION_DURATION_MS = 300;
export const MODAL_CONTENT_TRANSITION_DURATION_MS = 300;
export const MODAL_SCROLL_OFFSET = 10;

export const MainMenuType = {
  MAIN_MENU: "MainMenu",
  STATIC_LINKS: "StaticLinks",
  SEARCH_LINKS: "SearchQuickLinks",
} as const;

export const ModalDataType = {
  MOBILE_MENU: "mobile-menu",
  SEARCH_MENU: "search-menu",
  DEALER: "DealerMenu",
  MODELS: "ModelsMenu",
  GENERIC: "C__MainMenuEntryLevel1",
  ENCORE: "EncoreMenu",
} as const;

export const MenuItemType = {
  WITHCHILDREN: "MainMenuEntryLevel2",
  LEAF: "NavigationLeafEntry",
} as const;

export const NavTagGroup = {
  BODY: "body",
  FUEL: "fuel",
} as const;

export type MenuTagData = {
  name: string;
  group: typeof NavTagGroup;
};

export type SearchSettings = {
  showSearch?: boolean;
  rfkId?: string;
  resultsBlockAriaLabel?: string;
  searchFieldPlaceholder?: string;
  searchAllLinkText?: string;
  searchSuggestionName?: string;
  maxPreviewResults?: number;
};

export type QuickBookSettings = {
  quickBookButtonLabel?: string;
};

export type PrimaryNavData = {
  staticLinks?: StaticLinksItem[];
  searchLinks?: SearchQuickLinksItem[];
  mainMenu?: MainMenuItem;
  logoLarge?: ImageData;
  logoSmall?: ImageData;
  searchSettings?: SearchSettings;
  offset?: number;
  quickBookSettings?: QuickBookSettings;
};

export type MainMenuItem = {
  menuType: typeof MainMenuType.MAIN_MENU;

  /**
   * @deprecated Use `logoLarge` on PrimaryNavData instead
   */
  logo?: ImageData;

  /**
   * @deprecated Use `logoSmall` on PrimaryNavData instead
   */
  logoMobile?: ImageData;
  menuTextMobile?: string;
  closeText?: string;
  menus: Menu[];
};

export type StaticLinksItem = {
  menuType: typeof MainMenuType.STATIC_LINKS;
  usedByEncore: boolean;
  links: MenuItemWithIconData[];
};

export type SearchQuickLinksItem = {
  menuType: typeof MainMenuType.SEARCH_LINKS;
  displayName: string | undefined;
  showWithResults: boolean;
  showWithNoResults: boolean;
  showWithBlankInput: boolean;
  links: MenuItemData[];
};

export type DealerData = {
  label: string;
  map: string; // TODO: Update to object { lat, lng } etc...
};

export type MenuItemData = {
  link?: LinkData;
  disabled?: boolean;
  onClick?: () => void;
};

export type EncoreAdvert = {
  title: string;
  description: string;
  googlePlayImageUrl?: string;
  googlePlayImageAlt?: string;
  googlePlayLinkUrl?: string;
  googlePlayLinkTarget?: string;
  appStoreImageUrl?: string;
  appStoreImageAlt?: string;
  appStoreLinkUrl?: string;
  appStoreLinkTarget?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  ctaTarget?: string;
};

export type MenuItemWithChildren = {
  type: typeof MenuItemType.WITHCHILDREN;
  name: string;
  menuItems?: MenuItemData[];
};

export type MenuItemWithoutChildren = MenuItemData & {
  type: typeof MenuItemType.LEAF;
};

export type MenuItemWithIconData = MenuItemData & {
  icon?: AvailableIcons;
};

export type BodyTypeData = {
  displayName: string;
  cta: LinkData;
  models: ModelData[];
};

export type ModelData = {
  displayName: string;
  bodyType: string;
  modelName?: string;
  fuelTypes: string[]; // for example: "Petrol" | "Hybrid" | "Electric", spelling and capitalisation might change
  displayImage: ImageData;
  backgroundImage: ImageData;
  contentPath?: string;
  hideFromMenu?: boolean;
  seats: string[];
  lifestyle: string; // for example: "city" or "off-road", spelling and capitalisation might change
  cta1: LinkData;
  cta2: LinkData;
};

export type BaseMenu = {
  menuId: string;
  label: string;
  mobileLabel?: string;
};

export type MobileMenu = BaseMenu & {
  type: typeof ModalDataType.MOBILE_MENU;
};

export type SearchMenu = BaseMenu & {
  type: typeof ModalDataType.SEARCH_MENU;
};

export type ModelsMenu = BaseMenu & {
  type: typeof ModalDataType.MODELS;
  filterButtonText: string;
  applyFilterButtonText: string;
  resetFilterButtonText: string;
  clearCtaText?: string;
  showCtaText?: string;
  scrollIndicatorDescription?: string;
  availableBodyTypes: BodyTypeData[];
  fuelFilterLabel: string;
  hideFuelFilter: boolean;
  seatsFilterLabel: string;
  hideSeatsFilter: boolean;
  lifestyleFilterLabel: string;
  hideLifestyleFilter: boolean;
};

export type GenericMenu = BaseMenu & {
  type: typeof ModalDataType.GENERIC;
  menuItems: MenuItemTyped[];
};

export type EncoreMenu = BaseMenu & {
  logoutLabel: string;
  type: typeof ModalDataType.ENCORE;
  menuItems: MenuItemData[];
  encoreAdvert?: EncoreAdvert;
};

export type DealerMenu = BaseMenu & {
  type: typeof ModalDataType.DEALER;
  menuItems: MenuItemData[];
};

export type Menu = ModelsMenu | GenericMenu | EncoreMenu | DealerMenu | MobileMenu | SearchMenu;

export type MenuItemTyped = MenuItemWithChildren | MenuItemWithoutChildren;

export interface PrimaryNavSlots {
  searchPopover: React.ReactNode | undefined;
  searchMenu: React.ReactNode | undefined;
  searchMenuTrigger: React.ReactNode | undefined;
  quickBookModal: React.ReactNode | undefined;
  fixedChildren: React.ReactNode | undefined;
}

export const isGenericMenu = (menu: Menu): menu is GenericMenu =>
  menu.type === ModalDataType.GENERIC;

export const isMenuItemWithChildren = (menuItem: MenuItemTyped): menuItem is MenuItemWithChildren =>
  menuItem.type === MenuItemType.WITHCHILDREN;
