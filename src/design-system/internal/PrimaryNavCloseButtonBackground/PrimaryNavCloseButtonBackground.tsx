import type { PrimaryNavCloseButtonBackgroundProps } from './PrimaryNavCloseButtonBackground.types';

export function PrimaryNavCloseButtonBackground({ className, style, children, ...rest }: PrimaryNavCloseButtonBackgroundProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavCloseButtonBackground'}
        </div>
    );
}
