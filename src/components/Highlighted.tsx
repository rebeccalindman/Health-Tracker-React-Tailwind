const Highlighted: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`text-center bg-accent flex flex-col justify-center items-center text-accent-foreground rounded-2xl p-2 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Highlighted;
