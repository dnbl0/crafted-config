import type { PrimaryNavCloseButtonProps } from './PrimaryNavCloseButton.types';

export function PrimaryNavCloseButton({ className, style, children, ...rest }: PrimaryNavCloseButtonProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavCloseButton'}
        </div>
    );
}
