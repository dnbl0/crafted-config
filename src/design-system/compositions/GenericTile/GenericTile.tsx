import type { GenericTileProps } from './GenericTile.types';

export function GenericTile({ className, style, children, ...rest }: GenericTileProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
