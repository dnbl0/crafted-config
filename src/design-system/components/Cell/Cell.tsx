import type { CellProps } from './Cell.types';

export function Cell({ className, style, children, ...rest }: CellProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
