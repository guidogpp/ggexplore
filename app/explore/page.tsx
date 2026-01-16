export const dynamic = "force-dynamic";
type ExperimentStatus = 'draft' | 'active' | 'archived';

import { ExperimentGrid } from '@/components/experiments/ExperimentGrid';
import { createServerClient } from '@/src/lib/supabase';
import { Experiment } from '@/components/experiments/ExperimentCard';

// Server Component
export default async function ExplorePage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('experiments')
    .select('*')
    .neq('status', 'archived')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div style={{ color: 'red', padding: 32 }}>Error cargando experiments: {error.message}</div>
    );
  }

  // Adaptar datos a tipo Experiment (agregar href y description si falta)
  const experiments: Experiment[] = (data || []).map((exp: any) => ({
    id: exp.id,
    name: exp.name,
    description: exp.description || '',
    status: ['draft', 'active', 'archived'].includes(exp.status) ? exp.status : 'draft',
    href: `/explore/${exp.slug}`,
  }));

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', padding: '32px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#111' }}>Experimentos</h1>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '16px' }}>
          Repositorio de experimentos y pruebas. Haz clic en cualquier card para ver el detalle.
        </p>
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="/explore/experiments-admin"
            style={{
              display: 'inline-block',
              background: '#111',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 15,
              boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
              transition: 'background 0.2s',
            }}
          >
            Admin Experimentos
          </a>
        </div>
        {experiments.length === 0 ? (
          <div style={{ color: '#888', fontSize: 18, textAlign: 'center', marginTop: 64 }}>
            No hay experiments disponibles.
          </div>
        ) : (
          <ExperimentGrid experiments={experiments} />
        )}
      </div>
    </div>
  );
}

