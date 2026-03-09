import type { DealerOpeningHoursProps } from './DealerOpeningHours.types';

export function DealerOpeningHours({ className, style, children, ...rest }: DealerOpeningHoursProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
