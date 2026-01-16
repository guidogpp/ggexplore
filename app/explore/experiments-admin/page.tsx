export const dynamic = "force-dynamic";

import ExperimentsAdmin from './components/ExperimentsAdmin';
import { getExperiments, createExperiment, archiveExperiment, updateExperiment } from './actions';

export default async function ExperimentsAdminPage() {
  const experiments = await getExperiments();
  return (
    <ExperimentsAdmin
      experiments={experiments}
      createExperiment={createExperiment}
      archiveExperiment={archiveExperiment}
      updateExperiment={updateExperiment}
    />
  );
}
