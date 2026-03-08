import { spacing } from '../../tokens'
import type { StackProps } from './Stack.types'

export function Stack({
    direction = 'column',
    gap = 's',
    align,
    justify,
    children,
    style,
    className,
    wrap,
}: StackProps) {
    return (
        <div
            className={className}
            style={{
                display: 'flex',
                flexDirection: direction,
                gap: spacing.static[gap],
                alignItems: align,
                justifyContent: justify,
                flexWrap: wrap ? 'wrap' : undefined,
                ...style,
            }}
        >
            {children}
        </div>
    )
}
