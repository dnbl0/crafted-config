import type { PrimaryNavContainerProps } from './PrimaryNavContainer.types';

export function PrimaryNavContainer({ className, style, children, ...rest }: PrimaryNavContainerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
