export interface LogoProps {
  src?: string;
  description?: string;
}

const SVGLogo: React.FC<LogoProps> = ({ src, description = "" }) => {
  return (src && <img src={src} alt={description} />) || null;
};

export { SVGLogo };
