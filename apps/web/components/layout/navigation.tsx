"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@jess-web/ui";
import Logo from "./logo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };
    

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinksLeft = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
  ];

  const navLinksRight = [
    { label: "Services", href: "#services" },
    { label: "Booking", href: "#booking" },
    { label: "Contact", href: "#contact" },
  ];

  const allLinks = [...navLinksLeft, ...navLinksRight];

  return (
    <nav className={`fixed top-0 w-full bg-navbar-bg backdrop-blur-sm border-b border-border z-50 transition-transform duration-100 ${isHidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Menú Izquierdo (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-10">
            {navLinksLeft.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-brand-gray hover:text-brand-green hover:drop-shadow-[0_0_3px_rgba(143,191,168,0.6)] transition-all duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Logo Central */}
          <div className="flex-shrink-0 px-12">
            <Logo />
          </div>

          {/* Menú Derecho + Botón (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-start space-x-10">
            {navLinksRight.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-brand-gray hover:text-brand-green hover:drop-shadow-[0_0_3px_rgba(143,191,168,0.6)] transition-all duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Botón Menú Móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-brand-gray hover:text-brand-green transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-navbar-bg border-t border-border animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-8 space-y-2">
            {allLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-6 py-4 text-xl font-medium text-brand-gray hover:text-brand-green hover:drop-shadow-[0_0_5px_rgba(143,191,168,0.5)] hover:bg-brand-green/10 active:bg-brand-green/20 rounded-2xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 px-2">
              <Button
                asChild
                className="w-full h-14 text-lg font-semibold rounded-full bg-brand-green hover:bg-brand-green/90 shadow-lg hover:shadow-brand-green/40 transition-all active:scale-[0.98]"
              >
                <a href="#booking">Book Now</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
