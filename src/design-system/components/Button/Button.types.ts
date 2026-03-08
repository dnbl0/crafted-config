import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inari'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style of the button */
    variant?: ButtonVariant
    /** Size of the button */
    size?: ButtonSize
    children: React.ReactNode
}
