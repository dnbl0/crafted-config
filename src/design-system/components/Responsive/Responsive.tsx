import type { ResponsiveProps } from './Responsive.types';

export function Responsive({ className, style, children, ...rest }: ResponsiveProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
