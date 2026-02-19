import styles from "./PrimaryNavModalMobileMenu.module.scss";
import { PrimaryNavMobileItemsContainer } from "../PrimaryNavMobileItemsContainer";
import { PrimaryNavMobilePage } from "../PrimaryNavMobilePage";
import { PrimaryNavStaticLinks } from "../PrimaryNavStaticLinks/PrimaryNavStaticLinks";
import { Menu, MenuItemWithIconData } from "../types/PrimaryNav.types";

type PrimaryNavModalMobileMenuProps = {
  closeButton: React.ReactNode;
  level1Menus: Menu[] | undefined;
  staticLinks: MenuItemWithIconData[];
  pushActiveModalById: (menuId: string) => void;
  isSearchEnabled?: boolean;
};

const PrimaryNavModalMobileMenu: React.FC<PrimaryNavModalMobileMenuProps> = ({
  closeButton,
  level1Menus: level1Menus,
  staticLinks,
  pushActiveModalById,
  isSearchEnabled,
}) =>
  !level1Menus ? null : (
    <PrimaryNavMobilePage
      closeButton={closeButton}
      footerChildren={<PrimaryNavStaticLinks items={staticLinks} />}
      isSearchEnabled={isSearchEnabled}
    >
      <PrimaryNavMobileItemsContainer parentIsFlexbox={true} fillParentHeight={true}>
        <ul className={styles.primaryNavMobileMenuItems}>
          {level1Menus.map((i) => (
            <li
              key={i.menuId}
              className={styles.primaryNavMobileMenuItem}
              onClick={() => pushActiveModalById(i.menuId)}
            >
              {i.mobileLabel || i.label}
            </li>
          ))}
        </ul>
      </PrimaryNavMobileItemsContainer>
    </PrimaryNavMobilePage>
  );

export { PrimaryNavModalMobileMenu };
