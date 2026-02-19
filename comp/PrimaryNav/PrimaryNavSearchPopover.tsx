import cn from "classnames";

import { Box } from "@/components/Box/Box";
import { Container } from "@/components/Container/Container";
import { Stack } from "@/components/Stack/Stack";

import { usePrimaryNavSlot } from "./PrimaryNavContext";
import styles from "./PrimaryNavSearchPopover.module.scss";

type PrimaryNavSearchInputProps = {
  hasMargin?: boolean;
  isMobile?: boolean;
};

export const PrimaryNavSearchPopover: React.FC<PrimaryNavSearchInputProps> = ({
  isMobile = false,
  hasMargin,
}) => {
  const slot = usePrimaryNavSlot(isMobile ? "searchMenuTrigger" : "searchPopover");

  return (
    <Stack className={cn(styles.searchInputContainer, { [styles.isMobile]: isMobile })}>
      <Container maxWidth="12col" className={styles.searchInputContent}>
        <Box
          py={isMobile ? "none" : "xs"}
          className={cn(styles.searchInputFormSection, {
            [styles.hasMargin]: hasMargin,
          })}
        >
          {slot}
        </Box>
      </Container>
    </Stack>
  );
};
