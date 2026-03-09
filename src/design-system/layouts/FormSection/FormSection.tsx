import type { FormSectionProps } from './FormSection.types';

export function FormSection({ className, style, children, ...rest }: FormSectionProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
