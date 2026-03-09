import type { CardProps } from './Card.types';

export function Card({ className, style, children, ...rest }: CardProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
