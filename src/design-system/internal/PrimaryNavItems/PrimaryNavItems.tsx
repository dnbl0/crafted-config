import type { PrimaryNavItemsProps } from './PrimaryNavItems.types';

export function PrimaryNavItems({ className, style, children, ...rest }: PrimaryNavItemsProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
