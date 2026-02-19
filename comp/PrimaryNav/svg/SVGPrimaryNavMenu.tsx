import { memo } from "react";

import { SVGStaticProps } from "@/components/SVGIcon/types";

let SVGPrimaryNavMenu: React.FC<SVGStaticProps> = ({ width = 23, height = 23, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="1 1 23 23"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M3,11 L23,11 L23,13 L3,13 L3,11 ZM3,6 L20,6 L20,8 L3,8 L3,6 ZM16,18 L3,18 L3,16 L16,16 L16,18 Z"
      fill="currentColor"
    />
  </svg>
);

SVGPrimaryNavMenu = memo(SVGPrimaryNavMenu);

export { SVGPrimaryNavMenu };
