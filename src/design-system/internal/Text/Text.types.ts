import type { HTMLAttributes } from 'react'
import type { typography } from '../../tokens'

export type TypographyLevel = keyof typeof typography.scale

export interface TextProps extends HTMLAttributes<HTMLElement> {
    /** Typography scale level */
    level?: TypographyLevel
    /** HTML element to render as */
    as?: keyof React.JSX.IntrinsicElements
    children: React.ReactNode
}
