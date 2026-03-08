import type { PrimaryNavModalContainerProps } from './PrimaryNavModalContainer.types';

export function PrimaryNavModalContainer({ className, style, children, ...rest }: PrimaryNavModalContainerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavModalContainer'}
        </div>
    );
}
