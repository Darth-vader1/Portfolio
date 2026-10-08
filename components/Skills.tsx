'use client';

import { SkillsData, getImageUrl } from '@/lib/content';

interface SkillsProps {
  skillsData: SkillsData;
}

export default function Skills({ skillsData }: SkillsProps) {
  const tools = skillsData?.tools || [];

  const techStack = [
    {
      category: 'Frontend Engineering',
      icon: 'fab fa-react',
      skills: ['React', 'Next.js (App Router)', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Redux Toolkit'],
    },
    {
      category: 'Backend & APIs',
      icon: 'fab fa-python',
      skills: ['Python', 'Django Framework', 'Django REST Framework', 'Node.js', 'RESTful API Architecture', 'JWT & OAuth Auth'],
    },
    {
      category: 'Databases & Storage',
      icon: 'fas fa-database',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Redis Caching', 'Database Schema Design'],
    },
    {
      category: 'Cloud, DevOps & Tooling',
      icon: 'fas fa-cloud',
      skills: ['Git & GitHub', 'AWS (EC2, S3)', 'Vercel / Render Deployment', 'Docker (Basic)', 'VS Code', 'Postman API Testing'],
    },
  ];

  return (
    <section id="skills">
      <div className="skills-layout">
        <div>
          <span className="section-label">MY TOOLKIT</span>
          <h2 className="section-title reveal visible">Technologies &amp; Architecture</h2>
          <p className="section-sub reveal visible">
            Battle-tested technologies I use day-to-day to build production-grade web applications.
          </p>

          {techStack.map((group, gIdx) => (
            <div className="skill-group reveal visible" key={gIdx}>
              <div className="skill-group-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className={group.icon}></i> {group.category}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      background: 'rgba(247,244,239,0.08)',
                      border: '1px solid rgba(247,244,239,0.15)',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--paper2)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <span
            className="section-label"
            style={{ color: 'var(--accent2)', display: 'block', marginBottom: '14px' }}
          >
            Design &amp; Dev Tools
          </span>
          <div className="tools-grid reveal visible">
            {tools.map((tool, tIdx) => (
              <div className="tool-chip" key={tIdx}>
                <img src={getImageUrl(tool.image)} alt={tool.name} />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>

          <div
            className="reveal visible"
            style={{
              marginTop: '36px',
              padding: '24px',
              border: '1px solid rgba(247,244,239,0.12)',
              borderRadius: '14px',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent2)',
                marginBottom: '16px',
              }}
            >
              At a glance
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--paper)',
                  }}
                >
                  12+
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--paper2)', opacity: 0.6 }}>
                  Clients served
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--paper)',
                  }}
                >
                  4
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--paper2)', opacity: 0.6 }}>
                  Apps shipped to production
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--paper)',
                  }}
                >
                  3yr
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--paper2)', opacity: 0.6 }}>
                  Professional experience
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--paper)',
                  }}
                >
                  2
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--paper2)', opacity: 0.6 }}>
                  Awards won (Hackathon &amp; Tech)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
