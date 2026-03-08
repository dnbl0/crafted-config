import type { FocusOutlineProps } from './FocusOutline.types';

export function FocusOutline({ className, style, children, ...rest }: FocusOutlineProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'FocusOutline'}
        </div>
    );
}
