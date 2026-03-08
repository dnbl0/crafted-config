import React, { createContext, useContext, useState, useMemo } from 'react';
import { darkTheme, lightTheme, primitiveColors, spacing, typography, borderRadius, shadows, transitions } from './tokens';

export type ThemeMode = 'dark' | 'light';
export type ThemeTokens = typeof darkTheme;

interface ThemeContextValue {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
    tokens: ThemeTokens;
    primitiveColors: typeof primitiveColors;
    spacing: typeof spacing;
    typography: typeof typography;
    borderRadius: typeof borderRadius;
    shadows: typeof shadows;
    transitions: typeof transitions;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children, initialMode = 'dark' }: { children: React.ReactNode, initialMode?: ThemeMode }) {
    const [mode, setMode] = useState<ThemeMode>(initialMode);

    const toggleMode = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

    const value = useMemo(() => ({
        mode,
        toggleMode,
        setMode,
        tokens: mode === 'dark' ? darkTheme : lightTheme,
        primitiveColors,
        spacing,
        typography,
        borderRadius,
        shadows,
        transitions,
    }), [mode]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
