'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide main portfolio Footer on Admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer>
      <a href="#home" className="footer-logo">
        OG<span>.</span>
      </a>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Work</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <span className="footer-copy">
        &copy; {currentYear} Olufemi Gbolahan. All rights reserved.
      </span>
    </footer>
  );
}
