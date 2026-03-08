import type { ShadowProps } from './Shadow.types';

export function Shadow({ className, style, children, ...rest }: ShadowProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Shadow'}
        </div>
    );
}
