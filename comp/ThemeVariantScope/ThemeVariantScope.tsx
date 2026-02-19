import cn from "classnames";
import { useContext } from "react";

import { ThemeContext } from "@/theming/ThemeContext";
import type { ThemeVariant } from "@/theming/themingTypes";
import { ThemeVariantContext, useThemeVariant } from "@/theming/VariantContext";

import styles from "./ThemeVariantScope.module.scss";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Variant to override closest theme variant. If not provided, closest theme variant will be used.
   */
  variant: ThemeVariant | undefined;
  /**
   * Applies `contents` display to the rendered `div` to not affect the layout.
   */
  isContents?: boolean;
  /**
   * Ref to the rendered div.
   */
  divRef?: React.Ref<HTMLDivElement>;
  /**
   * React children or a function that returns a React elements with applied class name.
   */
  children?: React.ReactNode | undefined | { (cn: string): React.ReactElement };
}

/**
 * `ThemeVariantScope` component allows you to define a local theme variant for its children.
 * This component should be used to wrap components that need to have a specific theme variant.
 * If a variant is not provided, the closest theme variant will be used.
 *
 * ## Usage
 *
 * ### Default root component
 * ```tsx
 * <ThemeVariantScope variant="alt" isContents>
 *  Content
 * </ThemeVariantScope>
 * ```
 *
 * ### Custom root component
 * ```tsx
 *  <ThemeVariantScope variant="alt">{(className) => <div className={className} />}</ThemeVariantScope>
 * ```
 *
 * ## Note
 * Ensure that you not introducing deep nesting of `ThemeVariantScope` components.
 * This can cause challenges if you do `alt` -> `default` -> `alt` as CSS selectors may not apply properly.
 */
export const ThemeVariantScope: React.FC<Props> = ({
  variant,
  isContents,
  divRef,
  children,
  className,
  ...rest
}) => {
  const { getVariantClassNameOrDefault } = useContext(ThemeContext);
  const contextualThemeVariant = useThemeVariant();

  const variantValue = variant || contextualThemeVariant || "default";

  const classNames = cn(
    isContents && styles.isContents,
    getVariantClassNameOrDefault(variantValue)
  );

  return (
    <ThemeVariantContext.Provider value={variantValue}>
      {typeof children === "function" ? (
        children(classNames)
      ) : (
        <div className={cn(classNames, className)} ref={divRef} {...rest}>
          {children}
        </div>
      )}
    </ThemeVariantContext.Provider>
  );
};
