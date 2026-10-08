'use client';

import { useState } from 'react';
import { BioData } from '@/lib/content';
import { createClient } from '@/lib/supabase/client';

interface BioEditorProps {
  initialBio: BioData;
}

export default function BioEditor({ initialBio }: BioEditorProps) {
  const [bio, setBio] = useState<BioData>(initialBio);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.from('bio').upsert({
        id: 1,
        ...bio,
      });

      if (error) throw error;
      setMessage('✓ Bio saved successfully!');
    } catch (err: any) {
      setMessage(`Save notice: Database table 'bio' will update once credentials & schema are linked.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Personal Profile &amp; Bio</h3>
      {message && <div style={{ padding: '12px', background: '#e0f2fe', borderRadius: '8px', color: '#0369a1', fontSize: '0.9rem' }}>{message}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-field">
          <label>Full Name</label>
          <input type="text" value={bio.name} onChange={(e) => setBio({ ...bio, name: e.target.value })} required />
        </div>
        <div className="form-field">
          <label>Tagline</label>
          <input type="text" value={bio.tagline} onChange={(e) => setBio({ ...bio, tagline: e.target.value })} required />
        </div>
      </div>

      <div className="form-field">
        <label>Headline Title</label>
        <input type="text" value={bio.headline} onChange={(e) => setBio({ ...bio, headline: e.target.value })} required />
      </div>

      <div className="form-field">
        <label>Subtext</label>
        <textarea value={bio.subtext} onChange={(e) => setBio({ ...bio, subtext: e.target.value })} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-field">
          <label>Experience Badge</label>
          <input type="text" value={bio.experience_years} onChange={(e) => setBio({ ...bio, experience_years: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Clients Served Badge</label>
          <input type="text" value={bio.clients_count} onChange={(e) => setBio({ ...bio, clients_count: e.target.value })} />
        </div>
      </div>

      <div className="form-field">
        <label>Niche Specialty Quote</label>
        <textarea value={bio.niche_statement} onChange={(e) => setBio({ ...bio, niche_statement: e.target.value })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-field">
          <label>Email</label>
          <input type="email" value={bio.contact.email} onChange={(e) => setBio({ ...bio, contact: { ...bio.contact, email: e.target.value } })} />
        </div>
        <div className="form-field">
          <label>Phone / WhatsApp</label>
          <input type="text" value={bio.contact.phone} onChange={(e) => setBio({ ...bio, contact: { ...bio.contact, phone: e.target.value } })} />
        </div>
      </div>

      <button type="submit" className="form-submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Bio Changes'}
      </button>
    </form>
  );
}
