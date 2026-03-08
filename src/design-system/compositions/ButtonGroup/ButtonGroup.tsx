import type { ButtonGroupProps } from './ButtonGroup.types';

export function ButtonGroup({ className, style, children, ...rest }: ButtonGroupProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ButtonGroup'}
        </div>
    );
}
