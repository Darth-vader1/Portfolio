export default function Journey() {
  const milestones = [
    {
      year: '2022',
      title: 'Started Building',
      desc: 'Fell in love with turning ideas into real things on the web. Began learning HTML, CSS, and JavaScript, exploring software mechanics behind the scenes.',
      align: 'left',
    },
    {
      year: '2023',
      title: 'First Client Products & Backend Engineering',
      desc: 'Mastered Python, Django, and database architecture. Shipped custom web applications for Lagos businesses, eliminating manual paperwork and automating stock management.',
      align: 'right',
    },
    {
      year: '2024',
      title: 'Flagship Applications & Systems',
      desc: 'Shipped production platforms including the SIWES Logbook Management System (used by 200+ students) and ICAN Management System. Designed end-to-end Django + React architectures.',
      align: 'left',
    },
    {
      year: '2025 – PRESENT',
      title: 'Full-Stack Systems & AI Integrations',
      desc: 'Integrated Next.js App Router, Supabase auth/databases, AI tooling, and cloud infrastructure to build fast, scalable, production-grade applications.',
      align: 'right',
    },
  ];

  return (
    <section id="journey">
      <div style={{ textAlign: 'center' }}>
        <span className="section-label">JOURNEY</span>
        <h2 className="section-title reveal visible">How I Got Here</h2>
        <p className="section-sub reveal visible" style={{ margin: '0 auto' }}>
          From writing my first line of HTML to shipping production software for real users.
        </p>
      </div>

      <div className="journey-container">
        <div className="journey-line"></div>

        {milestones.map((item, index) => (
          <div
            className={`journey-item ${item.align} reveal visible`}
            key={index}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="journey-dot"></div>
            <div className="journey-year">{item.year}</div>
            <h3 className="journey-title">{item.title}</h3>
            <p className="journey-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
