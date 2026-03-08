import type { BorderRadiusProps } from './BorderRadius.types';

export function BorderRadius({ className, style, children, ...rest }: BorderRadiusProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'BorderRadius'}
        </div>
    );
}
