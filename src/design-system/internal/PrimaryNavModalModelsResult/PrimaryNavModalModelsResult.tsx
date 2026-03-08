import type { PrimaryNavModalModelsResultProps } from './PrimaryNavModalModelsResult.types';

export function PrimaryNavModalModelsResult({ className, style, children, ...rest }: PrimaryNavModalModelsResultProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'PrimaryNavModalModelsResult'}
        </div>
    );
}
