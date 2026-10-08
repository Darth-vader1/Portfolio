'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg('Login failed. Please check your Supabase setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)', padding: '24px' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/" className="logo" style={{ fontSize: '1.8rem' }}>
            OG<span>.</span>
          </a>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', marginTop: '12px' }}>Admin Dashboard Login</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink3)' }}>Protected area for portfolio content management</p>
        </div>

        {errorMsg && (
          <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '20px' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="contact-form">
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="form-submit" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Log In to Admin Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
