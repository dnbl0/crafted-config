import { darkTheme, lightTheme } from '../../tokens'
import type { ThemeTokens } from '../../tokens'
import type { SurfaceElevation, SurfaceVariant, SurfaceProps } from './Surface.types'

type ColorMap = Record<SurfaceElevation, Record<SurfaceVariant, string>>

function buildColorMap(tokens: ThemeTokens): ColorMap {
    return {
        canvas: {
            lighter: tokens.canvasLighter,
            default: tokens.canvasDefault,
            darker: tokens.canvasDarker,
        },
        raised: {
            lighter: tokens.elevationRaisedLighter,
            default: tokens.elevationRaisedDefault,
            darker: tokens.elevationRaisedDarker,
        },
        inset: {
            lighter: tokens.elevationInsetLighter,
            default: tokens.elevationInsetDefault,
            darker: tokens.elevationInsetDarker,
        },
    }
}

export function Surface({
    elevation = 'raised',
    variant = 'default',
    theme = 'dark',
    children,
    style,
    className,
}: SurfaceProps) {
    const tokens = theme === 'dark' ? darkTheme : lightTheme
    const colorMap = buildColorMap(tokens)

    return (
        <div
            className={className}
            style={{
                backgroundColor: colorMap[elevation][variant],
                color: tokens.foregroundDefault,
                ...style,
            }}
        >
            {children}
        </div>
    )
}
