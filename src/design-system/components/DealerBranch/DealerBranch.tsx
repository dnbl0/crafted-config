import type { DealerBranchProps } from './DealerBranch.types';

export function DealerBranch({ className, style, children, ...rest }: DealerBranchProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'DealerBranch'}
        </div>
    );
}
