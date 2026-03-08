import type { CSSProperties } from 'react'

export type SurfaceElevation = 'canvas' | 'raised' | 'inset'
export type SurfaceVariant = 'lighter' | 'default' | 'darker'
export type SurfaceTheme = 'dark' | 'light'

export interface SurfaceProps {
    /** Which elevation layer to use */
    elevation?: SurfaceElevation
    /** Lightness variant within the elevation */
    variant?: SurfaceVariant
    /** Theme to resolve tokens against */
    theme?: SurfaceTheme
    children?: React.ReactNode
    style?: CSSProperties
    className?: string
}
