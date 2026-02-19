import { createContext, useContext, useMemo, useState } from "react";

export type SubfilterTypes = "fuel" | "seats" | "lifestyle";
type FilterProps = {
  body: string;
} & Record<SubfilterTypes, string>;

export type SubfilterProps = Omit<FilterProps, "body">;
export type SubfilterOptions = { [K in keyof SubfilterProps]: Set<SubfilterProps[K]> };
export type FilterOptions = Pick<FilterProps, "body"> & Partial<SubfilterProps>;

interface FilterContextState {
  filter: FilterOptions;
  subfilterOptions: SubfilterOptions;
  updateFilter: <K extends keyof FilterProps>(key: K, value: FilterProps[K]) => void;
  hideFilterBooleans: Record<keyof SubfilterProps, boolean> | Record<string, never>;
}

const initialNewState: FilterContextState = {
  filter: { body: "all", fuel: undefined, lifestyle: undefined, seats: undefined },
  subfilterOptions: { fuel: new Set(), lifestyle: new Set(), seats: new Set() },
  updateFilter: () => null,
  hideFilterBooleans: {},
};

const FilterContext = createContext<FilterContextState>(initialNewState);

type FilterContextProps = Required<React.PropsWithChildren> &
  Pick<FilterContextState, "subfilterOptions" | "hideFilterBooleans">;

export const FilterProvider = ({
  subfilterOptions,
  children,
  hideFilterBooleans,
}: FilterContextProps) => {
  const [filter, setFilter] = useState(initialNewState.filter);

  const updateFilter = <K extends keyof FilterProps>(key: K, value: FilterProps[K]) => {
    setFilter((prev) =>
      // Clear other filters when updating body filter
      key === "body" && typeof value === "string"
        ? {
            ...initialNewState.filter,
            body: value,
          }
        : {
            ...prev,
            [key]: prev[key] === value ? undefined : value,
          }
    );
  };

  const value = useMemo(
    () => ({
      filter,
      subfilterOptions,
      updateFilter,
      hideFilterBooleans,
    }),
    [filter, subfilterOptions, hideFilterBooleans]
  );

  return <FilterContext.Provider value={value}> {children}</FilterContext.Provider>;
};

export const useFilter = () => useContext(FilterContext);
