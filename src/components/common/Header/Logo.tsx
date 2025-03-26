type LogoProps = {};

const Logo: React.FC<LogoProps> = () => {
  return (
    <figure className="h-[40px] w-[40px] md:flex md:min-h-[70px] md:min-w-[70px] items-center justify-center rounded-full overflow-clip">
      <img
        className="h-full w-full object-contain"
        src="src/assets/Icon.webp"
        alt="BodyData logo"
      />
    </figure>
  );
};

export default Logo;

