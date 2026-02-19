import cn from "classnames";

import { Box } from "@/components/Box/Box";
import { Chip } from "@/components/Chip/Chip";
import { Stack } from "@/components/Stack/Stack";

import { PrimaryNavCloseButtonBackground } from "./PrimaryNavCloseButtonBackground";
import { usePrimaryNavControls, usePrimaryNavLabels } from "./PrimaryNavContext";
import styles from "./PrimaryNavMobilePage.module.scss";
import { PrimaryNavSearchPopover } from "./PrimaryNavSearchPopover";
import { ModalDataType } from "./types/PrimaryNav.types";

type PrimaryNavMobilePageProps = React.PropsWithChildren<{
  closeButton: React.ReactNode;
  variant?: "level1" | "level2";
  headerChildren?: React.ReactNode;
  footerChildren?: React.ReactNode;
  disableFlexGrow?: boolean;
  isSearchEnabled?: boolean;
}>;

const PrimaryNavMobilePage: React.FC<PrimaryNavMobilePageProps> = ({
  closeButton,
  variant = "level1",
  children,
  headerChildren,
  footerChildren,
  disableFlexGrow,
  isSearchEnabled,
}) => {
  const {
    handleNavbarItemClick,
    handleQuickBookClick: onQuickBookClick,
    isQuickBookEnabled,
    activeMenuId,
  } = usePrimaryNavControls();
  const { quickBookButtonLabel } = usePrimaryNavLabels();

  const handleQuickBookClick = () => {
    handleNavbarItemClick(null);
    onQuickBookClick(true);
  };

  return (
    <div className={cn(styles.primaryNavMobilePage, { [styles.level2]: variant === "level2" })}>
      <div className={styles.closeButtonContainer}>
        <PrimaryNavCloseButtonBackground />
        {closeButton}
      </div>

      {isSearchEnabled && (
        <Box px="l" pb="l">
          <PrimaryNavSearchPopover isMobile={true} />
        </Box>
      )}

      {headerChildren && <div className={styles.header}>{headerChildren}</div>}
      <div className={styles.childrenAndFooter}>
        <div
          className={cn(styles.children, {
            [styles.childrenNoFlexGrow]: disableFlexGrow || isQuickBookEnabled,
          })}
        >
          {children}
        </div>

        {isQuickBookEnabled && activeMenuId === ModalDataType.MOBILE_MENU && (
          <Stack component={Box} px="l" py="l" className={styles.quickBookButton}>
            <Chip variant="ghost" onClick={handleQuickBookClick}>
              {quickBookButtonLabel}
            </Chip>
          </Stack>
        )}

        <div className={styles.footer}>{footerChildren}</div>
      </div>
    </div>
  );
};

export { PrimaryNavMobilePage };
