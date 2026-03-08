import type { ContentBlockProps } from './ContentBlock.types';

export function ContentBlock({ className, style, children, ...rest }: ContentBlockProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'ContentBlock'}
        </div>
    );
}
