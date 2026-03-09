import type { BarGraphProps } from './BarGraph.types';

export function BarGraph({ className, style, children, ...rest }: BarGraphProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
