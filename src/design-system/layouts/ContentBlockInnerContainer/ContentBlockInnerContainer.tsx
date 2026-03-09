import type { ContentBlockInnerContainerProps } from './ContentBlockInnerContainer.types';

export function ContentBlockInnerContainer({ className, style, children, ...rest }: ContentBlockInnerContainerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
