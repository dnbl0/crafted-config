import type { ShadedRowProps } from './ShadedRow.types';

export function ShadedRow({ className, style, children, ...rest }: ShadedRowProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ShadedRow'}
        </div>
    );
}
