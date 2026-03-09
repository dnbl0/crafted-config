import type { DynamicMediaProps } from './DynamicMedia.types';

export function DynamicMedia({ className, style, children, ...rest }: DynamicMediaProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
