import type { AlertProps } from './Alert.types';

export function Alert({ className, style, children, ...rest }: AlertProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Alert'}
        </div>
    );
}
