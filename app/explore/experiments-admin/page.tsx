export const dynamic = "force-dynamic";

import ExperimentsAdmin from './components/ExperimentsAdmin';
import { getExperiments, createExperiment, archiveExperiment, updateExperiment } from './actions';

export default async function ExperimentsAdminPage() {
  let experiments = [];
  let errorMsg = '';
  try {
    experiments = await getExperiments();
  } catch (err: any) {
    console.error('Error ExperimentsAdminPage:', err);
    errorMsg = err?.message || 'No se pudieron cargar los experiments.';
  }
  if (errorMsg) {
    return (
      <div style={{ color: '#c00', padding: 32, textAlign: 'center' }}>{errorMsg}</div>
    );
  }
  return (
    <ExperimentsAdmin
      experiments={experiments}
      createExperiment={createExperiment}
      archiveExperiment={archiveExperiment}
      updateExperiment={updateExperiment}
    />
  );
}
