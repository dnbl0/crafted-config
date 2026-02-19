import cn from "classnames";
import { useState } from "react";

import { DealerContactTile } from "@/components/DealerContactTile/DealerContactTile";
import { iconRenderer } from "@/components/SVGIcon/static/SVGSelector";

import styles from "./PrimaryNavModal.module.scss";

type PrimaryNavModalDealerContactUsProps = {
  showDealerDetailsDefaultValue?: boolean;
};

const PrimaryNavModalDealerContactUs: React.FC<PrimaryNavModalDealerContactUsProps> = ({
  showDealerDetailsDefaultValue,
}) => {
  const [showDealerDetailsDetails, setShowDealerDetailsDetails] = useState(
    showDealerDetailsDefaultValue
  );

  const toggleDealerDetailsDetails = () => {
    setShowDealerDetailsDetails(!showDealerDetailsDetails);
  };

  return (
    <div className={styles.primaryNavStaticContactUs}>
      <button className={styles.dealerNavTitleContainer} onClick={toggleDealerDetailsDetails}>
        <span>Contact Us</span>
        <span className={styles.dealerNavTitleIconContainer}>
          {iconRenderer(showDealerDetailsDetails ? "subtract" : "add", {
            width: 16,
            height: 16,
            className: styles.dealerNavTitleIcon,
          })}
        </span>
      </button>
      <div
        className={cn(styles.dealerNavDetails, {
          [styles.dealerNavDetailsVisible]: showDealerDetailsDetails,
        })}
      >
        <DealerContactTile />
      </div>
    </div>
  );
};

export { PrimaryNavModalDealerContactUs };
