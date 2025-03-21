type LogoProps = {
  onClick: () => void;
};

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <figure className="max-h-[50px] max-w-[50px] md:flex md:max-h-[70px] md:max-w-[70px] items-center justify-center rounded-full overflow-clip" onClick={onClick}>
      <img
        className="h-full w-full object-contain"
        src="src/assets/Icon.webp"
        alt="Healthtracker logo"
      />
    </figure>
  );
};

export default Logo;

