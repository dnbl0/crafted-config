import type { VehiclePlaceholderProps } from './VehiclePlaceholder.types';

export function VehiclePlaceholder({ className, style, children, ...rest }: VehiclePlaceholderProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'VehiclePlaceholder'}
        </div>
    );
}
