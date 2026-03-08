import { primitiveColors } from '../../tokens'
import type { SenkeiLineProps } from './SenkeiLine.types'

/**
 * SenkeiLine — the Lexus brand ornament: a short horizontal rule in Inari
 * orange used to prefix section headings.
 */
export function SenkeiLine({ style }: SenkeiLineProps) {
    return (
        <span
            aria-hidden="true"
            style={{
                display: 'inline-block',
                width: '40px',
                borderBottom: `3px solid ${primitiveColors.inari[500]}`,
                marginBottom: '10px',
                marginRight: '8px',
                ...style,
            }}
        />
    )
}
