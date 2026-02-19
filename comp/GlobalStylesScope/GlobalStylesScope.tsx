import cn from "classnames";
import { useMemo } from "react";

import { ThemeContext } from "@/theming/ThemeContext";
import { ThemeDefinition, ThemeVariant } from "@/theming/themingTypes";
import { hasProperty, isInjectable } from "@/utils/typeGuards";

import styles from "./GlobalStylesScope.module.scss";
import * as globalStyles from "../../global.scss";

interface GlobalStylesScopeProps extends React.PropsWithChildren {
  /**
   * Defines current active theme, prefer only imported from LexusKit
   * themes
   */
  themeDefinition: ThemeDefinition;
}

export const GlobalStylesScope: React.FC<GlobalStylesScopeProps> = ({
  themeDefinition,
  children,
}) => {
  if ("default" in globalStyles && isInjectable(globalStyles.default)) {
    globalStyles.default.inject();
  }

  const props = useMemo(
    () => ({
      currentTheme: themeDefinition,
      getVariantClassNameOrDefault: (variant: ThemeVariant): string =>
        themeDefinition.variantClassNames[variant] || themeDefinition.variantClassNames["default"],
    }),
    [themeDefinition]
  );

  return (
    <ThemeContext.Provider value={props}>
      <div
        className={cn(
          styles.lkStylesScope,
          hasProperty(globalStyles, "default") &&
            hasProperty(globalStyles.default, "lkStylesScope") &&
            typeof globalStyles.default.lkStylesScope === "string" &&
            globalStyles.default.lkStylesScope,
          "lkStylesScope",
          themeDefinition.rootClassName
        )}
        // We need to ensure we have manageable default unit to use
        // as base for our `em` and `rem` units. In this case, `body2` fits well as it is 16px
        // and allow multiple calculations like 1/4th 1/8th of em (eg. 0.25em).
        style={{ fontSize: "var(--ld-s-typography-body2-font-size, 16px)" }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
