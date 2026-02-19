import { CSSProperties } from "react";

import { JustifyContentValue } from "@/components/types";
import { ComponentWithRequiredProps } from "@/utils/advancedTypes";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./Stack.module.scss";
import { SpacingScale, mapSpacingToCSSVar } from "./Stack.utils";

type HeadlessStackProps = {
  className: string;
  style: CSSProperties;
};

// Currently I'm not able to get this to work with a type instead of `any`
// Because of `any` it will not work for cases like
// `<Stack custom2="r" spacing="3xs" className="test" style={{ color: "red" }}>` and pass them.
// There is no harm to pass `custom2` prop to the component, but it's not required.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidComponent = React.JSXElementConstructor<any> | keyof JSX.IntrinsicElements;

interface BaseStackProps {
  /**
   * Spacing between each child element.
   * Supports both static and dynamic spacing scales:
   * * Dynamic: T-shirt sizing (xs, sm, md, etc)
   * * Static: least, even-less, less, etc
   */
  spacing?: SpacingScale;
  /**
   * Flex wrap property.
   */
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  /**
   * Flex direction property.
   */
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  /**
   * Align items property.
   */
  alignItems?: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
  /**
   * Justify content property.
   */
  justifyContent?: JustifyContentValue;
}

export type StackProps<C extends ValidComponent> = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
} & BaseStackProps &
  (
    | ({ component?: "div" } & React.ComponentProps<"div">)
    | ({
        component: ComponentWithRequiredProps<
          C,
          React.PropsWithChildren<Partial<HeadlessStackProps>>
        >;
      } & Omit<React.ComponentProps<C>, keyof BaseStackProps>)
  );

/**
 * A headless component that turn container into flex box with gap between its
 * children.
 * @param props - properties for the Stack component
 * @returns Stack component props
 */
export const getStackProps = ({
  spacing = "default",
  flexWrap,
  direction,
  alignItems,
  justifyContent,
}: BaseStackProps): HeadlessStackProps => {
  const spacingVar = mapSpacingToCSSVar(spacing);

  const stackStyles: CSSProperties = {
    flexWrap,
    flexDirection: direction,
    alignItems,
    justifyContent,
    gap: `var(${spacingVar})`,
    display: "flex",
  };

  return {
    style: stackStyles,
    className: styles.stack,
  };
};

/**
 * Stack is a layout component that helps create components quickly. Stack is essentially a flexbox container with a set amount of gap between all elements within.
 * Spacing scale has both a static and dynamic scales:
 *
 * Static: least, even-less, less, etc
 *
 * Dynamic: T-shirt sizing (xs, sm, md, etc)
 */
export const Stack = <C extends ValidComponent>({
  children,
  component: Component = "div",
  spacing,
  flexWrap,
  direction,
  alignItems,
  justifyContent,
  ...rest
}: StackProps<C>) => (
  <Component
    {...mergeProps(
      rest,
      getStackProps({ spacing, flexWrap, direction, alignItems, justifyContent })
    )}
  >
    {children}
  </Component>
);
