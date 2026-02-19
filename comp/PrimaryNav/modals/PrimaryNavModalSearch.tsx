import { Responsive } from "@/components/Responsive/Responsive";

import { PrimaryNavBackButton } from "./PrimaryNavBackButton";
import { usePrimaryNavSlot } from "../PrimaryNavContext";
import { PrimaryNavMobileItemsContainer } from "../PrimaryNavMobileItemsContainer";
import { PrimaryNavMobilePage } from "../PrimaryNavMobilePage";
import { PrimaryNavModalContainer } from "../PrimaryNavModalContainer";

type PrimaryNavModalSearchProps = {
  closeButton: React.ReactNode;
  backLinkText: string;
  popActiveModal: React.MouseEventHandler;
};

const PrimaryNavModalSearch: React.FC<PrimaryNavModalSearchProps> = ({
  closeButton,
  backLinkText,
  popActiveModal,
}) => {
  const slot = usePrimaryNavSlot("searchMenu");

  return (
    <Responsive breakpoint="small">
      <PrimaryNavMobilePage
        closeButton={closeButton}
        variant="level2"
        headerChildren={
          <PrimaryNavModalContainer>
            <PrimaryNavBackButton onClick={popActiveModal}>{backLinkText}</PrimaryNavBackButton>
          </PrimaryNavModalContainer>
        }
      >
        <PrimaryNavMobileItemsContainer parentIsFlexbox={true} fillParentHeight={true}>
          {slot}
        </PrimaryNavMobileItemsContainer>
      </PrimaryNavMobilePage>
    </Responsive>
  );
};

export { PrimaryNavModalSearch };
