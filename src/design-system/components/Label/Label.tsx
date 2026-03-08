import type { LabelProps } from './Label.types';

export function Label({ className, style, children, ...rest }: LabelProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Label'}
        </div>
    );
}
