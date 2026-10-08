'use client';

import { useState } from 'react';
import { ProjectData } from '@/lib/content';

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'web' | 'app'>('all');

  const projectList = projects || [];
  const filteredProjects = projectList.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="projects">
      <div className="projects-header">
        <div>
          <span className="section-label">My work</span>
          <h2 className="section-title" style={{ marginBottom: '8px' }}>
            Selected projects
          </h2>
          <p className="section-sub">Real products, shipped to real users.</p>
        </div>
        <div className="filter-row">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web
          </button>
          <button
            className={`filter-btn ${filter === 'app' ? 'active' : ''}`}
            onClick={() => setFilter('app')}
          >
            App
          </button>
        </div>
      </div>

      <div className="projects-grid" id="projectsGrid">
        {filteredProjects.map((p, index) => {
          const isFeatured = p.featured ? 'featured' : '';

          return (
            <div
              className={`project-card ${isFeatured} reveal visible`}
              key={p.id || index}
              data-category={p.category}
            >
              <div className="project-img">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {(p.tags || []).map((tag, tIdx) => (
                    <span className="tag" key={tIdx}>
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
                <div className="project-links">
                  <a
                    href={p.demo_url}
                    className="link-btn solid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a
                    href={p.source_url}
                    className="link-btn ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i> Source
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
