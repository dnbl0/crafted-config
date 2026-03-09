import type { CardWithHeaderProps } from './CardWithHeader.types';

export function CardWithHeader({ className, style, children, ...rest }: CardWithHeaderProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
