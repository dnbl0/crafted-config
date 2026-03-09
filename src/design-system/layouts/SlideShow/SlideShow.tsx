import type { SlideShowProps } from './SlideShow.types';

export function SlideShow({ className, style, children, ...rest }: SlideShowProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
