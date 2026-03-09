import type { LookupFormProps } from './LookupForm.types';

export function LookupForm({ className, style, children, ...rest }: LookupFormProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
