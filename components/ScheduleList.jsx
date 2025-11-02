"use client";

export default function ScheduleList({ schedules, trainsById, onEdit, onDelete }) {
  if (!schedules?.length) {
    return <div className="card"><em>No schedules yet. Add your first schedule.</em></div>;
  }

  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Train</th>
            <th>Route</th>
            <th>Days</th>
            <th>Start</th>
            <th>Stops</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => {
            const t = trainsById[s.trainId];
            return (
              <tr key={s.id}>
                <td>{t ? `${t.number} ? ${t.name}` : 'Unknown'}</td>
                <td>{s.origin} ? {s.destination}</td>
                <td>{s.days?.join(', ')}</td>
                <td>{s.startDateISO?.slice(0,10)}</td>
                <td>{s.stops?.length || 0}</td>
                <td className="row">
                  <button className="btn" onClick={() => onEdit(s)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => onDelete(s.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
