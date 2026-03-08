import { darkTheme, lightTheme, spacing } from '../../tokens'
import type { DividerProps } from './Divider.types'

export function Divider({ theme = 'dark', style }: DividerProps) {
    const tokens = theme === 'dark' ? darkTheme : lightTheme

    return (
        <hr
            style={{
                border: 'none',
                borderTop: `1px solid ${tokens.modifiersMidlight}`,
                margin: `${spacing.static.s} 0`,
                ...style,
            }}
        />
    )
}
