import { ServiceData } from '@/lib/content';

interface ServicesProps {
  services: ServiceData[];
}

export default function Services({ services }: ServicesProps) {
  const serviceList = services || [];

  return (
    <section id="services">
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span className="section-label">What I do</span>
        <h2 className="section-title reveal visible">Services I offer</h2>
        <p className="section-sub reveal visible" style={{ margin: '0 auto' }}>
          From idea to deployment — I can handle the full product lifecycle or jump in where you need me most.
        </p>
      </div>

      <div className="services-grid">
        {serviceList.map((srv, index) => (
          <div
            className="service-card reveal visible"
            key={srv.id || index}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="service-icon" style={{ background: srv.icon_bg || '#fef3c7' }}>
              {srv.icon || '🖥️'}
            </div>
            <h3>{srv.title}</h3>
            <p>{srv.description}</p>
            <ul>
              {(srv.features || []).map((feature, fIdx) => (
                <li key={fIdx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
