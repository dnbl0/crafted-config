/**
 * LK Design System Tokens
 * Extracted from lk-styles.css (Lexus Design System)
 * 
 * Usage: Reference these tokens via CSS custom properties on an element
 * with the appropriate theme class (.dark-theme or .light-theme)
 */

// ─── COLOR PALETTES (Primitive) ──────────────────────────────────────────────

export const primitiveColors = {
  deepBlue: {
    50:  '#6e727e',
    100: '#303547',
    200: '#2e3243',
    300: '#2b2f3e',
    400: '#272a39',
    500: '#232632',
    600: '#1e212b',
    700: '#1b1d25',
    800: '#181a20',
    900: '#15171d',
    opacity30: 'rgba(35, 38, 50, .3)',
    opacity50: 'rgba(35, 38, 50, .5)',
  },
  smoke: {
    100:  '#fafaf9',
    200:  '#f6f5f3',
    300:  '#f1f0ec',
    400:  '#edebe6',
    500:  '#e8e6e0',
    600:  '#e3e1da',
    700:  '#dfdcd4',
    800:  '#dad8ce',
    900:  '#d6d3c8',
    1000: '#b6b6b5',
    opacity30: 'hsla(45, 15%, 89%, .3)',
    opacity50: 'hsla(45, 15%, 89%, .5)',
  },
  inari: {
    100: '#f8d2c3',
    200: '#f5bfa9',
    300: '#f0a384',
    400: '#ea7b50',
    500: '#cc4c19',  // Brand accent (burnt orange)
    600: '#8f3511',
    700: '#64250c',
    800: '#461a08',
    900: '#311206',
  },
  ochre: {
    100: '#f8bfc0',
    200: '#f5a3a5',
    300: '#f07c7d',
    400: '#e94345',
    500: '#bb1619',
    600: '#830f11',
    700: '#5c0a0c',
    800: '#400708',
    900: '#2d0506',
  },
  clay: {
    100: '#f8e7bf',
    200: '#f5dda3',
    300: '#f0ce7c',
    400: '#e9b943',
    500: '#bb8c16',
    600: '#83620f',
    700: '#5c440a',
    800: '#403007',
    900: '#2d2205',
  },
  core: {
    white: '#fff',
    black: '#171717',
    trueBlack: '#000',
    red01: '#ff335f',
    red02: '#e61a46',
    red03: '#a32943',
    blue01: '#33a7ff',
    blue02: '#1a8de6',
    blue03: '#296ea3',
    green01: '#44ff33',
    green02: '#2be61a',
    green03: '#33a329',
    yellow01: '#ffb833',
    yellow02: '#e69e1a',
    yellow03: '#a37829',
    electrified: '#2468ff',
  },
} as const

// ─── SEMANTIC TOKENS ─────────────────────────────────────────────────────────

export type ThemeTokens = {
  // Accent
  accentPrimaryLighter: string
  accentPrimaryDefault: string
  accentPrimaryDarker: string
  accentSecondaryLighter: string
  accentSecondaryDefault: string
  accentSecondaryDarker: string
  accentElectrifiedDefault: string
  // Foreground
  foregroundDefault: string
  foregroundLighter: string
  foregroundDarker: string
  foregroundOnAccent: string
  // Canvas / Background
  canvasLighter: string
  canvasDefault: string
  canvasDarker: string
  // Elevation
  elevationRaisedLighter: string
  elevationRaisedDefault: string
  elevationRaisedDarker: string
  elevationInsetLighter: string
  elevationInsetDefault: string
  elevationInsetDarker: string
  // Utility
  errorDefault: string
  errorLighter: string
  successDefault: string
  successDarker: string
  warningDefault: string
  warningLighter: string
  informationDefault: string
  informationLighter: string
  modifiersMidlight: string
  // Common
  white: string
  black: string
}

export const darkTheme: ThemeTokens = {
  accentPrimaryLighter:   primitiveColors.smoke[400],
  accentPrimaryDefault:   primitiveColors.smoke[500],
  accentPrimaryDarker:    primitiveColors.smoke[600],
  accentSecondaryLighter: primitiveColors.inari[400],
  accentSecondaryDefault: primitiveColors.inari[500],
  accentSecondaryDarker:  primitiveColors.inari[600],
  accentElectrifiedDefault: primitiveColors.core.electrified,
  foregroundDefault:      primitiveColors.smoke[500],
  foregroundLighter:      primitiveColors.smoke[400],
  foregroundDarker:       primitiveColors.smoke[600],
  foregroundOnAccent:     primitiveColors.deepBlue[500],
  canvasLighter:          primitiveColors.deepBlue[400],
  canvasDefault:          primitiveColors.deepBlue[500],
  canvasDarker:           primitiveColors.deepBlue[600],
  elevationRaisedLighter: primitiveColors.deepBlue[100],
  elevationRaisedDefault: primitiveColors.deepBlue[200],
  elevationRaisedDarker:  primitiveColors.deepBlue[300],
  elevationInsetLighter:  primitiveColors.deepBlue[700],
  elevationInsetDefault:  primitiveColors.deepBlue[800],
  elevationInsetDarker:   primitiveColors.deepBlue[900],
  errorDefault:           '#a32943',
  errorLighter:           '#ff335f',
  successDefault:         '#33a329',
  successDarker:          '#33a329',
  warningDefault:         '#e69e1a',
  warningLighter:         '#ffb833',
  informationDefault:     '#1a8de6',
  informationLighter:     '#33a7ff',
  modifiersMidlight:      '#ffffff1a',
  white:                  '#fff',
  black:                  '#171717',
}

export const lightTheme: ThemeTokens = {
  accentPrimaryLighter:   primitiveColors.deepBlue[400],
  accentPrimaryDefault:   primitiveColors.deepBlue[500],
  accentPrimaryDarker:    primitiveColors.deepBlue[600],
  accentSecondaryLighter: primitiveColors.inari[400],
  accentSecondaryDefault: primitiveColors.inari[500],
  accentSecondaryDarker:  primitiveColors.inari[600],
  accentElectrifiedDefault: primitiveColors.core.electrified,
  foregroundDefault:      primitiveColors.deepBlue[500],
  foregroundLighter:      primitiveColors.deepBlue[400],
  foregroundDarker:       primitiveColors.deepBlue[600],
  foregroundOnAccent:     primitiveColors.smoke[500],
  canvasLighter:          primitiveColors.smoke[500],
  canvasDefault:          primitiveColors.smoke[600],
  canvasDarker:           primitiveColors.smoke[700],
  elevationRaisedLighter: primitiveColors.smoke[100],
  elevationRaisedDefault: primitiveColors.smoke[200],
  elevationRaisedDarker:  primitiveColors.smoke[300],
  elevationInsetLighter:  primitiveColors.smoke[700],
  elevationInsetDefault:  primitiveColors.smoke[800],
  elevationInsetDarker:   primitiveColors.smoke[900],
  errorDefault:           '#a32943',
  errorLighter:           '#ff335f',
  successDefault:         '#33a329',
  successDarker:          '#33a329',
  warningDefault:         '#e69e1a',
  warningLighter:         '#ffb833',
  informationDefault:     '#1a8de6',
  informationLighter:     '#33a7ff',
  modifiersMidlight:      '#1717171a',
  white:                  '#fff',
  black:                  '#171717',
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamilies: {
    primary: 'Nobel, arial, sans-serif',
  },
  fontWeights: {
    book:    300,
    regular: 400,
    bold:    700,
  },
  // Mobile type scale
  scale: {
    heading1: { size: '37px',  lineHeight: 1.15, letterSpacing: '1.85px', weight: 300, transform: 'uppercase' },
    heading2: { size: '33px',  lineHeight: 1.15, letterSpacing: '1.65px', weight: 300, transform: 'uppercase' },
    heading3: { size: '29px',  lineHeight: 1.15, letterSpacing: '1.45px', weight: 300, transform: 'uppercase' },
    heading4: { size: '26px',  lineHeight: 1.15, letterSpacing: '1.3px',  weight: 300, transform: 'uppercase' },
    heading5: { size: '23px',  lineHeight: 1.15, letterSpacing: '1.15px', weight: 300, transform: 'uppercase' },
    heading6: { size: '18px',  lineHeight: 1.15, letterSpacing: '1px',    weight: 300, transform: 'uppercase' },
    subtitle1:{ size: '20px',  lineHeight: 1.5,  letterSpacing: '0.25px', weight: 300, transform: 'none' },
    subtitle2:{ size: '18px',  lineHeight: 1.5,  letterSpacing: '0.225px',weight: 300, transform: 'none' },
    body1:    { size: '19px',  lineHeight: 1.5,  letterSpacing: '0px',    weight: 300, transform: 'none' },
    body2:    { size: '16px',  lineHeight: 1.5,  letterSpacing: '0px',    weight: 300, transform: 'none' },
    caption1: { size: '15px',  lineHeight: 1.5,  letterSpacing: '0px',    weight: 300, transform: 'none' },
    disclaimer1:{ size: '15px', lineHeight: 1.5, letterSpacing: '0px',    weight: 300, transform: 'none' },
    label1:   { size: '12px',  lineHeight: 1,    letterSpacing: '1.44px', weight: 700, transform: 'uppercase' },
    label2:   { size: '12px',  lineHeight: 1.3,  letterSpacing: '1.44px', weight: 400, transform: 'uppercase' },
    price1:   { size: '13px',  lineHeight: 1.5,  letterSpacing: '0px',    weight: 300, transform: 'none' },
    banner:   { size: '13px',  lineHeight: 1.5,  letterSpacing: '1.44px', weight: 300, transform: 'none' },
  },
  // Desktop overrides (≥1024px)
  desktopScale: {
    heading1: { size: '49px',  letterSpacing: '2.45px' },
    heading2: { size: '42px',  letterSpacing: '2.1px' },
    heading3: { size: '36px',  letterSpacing: '1.8px' },
    heading4: { size: '31px',  letterSpacing: '1.55px' },
    heading5: { size: '26px',  letterSpacing: '1.3px' },
    heading6: { size: '19px',  letterSpacing: '1.1px' },
    subtitle1:{ size: '22px',  letterSpacing: '0.275px' },
    subtitle2:{ size: '19px',  letterSpacing: '0.238px' },
  },
} as const

// ─── SPACING ──────────────────────────────────────────────────────────────────

export const spacing = {
  static: {
    none: '0px',
    '4xs': '4px',
    '3xs': '8px',
    '2xs': '12px',
    xs:   '16px',
    s:    '24px',
    m:    '32px',
    l:    '40px',
    xl:   '48px',
    '2xl':'64px',
    '3xl':'80px',
    '4xl':'96px',
    '5xl':'120px',
  },
  // Scaled spacing (mobile)
  scaled: {
    none:      '0px',
    least:     '8px',
    evenLess:  '16px',
    less:      '20px',
    default:   '24px',
    more:      '32px',
    evenMore:  '40px',
    most:      '48px',
    beyondMost:'64px',
  },
  // Desktop scaled overrides
  scaledDesktop: {
    least:     '16px',
    evenLess:  '24px',
    less:      '32px',
    default:   '40px',
    more:      '56px',
    evenMore:  '64px',
    most:      '80px',
    beyondMost:'96px',
  },
} as const

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────

export const borderRadius = {
  none:        '0',
  small:       '3px',
  medium:      '5px',
  extraMedium: '6px',
  large:       '7px',
  extraLarge:  '8px',
  rounded:     '999px',
} as const

// ─── SHADOWS ──────────────────────────────────────────────────────────────────

export const shadows = {
  none:     '0 0 0 0 #17171726',
  evenLess: '0 1px 2px 0 #17171726',
  less:     '0 4px 8px 0 #17171726',
  default:  '0 8px 16px 0 #17171726',
  more:     '0 12px 24px 0 #17171726',
  evenMore: '0 32px 64px 0 #17171726',
} as const

// ─── TRANSITIONS ──────────────────────────────────────────────────────────────

export const transitions = {
  duration: {
    fast:    '150ms',
    default: '300ms',
    slow:    '600ms',
  },
  easing: {
    easeOut: 'ease-out',
    linear:  'linear',
    ease:    'ease',
  },
} as const

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────

export const breakpoints = {
  mobile: '375px',
  desktop: '1024px',
  desktopMax: '1440px',
} as const

// ─── OPACITY ──────────────────────────────────────────────────────────────────

export const opacity = {
  disabled: 0.5,
  overlay:  0.8,
  quarter:  0.25,
} as const
