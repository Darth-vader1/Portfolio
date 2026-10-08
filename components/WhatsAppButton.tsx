'use client';

import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href="https://wa.me/2348126398496"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '32px',
        width: '50px',
        height: '50px',
        background: '#25D366',
        color: '#ffffff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
        zIndex: 90,
        transition: 'transform 0.2s, background 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
