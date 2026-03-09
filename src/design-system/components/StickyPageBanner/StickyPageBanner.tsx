import type { StickyPageBannerProps } from './StickyPageBanner.types';

export function StickyPageBanner({ className, style, children, ...rest }: StickyPageBannerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
