import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main className="container">
        <div className="grid">
          <section className="card">
            <h3 className="card-title">Trains</h3>
            <p>Define fleet, capacity, classes, and status.</p>
            <div className="row" style={{ marginTop: 10 }}>
              <Link className="btn btn-primary" href="/trains">Manage Trains</Link>
              <span className="badge">CRUD</span>
            </div>
          </section>

          <section className="card">
            <h3 className="card-title">Schedules</h3>
            <p>Create routes, stops, and timetable for your trains.</p>
            <div className="row" style={{ marginTop: 10 }}>
              <Link className="btn btn-primary" href="/schedules">Manage Schedules</Link>
              <span className="badge">Planning</span>
            </div>
          </section>
        </div>

        <p className="footer">Built for mobile and desktop. Your data is stored locally in your browser.</p>
      </main>
    </>
  );
}
