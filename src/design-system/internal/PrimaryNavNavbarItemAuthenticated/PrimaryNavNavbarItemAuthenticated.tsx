import type { PrimaryNavNavbarItemAuthenticatedProps } from './PrimaryNavNavbarItemAuthenticated.types';

export function PrimaryNavNavbarItemAuthenticated({ className, style, children, ...rest }: PrimaryNavNavbarItemAuthenticatedProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavNavbarItemAuthenticated'}
        </div>
    );
}
