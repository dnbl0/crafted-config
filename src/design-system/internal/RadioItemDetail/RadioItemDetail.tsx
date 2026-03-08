import type { RadioItemDetailProps } from './RadioItemDetail.types';

export function RadioItemDetail({ className, style, children, ...rest }: RadioItemDetailProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'RadioItemDetail'}
        </div>
    );
}
