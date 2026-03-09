import type { PrimaryNavModalProps } from './PrimaryNavModal.types';

export function PrimaryNavModal({ className, style, children, ...rest }: PrimaryNavModalProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
