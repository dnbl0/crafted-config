import type { PrimaryNavNavbarProps } from './PrimaryNavNavbar.types';

export function PrimaryNavNavbar({ className, style, children, ...rest }: PrimaryNavNavbarProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
