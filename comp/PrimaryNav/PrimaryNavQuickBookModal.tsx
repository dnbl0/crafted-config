import { createElement, isValidElement, useMemo, useCallback } from "react";

import { ModalSheet } from "@/components/ModalSheet/ModalSheet";

import { PrimaryNavQuickBookContext, usePrimaryNavSlot } from "./PrimaryNavContext";

type PrimaryNavSearchInputProps = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export const PrimaryNavQuickBookModal: React.FC<PrimaryNavSearchInputProps> = ({
  onClose,
  isOpen,
}) => {
  const slot = usePrimaryNavSlot("quickBookModal");

  const contextValues = useMemo(() => ({ onClose, isOpen }), [onClose, isOpen]);

  const handleClose = useCallback(() => onClose(false), [onClose]);

  if (isValidElement(slot)) {
    return createElement(slot.type, { ...slot.props, onClose });
  }

  return (
    <PrimaryNavQuickBookContext.Provider value={contextValues}>
      <ModalSheet
        position="right"
        isOpen={isOpen}
        isModal
        isDismissable
        ariaLabel="quickBook"
        onOpenChange={handleClose}
      >
        {slot}
      </ModalSheet>
    </PrimaryNavQuickBookContext.Provider>
  );
};
