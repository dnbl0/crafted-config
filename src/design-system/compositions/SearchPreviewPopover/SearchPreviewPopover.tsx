import type { SearchPreviewPopoverProps } from './SearchPreviewPopover.types';

export function SearchPreviewPopover({ className, style, children, ...rest }: SearchPreviewPopoverProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
