import cn from "classnames";
import { useContext } from "react";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { AuthenticationContext } from "@/utils/Authentication/authenticationContext";
import { mergeProps } from "@/utils/reactExtensions";

import { usePrimaryNavControls } from "./PrimaryNavContext";
import styles from "./PrimaryNavNavbarItemAuthenticated.module.scss";
import { Menu } from "./types/PrimaryNav.types";

interface PrimaryNavItemEncoreProps {
  isMenuItemActive?: boolean;
  menuItem: Menu;
}

const PrimaryNavNavbarItemAuthenticated: React.FC<PrimaryNavItemEncoreProps> = ({
  menuItem,
  isMenuItemActive,
}) => {
  const { current } = useContext(AuthenticationContext);
  const { handleNavbarItemClick } = usePrimaryNavControls();
  const currentUser = current.user;

  return (
    <button
      className={cn(styles.navbarItemAuthenticated, { [styles.isActive]: isMenuItemActive })}
      onClick={() => handleNavbarItemClick(menuItem)}
    >
      <span
        {...mergeProps(getBorderRadiusProps("rounded"), {
          className: styles.label,
        })}
      >
        {currentUser?.givenName?.charAt(0)}
        {currentUser?.familyName?.charAt(0)}
      </span>
    </button>
  );
};

export { PrimaryNavNavbarItemAuthenticated };
