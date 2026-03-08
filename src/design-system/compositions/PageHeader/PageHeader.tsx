import type { PageHeaderProps } from './PageHeader.types';

export function PageHeader({ className, style, children, ...rest }: PageHeaderProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PageHeader'}
        </div>
    );
}
