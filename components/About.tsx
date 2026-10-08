import { BioData } from '@/lib/content';

interface AboutProps {
  bio: BioData;
}

export default function About({ bio }: AboutProps) {
  const contact = bio?.contact || { email: '', phone: '', location: '', website: '' };

  return (
    <section id="about">
      <div className="about-grid">
        <div className="reveal visible">
          <div className="about-photo">
            <img src={bio?.about_photo || 'profile.jpeg'} alt={bio?.name || 'About'} />
            <div className="about-accent-box">
              <strong>{bio?.apps_shipped || '4'}</strong>
              Production apps shipped
            </div>
          </div>
        </div>

        <div className="about-content reveal visible">
          <span className="section-label">About me</span>
          <h2 className="section-title">{bio?.about_title}</h2>

          <p>{bio?.about_paragraph_1}</p>

          <div className="about-niche">
            "{bio?.niche_statement}"
          </div>

          <p>{bio?.about_paragraph_2}</p>

          <div className="about-info">
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <span>{contact.email}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <span>{contact.phone}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{contact.location}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-globe"></i>
              <span>{contact.website}</span>
            </div>
          </div>

          <a href={bio?.cv_file || 'resume.docx'} className="btn-primary" download>
            Download CV <i className="fas fa-download" style={{ fontSize: '0.8rem' }}></i>
          </a>
        </div>
      </div>
    </section>
  );
}
