import type { GridProps } from './Grid.types';

export function Grid({ className, style, children, ...rest }: GridProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
