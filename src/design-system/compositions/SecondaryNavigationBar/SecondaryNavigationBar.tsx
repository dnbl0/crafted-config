import type { SecondaryNavigationBarProps } from './SecondaryNavigationBar.types';

export function SecondaryNavigationBar({ className, style, children, ...rest }: SecondaryNavigationBarProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'SecondaryNavigationBar'}
        </div>
    );
}
