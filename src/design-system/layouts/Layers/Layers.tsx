import type { LayersProps } from './Layers.types';

export function Layers({ className, style, children, ...rest }: LayersProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
