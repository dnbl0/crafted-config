import type { DatePickerProps } from './DatePicker.types';

export function DatePicker({ className, style, children, ...rest }: DatePickerProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
