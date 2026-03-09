import type { BoxProps } from './Box.types';

export function Box({ className, style, children, ...rest }: BoxProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
