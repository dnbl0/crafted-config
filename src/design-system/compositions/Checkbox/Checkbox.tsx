import type { CheckboxProps } from './Checkbox.types';

export function Checkbox({ className, style, children, ...rest }: CheckboxProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Checkbox'}
        </div>
    );
}
