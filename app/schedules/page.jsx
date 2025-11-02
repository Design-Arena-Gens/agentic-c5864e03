"use client";

import { useEffect, useMemo, useState } from 'react';
import NavBar from '../../components/NavBar';
import ScheduleForm from '../../components/ScheduleForm';
import ScheduleList from '../../components/ScheduleList';
import { getTrains, getSchedules, saveSchedules, generateId } from '../../lib/storage';

export default function SchedulesPage() {
  const [trains, setTrains] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setTrains(getTrains());
    setSchedules(getSchedules());
  }, []);

  useEffect(() => {
    saveSchedules(schedules);
  }, [schedules]);

  function handleSaveSchedule(data) {
    if (editing) {
      setSchedules(prev => prev.map(s => s.id === editing.id ? { ...editing, ...data } : s));
      setEditing(null);
    } else {
      setSchedules(prev => [{ id: generateId(), ...data }, ...prev]);
    }
  }

  function handleDelete(id) {
    setSchedules(prev => prev.filter(s => s.id !== id));
  }

  const trainsById = useMemo(() => Object.fromEntries(trains.map(t => [t.id, t])), [trains]);

  return (
    <>
      <NavBar />
      <main className="container stack">
        <section className="grid">
          <div className="card">
            <h3 className="card-title">{editing ? 'Edit Schedule' : 'Add Schedule'}</h3>
            <ScheduleForm trains={trains} onSave={handleSaveSchedule} editingSchedule={editing} onCancelEdit={() => setEditing(null)} />
          </div>
          <div className="card">
            <h3 className="card-title">Planner Tips</h3>
            <ul>
              <li>Define trains first so you can assign schedules.</li>
              <li>Use stops to model intermediate stations with timings.</li>
              <li>Pick operating days and a start date for recurring runs.</li>
            </ul>
          </div>
        </section>

        <ScheduleList schedules={schedules} trainsById={trainsById} onEdit={setEditing} onDelete={handleDelete} />
      </main>
    </>
  );
}
