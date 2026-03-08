import type { PrimaryNavModalGenericProps } from './PrimaryNavModalGeneric.types';

export function PrimaryNavModalGeneric({ className, style, children, ...rest }: PrimaryNavModalGenericProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavModalGeneric'}
        </div>
    );
}
