import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import { Responsive } from "@/components/Responsive/Responsive";

import { PrimaryNavBackButton } from "./PrimaryNavBackButton";
import { PrimaryNavItems } from "./PrimaryNavItems/PrimaryNavItems";
import styles from "./PrimaryNavModalGeneric.module.scss";
import { menuItemDataToMenuItemTyped } from "../common/PrimaryNav.mappers";
import { PrimaryNavDesktopLayout } from "../PrimaryNavDesktopLayout";
import { PrimaryNavMobileItemsContainer } from "../PrimaryNavMobileItemsContainer";
import { PrimaryNavMobilePage } from "../PrimaryNavMobilePage";
import { PrimaryNavModalContainer } from "../PrimaryNavModalContainer";
import { PrimaryNavStaticLinks } from "../PrimaryNavStaticLinks/PrimaryNavStaticLinks";
import {
  type MenuItemTyped,
  type MenuItemWithIconData,
  isMenuItemWithChildren,
} from "../types/PrimaryNav.types";

const PRIMARY_NAV_TERTIARY_CONTENT_TRANSITION_DURATION_MS = 300;

type PrimaryNavTabGenericProps = {
  closeButton: React.ReactNode;
  level2MenuItems: MenuItemTyped[];
  staticLinks: MenuItemWithIconData[];
  backLinkText: string;
  popActiveModal: React.MouseEventHandler;
  pushActiveModalById: (modalId: string) => void;
};

const PrimaryNavModalGeneric: React.FC<PrimaryNavTabGenericProps> = ({
  closeButton,
  level2MenuItems,
  staticLinks,
  backLinkText,
  popActiveModal,
  pushActiveModalById,
}) => {
  const [activeLevel2MenuItem, setActiveLevel2MenuItem] = useState<MenuItemTyped>();

  const backgroundClickHandler: React.MouseEventHandler = (e) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.closest("a, button")) {
      return;
    }

    setActiveLevel2MenuItem(undefined);
  };

  const level2MenuItemsWithChildren = level2MenuItems.filter(isMenuItemWithChildren);

  const PRIMARY_NAV_TERTIARY_CONTENT_SWITCH_CSS_CLASSNAMES = {
    enter: styles.desktopLayoutLevel2SwitchEnter,
    enterActive: styles.desktopLayoutLevel2SwitchEnterActive,
    enterDone: styles.desktopLayoutLevel2SwitchEnterDone,
    exit: styles.desktopLayoutLevel2SwitchExit,
    exitActive: styles.desktopLayoutLevel2SwitchExitActive,
    exitDone: styles.desktopLayoutLevel2SwitchExitDone,
    appear: styles.desktopLayoutLevel2SwitchEnterDone,
    appearActive: styles.desktopLayoutLevel2SwitchEnterDone,
    appearDone: styles.desktopLayoutLevel2SwitchEnterDone,
  };

  return (
    <>
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
          <PrimaryNavMobileItemsContainer parentIsFlexbox={true} fillParentHeight={true}>
            <PrimaryNavItems
              items={level2MenuItems}
              onItemWithChildrenClick={(menuItem) => pushActiveModalById(menuItem.name)}
            />
          </PrimaryNavMobileItemsContainer>
        </PrimaryNavMobilePage>
      </Responsive>
      <Responsive breakpoint="large">
        <div className={styles.background} onClick={backgroundClickHandler}>
          <PrimaryNavModalContainer parentIsFlexbox={true} fillParentHeight={true}>
            <PrimaryNavDesktopLayout
              closeButton={closeButton}
              isLevel2LayoutAvailable={true}
              isLevel2LayoutHidden={!activeLevel2MenuItem}
              level1LayoutChildren={
                <PrimaryNavItems
                  items={level2MenuItems}
                  itemSelected={activeLevel2MenuItem}
                  onItemWithChildrenClick={(menuItemWithChildren) => {
                    setActiveLevel2MenuItem(menuItemWithChildren);
                  }}
                />
              }
              level1LayoutFooterChildren={<PrimaryNavStaticLinks items={staticLinks} />}
              level2LayoutChildren={
                <div className={styles.desktopLayoutLevel2Container}>
                  {level2MenuItemsWithChildren.map((menuItemWithChildren) => (
                    <CSSTransition
                      key={menuItemWithChildren.name}
                      in={activeLevel2MenuItem === menuItemWithChildren}
                      appear={true}
                      timeout={PRIMARY_NAV_TERTIARY_CONTENT_TRANSITION_DURATION_MS}
                      classNames={PRIMARY_NAV_TERTIARY_CONTENT_SWITCH_CSS_CLASSNAMES}
                    >
                      <div className={styles.desktopLayoutLevel2Content}>
                        <PrimaryNavItems
                          key={menuItemWithChildren.name}
                          items={(menuItemWithChildren.menuItems || []).map(
                            menuItemDataToMenuItemTyped
                          )}
                        />
                      </div>
                    </CSSTransition>
                  ))}
                </div>
              }
            />
          </PrimaryNavModalContainer>
        </div>
      </Responsive>
    </>
  );
};

export { PrimaryNavModalGeneric };
