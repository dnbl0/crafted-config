import { ContentBlock } from "@/components/ContentBlock/ContentBlock";
import { ContentBlockInnerContainer } from "@/components/ContentBlockInnerContainer/ContentBlockInnerContainer";
import { Stack } from "@/components/Stack/Stack";

import styles from "./PageHeader.module.scss";
import { Typography } from "../Typography/Typography";

/**
 * @deprecated Use the `PageHeader` composition instead
 *
 * Page Header is a component which allows you to define H1 heading of the page.
 * Ensure that we don't use any other H1 heading on the page
 * unless page combine 2 separate logical content section.
 *
 * This is a self contained component which includes layout
 * and position itself on a page properly.
 *
 * Note: Do not use it inside any other layout component
 */
export const PageHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ContentBlock variant="alt">
    <ContentBlockInnerContainer width="8col">
      <Stack direction="row" justifyContent="center" alignItems="center" spacing="none">
        <Typography variant="h1" className={styles.header}>
          {children}
        </Typography>
      </Stack>
    </ContentBlockInnerContainer>
  </ContentBlock>
);
