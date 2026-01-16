import { Experiment, ExperimentCard } from './ExperimentCard';

export function ExperimentGrid({ experiments }: { experiments: Experiment[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      padding: '32px 0',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {experiments.map(exp => (
        <ExperimentCard key={exp.id} experiment={exp} />
      ))}
    </div>
  );
}
