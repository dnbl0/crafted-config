import type { FormContainerProps } from './FormContainer.types';

export function FormContainer({ className, style, children, ...rest }: FormContainerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
