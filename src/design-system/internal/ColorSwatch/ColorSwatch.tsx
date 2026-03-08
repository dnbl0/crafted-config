import { spacing, typography, borderRadius, shadows } from '../../tokens'
import type { ColorSwatchProps } from './ColorSwatch.types'

export function ColorSwatch({ color, name, size = 56 }: ColorSwatchProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: spacing.static['4xs'],
            }}
        >
            <div
                title={color}
                style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: borderRadius.small,
                    boxShadow: shadows.less,
                }}
            />
            <span
                style={{
                    fontFamily: typography.fontFamilies.primary,
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    opacity: 0.7,
                }}
            >
                {name}
            </span>
            <span
                style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    opacity: 0.5,
                }}
            >
                {color}
            </span>
        </div>
    )
}
