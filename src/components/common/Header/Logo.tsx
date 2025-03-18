const Logo = ({ onClick }) => {
  return (
    <figure className="max-h-[70px] max-w-[70px] md:max-h-[100px] md:max-w-[100px] flex items-center justify-cente rounded-full overflow-clip" onClick={onClick}>
      <img 
        className="h-full w-full object-contain" 
        src="src/assets/Icon.webp" 
        alt="Healthtracker logo" 
      />
    </figure>
  );
}

export default Logo;

