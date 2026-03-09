import type { InputBorderProps } from './InputBorder.types';

export function InputBorder({ className, style, children, ...rest }: InputBorderProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
