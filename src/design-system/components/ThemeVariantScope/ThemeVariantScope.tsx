import type { ThemeVariantScopeProps } from './ThemeVariantScope.types';

export function ThemeVariantScope({ className, style, children, ...rest }: ThemeVariantScopeProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ThemeVariantScope'}
        </div>
    );
}
