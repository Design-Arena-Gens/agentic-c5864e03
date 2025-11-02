"use client";

import { useEffect, useState } from 'react';
import { TRAIN_STATUSES } from '../lib/models';

export default function TrainForm({ onSave, editingTrain, onCancelEdit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState(200);
  const [classesText, setClassesText] = useState("General, Sleeper, AC");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (editingTrain) {
      setName(editingTrain.name || "");
      setNumber(editingTrain.number || "");
      setCapacity(editingTrain.capacity || 0);
      setClassesText((editingTrain.classes || []).join(', '));
      setStatus(editingTrain.status || 'active');
    } else {
      setName("");
      setNumber("");
      setCapacity(200);
      setClassesText("General, Sleeper, AC");
      setStatus("active");
    }
  }, [editingTrain]);

  function handleSubmit(e) {
    e.preventDefault();
    const classes = classesText.split(',').map(s => s.trim()).filter(Boolean);
    if (!name || !number) return;
    onSave({ name, number, capacity: Number(capacity), classes, status });
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <div className="grid">
        <div className="stack">
          <label>Name</label>
          <input className="input" placeholder="e.g., Rajdhani Express" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="stack">
          <label>Number</label>
          <input className="input" placeholder="e.g., 12951" value={number} onChange={e => setNumber(e.target.value)} />
        </div>
      </div>

      <div className="grid">
        <div className="stack">
          <label>Capacity</label>
          <input className="input" type="number" min={1} value={capacity} onChange={e => setCapacity(e.target.value)} />
        </div>
        <div className="stack">
          <label>Status</label>
          <select className="select" value={status} onChange={e => setStatus(e.target.value)}>
            {TRAIN_STATUSES.map(s => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
      </div>

      <div className="stack">
        <label>Classes (comma separated)</label>
        <input className="input" value={classesText} onChange={e => setClassesText(e.target.value)} />
      </div>

      <div className="row">
        <button className="btn btn-primary" type="submit">{editingTrain ? 'Update Train' : 'Add Train'}</button>
        {editingTrain && <button className="btn" type="button" onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}
