import type { IconLinkProps } from './IconLink.types';

export function IconLink({ className, style, children, ...rest }: IconLinkProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'IconLink'}
        </div>
    );
}
