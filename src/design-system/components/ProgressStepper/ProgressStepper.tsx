import type { ProgressStepperProps } from './ProgressStepper.types';

export function ProgressStepper({ className, style, children, ...rest }: ProgressStepperProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ProgressStepper'}
        </div>
    );
}
