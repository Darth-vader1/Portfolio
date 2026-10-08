'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  created_at: string;
}

export default function MessagesViewer() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setMessages(data);
        }
      } catch (err) {
        console.log('No messages yet or table waiting for credentials');
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div>
      <h3>Submitted Contact Messages ({messages.length})</h3>

      {loading ? (
        <p style={{ marginTop: '16px' }}>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div style={{ padding: '24px', background: 'var(--paper2)', borderRadius: '12px', marginTop: '16px', textAlign: 'center' }}>
          <p>No contact form messages recorded yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', background: 'var(--white)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{msg.name} ({msg.email})</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '8px' }}>
                Project Type: {msg.project_type || 'N/A'} | Budget: {msg.budget || 'N/A'}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink2)' }}>{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
