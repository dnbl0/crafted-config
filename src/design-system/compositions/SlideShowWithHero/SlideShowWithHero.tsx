import type { SlideShowWithHeroProps } from './SlideShowWithHero.types';

export function SlideShowWithHero({ className, style, children, ...rest }: SlideShowWithHeroProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'SlideShowWithHero'}
        </div>
    );
}
