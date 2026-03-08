import type { DealerMapProps } from './DealerMap.types';

export function DealerMap({ className, style, children, ...rest }: DealerMapProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DealerMap'}
        </div>
    );
}
