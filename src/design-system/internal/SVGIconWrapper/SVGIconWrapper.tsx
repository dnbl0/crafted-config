import type { SVGIconWrapperProps } from './SVGIconWrapper.types';

export function SVGIconWrapper({ className, style, children, ...rest }: SVGIconWrapperProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'SVGIconWrapper'}
        </div>
    );
}
