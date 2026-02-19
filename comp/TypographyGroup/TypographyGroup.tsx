import styles from "../common/typography.module.scss";

type TypographyGroupProps = React.PropsWithChildren<Record<never, never>>;

/**
 * For `<Typography>` components nested in a `<TypographyGroup>`, the spacing between elements
 * is guaranteed to be compliant with the Figma design system.

 * Therefore, all text with automatic spacing between elements should be rendered inside of
 * `<TypographyGroup>` components.
 *
 * Where designs for a component have bespoke spacing, that spacing must be applied to parent
 * elements of your `<Typography>` components. This is an important application of container-content
 * separation.
 */
export const TypographyGroup = /*#__PURE__*/ (function () {
  const TypographyGroup: React.FC<TypographyGroupProps> = ({ children }) => {
    return <div className={styles.typographyGroup}>{children}</div>;
  };

  TypographyGroup.displayName = "TypographyGroup";

  return TypographyGroup;
})();
