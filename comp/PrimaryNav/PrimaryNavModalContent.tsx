import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

import { ScrollIndicator } from "@/components/ScrollIndicator/ScrollIndicator";

import { menuItemDataToMenuItemTyped } from "./common/PrimaryNav.mappers";
import { PrimaryNavModalDealer } from "./modals/PrimaryNavModalDealer";
import { PrimaryNavModalEncore } from "./modals/PrimaryNavModalEncore";
import { PrimaryNavModalGeneric } from "./modals/PrimaryNavModalGeneric";
import { PrimaryNavModalMobileMenu } from "./modals/PrimaryNavModalMobileMenu";
import { PrimaryNavModalModels } from "./modals/PrimaryNavModalModels";
import { PrimaryNavModalSearch } from "./modals/PrimaryNavModalSearch";
import styles from "./PrimaryNav.module.scss";
import {
  type MenuItemWithIconData,
  type Menu,
  MODAL_SCROLL_OFFSET,
} from "./types/PrimaryNav.types";
import { ModalDataType } from "./types/PrimaryNav.types";

const hasVerticalScrollBar = (modalContentRef: React.RefObject<HTMLDivElement>) =>
  modalContentRef.current
    ? modalContentRef.current.scrollHeight >
      modalContentRef.current.clientHeight + modalContentRef.current.scrollTop + MODAL_SCROLL_OFFSET
    : false;

const useShowScrollIndicator = (
  modalData: Menu | undefined,
  activeModalId: string | undefined,
  modalContentScrollContainerRef: React.RefObject<HTMLDivElement>
) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  useEffect(() => {
    if (activeModalId === "models") {
      setShowScrollIndicator(hasVerticalScrollBar(modalContentScrollContainerRef));

      const handleScroll = debounce(() => {
        setShowScrollIndicator(hasVerticalScrollBar(modalContentScrollContainerRef));
      }, 100);

      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setShowScrollIndicator(false);
    }
  }, [modalData, activeModalId, modalContentScrollContainerRef]);

  return showScrollIndicator;
};

export const ModalContent: React.FC<{
  modalData: Menu | undefined;
  level1Menus: Menu[] | undefined;
  pushActiveModalById: (modalId: string) => void;
  popActiveModal: () => void;
  clearActiveModalAndHistory?: () => void;
  closeButton: React.ReactNode;
  activeMenuId: string | undefined;
  staticLinks: MenuItemWithIconData[];
  modalContentScrollContainerRef: React.RefObject<HTMLDivElement>;
  isSearchEnabled?: boolean;
}> = ({
  modalData,
  level1Menus,
  pushActiveModalById,
  popActiveModal,
  clearActiveModalAndHistory,
  closeButton,
  activeMenuId,
  staticLinks,
  modalContentScrollContainerRef,
  isSearchEnabled,
}) => {
  const showScrollIndicator = useShowScrollIndicator(
    modalData,
    activeMenuId,
    modalContentScrollContainerRef
  );

  let modalContent;

  switch (modalData?.type) {
    case ModalDataType.MOBILE_MENU:
      modalContent = (
        <PrimaryNavModalMobileMenu
          closeButton={closeButton}
          level1Menus={level1Menus}
          staticLinks={staticLinks}
          pushActiveModalById={pushActiveModalById}
          isSearchEnabled={isSearchEnabled}
        />
      );
      break;
    case ModalDataType.SEARCH_MENU:
      modalContent = (
        <PrimaryNavModalSearch
          closeButton={closeButton}
          backLinkText={modalData.mobileLabel || modalData.label}
          popActiveModal={popActiveModal}
        />
      );
      break;
    case ModalDataType.GENERIC:
      modalContent = (
        <PrimaryNavModalGeneric
          closeButton={closeButton}
          backLinkText={modalData.mobileLabel || modalData.label}
          level2MenuItems={modalData.menuItems}
          staticLinks={staticLinks}
          pushActiveModalById={pushActiveModalById}
          popActiveModal={popActiveModal}
        />
      );
      break;
    case ModalDataType.MODELS:
      modalContent = (
        <>
          {activeMenuId === "models" && <ScrollIndicator isVisible={showScrollIndicator} />}
          <PrimaryNavModalModels
            closeButton={closeButton}
            bodyTypes={modalData.availableBodyTypes}
            staticLinks={staticLinks}
            backLinkText={modalData.mobileLabel || modalData.label}
            popActiveModal={popActiveModal}
            filterButtonText={modalData.filterButtonText}
            applyFilterButtonText={modalData.applyFilterButtonText}
            resetFilterButtonText={modalData.resetFilterButtonText}
            fuelFilterLabel={modalData.fuelFilterLabel}
            seatsFilterLabel={modalData.seatsFilterLabel}
            lifestyleFilterLabel={modalData.lifestyleFilterLabel}
            hideFilterBooleans={{
              fuel: modalData.hideFuelFilter,
              seats: modalData.hideSeatsFilter,
              lifestyle: modalData.hideLifestyleFilter,
            }}
          />
        </>
      );
      break;
    case ModalDataType.DEALER:
      modalContent = (
        <PrimaryNavModalDealer
          closeButton={closeButton}
          menuItems={modalData.menuItems.map(menuItemDataToMenuItemTyped)}
          staticLinks={staticLinks}
        />
      );
      break;
    case ModalDataType.ENCORE:
      modalContent = (
        <PrimaryNavModalEncore
          closeButton={closeButton}
          onLogout={clearActiveModalAndHistory}
          logoutLabel={modalData.logoutLabel}
          encoreAdvert={modalData.encoreAdvert}
          menuItems={modalData.menuItems.map(menuItemDataToMenuItemTyped)}
        />
      );
      break;
    default:
  }
  return (
    <div id={`modal_content_${modalData?.menuId || ""} `} className={styles.modalContent}>
      {modalContent}
    </div>
  );
};
