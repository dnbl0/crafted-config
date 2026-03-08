import type { CSSProperties } from 'react'

export type DividerTheme = 'dark' | 'light'

export interface DividerProps {
    /** Theme to resolve border colour from */
    theme?: DividerTheme
    style?: CSSProperties
}
