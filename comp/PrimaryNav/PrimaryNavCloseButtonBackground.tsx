import styles from "./PrimaryNavCloseButtonBackground.module.scss";

type PrimaryNavCloseButtonPanelProps = Record<string, never>;

const PrimaryNavCloseButtonBackground: React.FC<PrimaryNavCloseButtonPanelProps> = () => {
  return (
    <div className={styles.closeButtonBackground}>
      <div className={styles.closeButtonBackgroundGradient} />
      <div className={styles.closeButtonBackgroundBlur1} />
      <div className={styles.closeButtonBackgroundBlur2} />
      <div className={styles.closeButtonBackgroundBlur3} />
    </div>
  );
};

PrimaryNavCloseButtonBackground.displayName = "PrimaryNavCloseButtonPanel";

export { PrimaryNavCloseButtonBackground };
