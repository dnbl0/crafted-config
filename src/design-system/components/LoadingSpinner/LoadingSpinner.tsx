import type { LoadingSpinnerProps } from './LoadingSpinner.types';

export function LoadingSpinner({ className, style, children, ...rest }: LoadingSpinnerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
