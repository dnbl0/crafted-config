import type { AdvancedRadioProps } from './AdvancedRadio.types';

export function AdvancedRadio({ className, style, children, ...rest }: AdvancedRadioProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'AdvancedRadio'}
        </div>
    );
}
