import { MenuItemTyped, MenuItemType } from "../../types/PrimaryNav.types";

export const PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF: MenuItemTyped[] = [
  {
    type: MenuItemType.LEAF,
    link: {
      label: "Our Vehicles",
      target: "_self",
      url: "http://lexus.com.au",
    },
  },
  {
    type: MenuItemType.LEAF,
    link: {
      label: "Buyer’s Guide",
      url: "http://lexus.com.au",
    },
  },
  {
    type: MenuItemType.LEAF,
    link: {
      label: "Owner’s Hub",
      url: "http://lexus.com.au",
    },
  },
  {
    type: MenuItemType.LEAF,
    link: {
      label: "The Lexus Difference",
      url: "http://lexus.com.au",
    },
  },
];

export const PRIMARY_NAV_ITEMS_SAMPLE_DATA_LEAF_WITH_ITEMS_DISABLED: MenuItemTyped[] = [
  {
    type: MenuItemType.LEAF,
    link: {
      label: "Our Vehicles",
      target: "_self",
      url: "http://lexus.com.au",
    },
  },
  {
    type: MenuItemType.LEAF,
    disabled: true,
    link: {
      label: "Buyer’s Guide",
      url: "http://lexus.com.au",
    },
  },
  {
    type: MenuItemType.LEAF,
    disabled: true,
    link: {
      label: "Owner’s Hub",
      url: "http://lexus.com.au",
    },
  },
  {
    type: MenuItemType.LEAF,
    link: {
      label: "The Lexus Difference",
      url: "http://lexus.com.au",
    },
  },
];

export const PRIMARY_NAV_ITEMS_SAMPLE_DATA_WITH_CHILDREN: MenuItemTyped[] = [
  {
    type: MenuItemType.WITHCHILDREN,
    name: "Our Vehicles",
  },
  {
    name: "Buyer’s Guide",
    type: MenuItemType.WITHCHILDREN,
  },
  {
    name: "Owner’s Hub",
    type: MenuItemType.WITHCHILDREN,
  },
  {
    name: "The Lexus Difference",
    type: MenuItemType.WITHCHILDREN,
  },
];
