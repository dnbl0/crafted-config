import type { ChipProps } from './Chip.types';

export function Chip({ className, style, children, ...rest }: ChipProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Chip'}
        </div>
    );
}
