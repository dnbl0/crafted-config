import type { PrimaryNavDesktopLayoutProps } from './PrimaryNavDesktopLayout.types';

export function PrimaryNavDesktopLayout({ className, style, children, ...rest }: PrimaryNavDesktopLayoutProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavDesktopLayout'}
        </div>
    );
}
