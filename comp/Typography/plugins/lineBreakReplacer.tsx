import { replaceInTree } from "@tmca/react-element-replace";
import { Fragment } from "react";

import {
  TypographyPlugin,
  TypographyPluginResult,
  TypographyProps,
} from "@/components/common/typographyTypes";

const getSkippedResult = (children: React.ReactNode): TypographyPluginResult => ({
  result: children,
  stopProcessing: false,
});

const processText = (
  text: string,
  Typography: React.ComponentType<TypographyProps>,
  props: TypographyProps
): TypographyPluginResult => ({
  stopProcessing: true,
  // TODO: Check if replaceInTree required here at all, as input is string already
  result: replaceInTree(text, {
    match: (x) => typeof x === "string",
    replace: (content: string) =>
      content
        .replace(/\r/g, "")
        .split(/\n\n/) // Split double breaks to convert to individual `Typography` instances
        .map((paragraph, i) => (
          <Typography key={i} {...props}>
            {paragraph
              .split(/\n/) // Split individual breaks to ad simple `<br />` breaks
              .map((paraChunk, j) =>
                j > 0 ? (
                  <Fragment key={`${i}-${j}`}>
                    <br data-testid="lk-tg-br" />
                    {paraChunk}
                  </Fragment>
                ) : (
                  paraChunk
                )
              )}
          </Typography>
        )),
  }),
});

export const lineBreakReplacer: TypographyPlugin = {
  order: 100,
  exec: (children, Typography, props) =>
    typeof children !== "string" || props.isSpecialTextDisabled
      ? getSkippedResult(children)
      : processText(children, Typography, props),
};
