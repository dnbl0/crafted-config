import type { CookieConsentProps } from './CookieConsent.types';

export function CookieConsent({ className, style, children, ...rest }: CookieConsentProps) {
    return (
        <div className={className} style={style} {...rest}>
            {children || 'CookieConsent'}
        </div>
    );
}
