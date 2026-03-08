import type { FocusCatcherProps } from './FocusCatcher.types';

export function FocusCatcher({ className, style, children, ...rest }: FocusCatcherProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'FocusCatcher'}
        </div>
    );
}
