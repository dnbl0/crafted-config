import type { LinkListProps } from './LinkList.types';

export function LinkList({ className, style, children, ...rest }: LinkListProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'LinkList'}
        </div>
    );
}
