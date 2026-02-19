import { Menu, ModalDataType } from "../types/PrimaryNav.types";

// IdToken with name: LexusKit, first_name: Lexus, given_name: Kit, no expiry
export const IDTOKEN_SAMPLE_DATA =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik" +
  "xleHVzS2l0IiwiZ2l2ZW5fbmFtZSI6IkxleHVzIiwiZmFtaWx5X25hbWUiOiJLaXQiLCJpYXQiO" +
  "jE1MTYyMzkwMjIsImV4cCI6OTk5OTk5OTk5OX0.HotVUhatzilND3vWMERT3Hp5xO2IuDWA6q_FiGgk2uY";

export const PRIMARY_NAV_LEVEL_1_SAMPLE_DATA: Menu[] = [
  {
    type: ModalDataType.DEALER,
    label: "Our Dealership",
    mobileLabel: "Dealership",
    menuId: "dealer",
    menuItems: [],
  },
  {
    type: ModalDataType.MODELS,
    label: "Our Vehicles",
    mobileLabel: "Vehicles",
    menuId: "models",
    availableBodyTypes: [],
    filterButtonText: "filter",
    applyFilterButtonText: "apply",
    resetFilterButtonText: "reset",
    fuelFilterLabel: "fuel type",
    seatsFilterLabel: "seats",
    lifestyleFilterLabel: "lifestyle",
    hideFuelFilter: false,
    hideLifestyleFilter: false,
    hideSeatsFilter: false,
  },
  {
    type: ModalDataType.GENERIC,
    label: "Buyer's Guide",
    mobileLabel: "Guide",
    menuId: "gen1",
    menuItems: [],
  },
  {
    type: ModalDataType.GENERIC,
    label: "Owner's Hub",
    menuId: "gen2",
    menuItems: [],
  },
  {
    type: ModalDataType.GENERIC,
    label: "The Lexus Difference",
    menuId: "gen3",
    menuItems: [],
  },
];

export const PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG: Menu[] = [
  {
    type: ModalDataType.DEALER,
    label: "Our Dealership",
    menuId: "dealer",
    menuItems: [],
  },
  {
    type: ModalDataType.MODELS,
    label: "Our Vehicles",
    menuId: "models",
    availableBodyTypes: [],
    filterButtonText: "filter",
    applyFilterButtonText: "apply",
    resetFilterButtonText: "reset",
    fuelFilterLabel: "fuel type",
    seatsFilterLabel: "seats",
    lifestyleFilterLabel: "lifestyle",
    hideFuelFilter: false,
    hideLifestyleFilter: false,
    hideSeatsFilter: false,
  },
  {
    type: ModalDataType.GENERIC,
    label: "Buyer's Guide",
    menuId: "gen1",
    menuItems: [],
  },
  {
    type: ModalDataType.GENERIC,
    label: "Owner's Hub",
    menuId: "gen2",
    menuItems: [],
  },
  {
    type: ModalDataType.GENERIC,
    label: "Punter's Club",
    menuId: "gen3",
    menuItems: [],
  },
  {
    type: ModalDataType.GENERIC,
    label: "Rex Hunt's Underground Fishtailing Adventures",
    menuId: "gen4",
    menuItems: [],
  },
  {
    type: ModalDataType.GENERIC,
    label: "The Lexus Difference",
    menuId: "gen5",
    menuItems: [],
  },
];

export const PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG_INCLUDING_SPECIAL_ITEMS: Menu[] = [
  ...PRIMARY_NAV_LEVEL_1_SAMPLE_DATA_LONG,
  {
    type: ModalDataType.ENCORE,
    label: "Login",
    menuId: "encore",
    logoutLabel: "Logout",
    encoreAdvert: {
      title: "Encore Advert",
      description: "This is an advert",
    },
    menuItems: [],
  },
];
