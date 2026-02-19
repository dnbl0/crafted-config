import { Box } from "@/components/Box/Box";
import { TooltipPointerPosition } from "@/components/Tooltip/TooltipPopup/TooltipPopup";
import { TooltipWithIcon } from "@/components/TooltipWithIcon/TooltipWithIcon";
import { Typography } from "@/components/Typography/Typography";

import styles from "./FormTypography.module.scss";

type Variant = "h2" | "h5" | "s1" | "b1" | "b2" | "l1";

export type FormTypographyProps = {
  type: "title" | "subtitle" | "header" | "label" | "sub" | "subLabel";
  text: string;
  tooltipText?: string;
  pointerPosition?: TooltipPointerPosition;
};

const variantMap: Record<FormTypographyProps["type"], Variant> = {
  title: "h2",
  subtitle: "h5",
  header: "s1",
  sub: "b2",
  label: "b1",
  subLabel: "l1",
};

/**
 * FormTypography component allows you to put a content copy in form with predefined styles
 * only (@see {@link FormTextInfoProps.type}). You should avoid using Typography component directly in forms
 * as it may add inconsistent use cases to forms.
 * This component should only be used for `form elements` and should be used in conjunction with the `FormContainer`
 * component.
 */
export const FormTypography: React.FC<FormTypographyProps> = ({
  type,
  text,
  tooltipText,
  pointerPosition,
}) => (
  <Typography component="p" variant={variantMap[type]}>
    {text}
    {tooltipText && (
      <Box pl="3xs" className={styles.tooltip}>
        <TooltipWithIcon
          ariaLabel="tooltip"
          showPopupOnFocus={false}
          addShadow={false}
          pointerPosition={pointerPosition}
        >
          <Typography variant="b2">{tooltipText}</Typography>
        </TooltipWithIcon>
      </Box>
    )}
  </Typography>
);
