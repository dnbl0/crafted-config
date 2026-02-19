import {
  FilterOptions,
  SubfilterOptions,
  SubfilterTypes,
  useFilter,
} from "./modals/PrimaryNavModalModels.context";
import { BodyTypeData } from "./types/PrimaryNav.types";

export const filterBodyTypes = (data: BodyTypeData[], filter: FilterOptions) =>
  data.reduce((acc: BodyTypeData[], curr) => {
    if (
      curr.displayName.toLowerCase() !== filter.body.toLowerCase() &&
      filter.body.toLowerCase() !== "all"
    )
      return acc;

    const matchingModels = [];
    for (const model of curr.models) {
      const fuelMatch = !filter.fuel || model.fuelTypes.some((type) => filter.fuel === type);
      const lifeStyleMatch = !filter.lifestyle || filter.lifestyle === model.lifestyle;
      const seatMatch = !filter.seats || model.seats.some((seats) => filter.seats === seats);

      if (fuelMatch && lifeStyleMatch && seatMatch) {
        matchingModels.push(model);
      }
    }
    if (matchingModels.length > 0) {
      acc.push({ ...curr, models: matchingModels });
    }
    return acc;
  }, []);

export const calcSubfilterOptions = (data: BodyTypeData[]): SubfilterOptions => {
  const seats = new Set<string>();
  const lifestyle = new Set<string>();
  const fuel = new Set<string>();

  for (const { models } of data) {
    for (const model of models) {
      model.seats.forEach((seat) => seats.add(seat));
      lifestyle.add(model.lifestyle);
      model.fuelTypes.forEach((fuelType) => fuel.add(fuelType));
    }
  }

  return {
    seats,
    lifestyle,
    fuel,
  };
};

export const useGetFilterTrackingData = () => {
  const {
    filter: { body, ...subfilters },
    hideFilterBooleans,
  } = useFilter();

  const isSubfilterKey = (key: string): key is SubfilterTypes => key in hideFilterBooleans;

  const subfilterData = Object.entries(subfilters).reduce(
    (mapped: Record<string, Record<string, string | string[]>>, [name, selections]) => {
      //  Don't send hidden filters with tracking
      if (isSubfilterKey(name) && !hideFilterBooleans[name]) {
        mapped[`componentFilter${Object.keys(mapped).length + 1}`] = {
          name: `${name} filter`,
          selections: selections ? [selections] : "None",
        };
      }
      return mapped;
    },
    {}
  );
  return { bodyTypeFilterSelection: body, ...subfilterData };
};
