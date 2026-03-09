import type { HeroProps } from './Hero.types';

export function Hero({ className, style, children, ...rest }: HeroProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
