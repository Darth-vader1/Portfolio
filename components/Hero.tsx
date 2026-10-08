import { BioData } from '@/lib/content';

interface HeroProps {
  bio: BioData;
}

export default function Hero({ bio }: HeroProps) {
  const socials = bio?.socials || { github: '', linkedin: '', twitter: '', whatsapp: '' };

  return (
    <section id="home">
      <div className="hero-bg-text">DEV</div>

      <div className="hero-left">
        <div className="hero-tag">
          <span className="dot"></span>
          {bio?.tagline || 'Available for freelance & full-time roles'}
        </div>

        <h1>
          Building web<br />
          products that<br />
          <em>actually work.</em>
        </h1>

        <p className="hero-sub">
          I'm <strong>{bio?.name || 'Olufemi Gbolahan'}</strong> — {bio?.role}. {bio?.subtext}
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            See My Work <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
          </a>
          <a href={bio?.cv_file || 'resume.docx'} className="btn-outline" download>
            Download CV
          </a>
        </div>

        <div className="hero-socials">
          <span>Find me on</span>
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" title="Twitter/X">
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {socials.whatsapp && (
            <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          )}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-photo-wrap">
          <div className="hero-photo-frame">
            <img src={bio?.hero_photo || 'myimage.JPG'} alt={bio?.name || 'Profile'} />
          </div>
          <div className="hero-badge">
            <div className="hero-badge-icon">🚀</div>
            <div className="hero-badge-text">
              <strong>{bio?.experience_years || '3 Years Experience'}</strong>
              <span>Frontend &amp; Backend</span>
            </div>
          </div>
          <div className="hero-badge2">
            <span>{bio?.clients_count || '12+'}</span>
            Clients served
          </div>
        </div>
      </div>
    </section>
  );
}
