import type { CarouselWithCardsProps } from './CarouselWithCards.types';

export function CarouselWithCards({ className, style, children, ...rest }: CarouselWithCardsProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'CarouselWithCards'}
        </div>
    );
}
