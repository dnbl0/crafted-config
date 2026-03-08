import type { TooltipProps } from './Tooltip.types';

export function Tooltip({ className, style, children, ...rest }: TooltipProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Tooltip'}
        </div>
    );
}
