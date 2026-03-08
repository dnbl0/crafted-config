import type { CSSProperties } from 'react'
import { typography } from '../../tokens'
import type { TextProps } from './Text.types'

export function Text({
    level = 'body1',
    as: Tag = 'p',
    children,
    style,
    ...rest
}: TextProps) {
    const scale = typography.scale[level]

    return (
        // @ts-expect-error — polymorphic `as` prop requires a cast
        <Tag
            {...rest}
            style={{
                fontFamily: typography.fontFamilies.primary,
                fontSize: scale.size,
                fontWeight: scale.weight,
                lineHeight: scale.lineHeight,
                letterSpacing: scale.letterSpacing,
                textTransform: scale.transform as CSSProperties['textTransform'],
                margin: 0,
                ...style,
            }}
        >
            {children}
        </Tag>
    )
}
