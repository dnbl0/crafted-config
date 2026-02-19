import { createContext, useContext, useMemo } from "react";

import type { Menu, PrimaryNavSlots } from "./types/PrimaryNav.types";

interface PrimaryNavControls {
  pushActiveMenuId: (menuId: string) => void;
  popActiveMenu: () => void;
  handleNavbarItemClick: (menu: Menu | null) => void;
  handleQuickBookClick: (value: boolean) => void;
  isQuickBookEnabled?: boolean;
  activeMenuId?: string;
}

interface PrimaryNavLabels {
  quickBookButtonLabel?: string;
}

interface PrimaryNavContextValue {
  slots: PrimaryNavSlots;
  controls: PrimaryNavControls;
  labels: PrimaryNavLabels;
}

const PrimaryNavSlotsContext = createContext<PrimaryNavSlots>({
  searchMenu: undefined,
  searchPopover: undefined,
  searchMenuTrigger: undefined,
  quickBookModal: undefined,
  fixedChildren: undefined,
});

const throwIfNoProvider = () => {
  throw new Error("You can't use this operation without PrimaryNavContextProvider");
};

export const PrimaryNavControlsContext = createContext<PrimaryNavControls>({
  pushActiveMenuId: throwIfNoProvider,
  popActiveMenu: throwIfNoProvider,
  handleNavbarItemClick: throwIfNoProvider,
  handleQuickBookClick: throwIfNoProvider,
  isQuickBookEnabled: undefined,
  activeMenuId: undefined,
});

const PrimaryNavLabelsContext = createContext<PrimaryNavLabels>({
  quickBookButtonLabel: "",
});

export const PrimaryNavContextProvider: React.FC<
  React.PropsWithChildren<PrimaryNavContextValue>
> = ({ slots, controls, labels, children }) => {
  const slotsContextValue: PrimaryNavSlots = useMemo(
    () => ({
      searchMenu: slots.searchMenu,
      searchPopover: slots.searchPopover,
      searchMenuTrigger: slots.searchMenuTrigger,
      quickBookModal: slots.quickBookModal,
      fixedChildren: slots.fixedChildren,
    }),
    [
      slots.searchMenu,
      slots.searchPopover,
      slots.searchMenuTrigger,
      slots.quickBookModal,
      slots.fixedChildren,
    ]
  );

  const controlsContextValue: PrimaryNavControls = useMemo(
    () => ({
      pushActiveMenuId: controls.pushActiveMenuId,
      popActiveMenu: controls.popActiveMenu,
      handleNavbarItemClick: controls.handleNavbarItemClick,
      handleQuickBookClick: controls.handleQuickBookClick,
      isQuickBookEnabled: controls.isQuickBookEnabled,
      activeMenuId: controls.activeMenuId,
    }),
    [
      controls.pushActiveMenuId,
      controls.popActiveMenu,
      controls.handleNavbarItemClick,
      controls.handleQuickBookClick,
      controls.isQuickBookEnabled,
      controls.activeMenuId,
    ]
  );

  const labelsContextValue: PrimaryNavLabels = useMemo(
    () => ({
      quickBookButtonLabel: labels.quickBookButtonLabel,
    }),
    [labels.quickBookButtonLabel]
  );

  return (
    <PrimaryNavSlotsContext.Provider value={slotsContextValue}>
      <PrimaryNavControlsContext.Provider value={controlsContextValue}>
        <PrimaryNavLabelsContext.Provider value={labelsContextValue}>
          {children}
        </PrimaryNavLabelsContext.Provider>
      </PrimaryNavControlsContext.Provider>
    </PrimaryNavSlotsContext.Provider>
  );
};

export const usePrimaryNavSlot = <T extends keyof PrimaryNavSlots>(slot: T): PrimaryNavSlots[T] =>
  useContext(PrimaryNavSlotsContext)[slot];

export const usePrimaryNavControls = (): PrimaryNavControls =>
  useContext(PrimaryNavControlsContext);

export const usePrimaryNavLabels = (): PrimaryNavLabels => useContext(PrimaryNavLabelsContext);

interface PrimaryNavQuickBookContextProps {
  onClose: (value: boolean) => void;
  isOpen: boolean;
}

export const PrimaryNavQuickBookContext = createContext<
  PrimaryNavQuickBookContextProps | undefined
>(undefined);

export const usePrimaryNavQuickBookContext = () => {
  const context = useContext(PrimaryNavQuickBookContext);

  if (!context) {
    throw new Error(
      "usePrimaryNavQuickBookContext must be used within a PrimaryNavQuickBookContextProvider"
    );
  }
  return context;
};
