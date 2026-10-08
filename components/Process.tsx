export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Problem Definition',
      desc: 'Understand the exact business goals, user bottlenecks, and manual inefficiencies before writing a single line of code.',
    },
    {
      number: '02',
      title: 'Architecture & System Design',
      desc: 'Design relational database schemas, REST API endpoints, and clean UI wireframes tailored for speed, security, and scale.',
    },
    {
      number: '03',
      title: 'Agile Full-Stack Build',
      desc: 'Develop frontend components (React / Next.js) and backend services (Django / Python / SQL) with continuous integration.',
    },
    {
      number: '04',
      title: 'Deployment & Production Support',
      desc: 'Deploy to cloud infrastructure (Render, Vercel, Supabase, AWS), set up SSL/security, and ensure smooth operational support.',
    },
  ];

  return (
    <section id="process" style={{ background: 'var(--paper2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span className="section-label">HOW I WORK</span>
        <h2 className="section-title reveal visible">A Predictable, High-Quality Process</h2>
        <p className="section-sub reveal visible" style={{ margin: '0 auto' }}>
          From initial napkin sketch to deployed production software — here is how I deliver products on time.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {steps.map((step, index) => (
          <div
            className="reveal visible"
            key={index}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '32px 28px',
              transition: 'transform 0.25s, box-shadow 0.25s',
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: '2.4rem',
                fontWeight: 800,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              {step.number}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink2)', lineHeight: 1.6 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
