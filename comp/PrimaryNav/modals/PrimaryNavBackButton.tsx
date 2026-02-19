import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./PrimaryNavModalGeneric.module.scss";
import { SVGPrimaryNavBack } from "../svg/SVGPrimaryNavBack";

type PrimaryNavBackButtonProps = React.PropsWithChildren<{
  onClick: React.MouseEventHandler;
}>;

const PrimaryNavBackButton: React.FC<PrimaryNavBackButtonProps> = ({ onClick, children }) => {
  return (
    <button
      {...mergeProps(getFocusOutlineProps(), getBorderRadiusProps("small"), {
        className: styles.backLink,
      })}
      onClick={onClick}
    >
      <span className={styles.backLinkIcon}>
        <SVGPrimaryNavBack />
      </span>
      <span className={styles.backLinkLabel}>{children}</span>
    </button>
  );
};

PrimaryNavBackButton.displayName = "PrimaryNavBackButton";

export { PrimaryNavBackButton };
