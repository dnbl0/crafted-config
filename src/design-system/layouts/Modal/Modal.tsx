import type { ModalProps } from './Modal.types';

export function Modal({ className, style, children, ...rest }: ModalProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Modal'}
        </div>
    );
}
