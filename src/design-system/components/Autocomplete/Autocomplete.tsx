import type { AutocompleteProps } from './Autocomplete.types';

export function Autocomplete({ className, style, children, ...rest }: AutocompleteProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
