import cn from "classnames";

import { Box } from "@/components/Box/Box";
import { HeadingLevelProvider } from "@/components/HeadingProvider/HeadingProvider";
import { getStackProps } from "@/components/Stack/Stack";
import { JustifyContentValue } from "@/components/types";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./Cell.module.scss";
import { getBorderRadiusProps } from "../BorderRadius/BorderRadius";
export type CellVerticalAlign = "top" | "center" | "bottom";
export type CellSpan = 1 | 2 | 3;
interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adjusts where two cells meet.
   * Mainly relevant when pairing a row without hasRowGap with a row with hasRowGap.
   * "center" will align with the center of the gap (both need to have "center")
   * "edge" will shorten the cell so its own edge aligns to it's the side of the gap
   */
  alignTo?: "center" | "edge";

  /**
   * When true, cell will have border radius.
   */
  hasCellBorderRadius?: boolean;

  /**
   * Class name(s) to customize component if required.
   */
  className?: string;

  /**
   * Cell padding. Available options: "none" | "default". Default will be "even-more".
   */
  cellPadding?: "none" | "default";

  /**
   * Cell gap. Available options: "none" | "default". Default will be "l".
   */
  cellGap?: "none" | "default";

  /**
   * Cell vertical align. Available options: "top" | "center" | "bottom".
   */
  verticalAlign?: CellVerticalAlign;

  /**
   * Tab index for cell.
   */
  tabIndex?: number | undefined;

  /**
   * If we want the cell to be double or triple length.
   * @default 1
   */
  span?: CellSpan;

  /**
   * Define the semantic element of the Cell
   *
   * Default: `"div"`.
   */
  component?: "div" | "aside" | "section";
}

const alignmentMap: { [key in CellVerticalAlign]: JustifyContentValue } = {
  center: "center",
  top: "flex-start",
  bottom: "flex-end",
};

/**
 * `Cell` component should be used inside `Row` component. It is intended to be used as a grid item.
 * Consumers can put any content inside a `Cell` component.
 */
export const Cell = ({
  children,
  alignTo,
  hasCellBorderRadius,
  cellGap = "default",
  cellPadding = "default",
  verticalAlign = "center",
  tabIndex,
  className,
  span = 1,
  component = "div",
  ...rest
}: CellProps) => {
  let shouldIncreaseHeadingLevel = false;
  if (component === "section" || component === "aside") {
    shouldIncreaseHeadingLevel = true;
  }

  return (
    <HeadingLevelProvider shouldIncreaseHeadingLevel={shouldIncreaseHeadingLevel}>
      <Box
        component={component}
        {...mergeProps(
          getBorderRadiusProps(hasCellBorderRadius ? "medium" : "none"),
          getStackProps({
            spacing: cellGap === "default" ? "l" : "none",
            direction: "column",
            justifyContent: alignmentMap[verticalAlign],
          }),
          {
            className: cn(styles.cell, className, {
              [styles.alignToCenter]: alignTo === "center",
              [styles.alignToEdge]: alignTo === "edge",
              [styles.double]: span === 2,
              [styles.triple]: span === 3,
            }),
          }
        )}
        p={cellPadding === "default" ? "even-more" : "none"}
        tabIndex={tabIndex}
        {...rest}
      >
        {children}
      </Box>
    </HeadingLevelProvider>
  );
};
