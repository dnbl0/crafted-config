import { AvailableIcons } from "@/components/SVGIcon/static/SVGSelector";

import { MenuItemWithIconData } from "../types/PrimaryNav.types";

export const PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA: MenuItemWithIconData[] = [
  {
    link: {
      label: "Find a Dealer",
      url: "https://lexus.com.au/contact/find-a-dealer",
    },
    icon: "locatorPin",
  },
  {
    link: {
      label: "Request a Brochure",
      url: "https://lexus.com.au/contact/request-a-brochure",
    },
    icon: "brochure",
  },
  {
    link: {
      label: "Request a Test Drive",
      url: "https://lexus.com.au/request-a-test-drive",
    },
    icon: "steeringWheel",
  },
];

export const PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA_LONG: MenuItemWithIconData[] = [
  ...PRIMARY_NAV_STATIC_LINKS_SAMPLE_DATA,
  {
    link: {
      label: "no icon example",
      url: "https://genius.com/Carly-rae-jepsen-i-really-like-you-lyrics",
    },
  },
  {
    link: {
      label: "unknown icon example",
      url: "https://genius.com/Carly-rae-jepsen-i-really-like-you-lyrics",
    },
    // using `as` to showcase what happens if an unknown icon is passed in
    icon: "unknown" as AvailableIcons,
  },
  {
    link: {
      label: "I really, really, really, really, really, really like you",
      url: "https://genius.com/Carly-rae-jepsen-i-really-like-you-lyrics",
    },
    icon: "brochure",
  },
  {
    link: {
      label: "Galileo, Galileo Galileo, Galileo Galileo, Figaro - magnificoo",
      url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    },
    icon: "locatorPin",
  },
  {
    link: {
      label: "Mamma mia, here I go again My, my, how can I resist you?",
      url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    },
    icon: "locatorPin",
  },
  {
    link: {
      label: "Money, money, money Must be funny In the rich man's world",
      url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    },
    icon: "locatorPin",
  },
];
