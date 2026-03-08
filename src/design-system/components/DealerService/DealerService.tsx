import type { DealerServiceProps } from './DealerService.types';

export function DealerService({ className, style, children, ...rest }: DealerServiceProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DealerService'}
        </div>
    );
}
