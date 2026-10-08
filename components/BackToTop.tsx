'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BackToTop() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide BackToTop on Admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#home"
      className={`back-top ${show ? 'show' : ''}`}
      id="backTop"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </a>
  );
}
