import type { CSSProperties } from 'react'
import { primitiveColors, darkTheme, spacing, typography, transitions, borderRadius } from '../../tokens'
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types'

const sizeStyles: Record<ButtonSize, CSSProperties> = {
    sm: {
        padding: `${spacing.static['3xs']} ${spacing.static.xs}`,
        fontSize: '12px',
        letterSpacing: '1.44px',
    },
    md: {
        padding: `${spacing.static['3xs']} ${spacing.static.s}`,
        fontSize: '12px',
        letterSpacing: '1.44px',
    },
    lg: {
        padding: `${spacing.static.xs} ${spacing.static.m}`,
        fontSize: '13px',
        letterSpacing: '1.44px',
    },
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
    primary: {
        backgroundColor: darkTheme.accentPrimaryDefault,
        color: darkTheme.foregroundOnAccent,
        border: 'none',
    },
    secondary: {
        backgroundColor: 'transparent',
        color: darkTheme.accentPrimaryDefault,
        border: `1px solid ${darkTheme.accentPrimaryDefault}`,
    },
    ghost: {
        backgroundColor: 'transparent',
        color: darkTheme.accentPrimaryDefault,
        border: 'none',
    },
    inari: {
        backgroundColor: primitiveColors.inari[500],
        color: darkTheme.white,
        border: 'none',
    },
}

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    style,
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            style={{
                fontFamily: typography.fontFamilies.primary,
                fontWeight: typography.fontWeights.bold,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: `all ${transitions.duration.default} ${transitions.easing.easeOut}`,
                borderRadius: borderRadius.none,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.static['3xs'],
                lineHeight: 1,
                ...sizeStyles[size],
                ...variantStyles[variant],
                ...style,
            }}
        >
            {children}
        </button>
    )
}
