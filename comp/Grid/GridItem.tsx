import classNames from "classnames";

import styles from "./Grid.module.scss";

export type GridItemProps = {
  children?: React.ReactNode;
  className?: string;
  component?: "li" | "div";
};

export const GridItem = ({ children, className, component: Component = "li" }: GridItemProps) => {
  return <Component className={classNames(styles.gridItem, className)}>{children}</Component>;
};
