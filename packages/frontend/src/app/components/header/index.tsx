"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlignJustify, UtensilsCrossed, X } from "lucide-react";
import { useState, useEffect, useRef, FC, Fragment } from "react";
import { Separator } from "@/components/ui/separator";

interface MenuItemProps {
  name: string;
  href: string;
}
const menu: MenuItemProps[] = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}
const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        toggleMenu(); // Close menu if clicked outside
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup listener
    };
  }, [isMenuOpen, toggleMenu]);

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
          <Fragment key={index}>
            {index > 0 && <Separator className="bg-gray-100" />}
            <Link
              href={item.href}
              className="text-sm w-full px-4 py-2 font-medium transition-colors duration-300 hover:text-secondary hover:bg-green-600"
            >
              {item.name}
            </Link>
          </Fragment>
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
        <div className="container mx-auto p-4 flex items-center justify-between">
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
                className="text-sm px-4 py-2 font-medium transition-colors duration-300 text-secondary rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex space-x-2">
            <Link href="/auth/signin">
            <Button variant="secondary" size="sm">
              Sign In
            </Button>
            </Link>
            <Link href="/auth/signup">
            <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;
