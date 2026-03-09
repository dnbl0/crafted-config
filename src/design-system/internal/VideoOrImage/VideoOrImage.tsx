import type { VideoOrImageProps } from './VideoOrImage.types';

export function VideoOrImage({ className, style, children, ...rest }: VideoOrImageProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
