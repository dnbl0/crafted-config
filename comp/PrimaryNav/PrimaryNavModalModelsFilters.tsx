import { memo, useMemo } from "react";

import { Chip } from "@/components/Chip/Chip";
import { Label } from "@/components/Label/Label";
import { Stack } from "@/components/Stack/Stack";

import {
  SubfilterOptions,
  SubfilterTypes,
  useFilter,
} from "./modals/PrimaryNavModalModels.context";
import { calcSubfilterOptions } from "./PrimaryNavModalModels.utils";
import { BodyTypeData } from "./types/PrimaryNav.types";

type PrimaryNavModalModelsFiltersProps = {
  bodyTypes: BodyTypeData[];
  unfilteredSubfilterOptions: SubfilterOptions;
  filterLabels: Record<SubfilterTypes, string>;
};

const PrimaryNavModalModelsFiltersInternal: React.FC<PrimaryNavModalModelsFiltersProps> = ({
  bodyTypes,
  unfilteredSubfilterOptions,
  filterLabels,
}) => {
  const { filter, updateFilter, subfilterOptions, hideFilterBooleans } = useFilter();

  const filterOptions: {
    filter: string[];
    label: string;
    option: keyof SubfilterOptions;
  }[] = [];

  const checkDisplayFilter = (option: keyof SubfilterOptions) => {
    let filterArray = Array.from(subfilterOptions[option]);

    // Sort numbers)
    if (filterArray.every((item) => !isNaN(Number(item)))) {
      filterArray = filterArray.sort((a, b) => Number(a) - Number(b));
    }

    // Add filter to be shown if it's not hidden and has subfilter options
    if (!hideFilterBooleans[option] && subfilterOptions[option]) {
      filterOptions.push({
        filter: filterArray,
        label: filterLabels[option],
        option: option,
      } as const);
    }
  };

  checkDisplayFilter("fuel");
  checkDisplayFilter("lifestyle");
  checkDisplayFilter("seats");

  const possibleFilterOptions = useMemo(() => calcSubfilterOptions(bodyTypes), [bodyTypes]);

  return (
    <Stack spacing="l" flexWrap="wrap">
      {filterOptions.map(({ option, label, filter: optionFilter }) => {
        const possibleOptions: Set<string> = possibleFilterOptions[option];

        const isOnlySubfilterSelected =
          Object.values(filter).filter(Boolean).length <= 2 && !!filter[option];
        const optionsWithoutSubfiltersSelected: Set<string> = unfilteredSubfilterOptions[option];

        return (
          <Stack key={label} direction="column" spacing="3xs">
            <Label>{label}</Label>
            <Stack spacing="3xs" flexWrap="wrap" role="group" aria-label={`${label} filter`}>
              {optionFilter.map((item) => {
                // Also checks whether the option would be viable if nothing was checked in the current filter
                const viableOption =
                  isOnlySubfilterSelected && optionsWithoutSubfiltersSelected.has(item);

                return (
                  <Chip
                    key={item}
                    variant="ghost"
                    onClick={() => updateFilter(option, item)}
                    disabled={!viableOption && !possibleOptions.has(item)}
                    isInteractive
                    {...(filter[option] === item && { state: "selected" })}
                  >
                    {item}
                  </Chip>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export const PrimaryNavModalModelsFilters = memo(PrimaryNavModalModelsFiltersInternal);
