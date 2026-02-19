import { MainMenuType, MenuItemType, ModalDataType } from "./PrimaryNav.types";
// Do not use @/ alias, Rollup can't resolve it for zero output .ts files
import type { Dealer, DealerConfig } from "../../../types/dealer";
import type {
  GraphqlChildrenWrapper,
  GraphqlResultsWrapper,
  GenericData,
  LinkData,
  ImageDataDetailed,
  BooleanData,
  MultiListData,
  IconData,
  BooleanValueData,
  IntegerValueData,
} from "../../../types/graphqlResponse";

export type DealerConfigResponse = {
  item: GraphqlResultsWrapper<DealerConfig>;
};

export type DealerDataResponse = {
  dealers: Dealer[];
};

export type PrimaryNavSettingsRaw = {
  showSearch?: BooleanValueData;
  logoLarge?: ImageDataDetailed;
  logoSmall?: ImageDataDetailed;
  rfkId?: GenericData;
  resultsBlockAriaLabel?: GenericData;
  searchFieldPlaceholder?: GenericData;
  searchAllLinkText?: GenericData;
  maxPreviewResults?: IntegerValueData;
  searchSuggestionName?: GenericData;
  quickBookButtonLabel?: GenericData;
};

export type PrimaryNavRawData = {
  details: GraphqlChildrenWrapper<MainListRawItem>;
  settings?: PrimaryNavSettingsRaw;
};

export type MainListRawItem = MainMenuRawItem | StaticLinksRawItem | SearchQuickLinksRawItem;

export type MainMenuRawItem = {
  menuType: typeof MainMenuType.MAIN_MENU;

  /**
   * @deprecated Use `logoLarge` on PrimaryNavRawData instead
   */
  logo: ImageDataDetailed;

  /**
   * @deprecated Use `logoSmall` on PrimaryNavRawData instead
   */
  logoMobile: ImageDataDetailed;
  menuTextMobile: GenericData;
  closeText: GenericData;
  modalData: GraphqlResultsWrapper<ModalRawData>;
};

export type StaticLinksRawItem = {
  menuType: typeof MainMenuType.STATIC_LINKS;
  usedByEncore: BooleanData;
  staticLinks: GraphqlResultsWrapper<MenuItemWithIconRawData>;
};

export type SearchQuickLinksRawItem = {
  menuType: typeof MainMenuType.SEARCH_LINKS;
  displayName?: string;
  showWithResults?: BooleanValueData;
  showWithNoResults?: BooleanValueData;
  showWithBlankInput?: BooleanValueData;
  links: GraphqlResultsWrapper<MenuItemWithIconRawData>;
};

export type MenuRawItemData = {
  link?: LinkData;
};

export type MenuRawItemWithChildren = {
  type: typeof MenuItemType.WITHCHILDREN;
  name: string;
  menuItems?: GraphqlResultsWrapper<MenuRawItemData>;
};

export type MenuRawItemWithoutChildren = MenuRawItemData & {
  type: typeof MenuItemType.LEAF;
};

export type MenuItemWithIconRawData = MenuRawItemData & {
  icon?: IconData;
};

export type ModalBaseRawData = {
  modalId: string;
  displayName: string;
  linkTextMobile: GenericData;
};

export type ModelsModalRawData = ModalBaseRawData & {
  type: typeof ModalDataType.MODELS;
  filterButtonText: GenericData;
  applyFilterButtonText: GenericData;
  resetFilterButtonText: GenericData;
  clearCtaText: GenericData;
  showCtaText: GenericData;
  scrollIndicatorDescription: GenericData;
  availableBodyTypes: MultiListData<BodyTypeRawData>;
  fuelFilterLabel: GenericData;
  hideFuelFilter: BooleanData;
  seatsFilterLabel: GenericData;
  hideSeatsFilter: BooleanData;
  lifestyleFilterLabel: GenericData;
  hideLifestyleFilter: BooleanData;
};

export type ModalGenericRawData = ModalBaseRawData & {
  type: typeof ModalDataType.GENERIC;
  menuItems: GraphqlResultsWrapper<MenuRawItemTyped>;
};

type EncoreAdvertRawData = {
  heroTitle: GenericData;
  heroDescription: GenericData;
  heroImage: ImageDataDetailed;
  heroCta: LinkData;
  googlePlayImage: ImageDataDetailed;
  googlePlayLink: LinkData;
  appStoreImage: ImageDataDetailed;
  appStoreLink: LinkData;
};

export type ModalEncoreRawData = ModalBaseRawData &
  EncoreAdvertRawData & {
    logoutLabel: GenericData;
    type: typeof ModalDataType.ENCORE;
    menuItems: GraphqlResultsWrapper<MenuRawItemData>;
  };

export type ModalDealerRawData = ModalBaseRawData & {
  type: typeof ModalDataType.DEALER;
  menuItems: GraphqlResultsWrapper<MenuRawItemData>;
};

export type BodyTypeRawData = {
  displayName: string;
  cta: LinkData;
  models: GraphqlResultsWrapper<ModelRawData>;
};

export type ModelRawData = {
  displayName: string;
  bodyType: GenericData;
  modelName: GenericData;
  fuelTypes: MultiListData<GenericData<string>>;
  displayImage: ImageDataDetailed;
  backgroundImage: ImageDataDetailed;
  contentPath: GenericData;
  hideFromMenu: BooleanData;
  seats: MultiListData<GenericData<string>>;
  lifestyle: GenericData;
  cta1?: LinkData;
  cta2?: LinkData;
};

export type ModalRawData =
  | ModelsModalRawData
  | ModalGenericRawData
  | ModalEncoreRawData
  | ModalDealerRawData;

export type MenuRawItemTyped = MenuRawItemWithChildren | MenuRawItemWithoutChildren;

// Type guards

export const isMainMenuRaw = (item: MainListRawItem): item is MainMenuRawItem =>
  item.menuType === MainMenuType.MAIN_MENU;

export const isStaticLinksRaw = (item: MainListRawItem): item is StaticLinksRawItem =>
  item.menuType === MainMenuType.STATIC_LINKS;

export const isSearchQuickLinksRaw = (item: MainListRawItem): item is SearchQuickLinksRawItem =>
  item.menuType === MainMenuType.SEARCH_LINKS;
