import type { TooltipWithIconProps } from './TooltipWithIcon.types';

export function TooltipWithIcon({ className, style, children, ...rest }: TooltipWithIconProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
