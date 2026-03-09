import type { FormHelperTextProps } from './FormHelperText.types';

export function FormHelperText({ className, style, children, ...rest }: FormHelperTextProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
