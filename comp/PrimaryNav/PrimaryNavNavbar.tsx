import cn from "classnames";
import { useContext } from "react";

import { Box } from "@/components/Box/Box";
import { AuthenticationContext } from "@/utils/Authentication/authenticationContext";

import styles from "./PrimaryNavNavbar.module.scss";

type PrimaryNavNavbarProps = React.PropsWithChildren<{
  header: React.ReactNode;
  footer: React.ReactNode;
}>;

const PrimaryNavNavbar: React.FC<PrimaryNavNavbarProps> = ({ header, children, footer }) => {
  const { current } = useContext(AuthenticationContext);

  return (
    <div className={styles.navbar} style={{ display: "flex" }}>
      <div
        className={cn(styles.navbarContainer, {
          [styles.enablePadding]: !current.isLoginButtonVisible,
        })}
        style={{ display: "flex" }}
      >
        <Box pr="s" className={styles.navbarHeaderContainer} style={{ display: "flex" }}>
          {header}
        </Box>
        <div className={styles.navbarItemsContainer} style={{ display: "flex" }}>
          {children}
        </div>
        <div className={styles.navbarFooterContainer} style={{ display: "flex" }}>
          {footer}
        </div>
      </div>
    </div>
  );
};

PrimaryNavNavbar.displayName = "PrimaryNavNavbar";

export { PrimaryNavNavbar };
