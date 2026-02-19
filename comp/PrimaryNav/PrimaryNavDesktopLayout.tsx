import cn from "classnames";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useResizeObserver } from "@/hooks/useResizeObserver";

import { PrimaryNavCloseButtonBackground } from "./PrimaryNavCloseButtonBackground";
import styles from "./PrimaryNavDesktopLayout.module.scss";

const LEVEL_2_TRANSITION_DURATION_MS = 300;

type NavigationDesktopLayoutProps = {
  closeButton: React.ReactNode;
  isLevel2LayoutAvailable: boolean;
  isLevel2LayoutHidden?: boolean;
  level1LayoutChildren: React.ReactNode;
  level1LayoutFooterChildren?: React.ReactNode;
  level2LayoutChildren?: React.ReactNode;
  isLevel2LayoutPaddingSuppressed?: boolean;
  isLevel2LayoutBackgroundSuppressed?: boolean;
  isLevel2LayoutIgnoringContainerPaddingRight?: boolean;
};

const PrimaryNavDesktopLayout: React.FC<NavigationDesktopLayoutProps> = ({
  closeButton,
  isLevel2LayoutAvailable,
  isLevel2LayoutHidden,
  level1LayoutChildren,
  level1LayoutFooterChildren,
  level2LayoutChildren,
  isLevel2LayoutPaddingSuppressed,
  isLevel2LayoutBackgroundSuppressed,
  isLevel2LayoutIgnoringContainerPaddingRight,
}) => {
  const level2OpenCloseCssClassNames = {
    enter: styles.level2OpenCloseEnter,
    enterActive: styles.level2OpenCloseEnterActive,
    enterDone: styles.level2OpenCloseEnterDone,
    exit: styles.level2OpenCloseExit,
    exitActive: styles.level2OpenCloseExitActive,
    exitDone: styles.level2OpenCloseExitDone,
    appear: styles.level2OpenCloseEnterDone,
    appearActive: styles.level2OpenCloseEnterDone,
    appearDone: styles.level2OpenCloseEnterDone,
  };

  const primaryNavDesktopLayoutLevelsRef = useRef<HTMLDivElement | null>(null);
  const level2LayoutRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver(level2LayoutRef, (rect) => {
    const level2Height = rect?.height ?? 0;

    if (primaryNavDesktopLayoutLevelsRef.current && level2Height > 0) {
      primaryNavDesktopLayoutLevelsRef.current.style.setProperty(
        "--primary-nav-desktop-layout-min-height-dynamic",
        `${level2Height}px`
      );
    }
  });

  return (
    <div
      className={cn(styles.primaryNavDesktopLayout, {
        [styles.isLevel2LayoutAvailable]: isLevel2LayoutAvailable,
      })}
    >
      <div className={styles.closeButtonContainer}>
        <PrimaryNavCloseButtonBackground />
        {closeButton}
      </div>
      <div className={styles.primaryNavDesktopLayoutLevels} ref={primaryNavDesktopLayoutLevelsRef}>
        <div className={styles.level1Layout}>
          <div className={styles.level1LayoutBody}>{level1LayoutChildren}</div>
          <div className={styles.level1LayoutFooter}>{level1LayoutFooterChildren}</div>
        </div>
        <CSSTransition
          in={isLevel2LayoutAvailable && !isLevel2LayoutHidden}
          appear={true}
          timeout={LEVEL_2_TRANSITION_DURATION_MS}
          classNames={level2OpenCloseCssClassNames}
        >
          <div
            className={cn(styles.level2Layout, {
              [styles.isPaddingSuppressed]: isLevel2LayoutPaddingSuppressed,
              [styles.isBackgroundSuppressed]: isLevel2LayoutBackgroundSuppressed,
              [styles.isIgnoringContainerPaddingRight]: isLevel2LayoutIgnoringContainerPaddingRight,
            })}
            ref={level2LayoutRef}
          >
            {level2LayoutChildren}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export { PrimaryNavDesktopLayout };
