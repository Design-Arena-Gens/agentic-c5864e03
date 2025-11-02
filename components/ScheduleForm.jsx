"use client";

import { useEffect, useMemo, useState } from 'react';
import { WEEK_DAYS } from '../lib/models';

export default function ScheduleForm({ trains, onSave, editingSchedule, onCancelEdit }) {
  const [trainId, setTrainId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDateISO, setStartDateISO] = useState("");
  const [days, setDays] = useState([]);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (editingSchedule) {
      setTrainId(editingSchedule.trainId || "");
      setOrigin(editingSchedule.origin || "");
      setDestination(editingSchedule.destination || "");
      setStartDateISO(editingSchedule.startDateISO?.slice(0,10) || "");
      setDays(editingSchedule.days || []);
      setStops(editingSchedule.stops || []);
    } else {
      setTrainId("");
      setOrigin("");
      setDestination("");
      setStartDateISO("");
      setDays([]);
      setStops([]);
    }
  }, [editingSchedule]);

  function toggleDay(day) {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  }

  function updateStop(idx, field, value) {
    setStops(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  function addStop() {
    setStops(prev => [...prev, { station: '', arrivalISO: '', departureISO: '' }]);
  }

  function removeStop(idx) {
    setStops(prev => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!trainId || !origin || !destination) return;
    const schedule = {
      trainId,
      origin,
      destination,
      startDateISO: startDateISO ? new Date(startDateISO).toISOString() : new Date().toISOString(),
      days: days.sort((a,b) => WEEK_DAYS.indexOf(a) - WEEK_DAYS.indexOf(b)),
      stops: stops.map(s => ({
        station: s.station,
        arrivalISO: s.arrivalISO ? new Date(s.arrivalISO).toISOString() : '',
        departureISO: s.departureISO ? new Date(s.departureISO).toISOString() : ''
      }))
    };
    onSave(schedule);
  }

  const selectedTrain = useMemo(() => trains.find(t => t.id === trainId), [trains, trainId]);

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <div className="grid">
        <div className="stack">
          <label>Train</label>
          <select className="select" value={trainId} onChange={e => setTrainId(e.target.value)}>
            <option value="">Select a train</option>
            {trains.map(t => (<option key={t.id} value={t.id}>{t.number} ? {t.name}</option>))}
          </select>
        </div>
        <div className="stack">
          <label>Start Date</label>
          <input className="input" type="date" value={startDateISO} onChange={e => setStartDateISO(e.target.value)} />
        </div>
      </div>

      <div className="grid">
        <div className="stack">
          <label>Origin</label>
          <input className="input" placeholder="e.g., Mumbai Central" value={origin} onChange={e => setOrigin(e.target.value)} />
        </div>
        <div className="stack">
          <label>Destination</label>
          <input className="input" placeholder="e.g., New Delhi" value={destination} onChange={e => setDestination(e.target.value)} />
        </div>
      </div>

      <div className="stack">
        <label>Operating Days</label>
        <div className="row" style={{ gap: 8 }}>
          {WEEK_DAYS.map(d => (
            <button key={d} type="button" onClick={() => toggleDay(d)} className="btn" style={{
              background: days.includes(d) ? 'linear-gradient(135deg, var(--primary), var(--primary-600))' : undefined,
              borderColor: days.includes(d) ? 'transparent' : undefined
            }}>{d}</button>
          ))}
        </div>
      </div>

      <div className="stack">
        <label>Stops</label>
        {stops.map((s, idx) => (
          <div key={idx} className="grid" style={{ alignItems: 'end' }}>
            <div className="stack">
              <small>Station</small>
              <input className="input" value={s.station} onChange={e => updateStop(idx, 'station', e.target.value)} placeholder="e.g., Surat" />
            </div>
            <div className="stack">
              <small>Arrival</small>
              <input className="input" type="datetime-local" value={s.arrivalISO} onChange={e => updateStop(idx, 'arrivalISO', e.target.value)} />
            </div>
            <div className="stack">
              <small>Departure</small>
              <input className="input" type="datetime-local" value={s.departureISO} onChange={e => updateStop(idx, 'departureISO', e.target.value)} />
            </div>
            <div className="row">
              <button type="button" className="btn" onClick={() => removeStop(idx)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className="btn" onClick={addStop}>Add Stop</button>
      </div>

      <div className="row">
        <button className="btn btn-primary" type="submit">{editingSchedule ? 'Update Schedule' : 'Add Schedule'}</button>
        {editingSchedule && <button className="btn" type="button" onClick={onCancelEdit}>Cancel</button>}
      </div>

      {selectedTrain && (
        <div className="card" style={{ marginTop: 8 }}>
          <strong>Train Info:</strong> {selectedTrain.number} ? {selectedTrain.name} ? {selectedTrain.classes?.join(', ')} ? {selectedTrain.capacity} seats
        </div>
      )}
    </form>
  );
}
