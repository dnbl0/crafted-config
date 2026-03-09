import type { TextFieldProps } from './TextField.types';

export function TextField({ className, style, children, ...rest }: TextFieldProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
