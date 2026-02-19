import { memo } from "react";

import { SVGStaticProps } from "@/components/SVGIcon/types";

let SVGPrimaryNavEncore: React.FC<SVGStaticProps> = ({ width = 23, height = 23, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="2 2 23 23"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M11.847,18.197 L11.847,17.136 L11.847,14.889 L11.847,13.828 L12.940,13.828 L17.403,13.828 L17.403,14.889 L12.940,14.889 L12.940,17.136 L18.553,17.136 L18.553,18.197 L12.940,18.197 L11.847,18.197 ZM12.940,12.080 L17.403,12.080 L17.403,13.141 L12.940,13.141 L11.847,13.141 L11.847,12.080 L11.847,9.833 L11.847,8.771 L12.940,8.771 L18.553,8.771 L18.553,9.833 L12.940,9.833 L12.940,12.080 ZM11.067,18.936 L18.552,18.936 L18.552,20.001 L11.067,20.001 L11.067,20.008 L9.974,20.008 L9.974,20.001 L9.974,18.936 L9.974,8.047 L9.974,6.992 L9.974,6.982 L18.552,6.982 L18.552,8.047 L11.067,8.047 L11.067,18.936 Z"
      fill="currentColor"
    />
  </svg>
);

SVGPrimaryNavEncore = memo(SVGPrimaryNavEncore);

export { SVGPrimaryNavEncore };
