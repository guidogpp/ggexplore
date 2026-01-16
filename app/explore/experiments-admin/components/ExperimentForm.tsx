"use client";
import { useState } from 'react';
import styles from './ExperimentForm.module.css';


export default function ExperimentForm({ createExperiment }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      await createExperiment(data);
      setSuccess(true);
      event.target.reset();
    } catch (err) {
      setError(err.message || 'Failed to create experiment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={3} />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Creating...' : 'Create Experiment'}
      </button>
      {success && <p className={styles.successMessage}>Experiment created successfully!</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}
