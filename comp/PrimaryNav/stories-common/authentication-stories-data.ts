import { AuthenticationConfig } from "@/utils/Authentication/authentication.types";
import { AuthenticationContextProps } from "@/utils/Authentication/authenticationContext";

export const ENCORE_URL =
  process.env.ENCORE_URL || "https://lexusownership-spa-qa.tmca-digital.com.au/";

export const AUTHENTICATION_CONFIG: AuthenticationConfig = {
  loginFormUrl: `${ENCORE_URL}signin?type=iframe`,
  logoutUrl: `${ENCORE_URL}silentsignout?type=iframe`,
  refreshUrl: `${ENCORE_URL}refresh?type=iframe`,
  // Keeps user logged in, if SPA logs out. Set to true or undefined when implementing
  autoLogout: false,
};

export const AUTHENTICATION_DATA: AuthenticationContextProps = {
  config: AUTHENTICATION_CONFIG,
  onLogin: () => {
    window.location.replace(ENCORE_URL);
  },
};
