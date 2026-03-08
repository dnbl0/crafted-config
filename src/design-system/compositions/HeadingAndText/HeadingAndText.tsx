import type { HeadingAndTextProps } from './HeadingAndText.types';

export function HeadingAndText({ className, style, children, ...rest }: HeadingAndTextProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'HeadingAndText'}
        </div>
    );
}
