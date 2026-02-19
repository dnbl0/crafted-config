import cn from "classnames";
import { useState, useRef, useMemo, useContext } from "react";
import { Key } from "react-aria-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { DecorativeCarCard } from "@/components/DecorativeCarCard/DecorativeCarCard";
import { Divider } from "@/components/Divider/Divider";
import { GenericLink } from "@/components/GenericLink/GenericLink";
import { IconLink } from "@/components/IconLink/IconLink";
import { Stack } from "@/components/Stack/Stack";
import { getSurfaceProps } from "@/components/Surface/Surface";
import { Tabs } from "@/components/Tabs/Tabs";
import { Typography } from "@/components/Typography/Typography";
import { ThemeContext } from "@/theming/ThemeContext";
import { LinkData } from "@/types/graphqlResponse";
import { DataAnalyticsComponentProvider, useAnalytics } from "@/utils/DataAnalytics";
import { DataAnalyticsEvents } from "@/utils/DataAnalytics/models/DataAnalyticsDefinitions";
import { mergeProps } from "@/utils/reactExtensions";

import { useFilter } from "./modals/PrimaryNavModalModels.context";
import { PrimaryNavCloseButton } from "./PrimaryNavCloseButton";
import {
  calcSubfilterOptions,
  filterBodyTypes,
  useGetFilterTrackingData,
} from "./PrimaryNavModalModels.utils";
import { PrimaryNavModalModelsFilters } from "./PrimaryNavModalModelsFilters";
import styles from "./PrimaryNavModalModelsResult.module.scss";
import { BodyTypeData, ModelData } from "./types/PrimaryNav.types";
import { TabOrientations } from "../Tabs/Tabs.utils";

const FILTER_TRANSITION_DURATION_MS = 200;

const filterClassNames = {
  enter: styles.filterModalEnter,
  enterActive: styles.filterModalEnterActive,
  enterDone: styles.filterModalEnterDone,
  exit: styles.filterModalExit,
  exitActive: styles.filterModalExitActive,
  exitDone: styles.filterModalExitDone,
  appear: styles.filterModalEnterDone,
  appearActive: styles.filterModalEnterDone,
  appearDone: styles.filterModalEnterDone,
};

interface FilterOptionsModalProps {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilterButtonText: string;
  resetFilterButtonText: string;
}

const FilterOptionsModal: React.FC<Required<React.PropsWithChildren<FilterOptionsModalProps>>> = ({
  children,
  showFilterMenu,
  setShowFilterMenu,
  applyFilterButtonText,
  resetFilterButtonText,
}) => {
  const { filter, updateFilter } = useFilter();

  const { getVariantClassNameOrDefault } = useContext(ThemeContext);

  const nodeRef = useRef(null);

  // Clear all subfilters aside from 'body'
  const handleButtonReset = () => {
    updateFilter("body", filter.body);
  };
  const handleButtonApply = () => {
    setShowFilterMenu(false);
  };

  return (
    <section className={cn(styles.filterContainerMobile, getVariantClassNameOrDefault("alt"))}>
      <CSSTransition
        in={showFilterMenu}
        classNames={filterClassNames}
        nodeRef={nodeRef}
        timeout={FILTER_TRANSITION_DURATION_MS}
        unmountOnExit
      >
        <div
          ref={nodeRef}
          {...mergeProps(getSurfaceProps({ type: "elevation-raised", shade: "darker" }), {
            className: styles.filterModal,
          })}
        >
          <PrimaryNavCloseButton onClick={() => setShowFilterMenu(false)} />
          {children}
          <Stack spacing="3xs" direction="column">
            <Button
              variant="secondary"
              themeVariant="static"
              onClick={handleButtonReset}
              className={styles.button}
              isDisabled={Object.values(filter).filter(Boolean).length < 2}
            >
              {resetFilterButtonText}
            </Button>
            <Button
              variant="primary"
              themeVariant="static"
              onClick={handleButtonApply}
              className={styles.button}
            >
              {applyFilterButtonText}
            </Button>
          </Stack>
        </div>
      </CSSTransition>
    </section>
  );
};

interface TabContentsProps {
  results: BodyTypeData[];
}
const TabContents: React.FC<TabContentsProps> = ({ results }) => {
  const filterTrackingData = useGetFilterTrackingData();
  const getAnimationKey = useMemo(
    () => results.flatMap((item) => item.models.flatMap((m) => m.displayName)).join(" "),
    [results]
  );

  return (
    <SwitchTransition mode={"out-in"}>
      <CSSTransition
        classNames={{
          enter: styles.vehicleEnter,
          enterActive: styles.vehicleEnterActive,
          enterDone: styles.vehicleEnterDone,
          exit: styles.vehicleExit,
          exitDone: styles.vehicleExitDone,
          exitActive: styles.vehicleExitActive,
        }}
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        key={getAnimationKey}
        timeout={FILTER_TRANSITION_DURATION_MS}
      >
        <Stack direction="column" spacing="xl">
          <DataAnalyticsComponentProvider customProps={filterTrackingData}>
            {results.map((bodyType) => (
              <BodyTypeSection key={bodyType.displayName} bodyType={bodyType} />
            ))}
          </DataAnalyticsComponentProvider>
        </Stack>
      </CSSTransition>
    </SwitchTransition>
  );
};

interface ButtonChild {
  cta: LinkData;
}

const ButtonChild = ({ cta }: ButtonChild) => {
  const { registerEvent } = useAnalytics();

  const handleClick = () => {
    const data = {
      event: "modelMenuButtonClick",
      componentLink: cta.url,
      componentLinkText: cta.label || "None",
    };
    registerEvent(DataAnalyticsEvents.CLICK, data);
  };

  return (
    <IconLink
      key={cta.url}
      href={cta.url}
      target={cta.target || undefined}
      onClick={handleClick}
      className={styles.linkReset}
    >
      {cta.label}
    </IconLink>
  );
};

interface VehicleModelProps {
  model: ModelData;
}
const VehicleModel: React.FC<VehicleModelProps> = ({ model }) => {
  return (
    <DataAnalyticsComponentProvider customProps={{ model: model.displayName }}>
      <Stack role="listitem" className={styles.carContainer}>
        <DecorativeCarCard
          displayImage={model.displayImage.src}
          backgroundImage={model.backgroundImage.src}
          model={model.displayName}
          modelName={model.modelName || ""}
          cta={model.cta1}
        >
          {[model.cta1, model.cta2].map((cta) => (
            <ButtonChild key={cta.label} cta={cta} />
          ))}
        </DecorativeCarCard>
      </Stack>
    </DataAnalyticsComponentProvider>
  );
};

interface BodyTypeSectionProps {
  bodyType: BodyTypeData;
}
const BodyTypeSection: React.FC<BodyTypeSectionProps> = ({ bodyType }) => {
  const { registerEvent } = useAnalytics();
  const handleClick = () => {
    const data = {
      event: "linkClick",
      componentLinkText: bodyType.cta.label || "None",
      componentLink: bodyType.cta.url,
    };
    registerEvent(DataAnalyticsEvents.CLICK, data);
  };

  return (
    <Stack spacing="s" direction="column">
      <Stack spacing="3xs" direction="column">
        <Stack spacing="xs" alignItems="center">
          <Typography variant="h4" className={styles.bodyTypeHeading}>
            {bodyType.displayName}
          </Typography>
          <GenericLink href={bodyType.cta.url} className={styles.linkReset} onClick={handleClick}>
            <Typography variant="p1" className={styles.bodyTypeCta}>
              {bodyType.cta.label}
            </Typography>
          </GenericLink>
        </Stack>
        <Divider variant="light" />
      </Stack>
      <div className={styles.carContainers}>
        {bodyType.models.map((model) =>
          [model.cta1.url, model.displayImage.src].every(Boolean) ? (
            <VehicleModel key={model.displayName} model={model} />
          ) : null
        )}
      </div>
    </Stack>
  );
};

type PrimaryNavModalModelsResultProps = {
  /**
   * Main car info data
   */
  bodyTypes: BodyTypeData[];

  /**
   * Text for the filter button
   */
  filterButtonText: string;
  /**
   * Text for the apply filter button
   */
  applyFilterButtonText: string;
  /**
   * Text for the reset filter button
   */
  resetFilterButtonText: string;

  /**
   * Label for fuel filter chips
   */
  fuelFilterLabel: string;

  /**
   * Label for seats filter chips
   */
  seatsFilterLabel: string;

  /**
   * Label for lifestyle filter chips
   */
  lifestyleFilterLabel: string;
};

/**
 * Used in PrimaryNav to show available car models
 *
 * ## Usage
 *
 * ```tsx
 * <PrimaryNavModalModelsResult
 *   bodyTypes={bodyTypes}
 *   fuelFilterLabel="Fuel"
 *   seatsFilterLabel="Seats"
 *   lifestyleFilterLabel="Lifestyle"
 * />
 * ```
 */
const PrimaryNavModalModelsResult: React.FC<PrimaryNavModalModelsResultProps> = ({
  bodyTypes,
  filterButtonText,
  applyFilterButtonText,
  resetFilterButtonText,
  fuelFilterLabel,
  seatsFilterLabel,
  lifestyleFilterLabel,
}) => {
  const { filter, updateFilter } = useFilter();
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filterLabels = {
    fuel: fuelFilterLabel,
    seats: seatsFilterLabel,
    lifestyle: lifestyleFilterLabel,
  };

  const handleTabChange = (bodyType: Key) => {
    // Key can be string | number
    if (typeof bodyType === "number") return;
    updateFilter("body", bodyType);
  };

  const results = useMemo(() => filterBodyTypes(bodyTypes, filter), [bodyTypes, filter]);

  const unfilteredSubfilterOptions = useMemo(
    () => calcSubfilterOptions(filterBodyTypes(bodyTypes, { body: filter.body })),
    [filter, bodyTypes]
  );

  return (
    <Container maxWidth="none" className={styles.container}>
      <Tabs orientation={TabOrientations.VERTICAL} onSelectionChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab id="ALL">ALL</Tabs.Tab>
          {bodyTypes.map(({ displayName }) => (
            <Tabs.Tab key={displayName} id={displayName}>
              {displayName}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Stack spacing="xl" direction="column" className={styles.main}>
          {/* Mobile filter */}
          <section className={styles.filterContainerMobile}>
            <Button
              variant="primary"
              themeVariant="alt"
              className={styles.button}
              onClick={() => setShowFilterMenu(true)}
            >
              {filterButtonText}
            </Button>

            <FilterOptionsModal
              showFilterMenu={showFilterMenu}
              setShowFilterMenu={setShowFilterMenu}
              applyFilterButtonText={applyFilterButtonText}
              resetFilterButtonText={resetFilterButtonText}
            >
              <PrimaryNavModalModelsFilters
                bodyTypes={results}
                unfilteredSubfilterOptions={unfilteredSubfilterOptions}
                filterLabels={filterLabels}
              />
            </FilterOptionsModal>
          </section>

          {/* Desktop filter */}
          <section className={styles.filterDesktop}>
            <PrimaryNavModalModelsFilters
              bodyTypes={results}
              unfilteredSubfilterOptions={unfilteredSubfilterOptions}
              filterLabels={filterLabels}
            />
          </section>

          <Tabs.Panel id={filter.body}>
            <TabContents results={results} />
          </Tabs.Panel>
        </Stack>
      </Tabs>
    </Container>
  );
};

export { PrimaryNavModalModelsResult };
