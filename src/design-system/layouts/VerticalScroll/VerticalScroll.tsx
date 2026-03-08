import type { VerticalScrollProps } from './VerticalScroll.types';

export function VerticalScroll({ className, style, children, ...rest }: VerticalScrollProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'VerticalScroll'}
        </div>
    );
}
