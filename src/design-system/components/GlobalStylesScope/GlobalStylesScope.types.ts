import type { ReactNode, CSSProperties } from 'react';

export interface GlobalStylesScopeProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
