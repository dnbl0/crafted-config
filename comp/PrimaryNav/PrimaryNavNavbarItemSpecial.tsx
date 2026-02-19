import cn from "classnames";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { Box } from "@/components/Box/Box";
import { getFocusOutlineProps } from "@/components/FocusOutline/FocusOutline";
import { Responsive } from "@/components/Responsive/Responsive";
import { Stack } from "@/components/Stack/Stack";
import { mergeProps } from "@/utils/reactExtensions";

import { usePrimaryNavControls } from "./PrimaryNavContext";
import styles from "./PrimaryNavNavbarItemSpecial.module.scss";
import { Menu } from "./types/PrimaryNav.types";

interface PrimaryNavItemEncoreProps {
  icon?: React.ReactNode;
  menuItem: Menu;
  isMenuItemActive?: boolean;
}

const PrimaryNavNavbarItemSpecial: React.FC<PrimaryNavItemEncoreProps> = ({
  menuItem,
  icon,
  isMenuItemActive,
}) => {
  const { handleNavbarItemClick } = usePrimaryNavControls();

  return (
    <Box
      px="2xs"
      className={cn(styles.navbarItemSpecialContainer, {
        [styles.isActive]: isMenuItemActive,
      })}
      onClick={() => handleNavbarItemClick(menuItem)}
    >
      <Stack
        component={Box}
        tabIndex={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing="none"
        p="4xs"
        {...mergeProps(
          getFocusOutlineProps({
            outlineOffSet: "smallest",
          }),
          getBorderRadiusProps("small"),
          {
            className: styles.navbarItemSpecial,
          }
        )}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>
          <Responsive breakpoint="large">{menuItem.label}</Responsive>
          <Responsive breakpoint="small">{menuItem.mobileLabel || menuItem.label}</Responsive>
        </span>
      </Stack>
    </Box>
  );
};

export { PrimaryNavNavbarItemSpecial };
