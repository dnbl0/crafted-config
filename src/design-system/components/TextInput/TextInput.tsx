import type { FocusEvent } from 'react'
import { darkTheme, lightTheme, spacing, typography, transitions, borderRadius } from '../../tokens'
import type { TextInputProps } from './TextInput.types'

export function TextInput({
    label,
    supportText,
    error,
    theme = 'dark',
    style,
    onFocus,
    onBlur,
    ...rest
}: TextInputProps) {
    const tokens = theme === 'dark' ? darkTheme : lightTheme
    const borderColor = error ? tokens.errorDefault : tokens.accentPrimaryDefault
    const focusColor = error ? tokens.errorDefault : tokens.accentSecondaryDefault

    function handleFocus(e: FocusEvent<HTMLInputElement>): void {
        e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${focusColor}`
        onFocus?.(e)
    }

    function handleBlur(e: FocusEvent<HTMLInputElement>): void {
        e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${borderColor}`
        onBlur?.(e)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.static['4xs'] }}>

            {label && (
                <label
                    style={{
                        fontFamily: typography.fontFamilies.primary,
                        fontSize: typography.scale.label1.size,
                        fontWeight: typography.scale.label1.weight,
                        letterSpacing: typography.scale.label1.letterSpacing,
                        textTransform: 'uppercase',
                        color: tokens.foregroundDefault,
                    }}
                >
                    {label}
                </label>
            )}

            <input
                {...rest}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                    fontFamily: typography.fontFamilies.primary,
                    fontSize: typography.scale.body1.size,
                    fontWeight: typography.fontWeights.book,
                    color: tokens.foregroundDefault,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: `inset 0 0 0 1px ${borderColor}`,
                    padding: `${spacing.static['3xs']} ${spacing.static.xs}`,
                    minHeight: spacing.static.xl,
                    outline: 'none',
                    width: '100%',
                    transition: `box-shadow ${transitions.duration.fast} ${transitions.easing.easeOut}`,
                    borderRadius: borderRadius.small,
                    ...style,
                }}
            />

            {error && (
                <span
                    style={{
                        fontFamily: typography.fontFamilies.primary,
                        fontSize: typography.scale.body2.size,
                        color: tokens.errorDefault,
                    }}
                >
                    {error}
                </span>
            )}

            {supportText && !error && (
                <span
                    style={{
                        fontFamily: typography.fontFamilies.primary,
                        fontSize: typography.scale.body2.size,
                        color: tokens.foregroundDefault,
                        opacity: 0.6,
                    }}
                >
                    {supportText}
                </span>
            )}

        </div>
    )
}
