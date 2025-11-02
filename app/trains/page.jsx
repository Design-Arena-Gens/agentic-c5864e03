"use client";

import { useEffect, useMemo, useState } from 'react';
import NavBar from '../../components/NavBar';
import TrainForm from '../../components/TrainForm';
import TrainList from '../../components/TrainList';
import { generateId } from '../../lib/storage';
import { getTrains, saveTrains } from '../../lib/storage';

export default function TrainsPage() {
  const [trains, setTrains] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setTrains(getTrains());
  }, []);

  useEffect(() => {
    saveTrains(trains);
  }, [trains]);

  function handleSaveTrain(data) {
    if (editing) {
      setTrains(prev => prev.map(t => t.id === editing.id ? { ...editing, ...data } : t));
      setEditing(null);
    } else {
      setTrains(prev => [{ id: generateId(), ...data }, ...prev]);
    }
  }

  function handleDelete(id) {
    setTrains(prev => prev.filter(t => t.id !== id));
  }

  const fleetStats = useMemo(() => {
    const total = trains.length;
    const capacity = trains.reduce((s, t) => s + (Number(t.capacity) || 0), 0);
    const active = trains.filter(t => t.status === 'active').length;
    return { total, capacity, active };
  }, [trains]);

  return (
    <>
      <NavBar />
      <main className="container stack">
        <section className="grid">
          <div className="card">
            <h3 className="card-title">{editing ? 'Edit Train' : 'Add Train'}</h3>
            <TrainForm onSave={handleSaveTrain} editingTrain={editing} onCancelEdit={() => setEditing(null)} />
          </div>
          <div className="card">
            <h3 className="card-title">Fleet Overview</h3>
            <div className="row" style={{ gap: 16, flexWrap: 'wrap' }}>
              <div className="badge">Total: {fleetStats.total}</div>
              <div className="badge">Capacity: {fleetStats.capacity}</div>
              <div className="badge">Active: {fleetStats.active}</div>
            </div>
          </div>
        </section>

        <TrainList trains={trains} onEdit={setEditing} onDelete={handleDelete} />
      </main>
    </>
  );
}
