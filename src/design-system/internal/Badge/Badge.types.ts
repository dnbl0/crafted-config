import type { CSSProperties } from 'react'

export type BadgeVariant = 'error' | 'success' | 'warning' | 'info' | 'inari' | 'muted'

export interface BadgeProps {
    /** Colour variant */
    variant?: BadgeVariant
    children: React.ReactNode
    style?: CSSProperties
}
