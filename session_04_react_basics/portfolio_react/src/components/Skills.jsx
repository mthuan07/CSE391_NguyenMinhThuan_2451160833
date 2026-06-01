import { skillsData } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 0', background: 'var(--color-light)' }}>
      <div className="container">
        <h2 class="section-heading">My Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem 3rem' }}>
          {/* List Rendering bằng phương thức .map() đi kèm thuộc tính độc nhất key prop */}
          {skillsData.map((skill, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>{skill.name}</span>
                <span>{skill.percentage}</span>
              </div>
              <div style={{ background: '#e2e8f0', height: '12px', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', height: '100%', width: skill.percentage, borderRadius: '10px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}