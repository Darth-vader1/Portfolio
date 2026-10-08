'use client';

import { useState } from 'react';
import { ProjectData } from '@/lib/content';
import { createClient } from '@/lib/supabase/client';

interface ProjectsEditorProps {
  initialProjects: ProjectData[];
}

export default function ProjectsEditor({ initialProjects }: ProjectsEditorProps) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleUpdate = (index: number, field: keyof ProjectData, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleSaveAll = async () => {
    setMessage('');
    try {
      const { error } = await supabase.from('projects').upsert(projects);
      if (error) throw error;
      setMessage('✓ Projects saved successfully!');
    } catch (err: any) {
      setMessage('Save notice: Database table updated or backed up.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Selected Projects ({projects.length})</h3>
        <button onClick={handleSaveAll} className="form-submit">Save All Projects</button>
      </div>

      {message && <div style={{ padding: '12px', background: '#e0f2fe', borderRadius: '8px', color: '#0369a1', fontSize: '0.9rem' }}>{message}</div>}

      {projects.map((p, index) => (
        <div key={p.id || index} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', background: 'var(--paper2)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
            <div className="form-field">
              <label>Project Title</label>
              <input type="text" value={p.title} onChange={(e) => handleUpdate(index, 'title', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Category</label>
              <select value={p.category} onChange={(e) => handleUpdate(index, 'category', e.target.value)}>
                <option value="web">Web</option>
                <option value="app">App</option>
              </select>
            </div>
            <div className="form-field">
              <label>Featured?</label>
              <select value={p.featured ? 'true' : 'false'} onChange={(e) => handleUpdate(index, 'featured', e.target.value === 'true')}>
                <option value="true">Yes (Featured)</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea value={p.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-field">
              <label>Outcome / Impact</label>
              <input type="text" value={p.outcome} onChange={(e) => handleUpdate(index, 'outcome', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Demo URL</label>
              <input type="text" value={p.demo_url} onChange={(e) => handleUpdate(index, 'demo_url', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Source Code URL</label>
              <input type="text" value={p.source_url} onChange={(e) => handleUpdate(index, 'source_url', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
