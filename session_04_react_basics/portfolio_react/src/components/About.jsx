export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 0', background: 'white' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="https://via.placeholder.com/400x400" alt="Profile" style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <div>
          <h2 className="section-heading" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>About Me</h2>
          <p style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            I'm a passionate developer with 3+ years of experience building web applications.
          </p>
          <p style={{ color: 'var(--color-text)' }}>
            Specialized in Frontend development with React and Vue. Also experienced in Backend with Node.js and Python. Nhờ có React, việc đồng bộ hóa dữ liệu và quản lý trạng thái giao diện trở nên cực kỳ tinh gọn, loại bỏ hoàn toàn các bước thao tác DOM thủ công rườm rà.
          </p>
        </div>
      </div>
    </section>
  );
}