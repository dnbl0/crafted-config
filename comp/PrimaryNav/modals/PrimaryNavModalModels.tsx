import { useMemo } from "react";

import { Responsive } from "@/components/Responsive/Responsive";

import { PrimaryNavBackButton } from "./PrimaryNavBackButton";
import { FilterProvider, SubfilterProps } from "./PrimaryNavModalModels.context";
import { PrimaryNavDesktopLayout } from "../PrimaryNavDesktopLayout";
import { PrimaryNavMobilePage } from "../PrimaryNavMobilePage";
import { PrimaryNavModalContainer } from "../PrimaryNavModalContainer";
import { calcSubfilterOptions } from "../PrimaryNavModalModels.utils";
import { PrimaryNavModalModelsResult } from "../PrimaryNavModalModelsResult";
import { PrimaryNavStaticLinks } from "../PrimaryNavStaticLinks/PrimaryNavStaticLinks";
import { MenuItemWithIconData, BodyTypeData } from "../types/PrimaryNav.types";

type PrimaryNavTabModelsProps = {
  closeButton: React.ReactNode;
  bodyTypes: BodyTypeData[];
  staticLinks: MenuItemWithIconData[];
  backLinkText: string;
  popActiveModal: React.MouseEventHandler;
  filterButtonText: string;
  applyFilterButtonText: string;
  resetFilterButtonText: string;
  fuelFilterLabel: string;
  seatsFilterLabel: string;
  lifestyleFilterLabel: string;
  hideFilterBooleans: Record<keyof SubfilterProps, boolean> | Record<string, never>;
};

const PrimaryNavModalModels: React.FC<PrimaryNavTabModelsProps> = ({
  closeButton,
  bodyTypes,
  staticLinks,
  backLinkText,
  popActiveModal,
  filterButtonText,
  applyFilterButtonText,
  resetFilterButtonText,
  fuelFilterLabel,
  seatsFilterLabel,
  lifestyleFilterLabel,
  hideFilterBooleans,
}) => {
  const subfilterOptions = useMemo(() => calcSubfilterOptions(bodyTypes), [bodyTypes]);
  return (
    <FilterProvider subfilterOptions={subfilterOptions} hideFilterBooleans={hideFilterBooleans}>
      <Responsive breakpoint="small">
        <PrimaryNavMobilePage
          closeButton={closeButton}
          variant="level2"
          headerChildren={
            <PrimaryNavModalContainer>
              <PrimaryNavBackButton onClick={popActiveModal}>{backLinkText}</PrimaryNavBackButton>
            </PrimaryNavModalContainer>
          }
          footerChildren={<PrimaryNavStaticLinks items={staticLinks} />}
        >
          <PrimaryNavModalContainer>
            <PrimaryNavModalModelsResult
              bodyTypes={bodyTypes}
              filterButtonText={filterButtonText}
              applyFilterButtonText={applyFilterButtonText}
              resetFilterButtonText={resetFilterButtonText}
              fuelFilterLabel={fuelFilterLabel}
              seatsFilterLabel={seatsFilterLabel}
              lifestyleFilterLabel={lifestyleFilterLabel}
            />
          </PrimaryNavModalContainer>
        </PrimaryNavMobilePage>
      </Responsive>

      <Responsive breakpoint="large">
        <PrimaryNavModalContainer parentIsFlexbox={true} fillParentHeight={true}>
          <PrimaryNavDesktopLayout
            closeButton={closeButton}
            isLevel2LayoutAvailable={false}
            level1LayoutChildren={
              <PrimaryNavModalModelsResult
                bodyTypes={bodyTypes}
                filterButtonText={filterButtonText}
                applyFilterButtonText={applyFilterButtonText}
                resetFilterButtonText={resetFilterButtonText}
                fuelFilterLabel={fuelFilterLabel}
                seatsFilterLabel={seatsFilterLabel}
                lifestyleFilterLabel={lifestyleFilterLabel}
              />
            }
            level1LayoutFooterChildren={
              <PrimaryNavStaticLinks items={staticLinks} layout="horizontal" />
            }
          />
        </PrimaryNavModalContainer>
      </Responsive>
    </FilterProvider>
  );
};

export { PrimaryNavModalModels };
