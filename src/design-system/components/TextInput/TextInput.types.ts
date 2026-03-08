import type { InputHTMLAttributes } from 'react'

export type TextInputTheme = 'dark' | 'light'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Field label displayed above the input */
    label?: string
    /** Hint text displayed below the input when there is no error */
    supportText?: string
    /** Error message — replaces supportText and applies error styling */
    error?: string
    /** Theme to resolve tokens against */
    theme?: TextInputTheme
}
