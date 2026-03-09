import type { AccordionGroupProps } from './AccordionGroup.types';

export function AccordionGroup({ className, style, children, ...rest }: AccordionGroupProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
