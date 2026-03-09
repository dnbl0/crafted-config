import type { PrimaryNavMobileItemsContainerProps } from './PrimaryNavMobileItemsContainer.types';

export function PrimaryNavMobileItemsContainer({ className, style, children, ...rest }: PrimaryNavMobileItemsContainerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
