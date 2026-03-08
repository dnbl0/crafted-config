import type { RowProps } from './Row.types';

export function Row({ className, style, children, ...rest }: RowProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Row'}
        </div>
    );
}
