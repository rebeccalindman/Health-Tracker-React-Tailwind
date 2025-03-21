import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, User, Notebook } from "lucide-react";

const menuItems = [
  { path: "/", label: "Dashboard", icon: <LayoutDashboard className="inline self-center h-full mr-2" /> },
  { path: "/profile", label: "Profil", icon: <User className="inline self-center h-full mr-2" /> },
  { path: "/mealLog", label: "Måltider", icon: <Notebook className="inline self-center h-full mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Closes dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="flex w-full items-center">
      {/* Mobile Menu Icon (Replaces Button) */}
      <div
        className="p-4 h-full w-full flex justify-end hover:bg-accent rounded-md md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X /> : <Menu />}
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8">
        {menuItems.map(({ path, label, icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `p-4 hover:bg-accent rounded-md flex items-center transition-all duration-200 ${
                  isActive ? "bg-primary text-white font-bold" : ""
                }`
              }
            >
              {icon} {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-4 top-[60px] mt-2 bg-secondary text-secondary-foreground shadow-lg rounded-md p-2 md:hidden z-50">
          {menuItems.map(({ path, label, icon }) => (
            <li key={path} className="my-2">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 flex items-center rounded-md transition-all duration-200 ${
                    isActive ? "bg-primary text-white font-bold" : "hover:bg-accent"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {icon} {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
