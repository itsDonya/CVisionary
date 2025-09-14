import LogoImage from "@/assets/images/logo.png";

interface PropsTypes {
  className?: string;
  alt?: string;
}

const Logo = ({
  className,
  alt = "CVisionary - AI-powered Resume Builder",
}: PropsTypes) => {
  return <img src={LogoImage} className={className} alt={alt} />;
};

export default Logo;
