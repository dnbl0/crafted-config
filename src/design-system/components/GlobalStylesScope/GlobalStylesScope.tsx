import type { GlobalStylesScopeProps } from './GlobalStylesScope.types';

export function GlobalStylesScope({ className, style, children, ...rest }: GlobalStylesScopeProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
