'use client';

import { useState } from 'react';
import { ProjectData, getImageUrl } from '@/lib/content';

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'web' | 'app'>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectData | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string | number, boolean>>({});

  const toggleFlip = (cardId: string | number) => {
    setFlippedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const projectList = projects || [];
  const filteredProjects = projectList.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="projects">
      <div className="projects-header">
        <div>
          <span className="section-label">Selected Work</span>
          <h2 className="section-title" style={{ marginBottom: '8px' }}>
            Real products, shipped to real users.
          </h2>
          <p className="section-sub">
            No dummy templates or half-baked tutorials — flip a card to inspect tech stack or click to read case study.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#92400e',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: '600',
              marginTop: '12px',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-sync-alt" style={{ fontSize: '0.75rem' }}></i> Click flip on any card to view tech stack & links
          </div>
        </div>
        <div className="filter-row">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Products
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web Apps
          </button>
          <button
            className={`filter-btn ${filter === 'app' ? 'active' : ''}`}
            onClick={() => setFilter('app')}
          >
            Mobile &amp; Software
          </button>
        </div>
      </div>

      <div className="projects-grid" id="projectsGrid">
        {filteredProjects.map((p, index) => {
          const cardId = p.id || index;
          const isFlipped = !!flippedCards[cardId];
          const isFeatured = p.featured ? 'featured' : '';
          const isVideoDemo = p.demo_url?.includes('youtu');

          return (
            <div
              className={`project-card-wrapper ${isFeatured} reveal visible`}
              key={cardId}
              data-category={p.category}
            >
              <div className={`project-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                {/* FRONT OF CARD */}
                <div className="project-card-front">
                  <div className="project-img">
                    <img src={getImageUrl(p.image)} alt={p.title} />
                  </div>
                  <div className="project-body">
                    <div className="project-tags">
                      {(p.tags || []).map((tag, tIdx) => (
                        <span
                          className="tag"
                          key={tIdx}
                          style={
                            tag.toLowerCase().includes('flagship') || tag.toLowerCase().includes('featured')
                              ? { background: 'var(--accent)', color: '#fff', fontWeight: 600 }
                              : {}
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="project-outcome">
                      <i className="fas fa-chart-line"></i>
                      <span>{p.outcome}</span>
                    </div>
                    <div className="project-links" style={{ flexWrap: 'wrap', marginTop: 'auto', paddingTop: '16px' }}>
                      <button
                        className="link-btn solid"
                        onClick={() => toggleFlip(cardId)}
                        style={{ background: 'var(--ink)', color: 'var(--paper)', cursor: 'pointer' }}
                      >
                        <i className="fas fa-sync-alt"></i> Flip Card
                      </button>
                      {p.case_study && (
                        <button
                          className="link-btn ghost"
                          onClick={() => setSelectedCaseStudy(p)}
                          style={{ background: 'var(--paper2)', cursor: 'pointer' }}
                        >
                          <i className="fas fa-book-open"></i> Case Study
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* BACK OF CARD (Dark grid high-tech theme) */}
                <div className="project-card-back">
                  <div className="back-content">
                    <div className="back-header">
                      <span className="back-badge">TECH STACK</span>
                      <button
                        className="flip-back-btn"
                        onClick={() => toggleFlip(cardId)}
                        title="Flip back to front"
                      >
                        <i className="fas fa-undo"></i> Front
                      </button>
                    </div>

                    <h3 className="back-title">{p.title}</h3>

                    <div className="tech-stack-pills">
                      {(p.tags || []).concat(['TypeScript', 'React', 'Next.js', 'Tailwind']).slice(0, 6).map((tech, tIdx) => (
                        <span className="tech-pill" key={tIdx}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="back-summary">
                      {p.description}
                    </p>

                    <div className="back-actions">
                      {p.case_study && (
                        <button
                          className="link-btn solid"
                          onClick={() => setSelectedCaseStudy(p)}
                          style={{ background: 'var(--accent)', color: '#fff', cursor: 'pointer', width: '100%' }}
                        >
                          <i className="fas fa-book-open"></i> Read Full Case Study
                        </button>
                      )}
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        {isVideoDemo ? (
                          <a
                            href={p.demo_url}
                            className="link-btn solid"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ background: '#dc2626', flex: 1, justifyContent: 'center' }}
                          >
                            <i className="fab fa-youtube"></i> Demo
                          </a>
                        ) : (
                          <a
                            href={p.demo_url}
                            className="link-btn solid"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            <i className="fas fa-external-link-alt"></i> Live
                          </a>
                        )}
                        <a
                          href={p.source_url}
                          className="link-btn ghost"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ flex: 1, justifyContent: 'center', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                        >
                          <i className="fab fa-github"></i> Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(14,14,14,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            style={{
              background: 'var(--white)',
              borderRadius: '24px',
              padding: 'clamp(24px, 5vw, 40px)',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCaseStudy(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--paper2)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              &times;
            </button>

            <span className="section-label">Case Study</span>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', marginBottom: '16px' }}>
              {selectedCaseStudy.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
              <div>
                <strong style={{ color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  The Problem
                </strong>
                <p style={{ marginTop: '6px', fontSize: '0.92rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
                  {selectedCaseStudy.case_study?.problem}
                </p>
              </div>

              <div>
                <strong style={{ color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  My Role &amp; Responsibility
                </strong>
                <p style={{ marginTop: '6px', fontSize: '0.92rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
                  {selectedCaseStudy.case_study?.role}
                </p>
              </div>

              <div>
                <strong style={{ color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Architectural Decisions
                </strong>
                <p style={{ marginTop: '6px', fontSize: '0.92rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
                  {selectedCaseStudy.case_study?.key_decisions}
                </p>
              </div>

              <div>
                <strong style={{ color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Results &amp; Impact
                </strong>
                <p style={{ marginTop: '6px', fontSize: '0.92rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
                  {selectedCaseStudy.case_study?.result}
                </p>
              </div>

              <div style={{ background: 'var(--paper)', padding: '18px', borderRadius: '12px', borderLeft: '3px solid var(--accent)' }}>
                <strong style={{ color: 'var(--ink)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hindsight: What I'd Do Differently Today
                </strong>
                <p style={{ marginTop: '6px', fontSize: '0.88rem', color: 'var(--ink2)', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{selectedCaseStudy.case_study?.hindsight}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
