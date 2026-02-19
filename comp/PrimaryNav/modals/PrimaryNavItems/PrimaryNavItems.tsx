import cn from "classnames";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { ANCHOR_TAG_REL_FOR_BLANK_TARGET } from "@/components/common/constants";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./PrimaryNavItems.module.scss";
import {
  MenuItemType,
  MenuItemTyped,
  MenuItemWithChildren,
  isMenuItemWithChildren,
} from "../../types/PrimaryNav.types";

type PrimaryNavItemsProps = {
  /**
   * items to be rendered
   */
  items: MenuItemTyped[];
  /**
   * When provided, the item under this index will be underlined.
   */
  itemSelected?: MenuItemTyped;
  /**
   * Click handler for nav items with children
   */
  onItemWithChildrenClick?: (item: MenuItemWithChildren) => void;
  dataTestId?: string;
};

const itemRender = (
  item: MenuItemTyped,
  index: number,
  mergedProps: React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement>,
  onItemWithChildrenClick?: (item: MenuItemWithChildren) => void
) => {
  switch (item.type) {
    case MenuItemType.LEAF:
      return (
        item.link && (
          <a
            {...(!item.disabled && { href: item.link.url })}
            key={item.link.label === null ? `primary_nav_item_${index}` : item.link.label}
            target={item.link.target || "_self"}
            rel={item.link.target === "_blank" ? ANCHOR_TAG_REL_FOR_BLANK_TARGET : ""}
            aria-disabled={item.disabled}
            {...mergedProps}
          >
            {item.link.label}
          </a>
        )
      );
    case MenuItemType.WITHCHILDREN:
      return (
        <button key={item.name} onClick={() => onItemWithChildrenClick?.(item)} {...mergedProps}>
          {item.name}
        </button>
      );
  }
};

const PrimaryNavItems: React.FC<PrimaryNavItemsProps> = ({
  items,
  itemSelected,
  dataTestId,
  onItemWithChildrenClick,
}) => (
  <div
    data-testid={dataTestId}
    className={cn(styles.primaryNavItems, { [styles.isNavItemSelected]: itemSelected })}
  >
    {items.map((menuItem, index) =>
      itemRender(
        menuItem,
        index,
        mergeProps(getFocusOutlineProps({}), getBorderRadiusProps("small"), {
          className: cn(styles.primaryNavItem, {
            [`${styles.primaryNavItemSelected}`]: itemSelected === menuItem,
            [styles.disabled]: isMenuItemWithChildren(menuItem) ? false : menuItem.disabled,
          }),
        }),
        onItemWithChildrenClick
      )
    )}
  </div>
);

export { PrimaryNavItems };
