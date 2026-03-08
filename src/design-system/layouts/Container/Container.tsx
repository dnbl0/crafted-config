import type { ContainerProps } from './Container.types';

export function Container({ className, style, children, ...rest }: ContainerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Container'}
        </div>
    );
}
