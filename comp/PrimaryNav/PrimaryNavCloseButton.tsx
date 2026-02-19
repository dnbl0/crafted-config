import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./PrimaryNavCloseButton.module.scss";
import { SVGPrimaryNavClose } from "./svg/SVGPrimaryNavClose";

type CloseButtonProps = {
  onClick: React.MouseEventHandler;
  buttonLabel?: string;
};

const PrimaryNavCloseButton: React.FC<CloseButtonProps> = ({ onClick, buttonLabel }) => (
  <button
    onClick={onClick}
    {...mergeProps(getFocusOutlineProps(), getBorderRadiusProps("small"), {
      className: styles.closeButton,
    })}
  >
    <span className={styles.closeButtonIcon}>
      <SVGPrimaryNavClose />
    </span>
    <span className={styles.closeButtonLabel}>{buttonLabel || "Close"}</span>
  </button>
);

export { PrimaryNavCloseButton };
