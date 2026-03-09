import type { CarCardProps } from './CarCard.types';

export function CarCard({ className, style, children, ...rest }: CarCardProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
