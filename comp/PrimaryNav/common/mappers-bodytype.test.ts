import { toModalData, toModelData } from "./PrimaryNav.mappers";
import { ModelsModalRawData, ModelRawData } from "../types/PrimaryNav.rawTypes";
import { ModalDataType, ModelsMenu } from "../types/PrimaryNav.types";

import "@testing-library/jest-dom";

test("test data conversion for model root level fields", () => {
  const raw: ModelsModalRawData = {
    type: ModalDataType.MODELS,
    modalId: "103",
    displayName: "Our Vehicles",
    linkTextMobile: {
      value: "Vehicles",
    },
    filterButtonText: {
      value: "Filter",
    },
    applyFilterButtonText: {
      value: "Apply",
    },
    resetFilterButtonText: {
      value: "Reset",
    },
    clearCtaText: {
      value: "Clear",
    },
    showCtaText: {
      value: "Show",
    },
    scrollIndicatorDescription: {
      value: "Scrollable",
    },
    availableBodyTypes: {
      targetItems: [],
    },
    fuelFilterLabel: { value: "fuel" },
    seatsFilterLabel: { value: "seats" },
    lifestyleFilterLabel: { value: "lifestyle" },
    hideFuelFilter: { value: false },
    hideSeatsFilter: { value: false },
    hideLifestyleFilter: { value: false },
  };
  const data = toModalData(raw);
  expect(data.label).toEqual("Our Vehicles");
  expect(data.mobileLabel).toEqual("Vehicles");

  const moibleData = data as ModelsMenu;
  expect(moibleData.filterButtonText).toEqual("Filter");
  expect(moibleData.applyFilterButtonText).toEqual("Apply");
  expect(moibleData.resetFilterButtonText).toEqual("Reset");
  expect(moibleData.clearCtaText).toEqual("Clear");
  expect(moibleData.showCtaText).toEqual("Show");
  expect(moibleData.scrollIndicatorDescription).toEqual("Scrollable");
  expect(moibleData.availableBodyTypes).toEqual([]);
});

test("availableBodyTypes is not empty if provided", () => {
  const raw: ModelsModalRawData = {
    type: ModalDataType.MODELS,
    modalId: "103",
    displayName: "Vehicles",
    linkTextMobile: {},
    filterButtonText: {},
    applyFilterButtonText: {},
    resetFilterButtonText: {},
    clearCtaText: {},
    showCtaText: {},
    scrollIndicatorDescription: {},
    fuelFilterLabel: { value: "fuel" },
    seatsFilterLabel: { value: "seats" },
    lifestyleFilterLabel: { value: "lifestyle" },
    hideFuelFilter: { value: false },
    hideSeatsFilter: { value: false },
    hideLifestyleFilter: { value: false },
    availableBodyTypes: {
      targetItems: [
        {
          displayName: "SUV",
          cta: { url: "https://www.lexus.com.au/models/ux/overview", label: "Explore" },
          models: {
            results: [],
          },
        },
      ],
    },
  };
  const data = toModalData(raw);
  const moibleData = data as ModelsMenu;
  expect(moibleData.availableBodyTypes.length).toBe(1);
  expect(moibleData.availableBodyTypes[0].displayName).toBe("SUV");
  expect(moibleData.availableBodyTypes[0].models).toEqual([]);
});

test("test toModelData", () => {
  const raw: ModelRawData = {
    displayName: "UX",
    bodyType: {
      value: "SUV",
    },
    modelName: {
      value: "Compact SUV",
    },
    fuelTypes: {
      targetItems: [
        {
          value: "Hybrid",
        },
        {
          value: "Electric",
        },
      ],
    },
    contentPath: {
      value: "/models/ux",
    },
    hideFromMenu: {
      value: false,
    },
    lifestyle: { value: "off-road" },
    seats: { targetItems: [] },
    displayImage: { src: "mockDisplayImageSrc" },
    backgroundImage: { src: "mockBackgroundImageSrc" },
    cta1: {
      label: "Discover",
      url: "https://www.lexus.com.au/models/ux/overview",
    },
    cta2: {
      label: "Build",
      url: "https://www.lexus.com.au/models/build-and-price/ux",
    },
  };
  const data = toModelData(raw);
  expect(data.displayName).toBe("UX");
  expect(data.bodyType).toBe("SUV");
  expect(data.modelName).toBe("Compact SUV");
  expect(data.fuelTypes.length).toBe(2);
  expect(data.contentPath).toBe("/models/ux");
  expect(data.hideFromMenu).toBeFalsy();
});

test("hideFromMenu is true when the raw value is true", () => {
  const raw: ModelRawData = {
    displayName: "UX",
    bodyType: {},
    modelName: {},
    fuelTypes: {
      targetItems: [],
    },
    contentPath: {},
    hideFromMenu: {
      value: true,
    },
    lifestyle: { value: "off-road" },
    seats: { targetItems: [] },
    displayImage: { src: "mockDisplayImageSrc" },
    backgroundImage: { src: "mockBackgroundImageSrc" },
    cta1: {
      label: "Discover",
      url: "https://www.lexus.com.au/models/ux/overview",
    },
    cta2: {
      label: "Build",
      url: "https://www.lexus.com.au/models/build-and-price/ux",
    },
  };
  const data = toModelData(raw);
  expect(data.hideFromMenu).toBeTruthy();
});
