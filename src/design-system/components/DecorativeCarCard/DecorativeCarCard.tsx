import type { DecorativeCarCardProps } from './DecorativeCarCard.types';

export function DecorativeCarCard({ className, style, children, ...rest }: DecorativeCarCardProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DecorativeCarCard'}
        </div>
    );
}
