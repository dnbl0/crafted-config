import type { SelectProps } from './Select.types';

export function Select({ className, style, children, ...rest }: SelectProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Select'}
        </div>
    );
}
