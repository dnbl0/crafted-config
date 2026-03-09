import type { PrimaryNavModalMobileMenuProps } from './PrimaryNavModalMobileMenu.types';

export function PrimaryNavModalMobileMenu({ className, style, children, ...rest }: PrimaryNavModalMobileMenuProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
