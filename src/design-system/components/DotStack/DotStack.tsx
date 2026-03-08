import type { DotStackProps } from './DotStack.types';

export function DotStack({ className, style, children, ...rest }: DotStackProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DotStack'}
        </div>
    );
}
