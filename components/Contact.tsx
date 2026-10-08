'use client';

import { useState } from 'react';
import { BioData } from '@/lib/content';
import { createClient } from '@/lib/supabase/client';

interface ContactProps {
  bio: BioData;
}

export default function Contact({ bio }: ContactProps) {
  const [submitting, setSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState('Send Message');
  const [buttonBg, setButtonBg] = useState('');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setButtonText('Sending message…');

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const project_type = formData.get('project-type') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    try {
      // 1. Store message in Supabase contact_messages table
      const { error } = await supabase.from('contact_messages').insert([
        { name, email, project_type, budget, message },
      ]);

      // 2. Send to Formspree endpoint as secondary notification delivery
      if (form.action && form.action.includes('formspree')) {
        await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        }).catch(() => {});
      }

      setButtonText("✓ Message Received! I'll reply within 24h");
      setButtonBg('#22c55e');
      form.reset();
      setTimeout(() => {
        setButtonText('Send Message');
        setButtonBg('');
        setSubmitting(false);
      }, 4000);
    } catch {
      setButtonText('Failed — send email directly');
      setButtonBg('#ef4444');
      setSubmitting(false);
    }
  };

  const email = bio?.contact?.email || 'Gbolahanabiodun92@gmail.com';
  const phone = bio?.contact?.phone || '+234-812-6398-496';
  const location = bio?.contact?.location || 'Lagos, Nigeria';
  const socials = bio?.socials || { github: '', linkedin: '', twitter: '', whatsapp: '' };

  return (
    <section id="contact">
      <div className="contact-grid">
        <div>
          <span className="section-label">Say Hello</span>
          <h2 className="section-title reveal visible">Let's build something worth talking about.</h2>
          <p className="reveal visible" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
            Got a project idea, a manual workflow headache, or just want to discuss tech, Django querysets, or Lagos spots? Drop a line below — I read every message.
          </p>

          <div className="availability-badge reveal visible" style={{ marginTop: '20px' }}>
            <span className="dot"></span>
            Currently available for freelance projects &amp; full-time roles
          </div>

          <div className="contact-details reveal visible" style={{ marginTop: '28px' }}>
            <div className="contact-row">
              <div className="contact-row-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <small>Direct Email</small>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-row-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <small>Phone / WhatsApp</small>
                <a href={socials.whatsapp || `https://wa.me/2348126398496`} target="_blank" rel="noopener noreferrer">
                  {phone}
                </a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-row-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <small>Location</small>
                <span>{location} · Open to remote worldwide</span>
              </div>
            </div>
          </div>

          <div className="social-strip reveal visible">
            {socials.github && (
              <a href={socials.github} className="social-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} className="social-btn" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} className="social-btn" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {socials.whatsapp && (
              <a href={socials.whatsapp} className="social-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            )}
          </div>
        </div>

        <div className="reveal visible">
          <form
            className="contact-form"
            id="contactForm"
            action="https://formspree.io/f/xvgzlyne"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="Ade Okafor" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="ade@awesomecompany.com" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="project-type">What are we building?</label>
              <select id="project-type" name="project-type">
                <option value="">Select a service...</option>
                <option value="frontend">Frontend Application (React)</option>
                <option value="backend">Backend &amp; API (Python/Django)</option>
                <option value="fullstack">Full-Stack Django + React Product</option>
                <option value="design">UI/UX Design &amp; Prototyping</option>
                <option value="other">Just saying hi / Other</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="budget">Estimated Budget (Optional)</label>
              <select id="budget" name="budget">
                <option value="">Prefer not to say / Let's discuss</option>
                <option value="under-100k">Under ₦100,000</option>
                <option value="100k-500k">₦100,000 – ₦500,000</option>
                <option value="500k-1m">₦500,000 – ₦1,000,000</option>
                <option value="1m+">₦1,000,000+</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="message">Tell me about your vision</label>
              <textarea
                id="message"
                name="message"
                placeholder="What problem are you trying to solve? What does success look like? What's the timeline?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="form-submit"
              disabled={submitting}
              style={buttonBg ? { background: buttonBg } : {}}
            >
              {buttonText} <i className="fas fa-paper-plane" style={{ fontSize: '0.8rem' }}></i>
            </button>
            <p className="form-note">I respond within 24 hours on business days. No spam, ever.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
