import type { CSSProperties } from 'react'
import { primitiveColors, darkTheme, spacing, typography, borderRadius } from '../../tokens'
import type { BadgeProps, BadgeVariant } from './Badge.types'

type BadgeColorConfig = { bg: string; color: string }

const colorMap: Record<BadgeVariant, BadgeColorConfig> = {
    error: { bg: darkTheme.errorDefault, color: '#fff' },
    success: { bg: darkTheme.successDefault, color: '#fff' },
    warning: { bg: darkTheme.warningDefault, color: darkTheme.foregroundOnAccent },
    info: { bg: darkTheme.informationDefault, color: '#fff' },
    inari: { bg: primitiveColors.inari[500], color: '#fff' },
    muted: { bg: darkTheme.modifiersMidlight, color: darkTheme.foregroundDefault },
}

const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: typography.fontFamilies.primary,
    fontSize: typography.scale.label1.size,
    fontWeight: typography.scale.label1.weight,
    letterSpacing: typography.scale.label1.letterSpacing,
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: borderRadius.none,
    padding: `${spacing.static['4xs']} ${spacing.static['3xs']}`,
}

export function Badge({ variant = 'inari', children, style }: BadgeProps) {
    const { bg, color } = colorMap[variant]

    return (
        <span
            style={{
                ...baseStyle,
                backgroundColor: bg,
                color,
                ...style,
            }}
        >
            {children}
        </span>
    )
}
