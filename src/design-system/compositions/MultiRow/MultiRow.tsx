import type { MultiRowProps } from './MultiRow.types';

export function MultiRow({ className, style, children, ...rest }: MultiRowProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'MultiRow'}
        </div>
    );
}
