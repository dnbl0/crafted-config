import type { TopBannerProps } from './TopBanner.types';

export function TopBanner({ className, style, children, ...rest }: TopBannerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
