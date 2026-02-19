import cn from "classnames";

import styles from "./Container.module.scss";

export type ContainerMaxWidth = "none" | "3col" | "4col" | "6col" | "8col" | "10col" | "12col";
export type ContainerMinWidth = "4col" | "6col" | "8col" | "12col";

interface ContainerProps {
  /**
   * Width limitation for inner content. Default: 12col.
   */
  maxWidth?: ContainerMaxWidth;

  /**
   * Minimum width for inner content.
   */
  minWidth?: ContainerMinWidth;

  /**
   * apply flex display when set to true
   */
  useFlex?: boolean;

  /**
   * If true, container will not set max-width to 100%.
   *
   * ## Note
   * This is useful when you use container inside another sized to content size (not stretched to grand parent) parent.
   *
   * ## Explanation
   * You do not need this set for normal usage of container inside a full sized block parents which stretched to 100%.
   * But if your parent needs to shrink to content size, you need to set this to true, otherwise parent will be sized
   * to your unlimited content size, like if you have text inside container, parent will be sized to unwrapped according
   * to your max-width rules.
   *
   * ### Example
   * ```md
   * Expected:
   * +---------------+
   * |+-------------+|
   * || Text inside ||
   * || container   ||
   * |+-------------+|
   * +---------------+
   * Actual with no `noMaxFullWidth` property:
   * +------------------------+
   * |+-------------+         |
   * || Text inside |         |
   * || container   |         |
   * |+-------------+         |
   * +------------------------+
   *       This space ^^^^^^^^ calculated based on full text width
   * ```
   */
  noMaxFullWidth?: boolean;
}

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> &
    ContainerProps & {
      /**
       * Ref to inner `div` element.
       */
      divRef?: React.Ref<HTMLDivElement>;
    }
>;

/**
 * A headless component that returns container class name based on the props.
 * @param props - Container component props
 * @returns - Container props with class names
 */
export const getContainerProps: (props?: ContainerProps) => { className: string } = ({
  useFlex,
  maxWidth = "12col",
  minWidth,
  noMaxFullWidth,
} = {}) => ({
  className: cn(
    styles.container,
    styles[`width${maxWidth}`],
    minWidth && styles[`minWidth${minWidth}`],
    {
      [styles.flexContainer]: useFlex,
      [styles.noMaxFullWidth]: noMaxFullWidth,
    }
  ),
});

/**
 * Container is a component which designed to apply certain
 * constraints on inner content. It limits maximum content width and ensures that
 * content always fit to the screen size without horizontal scrolling effects.
 *
 * Component is based on `div` element and supports all default attributes for this element.
 * (className will be merged with internal classes)
 *
 * Usage:
 *
 * ```tsx
 * import { Container } from "lexus-kit";
 *
 *  <Container maxWidth="6col" role="...">
 *   <h1>I'm big growing content which will wrap when hit maxWidth!</h1>
 *  </Container>
 * ```
 */
export const Container: React.FC<Props> = ({
  maxWidth,
  minWidth,
  useFlex,
  children,
  className,
  divRef,
  noMaxFullWidth,
  ...rest
}) => (
  <div
    className={cn(
      getContainerProps({ useFlex, maxWidth, minWidth, noMaxFullWidth }).className,
      className
    )}
    ref={divRef}
    {...rest}
  >
    {children}
  </div>
);
