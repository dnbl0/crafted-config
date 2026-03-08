import type { ImageWithTooltipProps } from './ImageWithTooltip.types';

export function ImageWithTooltip({ className, style, children, ...rest }: ImageWithTooltipProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ImageWithTooltip'}
        </div>
    );
}
