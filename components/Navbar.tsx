'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide main portfolio Navbar on Admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a href="#home" className="logo">
        OG<span>.</span>
      </a>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
        <li>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
        </li>
        <li>
          <a href="#journey" onClick={closeMenu}>
            Journey
          </a>
        </li>
        <li>
          <a href="#projects" onClick={closeMenu}>
            Work
          </a>
        </li>
        <li>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
        </li>
        <li>
          <a href="#contact" onClick={closeMenu} className="nav-cta">
            Hire Me
          </a>
        </li>
      </ul>

      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        id="hamburger"
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
