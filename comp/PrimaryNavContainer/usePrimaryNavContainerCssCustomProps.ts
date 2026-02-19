import { useRef } from "react";

import { useResizeObserver } from "@/hooks/useResizeObserver";

export const usePrimaryNavContainerCssCustomProps = (): React.RefObject<HTMLDivElement> => {
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * The coords of PrimaryNav depend on the contents of the PrimaryNavContainer, so we must update
   * the relevant CSS custom props from here (instead of from PrimaryNav itself).
   *
   * This is intended to address the case where a user closes a site banner while a PrimaryNav
   * modal is open, and the PrimaryNav modal should resize itself in response to this.
   */
  useResizeObserver(
    containerRef,
    () => {
      const elPrimaryNav: HTMLDivElement | null =
        containerRef.current?.querySelector(
          "[data-primary-nav-container-resize-observer-target]"
        ) ?? null;

      if (!elPrimaryNav) {
        return;
      }

      const modalOpenScrollToTargetRectInViewport =
        containerRef.current?.getBoundingClientRect() || {
          top: 0,
          bottom: 0,
        };
      const primaryNavRectBeforeScrolling = elPrimaryNav.getBoundingClientRect();
      const primaryNavRectAfterScrolling = {
        top: primaryNavRectBeforeScrolling.top - modalOpenScrollToTargetRectInViewport.top,
        bottom: primaryNavRectBeforeScrolling.bottom - modalOpenScrollToTargetRectInViewport.top,
      };

      elPrimaryNav.style.setProperty(
        "--primary-nav-top-dynamic",
        `${primaryNavRectAfterScrolling.top}px`
      );

      elPrimaryNav.style.setProperty(
        "--primary-nav-bottom-dynamic",
        `${primaryNavRectAfterScrolling.bottom}px`
      );
    },
    true
  );

  return containerRef;
};
