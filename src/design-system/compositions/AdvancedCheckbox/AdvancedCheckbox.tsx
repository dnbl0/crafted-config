import type { AdvancedCheckboxProps } from './AdvancedCheckbox.types';

export function AdvancedCheckbox({ className, style, children, ...rest }: AdvancedCheckboxProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
