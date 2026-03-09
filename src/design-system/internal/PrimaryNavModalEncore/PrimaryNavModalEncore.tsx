import type { PrimaryNavModalEncoreProps } from './PrimaryNavModalEncore.types';

export function PrimaryNavModalEncore({ className, style, children, ...rest }: PrimaryNavModalEncoreProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
