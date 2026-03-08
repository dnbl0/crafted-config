import type { PrimaryNavLevel1Props } from './PrimaryNavLevel1.types';

export function PrimaryNavLevel1({ className, style, children, ...rest }: PrimaryNavLevel1Props) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavLevel1'}
        </div>
    );
}
