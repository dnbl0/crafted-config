import cn from "classnames";

import {
  HEADING_VARIANTS,
  TypographyLinkProps,
  TypographyProps,
  VARIANTS,
} from "@/components/common/typographyTypes";
import { GenericLink } from "@/components/GenericLink/GenericLink";
import { AutoHeadingComponent } from "@/components/HeadingProvider/HeadingProvider";

import typographyStyles from "../../common/typography.module.scss";

const isIntrinsicHeading = (
  variant: string
): variant is keyof JSX.IntrinsicElements & (typeof VARIANTS)[number] =>
  !!HEADING_VARIANTS.find((heading) => heading === variant);

export const childrenWrapper = (
  children: React.ReactNode,
  _: React.ComponentType<TypographyProps>,
  props: TypographyProps
) => {
  const {
    className,
    component,
    variant = "b1",
    children: initialChildren,
    isSpecialTextDisabled = false,
    fontWeight,
    hasSenkeiLine = false,
    isIndented = false,
    id,
  } = props;

  const TypographyComponent = component ?? (isIntrinsicHeading(variant) ? variant : "span");

  if (TypographyComponent === "autoheading") {
    let headingProps: Partial<TypographyProps> = {};

    if (props.variant) {
      headingProps.variant = props.variant;
    }

    return {
      stopProcessing: true,
      result: (
        <AutoHeadingComponent id={id} {...headingProps}>
          {children}
        </AutoHeadingComponent>
      ),
    };
  }

  if (TypographyComponent === "a" || variant === "textLink") {
    const { href, target } = props as TypographyLinkProps;

    if (href)
      return {
        stopProcessing: true,
        result: (
          <GenericLink
            className={cn(variant && typographyStyles[variant], className)}
            href={href}
            target={target}
          >
            {children}
          </GenericLink>
        ),
      };
  }

  return {
    stopProcessing: false,
    result: (
      <TypographyComponent
        data-testid={`lk-tg-${variant}`}
        id={id}
        className={cn(
          {
            [typographyStyles.indented]: isIndented,
          },
          variant && typographyStyles[variant],
          fontWeight && typographyStyles[fontWeight],
          className
        )}
      >
        {hasSenkeiLine && <span className={typographyStyles.senkeiLine} />}
        {isSpecialTextDisabled ? initialChildren : children}
      </TypographyComponent>
    ),
  };
};
