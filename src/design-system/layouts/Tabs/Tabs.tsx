import type { TabsProps } from './Tabs.types';

export function Tabs({ className, style, children, ...rest }: TabsProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Tabs'}
        </div>
    );
}
