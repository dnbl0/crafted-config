import type { GenericLinkProps } from './GenericLink.types';

export function GenericLink({ className, style, children, ...rest }: GenericLinkProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'GenericLink'}
        </div>
    );
}
