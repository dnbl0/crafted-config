import type { TooltipPopupProps } from './TooltipPopup.types';

export function TooltipPopup({ className, style, children, ...rest }: TooltipPopupProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'TooltipPopup'}
        </div>
    );
}
