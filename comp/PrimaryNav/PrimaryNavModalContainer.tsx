import cn from "classnames";

import styles from "./PrimaryNavModalContainer.module.scss";

type PrimaryNavModalContainerProps = React.PropsWithChildren<{
  parentIsFlexbox?: boolean;
  fillParentHeight?: boolean;
}>;

const PrimaryNavModalContainer: React.FC<PrimaryNavModalContainerProps> = ({
  parentIsFlexbox,
  fillParentHeight,
  children,
}) => {
  return (
    <div
      className={cn(styles.container, {
        [styles.parentIsFlexbox]: parentIsFlexbox,
        [styles.fillParentHeight]: fillParentHeight,
      })}
    >
      <div className={cn(styles.containerInner)}>{children}</div>
    </div>
  );
};

export { PrimaryNavModalContainer };
