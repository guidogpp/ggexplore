"use client";
import { useState } from 'react';
import styles from './ExperimentList.module.css';


export default function ExperimentList({ experiments, onEdit, archiveExperiment }) {
  // Proteger si experiments es undefined o no es un array
  const safeExperiments = Array.isArray(experiments)
    ? experiments.filter((exp) => Boolean(exp && exp.name))
    : [];

  if (safeExperiments.length === 0) {
    return <p className={styles.emptyState}>No experiments found or data incomplete. Create one to get started!</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeExperiments.map((experiment) => (
          <tr key={experiment.id}>
            <td>{experiment.name}</td>
            <td>{experiment.slug}</td>
            <td className={styles[experiment.status]}>{experiment.status}</td>
            <td>
              <button className={styles.editButton} onClick={() => onEdit(experiment)}>
                Edit
              </button>
              <button
                className={styles.archiveButton}
                onClick={() => archiveExperiment(experiment.id)}
              >
                Archive
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
