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
    setButtonText('Sending…');

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const project_type = formData.get('project-type') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    try {
      // 1. Try posting to Supabase contact_messages table
      const { error } = await supabase.from('contact_messages').insert([
        { name, email, project_type, budget, message },
      ]);

      // 2. Also post to Formspree endpoint as backup if configured
      if (form.action && form.action.includes('formspree')) {
        await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        }).catch(() => {});
      }

      setButtonText('✓ Message sent!');
      setButtonBg('#22c55e');
      form.reset();
      setTimeout(() => {
        setButtonText('Send Message');
        setButtonBg('');
        setSubmitting(false);
      }, 4000);
    } catch {
      setButtonText('Failed — try email directly');
      setButtonBg('#ef4444');
      setSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="contact-grid">
        <div>
          <span className="section-label">Get in touch</span>
          <h2 className="section-title reveal visible">Let's build something together.</h2>
          <p className="reveal visible">
            Have a project in mind? I'm open to freelance work, full-time roles, and collaborations.
            Reach out and I'll get back to you within 24 hours.
          </p>

          <div className="availability-badge reveal visible">
            <span className="dot"></span>
            Currently available for new projects
          </div>

          <div className="contact-details reveal visible">
            <div className="contact-row">
              <div className="contact-row-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <small>Email</small>
                <a href={`mailto:${bio.contact.email}`}>{bio.contact.email}</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-row-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <small>Phone / WhatsApp</small>
                <a href={bio.socials.whatsapp} target="_blank" rel="noopener noreferrer">
                  {bio.contact.phone}
                </a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-row-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <small>Location</small>
                <span>{bio.contact.location} · Open to remote</span>
              </div>
            </div>
          </div>

          <div className="social-strip reveal visible">
            {bio.socials.github && (
              <a href={bio.socials.github} className="social-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
            )}
            {bio.socials.linkedin && (
              <a href={bio.socials.linkedin} className="social-btn" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {bio.socials.twitter && (
              <a href={bio.socials.twitter} className="social-btn" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {bio.socials.whatsapp && (
              <a href={bio.socials.whatsapp} className="social-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">
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
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" name="name" placeholder="Ade Okafor" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="ade@company.com" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="project-type">Project type</label>
              <select id="project-type" name="project-type">
                <option value="">Select a service...</option>
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="fullstack">Full-Stack Application</option>
                <option value="design">UI/UX Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="budget">Budget range (optional)</label>
              <select id="budget" name="budget">
                <option value="">Prefer not to say</option>
                <option value="under-100k">Under ₦100,000</option>
                <option value="100k-500k">₦100,000 – ₦500,000</option>
                <option value="500k-1m">₦500,000 – ₦1,000,000</option>
                <option value="1m+">₦1,000,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="message">Tell me about your project</label>
              <textarea
                id="message"
                name="message"
                placeholder="What are you building? What's the timeline?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="form-submit"
              disabled={submitting}
              style={buttonBg ? { background: buttonBg } : {}}
            >
              {buttonText}{' '}
              <i className="fas fa-paper-plane" style={{ fontSize: '0.8rem' }}></i>
            </button>
            <p className="form-note">I respond within 24 hours on business days.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
