import type { CardTableProps } from './CardTable.types';

export function CardTable({ className, style, children, ...rest }: CardTableProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
