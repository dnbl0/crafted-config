import type { SVGScrollIndicatorAnimatedProps } from './SVGScrollIndicatorAnimated.types';

export function SVGScrollIndicatorAnimated({ className, style, children, ...rest }: SVGScrollIndicatorAnimatedProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
