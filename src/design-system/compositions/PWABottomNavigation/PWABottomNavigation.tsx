import type { PWABottomNavigationProps } from './PWABottomNavigation.types';

export function PWABottomNavigation({ className, style, children, ...rest }: PWABottomNavigationProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PWABottomNavigation'}
        </div>
    );
}
