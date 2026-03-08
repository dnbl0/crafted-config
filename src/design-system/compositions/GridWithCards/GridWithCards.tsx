import type { GridWithCardsProps } from './GridWithCards.types';

export function GridWithCards({ className, style, children, ...rest }: GridWithCardsProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'GridWithCards'}
        </div>
    );
}
