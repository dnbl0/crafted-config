import { CSSProperties } from "react";

import type { ComponentWithRequiredProps } from "@/utils/advancedTypes";
import { mergeProps } from "@/utils/reactExtensions";

import styles from "./Box.module.scss";
import { SpacingScale, mapSpacingToCSSVar } from "./Box.utils";

type HeadlessBoxProps = {
  className: string;
  style: CSSProperties;
};

// Currently I'm not able to get this to work with a type instead of `any`
// Because of `any` it will not work for cases like
// `<Box custom2="r" p="3xs" className="test" style={{ color: "red" }}>` and pass them.
// There is no harm to pass `custom2` prop to the component, but it's not required.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidComponent = React.JSXElementConstructor<any> | keyof JSX.IntrinsicElements;

interface BaseBoxProps {
  /**
   * Padding around the Box component
   */
  p?: SpacingScale;

  /**
   * Padding on the x-axis (left and right) of the Box component
   */
  px?: SpacingScale;

  /**
   * Padding on the y-axis (top and bottom) of the Box component
   */
  py?: SpacingScale;

  /**
   * Padding on the top of the Box component
   */
  pt?: SpacingScale;

  /**
   * Padding on the bottom of the Box component
   */
  pb?: SpacingScale;

  /**
   * Padding on the left of the Box component
   */
  pl?: SpacingScale;

  /**
   * Padding on the right of the Box component
   */
  pr?: SpacingScale;
}

export type BoxProps<C extends ValidComponent> = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
} & BaseBoxProps &
  (
    | ({ component?: "div" } & React.ComponentProps<"div">)
    | ({
        component: ComponentWithRequiredProps<
          C,
          React.PropsWithChildren<Partial<HeadlessBoxProps>>
        >;
      } & Omit<React.ComponentProps<C>, keyof BaseBoxProps>)
  );

/**
 * A headless component that provides padding around its children.
 * @param props - The padding properties for the Box component
 * @returns Box component props
 */
export const getBoxProps = ({ p, px, py, pt, pb, pl, pr }: BaseBoxProps): HeadlessBoxProps => {
  const t = mapSpacingToCSSVar(pt ?? py ?? p);
  const r = mapSpacingToCSSVar(pr ?? px ?? p);
  const b = mapSpacingToCSSVar(pb ?? py ?? p);
  const l = mapSpacingToCSSVar(pl ?? px ?? p);

  return {
    style: {
      padding: `${t} ${r} ${b} ${l}`,
    },
    className: styles.box,
  };
};

/**
 * Box is a layout component that helps create components quickly. Box is a container that sets the amount of padding around elements inside (Usually a Stack).
 * Spacing scale has both a static and dynamic scales:
 *
 * Static: least, even-less, less, etc
 *
 * Dynamic (changing with screen size): T-shirt sizing (xs, sm, md, etc)
 *
 * ## Usage
 * ```tsx
 *  <Box p="xl">
 *    <div />
 *    Some content
 *  </Box>
 * ```
 *
 * ## Headless usage
 * ```tsx
 * const MyComponent = () => {
 *  const boxProps = getBoxProps({ p: "xl" });
 *  return <div {...boxProps}>Some content</div>;
 * }
 * ```
 *
 * Tip: you can use `mergeProps` to merge the props with other props.
 */
export const Box = <C extends ValidComponent>({
  children,
  component: Component = "div",
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  ...rest
}: BoxProps<C>) => (
  <Component {...mergeProps(rest, getBoxProps({ p, px, py, pt, pb, pl, pr }))}>
    {children}
  </Component>
);
