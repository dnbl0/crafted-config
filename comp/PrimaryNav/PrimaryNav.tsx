import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import jump from "jump.js";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  type GroupedChildrenProps,
  withGroupedChildren,
  type WithGroupedChildrenComponent,
} from "react-grouped-children";
import { CSSTransition } from "react-transition-group";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { Responsive } from "@/components/Responsive/Responsive";
import { ThemeVariantScope } from "@/components/ThemeVariantScope/ThemeVariantScope";
import { useOnEscKeyDown } from "@/hooks/useOnEscKeyDown";
import { useScrollbarWidthOfElement } from "@/hooks/useScrollbarWidthOfElement";
import type { ImageData } from "@/types/graphqlResponse";
import { AuthenticationContext } from "@/utils/Authentication/authenticationContext";
import { SilentAuthentication } from "@/utils/Authentication/SilentAuthentication";
import { mergeProps } from "@/utils/reactExtensions";

import { menuItemDataToMenuItemTyped } from "./common/PrimaryNav.mappers";
import { getEncoreMenu, getLevel1Menus } from "./common/PrimaryNav.utils";
import styles from "./PrimaryNav.module.scss";
import { PrimaryNavCloseButton } from "./PrimaryNavCloseButton";
import { PrimaryNavContextProvider } from "./PrimaryNavContext";
import { PrimaryNavFixedChildren } from "./PrimaryNavFixedChildren";
import { PrimaryNavLevel1 } from "./PrimaryNavLevel1/PrimaryNavLevel1";
import { ModalContent } from "./PrimaryNavModalContent";
import { PrimaryNavNavbar } from "./PrimaryNavNavbar";
import { PrimaryNavNavbarItemAuthenticated } from "./PrimaryNavNavbarItemAuthenticated";
import { PrimaryNavNavbarItemSpecial } from "./PrimaryNavNavbarItemSpecial";
import { PrimaryNavQuickBookModal } from "./PrimaryNavQuickBookModal";
import { PrimaryNavSearchPopover } from "./PrimaryNavSearchPopover";
import { SVGLogo } from "./svg/SVGLogo";
import { SVGPrimaryNavMenu } from "./svg/SVGPrimaryNavMenu";
import {
  type MainMenuItem,
  type MenuItemTyped,
  type Menu,
  type GenericMenu,
  type PrimaryNavData,
  type MobileMenu,
  MODAL_TRANSITION_DURATION_MS,
  MODAL_CONTENT_TRANSITION_DURATION_MS,
  isGenericMenu,
  isMenuItemWithChildren,
  SearchMenu,
} from "./types/PrimaryNav.types";
import { ModalDataType } from "./types/PrimaryNav.types";

const MODAL_OPEN_CLOSE_CSS_CLASSNAMES = {
  enter: styles.modalOpenCloseEnter,
  enterActive: styles.modalOpenCloseEnterActive,
  enterDone: styles.modalOpenCloseEnterDone,
  exit: styles.modalOpenCloseExit,
  exitActive: styles.modalOpenCloseExitActive,
  exitDone: styles.modalOpenCloseExitDone,
  appear: styles.modalOpenCloseEnterDone,
  appearActive: styles.modalOpenCloseEnterDone,
  appearDone: styles.modalOpenCloseEnterDone,
};

const MODAL_CONTENT_SWITCH_CSS_CLASSNAMES = {
  enter: styles.modalContentSwitchEnter,
  enterActive: styles.modalContentSwitchEnterActive,
  enterDone: styles.modalContentSwitchEnterDone,
  exit: styles.modalContentSwitchExit,
  exitActive: styles.modalContentSwitchExitActive,
  exitDone: styles.modalContentSwitchExitDone,
  appear: styles.modalContentSwitchEnterDone,
  appearActive: styles.modalContentSwitchEnterDone,
  appearDone: styles.modalContentSwitchEnterDone,
};

const MODAL_CONTENT_SWITCH_BACK_CSS_CLASSNAMES = {
  enter: styles.modalContentSwitchBackEnter,
  enterActive: styles.modalContentSwitchBackEnterActive,
  enterDone: styles.modalContentSwitchBackEnterDone,
  exit: styles.modalContentSwitchBackExit,
  exitActive: styles.modalContentSwitchBackExitActive,
  exitDone: styles.modalContentSwitchBackExitDone,
  appear: styles.modalContentSwitchBackEnterDone,
  appearActive: styles.modalContentSwitchBackEnterDone,
  appearDone: styles.modalContentSwitchBackEnterDone,
};

export type PrimaryNavProps = React.PropsWithChildren<
  PrimaryNavData & {
    initialOpenModalId?: string;
    mainMenuLogoHref?: string;
    overrideDataMainMenuLogoMobile?: ImageData;
    overrideDataMainMenuLogo?: ImageData;
    onQuickBookClick?: () => void;

    /**
     * Use this to open search drop down on desktop by default
     */
    openSearchRowByDefault?: boolean;
  }
>;

const navFocusOutlineProps = getFocusOutlineProps({
  outlineOffSet: "smallest",
});

const constructMobileMenuItem = (mainMenuData: MainMenuItem): MobileMenu => {
  const label = mainMenuData.menuTextMobile || "Menu";

  return {
    type: ModalDataType.MOBILE_MENU,
    label: label,
    menuId: "mobile-menu",
  };
};

const constructSearchMenu = (mainMenuData: MainMenuItem): SearchMenu => {
  const label = mainMenuData.menuTextMobile || "Search";

  return {
    type: ModalDataType.SEARCH_MENU,
    label: label,
    menuId: "search-menu",
  };
};

const constructMobileMenu = (mainMenuData: MainMenuItem): MobileMenu => {
  const label = mainMenuData.menuTextMobile || "Menu";

  return {
    type: ModalDataType.MOBILE_MENU,
    menuId: "mobile-menu",
    label: label,
  };
};

const extractTertiaryNavAsMobileModals = (mainMenuModalData: Menu[]): GenericMenu[] => {
  const genericModals = mainMenuModalData.filter(isGenericMenu);

  const allSecondaryNavItems = genericModals.reduce(
    (acc, modalData) => [...acc, ...modalData.menuItems],
    [] as MenuItemTyped[]
  );

  const allSecondaryNavItemsWithChildren = allSecondaryNavItems.filter(isMenuItemWithChildren);

  return allSecondaryNavItemsWithChildren.map((secondaryNavItem) => ({
    type: ModalDataType.GENERIC,
    menuId: secondaryNavItem.name,
    label: secondaryNavItem.name,
    menuItems: (secondaryNavItem.menuItems || []).map(menuItemDataToMenuItemTyped),
  }));
};

const childrenSpec = {
  /**
   * Use PrimaryNav.SearchPopover to render search popover (desktop only)
   */
  SearchPopover: null,

  /**
   * Use PrimaryNav.SearchMenuTrigger to render trigger which opens search menu.
   * You have 2 ways to use it:
   * * To render a static block with your search content
   * * To render some trigger (button, search field) which will open search menu
   *   using `usePrimaryNavControls` hook. Example:
   *
   * ```tsx
   * const { pushActiveMenuId } = usePrimaryNavControls();
   * const handleAction = useCallback(() => {
   *   pushActiveMenuId("search-menu");
   * }, [pushActiveMenuId]);
   * ```
   */
  SearchMenuTrigger: null,

  /**
   * Use PrimaryNav.SearchMenu to render search menu (mobile only).
   * Use it to implement 2 step search flow. See `SearchMenuTrigger` for more details.
   */
  SearchMenu: null,

  /**
   * Use PrimaryNav.QuickBookModal to render quick book modal.
   */
  QuickBookModal: null,

  /**
   * Use PrimaryNav.FixedChildren to render fixed children below the main navigation items, e.g. Breadcrumbs.
   */
  FixedChildren: null,
} as const;

const useActiveModal = (
  primaryNavRootRef: React.RefObject<HTMLDivElement>,
  initialOpenModalId?: string
) => {
  const [activeMenuId, setActiveMenuId] = useState<string | undefined>(initialOpenModalId);

  const [lastNonNullActiveModalId, setLastNonNullActiveModalId] = useState<string | undefined>(
    initialOpenModalId
  );

  const getModalOpenScrollToTarget = useCallback(
    () =>
      primaryNavRootRef.current?.closest("[data-primary-nav-modal-open-scrollto-target]") ??
      primaryNavRootRef.current,
    [primaryNavRootRef]
  );

  const [allModalContentsRemountKey, setAllModalContentsRemountKey] = useState<number>(0);
  const setActiveModalById = useCallback(
    (modalId: string | undefined, offset?: number) => {
      setActiveMenuId(modalId);
      if (modalId) {
        setLastNonNullActiveModalId(modalId);
        if (!activeMenuId) {
          setAllModalContentsRemountKey((prevAllModalContentsRemountKey) => {
            return prevAllModalContentsRemountKey + 1;
          });
        }
        const modalOpenScrollToTarget = getModalOpenScrollToTarget();
        if (modalOpenScrollToTarget) {
          jump(modalOpenScrollToTarget, {
            offset: offset ? offset * -1 : undefined,
            duration: 300,
          });
        }
      }
    },
    [activeMenuId, getModalOpenScrollToTarget]
  );

  return {
    activeMenuId,
    allModalContentsRemountKey,
    lastNonNullActiveModalId,
    setActiveModalById,
  };
};

const DynamicEncoreMenu: React.FC<{
  encoreMenu: Menu | undefined;
  activeModal: Menu | undefined;
}> = ({ encoreMenu, activeModal }) => {
  const { current } = useContext(AuthenticationContext);

  const isAuthenticated = !!current.user;
  if (!encoreMenu || !current.isLoginButtonVisible) {
    return null;
  }

  return isAuthenticated ? (
    <PrimaryNavNavbarItemAuthenticated
      menuItem={encoreMenu}
      isMenuItemActive={activeModal === encoreMenu}
    />
  ) : (
    <PrimaryNavNavbarItemSpecial
      menuItem={encoreMenu}
      isMenuItemActive={activeModal === encoreMenu}
    />
  );
};

interface LogoLinkProps {
  breakpoint: "small" | "large";
  href: string | undefined;
  src: string;
  description: string | undefined;
}

const LogoLink = ({ breakpoint, href = "/", src, description }: LogoLinkProps) => (
  <Responsive breakpoint={breakpoint}>
    <a
      href={href}
      {...mergeProps(navFocusOutlineProps, getBorderRadiusProps("small"), {
        className: styles.logoLink,
      })}
    >
      <SVGLogo src={src} description={description} />
    </a>
  </Responsive>
);

const PrimaryLogo: React.FC<{
  logoLarge: ImageData | undefined;
  logoSmall: ImageData | undefined;
  mainMenuLogoHref: string | undefined;
}> = ({ logoSmall: mainMenuLogoMobile, mainMenuLogoHref, logoLarge: mainMenuLogo }) => (
  <div className={styles.logo}>
    {mainMenuLogoMobile?.src && (
      <LogoLink
        breakpoint="small"
        href={mainMenuLogoHref}
        src={mainMenuLogoMobile.src}
        description={mainMenuLogoMobile.alt}
      />
    )}
    {mainMenuLogo?.src && (
      <LogoLink
        breakpoint="large"
        href={mainMenuLogoHref}
        src={mainMenuLogo.src}
        description={mainMenuLogo.alt}
      />
    )}
  </div>
);

const PrimaryNavRoot: React.FC<
  React.PropsWithChildren<{
    rootRef: React.RefObject<HTMLDivElement>;
  }>
> = ({ rootRef, children }) => (
  <ThemeVariantScope variant="alt">
    <div
      ref={rootRef}
      className={styles.primaryNav}
      data-primary-nav-container-resize-observer-target=""
    >
      <SilentAuthentication />
      {children}
    </div>
  </ThemeVariantScope>
);

/**
 * This is the universal navigation bar across Lexus.com.au. This is used by users to navigate across the website and to log into their Encore accounts.
 */
const PrimaryNav = /*#__PURE__*/ (function () {
  const PrimaryNav: React.FC<PrimaryNavProps & GroupedChildrenProps<typeof childrenSpec>> = ({
    initialOpenModalId,
    overrideDataMainMenuLogoMobile,
    overrideDataMainMenuLogo,
    mainMenuLogoHref,
    searchSettings,
    logoLarge,
    logoSmall,
    mainMenu,
    staticLinks,
    searchPopover,
    searchMenu,
    searchMenuTrigger,
    openSearchRowByDefault,
    quickBookModal,
    offset,
    quickBookSettings,
    onQuickBookClick,
    fixedChildren,
  }) => {
    const primaryNavRootRef = useRef<HTMLDivElement>(null);
    const modalHistory = useRef<string[]>([]);
    const [isPushing, setIsPushing] = useState<boolean>(true);
    const { showSearch } = searchSettings || {};
    const [isQuickBookModalVisible, setIsQuickBookModalVisible] = useState(false);
    const { quickBookButtonLabel } = quickBookSettings || {};

    const {
      activeMenuId,
      lastNonNullActiveModalId,
      allModalContentsRemountKey,
      setActiveModalById,
    } = useActiveModal(primaryNavRootRef, initialOpenModalId);
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(
      openSearchRowByDefault || false
    );

    const mobileMenu = mainMenu ? constructMobileMenuItem(mainMenu) : undefined;
    const encoreMenu = getEncoreMenu(mainMenu);
    const level1Menus = getLevel1Menus(mainMenu);
    const activeLevel1MenuItem = mainMenu?.menus?.find((menu) => menu.menuId === activeMenuId);
    const activeLevel1MenuItemExceptEncore = level1Menus?.find(
      (menu) => menu.menuId === activeMenuId
    );

    const clearActiveModalAndHistory = useCallback(() => {
      modalHistory.current = [];
      setActiveModalById(undefined);
    }, [setActiveModalById]);

    const popActiveMenu = useCallback(() => {
      modalHistory.current.pop();
      const newActiveModal = modalHistory.current.length
        ? modalHistory.current[modalHistory.current.length - 1]
        : undefined;
      setIsPushing(false);
      setActiveModalById(newActiveModal);
    }, [setActiveModalById]);

    const pushActiveMenuId = useCallback(
      (menuId: string) => {
        modalHistory.current.push(menuId);
        setIsPushing(true);
        setActiveModalById(menuId, offset);
      },
      [offset, setActiveModalById]
    );

    const handleNavbarItemClick = useCallback(
      (menu: Menu | null) => {
        if (!menu || menu.menuId === activeMenuId) {
          clearActiveModalAndHistory();
          return;
        }

        pushActiveMenuId(menu.menuId);
      },
      [activeMenuId, pushActiveMenuId, clearActiveModalAndHistory]
    );

    const modalContentScrollContainerRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const allMenus = mainMenu?.menus;
    const closeButtonText = mainMenu?.closeText;
    const mainMenuModalData: Array<Menu> = [];

    useOnEscKeyDown(isSearchInputVisible, () => setIsSearchInputVisible(false));

    mainMenu && mainMenuModalData.push(constructMobileMenu(mainMenu));
    mainMenu && showSearch && mainMenuModalData.push(constructSearchMenu(mainMenu));
    if (allMenus) {
      mainMenuModalData.push(...allMenus);
      mainMenuModalData.push(...extractTertiaryNavAsMobileModals(allMenus));
    }

    const { addScrollbarWidthWatcher, removeScrollbarWidthWatcher } = useScrollbarWidthOfElement({
      measureScrollbarTarget: modalContentScrollContainerRef,
      resizeObserverTarget: modalContentRef,
      onScrollbarWidthChange: (scrollbarWidthPx) => {
        primaryNavRootRef.current?.style.setProperty(
          "--primary-nav-modal-scrollbar-width-if-present",
          `${scrollbarWidthPx}px`
        );
      },
    });

    useEffect(() => {
      const elScrollContainer = modalContentScrollContainerRef.current;
      if (!elScrollContainer) {
        return;
      }
      if (activeMenuId) {
        disableBodyScroll(elScrollContainer);
        addScrollbarWidthWatcher();
      } else {
        enableBodyScroll(elScrollContainer);
        removeScrollbarWidthWatcher();
      }

      return () => {
        if (activeMenuId) {
          removeScrollbarWidthWatcher();
          enableBodyScroll(elScrollContainer);
        }
      };
    }, [activeMenuId, addScrollbarWidthWatcher, removeScrollbarWidthWatcher]);

    return (
      <PrimaryNavContextProvider
        slots={{
          searchMenu,
          searchPopover,
          searchMenuTrigger,
          quickBookModal,
          fixedChildren,
        }}
        controls={{
          pushActiveMenuId,
          popActiveMenu,
          handleNavbarItemClick,
          handleQuickBookClick: (isOpen: boolean) => {
            setIsQuickBookModalVisible(isOpen);
            if (isOpen) {
              onQuickBookClick?.();
            }
          },
          isQuickBookEnabled: quickBookModal.length > 0,
          activeMenuId: activeMenuId,
        }}
        labels={{
          quickBookButtonLabel,
        }}
      >
        <PrimaryNavRoot rootRef={primaryNavRootRef}>
          <div className={styles.navbarWrapper}>
            <PrimaryNavNavbar
              header={
                <PrimaryLogo
                  logoLarge={overrideDataMainMenuLogo || logoLarge || mainMenu?.logo}
                  logoSmall={overrideDataMainMenuLogoMobile || logoSmall || mainMenu?.logoMobile}
                  mainMenuLogoHref={mainMenuLogoHref}
                />
              }
              footer={
                <>
                  <Responsive breakpoint="small">
                    {mobileMenu && (
                      <PrimaryNavNavbarItemSpecial
                        menuItem={mobileMenu}
                        icon={<SVGPrimaryNavMenu />}
                        isMenuItemActive={activeLevel1MenuItem === mobileMenu}
                      />
                    )}
                  </Responsive>
                  <DynamicEncoreMenu encoreMenu={encoreMenu} activeModal={activeLevel1MenuItem} />
                </>
              }
            >
              <Responsive breakpoint="large">
                <PrimaryNavLevel1
                  level1Menus={level1Menus}
                  activeMenu={activeLevel1MenuItemExceptEncore}
                  onSearchIconClick={setIsSearchInputVisible}
                  isSearchInputVisible={isSearchInputVisible}
                  isSearchEnabled={showSearch}
                />
              </Responsive>
            </PrimaryNavNavbar>
          </div>

          <PrimaryNavFixedChildren />

          {isSearchInputVisible && (
            <Responsive breakpoint="large">
              <PrimaryNavSearchPopover hasMargin={true} />
            </Responsive>
          )}

          <PrimaryNavQuickBookModal
            onClose={setIsQuickBookModalVisible}
            isOpen={isQuickBookModalVisible}
          />

          <CSSTransition
            in={!!activeMenuId}
            appear={true}
            timeout={MODAL_TRANSITION_DURATION_MS}
            classNames={MODAL_OPEN_CLOSE_CSS_CLASSNAMES}
          >
            <div className={styles.modal}>
              <div
                className={styles.allModalsContentScrollContainer}
                ref={modalContentScrollContainerRef}
              >
                <div className={styles.allModalsContent} ref={modalContentRef}>
                  {mainMenuModalData.map((menu) => (
                    <CSSTransition
                      key={`${allModalContentsRemountKey} ${menu.menuId}`}
                      in={lastNonNullActiveModalId === menu.menuId}
                      appear={true}
                      timeout={MODAL_CONTENT_TRANSITION_DURATION_MS}
                      classNames={
                        isPushing
                          ? MODAL_CONTENT_SWITCH_CSS_CLASSNAMES
                          : MODAL_CONTENT_SWITCH_BACK_CSS_CLASSNAMES
                      }
                    >
                      <ModalContent
                        modalData={menu}
                        level1Menus={level1Menus}
                        pushActiveModalById={pushActiveMenuId}
                        popActiveModal={popActiveMenu}
                        activeMenuId={activeMenuId}
                        clearActiveModalAndHistory={clearActiveModalAndHistory}
                        closeButton={
                          <PrimaryNavCloseButton
                            onClick={clearActiveModalAndHistory}
                            buttonLabel={closeButtonText}
                          />
                        }
                        staticLinks={
                          staticLinks?.find(
                            (item) => item.usedByEncore === (menu.type === ModalDataType.ENCORE)
                          )?.links || []
                        }
                        modalContentScrollContainerRef={modalContentScrollContainerRef}
                        isSearchEnabled={showSearch}
                      />
                    </CSSTransition>
                  ))}
                </div>
              </div>
            </div>
          </CSSTransition>
        </PrimaryNavRoot>
      </PrimaryNavContextProvider>
    );
  };

  PrimaryNav.displayName = "PrimaryNav";
  const PrimaryNavGroup: WithGroupedChildrenComponent<
    typeof childrenSpec,
    React.PropsWithChildren & PrimaryNavProps
  > = withGroupedChildren({
    childrenSpec,
  })(PrimaryNav);

  return PrimaryNavGroup;
})();

export { PrimaryNav };
