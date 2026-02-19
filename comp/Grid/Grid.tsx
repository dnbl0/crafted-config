import cn from "classnames";
import { isValidElement, useRef, useState } from "react";
import {
  GroupedChildrenProps,
  withGroupedChildren,
  WithGroupedChildrenComponent,
} from "react-grouped-children";
import flattenChildren from "react-keyed-flatten-children";

import { Button } from "@/components/Button/Button";
import { GridProps } from "@/components/Grid/Grid.types";
import { Stack } from "@/components/Stack/Stack";
import { Typography } from "@/components/Typography/Typography";
import { useAnalytics } from "@/utils/DataAnalytics";
import { DataAnalyticsEvents } from "@/utils/DataAnalytics/models/DataAnalyticsDefinitions";

import styles from "./Grid.module.scss";
import { GridItem } from "./GridItem";

const childrenSpec = {
  /**
   * Use Grid.Item to render correctly styled and accessible children.
   */
  Item: GridItem,
} as const;

const GridInternal: React.FC<GroupedChildrenProps<typeof childrenSpec> & GridProps> = ({
  children,
  columns = 2,
  component: Component = "ul",
  heading,
  item,
  onClickShowMore,
  rows,
  showMoreLabel = "Show more",
}) => {
  // Allow a fallback if `GridItem`s are wrapped in a Fragment
  const allChildren = item.length
    ? item
    : flattenChildren(children).filter((child) => isValidElement(child) && child.type === GridItem);

  const { registerEvent } = useAnalytics();

  const initialVisibleCount = rows
    ? Math.min(rows * columns, allChildren.length)
    : allChildren.length;
  const [currentVisibleCount, setCurrentVisibleCount] = useState(initialVisibleCount);

  const statusRef = useRef<HTMLSpanElement>(null);
  const statusText = `Showing ${currentVisibleCount} of ${allChildren.length} items.`;

  const hasShowMoreButton = !!rows && currentVisibleCount < allChildren.length;

  const onPressShowMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    registerEvent(DataAnalyticsEvents.CLICK, {
      event: "componentLinkClick",
      componentType: "Load more button",
      componentLinkText: event.currentTarget?.textContent || "None",
    });

    const updatedCount = currentVisibleCount + initialVisibleCount;

    const validCount = Math.min(updatedCount, allChildren.length);
    setCurrentVisibleCount(validCount);

    // If no more items to show, we move focus to the status so as not to leave keyboard users in a stranded focus state
    if (statusRef.current && validCount === allChildren.length) {
      statusRef.current.focus();
    }

    if (onClickShowMore) {
      onClickShowMore(event);
    }
  };

  const gridColsCustomProperty = {
    "--lk-private-grid-cols": `${columns}`,
  } as React.CSSProperties;

  return (
    <Stack className={styles.gridContainer} direction="column" spacing="m">
      {heading && <Typography variant="h3">{heading}</Typography>}

      <span className={styles.gridStatus} ref={statusRef} role="status" tabIndex={-1}>
        {statusText}
      </span>

      <Component
        style={gridColsCustomProperty}
        className={cn(styles.grid, {
          [styles.gridThreeColumns]: columns === 3,
        })}
      >
        {allChildren.slice(0, currentVisibleCount)}
      </Component>

      {hasShowMoreButton && (
        <Button className={styles.gridItemCenter} onClick={onPressShowMore} variant="secondary">
          {showMoreLabel}
        </Button>
      )}
    </Stack>
  );
};

const Component: WithGroupedChildrenComponent<typeof childrenSpec, GridProps> = withGroupedChildren(
  { childrenSpec }
)(GridInternal);

/**
 * `Grid` component is intended to be used as a list. It Will only allow
 * `Grid.Item` and Fragment components as children, others will be ignored.
 *
 * Usage:
 *
 * ```tsx
 *<Grid>
 *  <Grid.Item>Content 1</Grid.Item>
 *  <Grid.Item>Content 2</Grid.Item>
 *</Grid>
 * ```
 */
export const Grid = Component;
