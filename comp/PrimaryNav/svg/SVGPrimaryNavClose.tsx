import { memo } from "react";

import { SVGStaticProps } from "@/components/SVGIcon/types";

let SVGPrimaryNavClose: React.FC<SVGStaticProps> = ({ width = 45, height = 45, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="-13.5 -13 43.5 44"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M2.64444 1.25236C2.21797 0.829943 1.52653 0.829944 1.10006 1.25236C0.673586 1.67477 0.673586 2.35964 1.10006 2.78206L7.27754 8.9008L1.09996 15.0196C0.673487 15.4421 0.673489 16.1269 1.09996 16.5493C1.52643 16.9717 2.21787 16.9718 2.64434 16.5493L8.82192 10.4305L14.9995 16.5493C15.426 16.9718 16.1174 16.9718 16.5439 16.5493C16.9704 16.1269 16.9704 15.4421 16.5439 15.0196L10.3663 8.9008L16.5438 2.78206C16.9703 2.35964 16.9703 1.67477 16.5438 1.25236C16.1173 0.829946 15.4259 0.829945 14.9994 1.25236L8.82192 7.3711L2.64444 1.25236Z"
      fill="currentColor"
    />
  </svg>
);
SVGPrimaryNavClose = memo(SVGPrimaryNavClose);

export { SVGPrimaryNavClose };
