import type { SVGInfoCircleAnimatedProps } from './SVGInfoCircleAnimated.types';

export function SVGInfoCircleAnimated({ className, style, children, ...rest }: SVGInfoCircleAnimatedProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'SVGInfoCircleAnimated'}
        </div>
    );
}
