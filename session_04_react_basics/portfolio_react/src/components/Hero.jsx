export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Hi, I'm [Your Name]</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '3rem' }}>Full-Stack Developer | UI Designer | Problem Solver</p>
      <a href="#portfolio" style={{ display: 'inline-block', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)' }}>
        View My Work
      </a>
    </section>
  );
}