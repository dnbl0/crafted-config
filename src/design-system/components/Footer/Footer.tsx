import type { FooterProps } from './Footer.types';

export function Footer({ className, style, children, ...rest }: FooterProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Footer'}
        </div>
    );
}
