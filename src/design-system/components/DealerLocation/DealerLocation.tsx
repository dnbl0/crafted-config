import type { DealerLocationProps } from './DealerLocation.types';

export function DealerLocation({ className, style, children, ...rest }: DealerLocationProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DealerLocation'}
        </div>
    );
}
