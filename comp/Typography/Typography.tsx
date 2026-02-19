import { useContext } from "react";

import { importantFinalPlugins, TypographyContext } from "@/components/common/typographyContext";
import { TypographyProps } from "@/components/common/typographyTypes";

const useTypographyPlugins = (
  children: React.ReactNode,
  Component: React.ComponentType<TypographyProps>,
  props: TypographyProps
) => {
  let replacedChildren = children;
  const { plugins, skipFinalPlugins } = useContext(TypographyContext);

  // Sort plugins by order if provided. If not, prioritize one with order prop
  const sortedPlugins = plugins.sort((p1, p2) =>
    p1.order && p2.order ? p1.order - p2.order : p1.order ? -1 : p2.order ? 1 : 0
  );

  const pluginsForProcessing = skipFinalPlugins
    ? sortedPlugins
    : [...sortedPlugins, ...importantFinalPlugins];

  for (const plugin of pluginsForProcessing) {
    const pluginResult = plugin.exec(replacedChildren, Component, props);
    replacedChildren = pluginResult.result;
    if (pluginResult.stopProcessing) {
      break;
    }
  }

  return replacedChildren;
};

/**
 * All text inside a `<Typography>` component is guaranteed to be compliant with the Figma design system.
 *
 * All text rendered to the DOM should be rendered using `<Typography>`, either directly or indirectly:
 * - Text inside of atomic LexusKit components such as `<Button>`.
 * - Text inside of higher-level LexusKit components.
 * - Text inside LexusKit consumers.
 *
 * LexusKit consumers should assume that HTML and text strings provided to LexusKit components will
 * ultimately be wrapped with a `<Typography>` internally.
 *
 * Special Text Treatment
 * `<Typography>` supports special text treatment out-of-the-box:
 *
 * - Automatic<sup>[superscript]</sup> for text in square brackets
 *
 * Content authors are expecting special text treatment in all Sitecore fields — not just RichText — so automatic
 * special text treatment is especially useful for components built with Sitecore consumption in mind.
 *
 * Important: If you find a design with typography you can't reproduce exactly by using the `<Typography>`
 * component, this should be discussed with your designer.
 *
 * The outcome should be that either a new text style is added to Figma, or that the new text style is ignored
 * and replaced with the nearest matching style from the design system.
 *
 * NOTE: While you can create links `component="a"` with any `variant` style, we do not recommended doing so for
 * accessibility reasons.
 */
export const Typography: React.FC<TypographyProps> = (props) => {
  const processedChildren = useTypographyPlugins(props.children, Typography, props);

  return <>{processedChildren}</>;
};
