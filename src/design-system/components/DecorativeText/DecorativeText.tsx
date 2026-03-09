import type { DecorativeTextProps } from './DecorativeText.types';

export function DecorativeText({ className, style, children, ...rest }: DecorativeTextProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
