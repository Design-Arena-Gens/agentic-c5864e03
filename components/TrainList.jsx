"use client";

export default function TrainList({ trains, onEdit, onDelete }) {
  if (!trains?.length) {
    return <div className="card"><em>No trains yet. Add your first train.</em></div>;
  }

  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Capacity</th>
            <th>Classes</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trains.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.number}</td>
              <td>{t.capacity}</td>
              <td>{t.classes?.join(', ')}</td>
              <td><span className="badge">{t.status}</span></td>
              <td className="row">
                <button className="btn" onClick={() => onEdit(t)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
