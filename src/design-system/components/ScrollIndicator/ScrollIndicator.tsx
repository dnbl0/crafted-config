import type { ScrollIndicatorProps } from './ScrollIndicator.types';

export function ScrollIndicator({ className, style, children, ...rest }: ScrollIndicatorProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
