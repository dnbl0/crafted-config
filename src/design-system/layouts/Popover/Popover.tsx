import type { PopoverProps } from './Popover.types';

export function Popover({ className, style, children, ...rest }: PopoverProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
