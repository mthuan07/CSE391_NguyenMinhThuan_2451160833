import { useState } from 'react';
import { projectsData } from '../data/portfolio';

export default function Portfolio() {
  // Bài 4.3: Quản lý bộ lọc đang chọn bằng useState hook
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects] = useState(projectsData);

  const categories = ['All', 'Web', 'Mobile', 'Design'];

  // Logic xử lý mảng .filter() dựa trên danh mục đang active
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" style={{ padding: '6rem 0', background: 'white' }}>
      <div className="container">
        <h2 className="section-heading">My Portfolio</h2>
        
        {/* Hàng nút bấm bộ lọc danh mục Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                border: '2px solid var(--color-primary)',
                cursor: 'pointer',
                fontWeight: 600,
                backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--color-primary)',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lưới hiển thị danh sách sản phẩm ứng dụng Conditional Rendering xử lý Empty State */}
        {filteredProjects.length === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#94a3b8' }}>Hiện tại chưa có dự án thuộc danh mục này.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Sub-component ProjectCard bóc tách độc lập và nhận dữ liệu thông qua Props Destructuring
function ProjectCard({ project }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <img src={project.image} alt={project.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30, 41, 59, 0.95) 0%, rgba(30, 41, 59, 0.6) 70%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
        
        {/* Conditional Rendering lồng nhau: Chỉ hiển thị nhãn Featured khi điều kiện đúng chuẩn Bài 4.5 */}
        {project.featured && (
          <span style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--color-secondary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700 }}>
            🔥 Featured
          </span>
        )}
        
        <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '0.25rem' }}>{project.title}</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{project.tech} [{project.category}]</p>
      </div>
    </div>
  );
}