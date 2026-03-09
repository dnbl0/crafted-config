import type { ModalSheetProps } from './ModalSheet.types';

export function ModalSheet({ className, style, children, ...rest }: ModalSheetProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
