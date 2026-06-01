export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-dark)', color: 'white', padding: '3rem 0 1.5rem', textLight: 'center' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>YourName</div>
        <p style={{ color: '#94a3b8' }}>Building digital experiences &copy; 2026. All rights reserved.</p>
      </div>
    </footer>
  );
}