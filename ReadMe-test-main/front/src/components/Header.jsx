import { Link } from "react-router-dom";
import React from "react";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./generic/Nav";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function clearStorage() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <header className="relative bg-white">
      <div className="absolute inset-x-0 bottom-0 h-2">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 2">
          <path d="M0 1 C 30 2, 70 0, 100 1 L 100 2 L 0 2 Z" fill="black" />
        </svg>
      </div>
      <div className="container relative px-4 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="relative">
              <img
                alt="logo"
                src="/images/ReadMe.png"
                className="relative z-10 object-contain h-20 sm:h-28 filter contrast-200"
              />
              <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M10,10 Q30,5 50,10 T90,10 L95,90 Q70,95 50,90 T5,90 Z" fill="none" stroke="black" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </Link>
          <nav className="items-center hidden gap-6 md:flex">
            <NavLinks user={user} clearStorage={clearStorage} />
            <Link to="/achievements" className="text-black hover:text-blue-500">
              Achievements
            </Link>
          </nav>
          <button
            className="relative z-10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-10 h-10 text-black" />
            ) : (
              <Menu className="w-10 h-10 text-black" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="relative border-t-2 border-black md:hidden">
          <svg className="absolute inset-x-0 top-0 h-2" preserveAspectRatio="none" viewBox="0 0 100 2">
            <path d="M0 1 C 20 0, 60 2, 100 1" fill="none" stroke="black" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <nav className="flex flex-col items-center gap-4 py-4">
            <NavLinks user={user} clearStorage={clearStorage} />
            <Link to="/achievements" className="text-black hover:text-blue-500">
              Achievements
            </Link>         
          </nav>
          <svg className="absolute inset-x-0 bottom-0 h-2" preserveAspectRatio="none" viewBox="0 0 100 2">
            <path d="M0 1 C 40 2, 80 0, 100 1" fill="none" stroke="black" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      )}
    </header>
  );
}