import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Zap } from "lucide-react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Blog", path: "/blog" },
    { label: "Events", path: "/events" },
  ];
  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#243145] bg-[#080d16]/80 backdrop-blur-md *:
    
    
    text-white px-9 py-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <Zap size={22} className="text-teal-400" />
        <h1
          className="
      
      text-lg font-bold tracking-tight text-[#e0e5eb]
      "
        >
          AI-SOLUTIONS
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="space-x-6 hidden lg:flex">
        {navItems.map((item) => (
          <Link key={item.label} to={item.path} className="hover:text-teal-300">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="space-x-4 hidden lg:flex">
        <Link
          to="/contact"
          className="
    px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold "
        >
          Inquiry
        </Link>
      </div>
      {/* Mobile Hamburger */}
      <button
        className="lg:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IoClose className="w-6 h-6 cursor-pointer text-white" />
        ) : (
          <RxHamburgerMenu className="w-6 h-6 cursor-pointer text-white" />
        )}
      </button>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute  top-15 left-0 w-full bg-gray-900 text-white flex flex-col  justify-between items-start  px-6 py-4 space-y-6 lg:hidden shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="hover:text-teal-300 w-full"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col space-y-4 w-full">
            <Link
              to="/contact"
              className="bg-teal-500 px-3 py-2 rounded hover:bg-teal-600 text-center"
              onClick={() => setIsOpen(false)}
            >
              Inquiry
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
