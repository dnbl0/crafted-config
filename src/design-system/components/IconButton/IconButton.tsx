import type { IconButtonProps } from './IconButton.types';

export function IconButton({ className, style, children, ...rest }: IconButtonProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'IconButton'}
        </div>
    );
}
