import type { PrimaryNavMobilePageProps } from './PrimaryNavMobilePage.types';

export function PrimaryNavMobilePage({ className, style, children, ...rest }: PrimaryNavMobilePageProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavMobilePage'}
        </div>
    );
}
