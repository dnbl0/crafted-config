import cn from "classnames";
import IframeResizer from "iframe-resizer-react";
import { useContext, useState, useEffect } from "react";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { ANCHOR_TAG_REL_FOR_BLANK_TARGET } from "@/components/common/constants";
import { Responsive } from "@/components/Responsive/Responsive";
import { Typography } from "@/components/Typography/Typography";
import { TypographyGroup } from "@/components/TypographyGroup/TypographyGroup";
import { ThemeContext } from "@/theming/ThemeContext";
import { AuthenticationContext } from "@/utils/Authentication/authenticationContext";
import { mergeProps } from "@/utils/reactExtensions";

import { PrimaryNavItems } from "./PrimaryNavItems/PrimaryNavItems";
import styles from "./PrimaryNavModalEncore.module.scss";
import { PrimaryNavDesktopLayout } from "../PrimaryNavDesktopLayout";
import { PrimaryNavMobileItemsContainer } from "../PrimaryNavMobileItemsContainer";
import { PrimaryNavMobilePage } from "../PrimaryNavMobilePage";
import { PrimaryNavModalContainer } from "../PrimaryNavModalContainer";
import { PrimaryNavStaticLinks } from "../PrimaryNavStaticLinks/PrimaryNavStaticLinks";
import { EncoreAdvert, MenuItemTyped, MenuItemWithIconData } from "../types/PrimaryNav.types";

type PrimaryNavTabEncoreProps = {
  closeButton: React.ReactNode;
  logoutLabel: string;
  menuItems: MenuItemTyped[];
  encoreAdvert?: EncoreAdvert;
  onLogout?: () => void;
};

const PrimaryNavModalEncore: React.FC<PrimaryNavTabEncoreProps> = ({
  closeButton,
  logoutLabel,
  menuItems,
  encoreAdvert,
  onLogout,
}) => {
  const { config, current, doLogout } = useContext(AuthenticationContext);
  const { getVariantClassNameOrDefault } = useContext(ThemeContext);
  const [isClient, setIsClient] = useState(false);
  const isAuthenticated = !!current.user;
  const isLoggingOut = current.isLoggingOut;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!config || (config.isAuthenticationHost && !isAuthenticated)) {
    return null;
  }

  const primaryNavItems = (
    <PrimaryNavItems items={menuItems} dataTestId="lk-primary-nav-modal-encore-nav-items" />
  );

  const loginIFrame = isClient ? (
    <IframeResizer
      log={false}
      data-testid="lk-primary-nav-modal-encore-login-iframe"
      className={styles.loginFormIFrame}
      heightCalculationMethod="bodyOffset"
      resizeFrom="child"
      scrolling={false}
      autoResize={true}
      minHeight={420}
      sandbox="allow-scripts allow-forms allow-same-origin"
      src={config.loginFormUrl}
    />
  ) : null;

  const pageContentLarge = isLoggingOut ? null : isAuthenticated ? primaryNavItems : loginIFrame;

  const level2Layout =
    isAuthenticated || !encoreAdvert ? null : (
      <Box
        p="s"
        {...mergeProps(getBorderRadiusProps("medium"), {
          className: styles.encoreAdvert,
        })}
      >
        <div className={styles.encoreAdvertTextContainer}>
          <TypographyGroup>
            <Typography variant={"h5"} className={styles.encoreAdvertTitle}>
              {encoreAdvert.title}
            </Typography>
            <Typography variant={"b2"}>{encoreAdvert.description}</Typography>
          </TypographyGroup>
          <div className={styles.encoreAdvertAppIconContainer}>
            {encoreAdvert.googlePlayLinkUrl && encoreAdvert.googlePlayImageUrl && (
              <div className={styles.encoreAdvertAppIcon}>
                <a
                  href={encoreAdvert.googlePlayLinkUrl}
                  target={encoreAdvert.googlePlayLinkTarget || "_self"}
                  rel={
                    encoreAdvert.googlePlayLinkTarget === "_blank"
                      ? ANCHOR_TAG_REL_FOR_BLANK_TARGET
                      : ""
                  }
                >
                  <img
                    src={encoreAdvert.googlePlayImageUrl}
                    alt={encoreAdvert.googlePlayImageAlt}
                  ></img>
                </a>
              </div>
            )}
            {encoreAdvert.appStoreLinkUrl && encoreAdvert.appStoreImageUrl && (
              <div className={styles.encoreAdvertAppIcon}>
                <a
                  href={encoreAdvert.appStoreLinkUrl}
                  target={encoreAdvert.appStoreLinkTarget || "_self"}
                  rel={
                    encoreAdvert.appStoreLinkTarget === "_blank"
                      ? ANCHOR_TAG_REL_FOR_BLANK_TARGET
                      : ""
                  }
                >
                  <img
                    src={encoreAdvert.appStoreImageUrl}
                    alt={encoreAdvert.appStoreImageAlt}
                  ></img>
                </a>
              </div>
            )}
          </div>
        </div>
        {encoreAdvert.heroImageUrl && (
          <div className={styles.encoreAdvertImageContainer}>
            <img src={encoreAdvert.heroImageUrl} alt={encoreAdvert.heroImageAlt}></img>
          </div>
        )}
        {encoreAdvert.ctaLabel && encoreAdvert.ctaUrl && (
          <div className={cn(getVariantClassNameOrDefault("alt"), styles.encoreAdvertCtaContainer)}>
            <Button
              href={encoreAdvert.ctaUrl}
              component="a"
              target={encoreAdvert.ctaTarget || "_self"}
              rel={encoreAdvert.ctaTarget === "_blank" ? ANCHOR_TAG_REL_FOR_BLANK_TARGET : ""}
              className={styles.encoreAdvertCta}
              variant="secondary"
              themeVariant="alt"
            >
              {encoreAdvert.ctaLabel}
            </Button>
          </div>
        )}
      </Box>
    );

  const pageContentSmall = isLoggingOut ? null : isAuthenticated ? (
    <PrimaryNavMobileItemsContainer parentIsFlexbox={true} fillParentHeight={true}>
      {primaryNavItems}
    </PrimaryNavMobileItemsContainer>
  ) : (
    <div className={styles.encoreSmall}>
      <PrimaryNavModalContainer>{loginIFrame}</PrimaryNavModalContainer>
      {level2Layout}
    </div>
  );

  const logoutLink: MenuItemWithIconData = {
    link: {
      label: logoutLabel,
      url: "",
    },
    icon: "key",
    onClick: () => {
      doLogout();

      if (onLogout) {
        onLogout();
      }
    },
  };

  const footerChildren = isAuthenticated ? (
    <PrimaryNavStaticLinks
      items={[logoutLink]}
      dataTestId="lk-primary-nav-modal-encore-static-links"
    />
  ) : undefined;

  return (
    <>
      <Responsive breakpoint="large">
        <PrimaryNavModalContainer parentIsFlexbox={true} fillParentHeight={true}>
          <PrimaryNavDesktopLayout
            closeButton={closeButton}
            isLevel2LayoutAvailable={true}
            level2LayoutChildren={level2Layout}
            isLevel2LayoutBackgroundSuppressed={true}
            isLevel2LayoutPaddingSuppressed={true}
            level1LayoutChildren={pageContentLarge}
            level1LayoutFooterChildren={footerChildren}
          />
        </PrimaryNavModalContainer>
      </Responsive>
      <Responsive breakpoint="small">
        <PrimaryNavMobilePage closeButton={closeButton} footerChildren={footerChildren}>
          {pageContentSmall}
        </PrimaryNavMobilePage>
      </Responsive>
    </>
  );
};

export { PrimaryNavModalEncore };
