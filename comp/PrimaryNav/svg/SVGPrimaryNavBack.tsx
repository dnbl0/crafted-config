import { memo } from "react";

import { SVGStaticProps } from "@/components/SVGIcon/types";

let SVGPrimaryNavBack: React.FC<SVGStaticProps> = ({ width = 32, height = 32, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M20.5,27.84 L8.68,16.02 L20.5,4.2 L23.33,7.02 L14.34,16.02 L23.33,25.01 L20.5,27.84 ZM0,0 Z"
      fill="currentColor"
    />
  </svg>
);

SVGPrimaryNavBack = memo(SVGPrimaryNavBack);

export { SVGPrimaryNavBack };
