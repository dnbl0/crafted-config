import type { ProgressBarProps } from './ProgressBar.types';

export function ProgressBar({ className, style, children, ...rest }: ProgressBarProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ProgressBar'}
        </div>
    );
}
