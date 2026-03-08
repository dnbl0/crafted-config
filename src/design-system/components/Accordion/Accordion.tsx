import type { AccordionProps } from './Accordion.types';

export function Accordion({ className, style, children, ...rest }: AccordionProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'Accordion'}
        </div>
    );
}
