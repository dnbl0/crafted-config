import type { CheckboxGroupProps } from './CheckboxGroup.types';

export function CheckboxGroup({ className, style, children, ...rest }: CheckboxGroupProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'CheckboxGroup'}
        </div>
    );
}
