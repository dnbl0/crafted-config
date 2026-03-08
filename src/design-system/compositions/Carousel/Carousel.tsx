import type { CarouselProps } from './Carousel.types';

export function Carousel({ className, style, children, ...rest }: CarouselProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Carousel'}
        </div>
    );
}
