import type { PrimaryNavSearchPopoverProps } from './PrimaryNavSearchPopover.types';

export function PrimaryNavSearchPopover({ className, style, children, ...rest }: PrimaryNavSearchPopoverProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
