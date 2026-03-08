import type { RadioGroupProps } from './RadioGroup.types';

export function RadioGroup({ className, style, children, ...rest }: RadioGroupProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'RadioGroup'}
        </div>
    );
}
