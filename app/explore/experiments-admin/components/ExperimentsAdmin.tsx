"use client";

import { useState } from 'react';
import ExperimentList from './ExperimentList';
import ExperimentForm from './ExperimentForm';
import ExperimentEditForm from './ExperimentEditForm';
import styles from './ExperimentsAdmin.module.css';


export default function ExperimentsAdmin({ experiments, createExperiment, archiveExperiment, updateExperiment }) {
  const [localExperiments, setLocalExperiments] = useState(experiments);
  const [editing, setEditing] = useState(null);

  function handleEdit(exp) {
    setEditing(exp);
  }

  function handleCancelEdit() {
    setEditing(null);
  }

  async function handleCreateExperiment(data) {
    const newExperiment = await createExperiment(data);
    setLocalExperiments((prev) => [newExperiment, ...prev]);
  }

  async function handleArchiveExperiment(id) {
    await archiveExperiment(id);
    setLocalExperiments((prev) => prev.filter((exp) => exp.id !== id));
  }

  async function handleUpdateExperiment(updatedExperiment) {
    await updateExperiment(updatedExperiment);
    setLocalExperiments((prev) =>
      prev.map((exp) => (exp.id === updatedExperiment.id ? updatedExperiment : exp))
    );
    setEditing(null);
  }

  return (
    <div className={styles.adminContainer}>
      <div style={{ margin: '0 0 12px 0', display: 'flex', justifyContent: 'flex-start' }}>
        <a
          href="/explore"
          style={{
            display: 'inline-block',
            background: '#fff',
            color: '#111',
            border: '1px solid #bbb',
            padding: '7px 16px',
            borderRadius: 6,
            fontWeight: 500,
            textDecoration: 'none',
            fontSize: 15,
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            marginBottom: 4,
            transition: 'background 0.2s',
          }}
        >
          ← Volver a Experimentos
        </a>
      </div>
      <header className={styles.header}>
        <h1>Experiments Admin</h1>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.formSection}>
          {editing ? (
            <ExperimentEditForm
              experiment={editing}
              updateExperiment={handleUpdateExperiment}
              onCancel={handleCancelEdit}
            />
          ) : (
            <ExperimentForm createExperiment={handleCreateExperiment} />
          )}
        </section>
        <section className={styles.listSection}>
          <ExperimentList
            experiments={localExperiments}
            onEdit={handleEdit}
            archiveExperiment={handleArchiveExperiment}
          />
        </section>
      </main>
    </div>
  );
}
