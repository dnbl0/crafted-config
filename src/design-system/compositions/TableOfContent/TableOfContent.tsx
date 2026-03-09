import type { TableOfContentProps } from './TableOfContent.types';

export function TableOfContent({ className, style, children, ...rest }: TableOfContentProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
