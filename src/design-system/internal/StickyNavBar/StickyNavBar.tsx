import type { StickyNavBarProps } from './StickyNavBar.types';

export function StickyNavBar({ className, style, children, ...rest }: StickyNavBarProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'StickyNavBar'}
        </div>
    );
}
