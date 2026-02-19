import { calcSubfilterOptions, filterBodyTypes } from "./PrimaryNavModalModels.utils";
import { BODYTYPE_SAMPLE_DATA } from "./stories-common/PrimaryNav.stories.data";

describe("PrimaryNavModalModel util functions", () => {
  const defaultBodyTypes = BODYTYPE_SAMPLE_DATA;
  it("should return the expected result", () => {
    const result = calcSubfilterOptions(defaultBodyTypes);
    const expectedFuelTypes = ["Petrol", "Hybrid", "Electric", "Plug-in Hybrid", "Diesel"];
    const expectedLifestyleTypes = ["off-road", "city"];
    const expectedSeats = ["5", "7", "4"];

    const expectedSets = {
      fuel: new Set(expectedFuelTypes),
      lifestyle: new Set(expectedLifestyleTypes),
      seats: new Set(expectedSeats),
    };

    expect(result).toEqual(expectedSets);
  });

  it("should remove models that don't match filter", () => {
    const allResult = filterBodyTypes(defaultBodyTypes, { body: "all" });
    expect(allResult.flatMap(({ models }) => models).length).toEqual(
      defaultBodyTypes.flatMap(({ models }) => models).length
    );

    const dieselResults = filterBodyTypes(defaultBodyTypes, { body: "all", fuel: "Diesel" });
    expect(dieselResults.flatMap(({ models }) => models).length).toEqual(1);

    const coupeResults = filterBodyTypes(defaultBodyTypes, { body: "coupe" });
    expect(coupeResults.flatMap(({ models }) => models).length).toEqual(2);
  });
});
