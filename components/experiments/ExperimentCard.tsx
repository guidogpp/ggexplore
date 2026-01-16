import Link from 'next/link';

export type Experiment = {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  href: string;
};

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minHeight: '180px',
      justifyContent: 'space-between',
      border: experiment.status === 'archived' ? '1px solid #eee' : '1px solid #ddd',
      opacity: experiment.status === 'archived' ? 0.6 : 1
    }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{experiment.name}</h3>
        <p style={{ color: '#666', fontSize: '14px', margin: '8px 0 0 0' }}>{experiment.description}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 500,
          color: experiment.status === 'active' ? '#0a0' : experiment.status === 'draft' ? '#fa0' : '#888',
          background: experiment.status === 'active' ? '#e6fbe6' : experiment.status === 'draft' ? '#fffbe6' : '#f6f6f6',
          borderRadius: '4px',
          padding: '2px 8px'
        }}>{experiment.status}</span>
        <Link href={experiment.href} style={{ color: '#111', fontWeight: 500, fontSize: '14px', textDecoration: 'underline' }}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
