import type { PrimaryNavNavbarItemSpecialProps } from './PrimaryNavNavbarItemSpecial.types';

export function PrimaryNavNavbarItemSpecial({ className, style, children, ...rest }: PrimaryNavNavbarItemSpecialProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
