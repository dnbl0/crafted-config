import type { OrientedProps } from './Oriented.types';

export function Oriented({ className, style, children, ...rest }: OrientedProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
