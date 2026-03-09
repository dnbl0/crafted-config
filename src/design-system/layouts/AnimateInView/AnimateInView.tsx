import type { AnimateInViewProps } from './AnimateInView.types';

export function AnimateInView({ className, style, children, ...rest }: AnimateInViewProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
