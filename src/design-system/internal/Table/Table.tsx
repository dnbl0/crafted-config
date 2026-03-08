import type { TableProps } from './Table.types';

export function Table({ className, style, children, ...rest }: TableProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Table'}
        </div>
    );
}
