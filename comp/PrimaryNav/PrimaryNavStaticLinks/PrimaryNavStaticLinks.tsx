import cn from "classnames";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { iconRenderer } from "@/components/SVGIcon/static/SVGSelector";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./PrimaryNavStaticLinks.module.scss";
import { MenuItemWithIconData } from "../types/PrimaryNav.types";

export type PrimaryNavStaticLinksProps = {
  /**
   * Items to be rendered
   */
  items: MenuItemWithIconData[];
  /**
   * Set how the items are rendered, either vertical or horizontal. Default: vertical.
   */
  layout?: "horizontal" | "vertical";
  dataTestId?: string;
};

const PrimaryNavStaticLinks: React.FC<PrimaryNavStaticLinksProps> = ({
  items,
  layout = "vertical",
  dataTestId = "lk-pr-nav-st-lk-g",
}) => (
  <div
    className={cn(styles.primaryNavStatic, {
      [`${styles.primaryNavStaticHorizontal}`]: layout === "horizontal",
    })}
    data-testid={dataTestId}
  >
    {items.map((item, index) => {
      const ItemTag = (item.link?.url ? "a" : "button") as keyof JSX.IntrinsicElements;

      return (
        (item.link?.url || item.onClick) && (
          <div
            className={cn(styles.primaryNavStaticItem, {
              [`${styles.primaryNavStaticHorizontal}`]: layout === "horizontal",
            })}
            key={item.link?.label}
            data-testid={`lk-pr-nav-st-lk-i-${index}`}
          >
            <ItemTag
              href={item.link?.url}
              target={item.link?.url ? item.link?.target || "" : undefined}
              onClick={item.link?.url ? undefined : item.onClick}
              {...mergeProps(getFocusOutlineProps({}), getBorderRadiusProps("small"), {
                className: styles.primaryNavItemText,
              })}
            >
              <span
                className={cn(styles.primaryNavIcon, {
                  [`${styles.primaryNavIconHorizontal}`]: layout === "horizontal",
                })}
              >
                {iconRenderer(item.icon, {
                  width: 36,
                  height: 36,
                  className: styles.primaryNavIcon,
                })}
              </span>
              {item.link?.label}
            </ItemTag>
          </div>
        )
      );
    })}
  </div>
);

export { PrimaryNavStaticLinks };
