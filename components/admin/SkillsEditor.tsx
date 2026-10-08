'use client';

import { useState } from 'react';
import { SkillsData } from '@/lib/content';

interface SkillsEditorProps {
  initialSkills: SkillsData;
}

export default function SkillsEditor({ initialSkills }: SkillsEditorProps) {
  const [skillsData, setSkillsData] = useState<SkillsData>(initialSkills);
  const [message, setMessage] = useState('');

  const handleWidthChange = (gIdx: number, iIdx: number, newWidth: number) => {
    const updated = { ...skillsData };
    updated.groups[gIdx].items[iIdx].width = newWidth;
    setSkillsData(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h3>Skills Proficiency &amp; Tools</h3>
      {message && <div style={{ padding: '12px', background: '#e0f2fe', borderRadius: '8px', color: '#0369a1', fontSize: '0.9rem' }}>{message}</div>}

      {skillsData.groups.map((group, gIdx) => (
        <div key={gIdx} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', background: 'var(--paper2)' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--accent)' }}>{group.label}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {group.items.map((item, iIdx) => (
              <div key={iIdx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 4fr', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span>{item.width}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={item.width}
                  onChange={(e) => handleWidthChange(gIdx, iIdx, parseInt(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
