import type { GlobalFooterProps } from './GlobalFooter.types';

export function GlobalFooter({ className, style, children, ...rest }: GlobalFooterProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
