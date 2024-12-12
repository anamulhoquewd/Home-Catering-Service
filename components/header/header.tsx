import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlignJustify, UtensilsCrossed, X } from "lucide-react";
import { useState, useEffect, useRef, FC } from "react";
import { Separator } from "@/components/ui/separator";

interface MenuItemProps {
  
  name: string;
  href: string;
}
const menu: MenuItemProps[] = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}
const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const [isVisible, setIsVisible] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true);

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(e.target as Node)
        ) {
          toggleMenu();
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick); // Cleanup listener
      };
    } else {
      setTimeout(() => setIsVisible(false), 300); // Close animation delay
    }
  }, [isMenuOpen, toggleMenu]);

  if (!isMenuOpen && !isVisible) return null; // Don't render if not visible

  return (
    <div
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 w-56 h-screen bg-white z-10 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className="flex flex-col items-center mt-6">
        <div className="flex items-center justify-between w-full px-4 mb-4">
          <h1 className="text-xl font-bold">Menu</h1>
          <X
            onClick={toggleMenu}
            className="text-2xl font-bold rounded cursor-pointer"
          />
        </div>
        {menu.map((item, index) => (
          <>
            {index > 0 && <Separator className="bg-gray-100" />}
            <Link
              key={index + item.name}
              href={item.href}
              className="text-sm w-full px-4 py-2 font-medium transition-colors duration-300 hover:text-secondary hover:bg-green-600"
            >
              {item.name}
            </Link>
          </>
        ))}
      </nav>
    </div>
  );
};

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <header className="bg-primary shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlignJustify
              onClick={toggleMenu}
              className="h-6 w-6 text-secondary block md:hidden cursor-pointer"
            />
            <Link href="/" className="flex items-center gap-4">
              <UtensilsCrossed className="h-6 w-6 text-secondary" />
              <span className="text-xl hidden sm:block font-bold text-secondary">
                Home Catering Service
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {menu.map((item, index) => (
              <Link
                key={index + item.name}
                href={item.href}
                className="text-sm px-4 py-2 font-medium text-muted/80 transition-colors duration-300 hover:text-secondary rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;
