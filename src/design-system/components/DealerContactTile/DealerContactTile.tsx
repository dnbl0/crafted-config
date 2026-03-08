import type { DealerContactTileProps } from './DealerContactTile.types';

export function DealerContactTile({ className, style, children, ...rest }: DealerContactTileProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DealerContactTile'}
        </div>
    );
}
