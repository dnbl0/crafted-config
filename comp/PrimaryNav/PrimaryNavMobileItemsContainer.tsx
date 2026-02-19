import cn from "classnames";

import { Box } from "@/components/Box/Box";

import styles from "./PrimaryNavMobileItemsContainer.module.scss";

type PrimaryNavMobileItemsContainerProps = React.PropsWithChildren<{
  parentIsFlexbox?: boolean;
  fillParentHeight?: boolean;
}>;

const PrimaryNavMobileItemsContainer: React.FC<PrimaryNavMobileItemsContainerProps> = ({
  parentIsFlexbox,
  fillParentHeight,
  children,
}) => {
  return (
    <Box
      px="l"
      className={cn({
        [styles.parentIsFlexbox]: parentIsFlexbox,
        [styles.fillParentHeight]: fillParentHeight,
      })}
    >
      <div className={cn(styles.containerInner)}>{children}</div>
    </Box>
  );
};

export { PrimaryNavMobileItemsContainer };
