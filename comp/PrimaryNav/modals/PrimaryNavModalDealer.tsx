import { DealerContactTile } from "@/components/DealerContactTile/DealerContactTile";
import { PrimaryNavModalDealerContactUs } from "@/components/PrimaryNav/modals/PrimaryNavModalDealerContactUs";
import { Responsive } from "@/components/Responsive/Responsive";

import { PrimaryNavItems } from "./PrimaryNavItems/PrimaryNavItems";
import styles from "./PrimaryNavModal.module.scss";
import { PrimaryNavDesktopLayout } from "../PrimaryNavDesktopLayout";
import { PrimaryNavMobileItemsContainer } from "../PrimaryNavMobileItemsContainer";
import { PrimaryNavMobilePage } from "../PrimaryNavMobilePage";
import { PrimaryNavModalContainer } from "../PrimaryNavModalContainer";
import { PrimaryNavStaticLinks } from "../PrimaryNavStaticLinks/PrimaryNavStaticLinks";
import { MenuItemTyped, MenuItemWithIconData } from "../types/PrimaryNav.types";

type PrimaryNavTabDealerProps = {
  closeButton: React.ReactNode;
  menuItems: MenuItemTyped[];
  staticLinks: MenuItemWithIconData[];
};

const PrimaryNavModalDealer: React.FC<PrimaryNavTabDealerProps> = ({
  closeButton,
  menuItems,
  staticLinks,
}) => {
  return (
    <>
      <Responsive breakpoint="large">
        <PrimaryNavModalContainer parentIsFlexbox={true} fillParentHeight={true}>
          <PrimaryNavDesktopLayout
            closeButton={closeButton}
            isLevel2LayoutPaddingSuppressed={true}
            isLevel2LayoutIgnoringContainerPaddingRight={true}
            isLevel2LayoutAvailable={true}
            level1LayoutChildren={<PrimaryNavItems items={menuItems} />}
            level1LayoutFooterChildren={<PrimaryNavStaticLinks items={staticLinks} />}
            level2LayoutChildren={
              <>
                <DealerContactTile />
              </>
            }
          />
        </PrimaryNavModalContainer>
      </Responsive>
      <Responsive breakpoint="small">
        <div className={styles.dealerNavContainer}>
          <PrimaryNavMobilePage closeButton={closeButton} disableFlexGrow={true}>
            <PrimaryNavMobileItemsContainer parentIsFlexbox={true} fillParentHeight={true}>
              <PrimaryNavItems items={menuItems} />
            </PrimaryNavMobileItemsContainer>
            <PrimaryNavModalDealerContactUs />
            <PrimaryNavStaticLinks items={staticLinks} />
          </PrimaryNavMobilePage>
        </div>
      </Responsive>
    </>
  );
};

export { PrimaryNavModalDealer };
