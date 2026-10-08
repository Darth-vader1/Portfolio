export default function Testimonials() {
  const testimonialsData = [
    {
      stars: '★★★★★',
      quote: 'Excellent delivery on our inventory system. Professional and fast.',
      avatar: 'AO',
      name: 'Adebayo Olatunji',
      role: 'CEO, Lagos Logistics',
    },
    {
      stars: '★★★★★',
      quote: 'The fashion e-commerce site is stunning. Great attention to detail.',
      avatar: 'CO',
      name: 'Chidi Okoro',
      role: 'Founder, StyleHub Nigeria',
    },
    {
      stars: '★★★★★',
      quote: "Gbolahan's logbook system transformed our manual processes. Highly recommended.",
      avatar: 'AB',
      name: 'Amina Bello',
      role: 'Manager, SIWES Connect',
    },
  ];

  return (
    <section id="testimonials">
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span className="section-label">Social proof</span>
        <h2 className="section-title reveal visible">What clients say</h2>
        <p className="section-sub reveal visible" style={{ margin: '0 auto' }}>
          Real feedback from clients and collaborators.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonialsData.map((item, index) => (
          <div className="testimonial-card reveal visible" key={index}>
            <div className="t-stars">{item.stars}</div>
            <p className="t-quote">{item.quote}</p>
            <div className="t-author">
              <div className="t-avatar">{item.avatar}</div>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
