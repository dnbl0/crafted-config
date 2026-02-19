import { usePrimaryNavSlot } from "./PrimaryNavContext";
import styles from "./PrimaryNavFixedChildren.module.scss";

export const PrimaryNavFixedChildren = () => {
  const slot = usePrimaryNavSlot("fixedChildren");

  return <div className={styles.fixedChildren}>{slot}</div>;
};
