import "@testing-library/jest-dom";
import { render, screen, act, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { FilterProvider, SubfilterProps } from "./modals/PrimaryNavModalModels.context";
import { calcSubfilterOptions, filterBodyTypes } from "./PrimaryNavModalModels.utils";
import { PrimaryNavModalModelsResult } from "./PrimaryNavModalModelsResult";
import { BODYTYPE_SAMPLE_DATA } from "./stories-common/PrimaryNav.stories.data";

const compareRenderedItemsVsExpected = async (filter: Partial<SubfilterProps> = {}) => {
  const carCards = await screen.findAllByRole("listitem");
  const expectedCarCards = filterBodyTypes(BODYTYPE_SAMPLE_DATA, {
    body: "all",
    ...filter,
  }).flatMap(({ models }) => models);
  return carCards.length === expectedCarCards.length;
};

describe("Model Modal Results component", () => {
  const baseBodyTypes = BODYTYPE_SAMPLE_DATA;
  const bodyTypes = filterBodyTypes(baseBodyTypes, { body: "all" });

  const props = {
    bodyTypes,
    unfilteredBodyTypes: baseBodyTypes,
    filterButtonText: "filter",
    applyFilterButtonText: "apply",
    resetFilterButtonText: "reset",
    fuelFilterLabel: "fuel type",
    lifestyleFilterLabel: "lifestyle",
    seatsFilterLabel: "seats",
  };
  const subfilterOptions = calcSubfilterOptions(baseBodyTypes);
  const hideFilterBooleans = {
    fuel: false,
    seats: false,
    lifestyle: false,
  };

  it("should first render with no buttons disabled, disable only the other filters when one subfilter is selected, and disable all relevant when multiple are selected, with appropriate results count at each point", async () => {
    render(
      <FilterProvider subfilterOptions={subfilterOptions} hideFilterBooleans={hideFilterBooleans}>
        <PrimaryNavModalModelsResult {...props} />
      </FilterProvider>
    );

    [props.fuelFilterLabel, props.lifestyleFilterLabel, props.seatsFilterLabel].forEach((label) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );

    const allButtons = screen.getAllByRole("button");
    allButtons.forEach((button) => expect(button).not.toBeDisabled());

    expect(await compareRenderedItemsVsExpected()).toBeTruthy();

    const petrolButton = screen.getByRole("button", { name: "Petrol" });
    const dieselButton = screen.getByRole("button", { name: "Diesel" });
    const cityButton = screen.getByRole("button", { name: "city" });
    const offroadButton = screen.getByRole("button", { name: "off-road" });
    const electricButton = screen.getByRole("button", { name: "Electric" });
    const hybridButton = screen.getByRole("button", { name: "Hybrid" });
    const fourSeatsButton = screen.getByRole("button", { name: "4" });
    const fiveSeatsButton = screen.getByRole("button", { name: "5" });
    const moverBodyTypeTab = screen.getByRole("tab", { name: "Mover" });

    expect(dieselButton).toBeInTheDocument();
    expect(cityButton).toBeInTheDocument();
    expect(electricButton).toBeInTheDocument();
    expect(hybridButton).toBeInTheDocument();
    expect(fourSeatsButton).toBeInTheDocument();
    expect(moverBodyTypeTab).toBeInTheDocument();

    // Clicking diesel should exclude city cars, but other 'fuel types' should still be enabled
    await act(() => userEvent.click(dieselButton));

    expect(await screen.findByRole("button", { name: "city" })).toBeDisabled();
    expect(electricButton).not.toBeDisabled();
    // Ensure cards are removed
    await waitForElementToBeRemoved(() => screen.getAllByText("UX"));
    expect(await compareRenderedItemsVsExpected({ fuel: "Diesel" })).toBeTruthy();
    expect(await compareRenderedItemsVsExpected({ lifestyle: "city" })).toBeFalsy();

    // Selecting another filter should disable relevant fuel types as well
    await act(() => userEvent.click(fourSeatsButton));

    expect(cityButton).toBeDisabled();
    expect(await screen.findByRole("button", { name: "Electric" })).toBeDisabled();
    expect(await screen.findByRole("button", { name: "Hybrid" })).toBeDisabled();
    expect(await screen.findByRole("heading", { name: "LX", level: 5 })).toBeInTheDocument();
    expect(await compareRenderedItemsVsExpected({ fuel: "Diesel", seats: "4" })).toBeTruthy();

    // Unselecting diesel should re-enable hybrid and city, but electric should still be filtered out by 4-seater
    await act(() => userEvent.click(dieselButton));

    expect(await screen.findByRole("button", { name: "city" })).not.toBeDisabled();
    expect(await screen.findByRole("button", { name: "Hybrid" })).not.toBeDisabled();
    expect(electricButton).toBeDisabled();
    // Ensure one of the expected vehicle are back in the dom before checking the totals
    expect(await screen.findByRole("heading", { name: "LM", level: 5 })).toBeInTheDocument();
    expect(await compareRenderedItemsVsExpected({ seats: "4" })).toBeTruthy();

    // Unselecting 4-seater should have all buttons re-enabled
    await act(() => userEvent.click(fourSeatsButton));

    await waitFor(() => {
      allButtons.forEach((button) => expect(button).not.toBeDisabled());
    });
    // Ensure one of the expected vehicle are back in the dom before checking the totals
    expect(await screen.findByRole("heading", { name: "NX", level: 5 })).toBeInTheDocument();
    expect(compareRenderedItemsVsExpected()).toBeTruthy();

    // Selecting new bodyType tab should render unavailable subfilter options as disabled
    await act(() => userEvent.click(moverBodyTypeTab));
    await waitForElementToBeRemoved(() => screen.getAllByText("UX"));

    expect(petrolButton).toBeDisabled();
    expect(electricButton).toBeDisabled();
    expect(dieselButton).toBeDisabled();
    expect(offroadButton).toBeDisabled();
    expect(fiveSeatsButton).toBeDisabled();
    expect(hybridButton).not.toBeDisabled();
    expect(fourSeatsButton).not.toBeDisabled();
  }, 60000);

  it("should only show filters which dont have a 'hide' property set to true", () => {
    const withHiddenLifestyleProps = { ...hideFilterBooleans, lifestyle: true };

    render(
      <FilterProvider
        subfilterOptions={subfilterOptions}
        hideFilterBooleans={withHiddenLifestyleProps}
      >
        <PrimaryNavModalModelsResult {...props} />
      </FilterProvider>
    );

    [props.fuelFilterLabel, props.seatsFilterLabel].forEach((label) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );

    expect(screen.queryByText(props.lifestyleFilterLabel)).not.toBeInTheDocument();
  });
});
