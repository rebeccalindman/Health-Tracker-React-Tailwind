import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground flex w-full items-center justify-between border-b border-gray-500 p-4 md:p-8">
      {/* Left: Logo & Title */}
      <div className="flex items-center space-x-4 hover:cursor-pointer" onClick={() => (window.location.href = "/")}>
        <Logo />
        <h1 className="text-3xl md:text-4xl">BodyData</h1>
      </div>

      {/* Right: Navbar */}
      <Navbar />
    </header>
  );
};

export default Header;

