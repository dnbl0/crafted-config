import type { CSSProperties } from 'react'
import type { spacing } from '../../tokens'

export type StackDirection = 'row' | 'column'
export type StackGap = keyof typeof spacing.static

export interface StackProps {
    /** Flex direction */
    direction?: StackDirection
    /** Gap between children — maps to the static spacing scale */
    gap?: StackGap
    /** align-items */
    align?: CSSProperties['alignItems']
    /** justify-content */
    justify?: CSSProperties['justifyContent']
    children?: React.ReactNode
    style?: CSSProperties
    className?: string
    /** Whether children should wrap to new lines */
    wrap?: boolean
}
