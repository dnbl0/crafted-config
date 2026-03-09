import type { FormTypographyProps } from './FormTypography.types';

export function FormTypography({ className, style, children, ...rest }: FormTypographyProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
