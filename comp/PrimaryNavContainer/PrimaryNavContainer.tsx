import cn from "classnames";
import noop from "lodash/noop";
import { createContext, useContext, useMemo, useState } from "react";

import styles from "./PrimaryNavContainer.module.scss";
import { usePrimaryNavContainerCssCustomProps } from "./usePrimaryNavContainerCssCustomProps";

type PrimaryNavContainerContextValue = {
  setIsSolidBackground: (value: boolean) => void;
  setIsSolidContainer: (value: boolean) => void;
  setIsFixedAtTop: (value: boolean) => void;
  isSolidBackground: boolean;
  isSolidContainer: boolean;
  isFixedAtTop: boolean;
  initialIsSolidBackground?: boolean;
};

const PRIMARY_NAV_CONTAINER_CONTEXT_VALUE_DEFAULTS: PrimaryNavContainerContextValue = {
  setIsSolidBackground: noop,
  setIsSolidContainer: noop,
  setIsFixedAtTop: noop,
  isSolidBackground: true,
  isSolidContainer: true,
  isFixedAtTop: false,
};

const PrimaryNavContainerContext = createContext<PrimaryNavContainerContextValue>(
  PRIMARY_NAV_CONTAINER_CONTEXT_VALUE_DEFAULTS
);

type PrimaryNavContainerProps = React.PropsWithChildren<{
  initialIsSolidBackground?: boolean;
  initialIsSolidContainer?: boolean;
  initialIsFixedAtTop?: boolean;
}>;

export const PrimaryNavContainer: React.FC<PrimaryNavContainerProps> = ({
  initialIsSolidBackground,
  initialIsSolidContainer,
  initialIsFixedAtTop,
  children,
}) => {
  const [isSolidBackground, setIsSolidBackground] = useState(
    initialIsSolidBackground ?? PRIMARY_NAV_CONTAINER_CONTEXT_VALUE_DEFAULTS.isSolidBackground
  );
  const [isSolidContainer, setIsSolidContainer] = useState(
    initialIsSolidContainer ?? PRIMARY_NAV_CONTAINER_CONTEXT_VALUE_DEFAULTS.isSolidContainer
  );
  const [isFixedAtTop, setIsFixedAtTop] = useState(
    initialIsFixedAtTop ?? PRIMARY_NAV_CONTAINER_CONTEXT_VALUE_DEFAULTS.isFixedAtTop
  );

  const providerValue = useMemo(
    () => ({
      setIsSolidBackground,
      setIsSolidContainer,
      setIsFixedAtTop,
      isSolidBackground,
      isSolidContainer,
      isFixedAtTop,
      initialIsSolidBackground,
    }),
    [
      setIsSolidBackground,
      setIsSolidContainer,
      setIsFixedAtTop,
      isSolidBackground,
      isSolidContainer,
      isFixedAtTop,
      initialIsSolidBackground,
    ]
  );

  const containerRef = usePrimaryNavContainerCssCustomProps();

  return (
    <PrimaryNavContainerContext.Provider value={providerValue}>
      <nav
        ref={containerRef}
        data-primary-nav-modal-open-scrollto-target=""
        className={cn(styles.primaryNavContainer, {
          [styles.isSolidBackground]: isSolidBackground,
          [styles.isFixedAtTop]: isFixedAtTop,
          [styles.isSolidContainer]: isSolidContainer,
        })}
      >
        {!isSolidBackground && <div className={styles.navbarShadow} />}
        {children}
      </nav>
    </PrimaryNavContainerContext.Provider>
  );
};

export const usePrimaryNavContainerContext = () => useContext(PrimaryNavContainerContext);
