import type { RadioProps } from './Radio.types';

export function Radio({ className, style, children, ...rest }: RadioProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Radio'}
        </div>
    );
}
