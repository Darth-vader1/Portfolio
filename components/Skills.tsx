'use client';

import { useEffect, useRef, useState } from 'react';
import { SkillsData } from '@/lib/content';

interface SkillsProps {
  skillsData: SkillsData;
}

export default function Skills({ skillsData }: SkillsProps) {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const groups = skillsData?.groups || [];
  const tools = skillsData?.tools || [];

  return (
    <section id="skills" ref={sectionRef}>
      <div className="skills-layout">
        <div>
          <span className="section-label">My toolkit</span>
          <h2 className="section-title reveal visible">Skills &amp; proficiency</h2>
          <p className="section-sub reveal visible">
            Technologies I use day-to-day to build production-grade web applications.
          </p>

          {groups.map((group, gIdx) => (
            <div className="skill-group reveal visible" key={gIdx}>
              <div className="skill-group-label">{group.label}</div>
              {(group.items || []).map((item, iIdx) => (
                <div className="skill-row" key={iIdx}>
                  <span className="skill-name">
                    <i className={item.icon}></i> {item.name}
                  </span>
                  <div className="skill-bar-wrap">
                    <div
                      className="skill-bar-fill"
                      style={{ width: animated ? `${item.width}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="skill-pct">{item.width}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          <span
            className="section-label"
            style={{ color: 'var(--accent2)', display: 'block', marginBottom: '14px' }}
          >
            Tools I use
          </span>
          <div className="tools-grid reveal visible">
            {tools.map((tool, tIdx) => (
              <div className="tool-chip" key={tIdx}>
                <img src={tool.image} alt={tool.name} />
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
                  Awards won
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
