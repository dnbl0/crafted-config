import type { AutocompleteItemProps } from './AutocompleteItem.types';

export function AutocompleteItem({ className, style, children, ...rest }: AutocompleteItemProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'AutocompleteItem'}
        </div>
    );
}
