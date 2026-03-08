import type { PrimaryNavStaticLinksProps } from './PrimaryNavStaticLinks.types';

export function PrimaryNavStaticLinks({ className, style, children, ...rest }: PrimaryNavStaticLinksProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavStaticLinks'}
        </div>
    );
}
