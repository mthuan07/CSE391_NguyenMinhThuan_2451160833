import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái đóng mở Hamburger Menu bằng State

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'var(--color-light)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
        <a href="#" style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'var(--color-dark)' }}>YourName</a>
        
        {/* Nút bấm Hamburger xử lý trực tiếp bằng Event handler onClick */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          className="mobile-menu-btn"
        >
          ☰
        </button>

        <nav style={{ display: 'flex', gap: '2rem' }} className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="#about" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>About</a>
          <a href="#skills" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Skills</a>
          <a href="#portfolio" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Portfolio</a>
          <a href="#contact" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Contact</a>
        </nav>
      </div>
    </header>
  );
}