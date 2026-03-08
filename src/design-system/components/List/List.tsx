import type { ListProps } from './List.types';

export function List({ className, style, children, ...rest }: ListProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'List'}
        </div>
    );
}
