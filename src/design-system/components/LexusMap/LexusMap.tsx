import type { LexusMapProps } from './LexusMap.types';

export function LexusMap({ className, style, children, ...rest }: LexusMapProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
