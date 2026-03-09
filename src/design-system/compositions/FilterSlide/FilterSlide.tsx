import type { FilterSlideProps } from './FilterSlide.types';

export function FilterSlide({ className, style, children, ...rest }: FilterSlideProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    );
}
