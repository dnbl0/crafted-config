import type { PopoverLayoutProps } from './PopoverLayout.types';

export function PopoverLayout({ className, style, children, ...rest }: PopoverLayoutProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
