import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import { getBorderRadiusProps } from "@/components/BorderRadius/BorderRadius";
import { GenericLink } from "@/components/GenericLink/GenericLink";
import { SVGChevronDown } from "@/components/SVGIcon/static/SVGChevronDown";
import { Typography } from "@/components/Typography/Typography";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./SecondaryNav.module.scss";

type SecondaryNavProps = {
  /**
   * Set the current page href to indicate which page in the list of items
   * is the current page.
   */
  currentPageHref: string;
  /**
   * List of links to be included in the navigation.
   */
  items: {
    label: string;
    href: string;
  }[];
  /**
   * Title text of the navigation.
   */
  title: string;
  /**
   * Include an href to make the title a link on desktop view only.
   */
  titleHref?: string;
};

const SECONDARY_NAV_LIST_ID = "secondary-nav-list";
const SECONDARY_NAV_TITLE_ID = "secondary-nav-title";

/**
 * The SecondaryNav component is used to navigate to sub-pages of a parent page.
 *
 * ## Usage
 *
 * ```tsx
 *  <SecondaryNav
 *    currentPageHref="/title-text/item-1"
 *    items={[{ label: "Item 1", href: "/title-text/item-1" }, { label: "Item 2", href: "/title-text/item-2" }]}
 *    title="Title text"
 *    titleHref="/title-text"
 *  />
 * ```
 */
export const SecondaryNav = /*#__PURE__*/ (function () {
  const SecondaryNav: React.FC<SecondaryNavProps> = ({
    currentPageHref,
    items,
    title,
    titleHref,
  }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenuVisibility = useCallback(
      () => setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen),
      []
    );

    const escFunction = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape") toggleMenuVisibility();
      },
      [toggleMenuVisibility]
    );

    const closeMenuOnFocusOut = useCallback(
      (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && !menuRef.current?.contains(event.relatedTarget))
          toggleMenuVisibility();
      },
      [toggleMenuVisibility]
    );

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const menuElement = menuRef.current;

      document.addEventListener("keydown", escFunction, false);
      menuElement?.addEventListener("focusout", closeMenuOnFocusOut);

      return () => {
        document.removeEventListener("keydown", escFunction, false);
        menuElement?.removeEventListener("focusout", closeMenuOnFocusOut);
      };
    }, [closeMenuOnFocusOut, escFunction, toggleMenuVisibility]);

    return (
      <>
        {isMobileMenuOpen && <div className={styles.overlay} onClick={toggleMenuVisibility} />}

        <div className={classNames(styles.secondaryNav)}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleText} id={SECONDARY_NAV_TITLE_ID}>
              <Typography component="span" variant="s2" fontWeight="regular">
                {title}
              </Typography>
            </h2>

            <MobileMenuTrigger
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMenuVisibility={toggleMenuVisibility}
            />

            {titleHref && <DesktopLink href={titleHref} />}
          </div>

          <nav
            className={classNames(styles.nav, isMobileMenuOpen && styles.navExpanded)}
            ref={menuRef}
          >
            <ul className={styles.list} id={SECONDARY_NAV_LIST_ID}>
              {items.map((item) => (
                <li key={item.label}>
                  <GenericLink
                    className={styles.link}
                    href={item.href}
                    {...(isMobileMenuOpen && { onClick: toggleMenuVisibility })}
                    {...(currentPageHref === item.href && { "aria-current": "page" })}
                  >
                    <Typography
                      className={classNames(
                        styles.linkText,
                        currentPageHref === item.href && styles.linkTextActive
                      )}
                      component="span"
                      fontWeight="regular"
                      variant="s2"
                    >
                      {item.label}
                    </Typography>
                  </GenericLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  };

  SecondaryNav.displayName = "SecondaryNav";

  return SecondaryNav;
})();

/**
 * The title becomes a link on desktop only.
 */
const DesktopLink = ({ href }: { href: SecondaryNavProps["titleHref"] }) => {
  return (
    <a
      {...mergeProps(getBorderRadiusProps("small"), {
        "aria-labelledby": SECONDARY_NAV_TITLE_ID,
        className: styles.titleLink,
        href,
      })}
    />
  );
};

/**
 * The title becomes a trigger for the menu on mobile only.
 */
const MobileMenuTrigger = ({
  isMobileMenuOpen,
  toggleMenuVisibility,
}: {
  isMobileMenuOpen: boolean;
  toggleMenuVisibility: () => void;
}) => {
  return (
    <>
      <SVGChevronDown
        aria-hidden
        className={classNames(styles.titleIcon, isMobileMenuOpen && styles.titleIconRotated)}
        height={20}
        width={20}
      />

      <button
        onClick={toggleMenuVisibility}
        {...mergeProps(getBorderRadiusProps("small"), {
          "aria-controls": SECONDARY_NAV_LIST_ID,
          "aria-expanded": isMobileMenuOpen,
          "aria-labelledby": SECONDARY_NAV_TITLE_ID,
          className: styles.titleIconButton,
        })}
      />
    </>
  );
};
