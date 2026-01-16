"use client";
import { useState } from 'react';


export default function ExperimentEditForm({ experiment, updateExperiment, onCancel }) {
  return (
    <form action={updateExperiment} style={{ marginTop: 24, background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
      <input type="hidden" name="id" value={experiment.id} />
      <div>
        <label>Name</label>
        <input name="name" defaultValue={experiment.name} required />
      </div>
      <div>
        <label>Description</label>
        <input name="description" defaultValue={experiment.description} />
      </div>
      <div>
        <label>Status</label>
        <select name="status" defaultValue={experiment.status}>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: 12 }}>
        Save Changes
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
    </form>
  );
}
