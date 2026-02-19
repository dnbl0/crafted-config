import cn from "classnames";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { Chip } from "@/components/Chip/Chip";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { usePrimaryNavContainerContext } from "@/components/PrimaryNavContainer/PrimaryNavContainer";
import { Stack } from "@/components/Stack/Stack";
import { SVGCross } from "@/components/SVGIcon/static/SVGCross";
import { SVGSearch } from "@/components/SVGIcon/static/SVGSearch";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./PrimaryNavLevel1.module.scss";
import { usePrimaryNavControls, usePrimaryNavLabels } from "../PrimaryNavContext";
import { Menu } from "../types/PrimaryNav.types";

export interface PrimaryNavLevel1Props {
  /**
   * Items to be rendered
   */
  level1Menus: Menu[] | undefined;

  /**
   * Set the active menu item. Must be a member of `level1MenuItems`.
   */
  activeMenu?: Menu;

  /**
   * Whether search is enabled or not.
   */
  isSearchEnabled?: boolean;

  /**
   * Whether search input is visible or not
   */
  isSearchInputVisible?: boolean;

  /**
   * Search icon click handler. Expected use case is to toggle search input open and closed in desktop navigation.
   */
  onSearchIconClick?: (value: boolean) => void;
}

const PrimaryNavLevel1 = /*#__PURE__*/ (function () {
  const PrimaryNavLevel1: React.FC<PrimaryNavLevel1Props> = ({
    level1Menus,
    activeMenu,
    isSearchEnabled = false,
    isSearchInputVisible,
    onSearchIconClick,
  }) => {
    const focusOutlineProps = getFocusOutlineProps({
      outlineOffSet: "smallest",
    });

    const ctx = usePrimaryNavContainerContext();
    const {
      handleNavbarItemClick,
      handleQuickBookClick: onQuickBookClick,
      isQuickBookEnabled,
    } = usePrimaryNavControls();

    const { quickBookButtonLabel } = usePrimaryNavLabels();

    const handleSearchIconClick = () => {
      handleNavbarItemClick(null);

      onSearchIconClick && onSearchIconClick(!isSearchInputVisible);

      if (ctx.initialIsSolidBackground === false) {
        isSearchInputVisible ? ctx.setIsSolidBackground(false) : ctx.setIsSolidBackground(true);
      }
    };

    const handleQuickBookClick = () => {
      handleNavbarItemClick(null);
      onQuickBookClick(true);
    };

    return (
      <div className={styles.navbarItems} role="navigation" aria-label="Primary">
        {level1Menus?.map((level1MenuItem) => (
          <button
            key={level1MenuItem.label}
            onClick={() => {
              handleNavbarItemClick(level1MenuItem);
              onSearchIconClick && onSearchIconClick(false);
            }}
            aria-expanded={level1MenuItem === activeMenu}
            aria-controls={"modal_content_" + level1MenuItem.menuId}
            {...mergeProps(focusOutlineProps, getBorderRadiusProps("small"), {
              className: cn(styles.navbarItem, {
                [styles.isActive]: level1MenuItem === activeMenu,
              }),
            })}
          >
            <span className={styles.label}>{level1MenuItem.label}</span>
          </button>
        ))}
        {isSearchEnabled && (
          <button
            onClick={handleSearchIconClick}
            {...mergeProps(focusOutlineProps, getBorderRadiusProps("small"), {
              className: cn(styles.navbarItem, {
                [styles.isActive]: isSearchInputVisible,
              }),
            })}
          >
            {isSearchInputVisible ? (
              <SVGCross width={16} height={16} />
            ) : (
              <SVGSearch width={16} height={16} />
            )}
          </button>
        )}

        {isQuickBookEnabled && (
          <Stack className={styles.quickBookButton}>
            <Chip variant="ghost" onClick={handleQuickBookClick}>
              {quickBookButtonLabel}
            </Chip>
          </Stack>
        )}
      </div>
    );
  };

  PrimaryNavLevel1.displayName = "PrimaryNavNavbarItems";
  return PrimaryNavLevel1;
})();

export { PrimaryNavLevel1 };
