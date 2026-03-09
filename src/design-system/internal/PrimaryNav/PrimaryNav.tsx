import type { PrimaryNavProps } from './PrimaryNav.types';

export function PrimaryNav({ className, style, children, ...rest }: PrimaryNavProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
