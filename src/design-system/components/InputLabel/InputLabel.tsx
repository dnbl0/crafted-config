import type { InputLabelProps } from './InputLabel.types';

export function InputLabel({ className, style, children, ...rest }: InputLabelProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'InputLabel'}
        </div>
    );
}
