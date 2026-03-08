import type { SearchCardProps } from './SearchCard.types';

export function SearchCard({ className, style, children, ...rest }: SearchCardProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'SearchCard'}
        </div>
    );
}
