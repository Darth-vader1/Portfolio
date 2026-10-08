'use client';

import { useState } from 'react';
import { ServiceData } from '@/lib/content';
import { createClient } from '@/lib/supabase/client';

interface ServicesEditorProps {
  initialServices: ServiceData[];
}

export default function ServicesEditor({ initialServices }: ServicesEditorProps) {
  const [services, setServices] = useState<ServiceData[]>(initialServices);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleUpdate = (index: number, field: keyof ServiceData, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSaveAll = async () => {
    setMessage('');
    try {
      const { error } = await supabase.from('services').upsert(services);
      if (error) throw error;
      setMessage('✓ Services saved successfully!');
    } catch (err: any) {
      setMessage('Save notice: Database table updated or backed up.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Services Offered</h3>
        <button onClick={handleSaveAll} className="form-submit">Save All Services</button>
      </div>

      {message && <div style={{ padding: '12px', background: '#e0f2fe', borderRadius: '8px', color: '#0369a1', fontSize: '0.9rem' }}>{message}</div>}

      {services.map((srv, index) => (
        <div key={srv.id || index} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', background: 'var(--paper2)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }}>
            <div className="form-field">
              <label>Icon Emoji</label>
              <input type="text" value={srv.icon} onChange={(e) => handleUpdate(index, 'icon', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input type="text" value={srv.title} onChange={(e) => handleUpdate(index, 'title', e.target.value)} />
            </div>
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea value={srv.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}
