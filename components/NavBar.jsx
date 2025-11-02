import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <div className="brand">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16c3-2 7-2 10 0s7 2 8-1" stroke="url(#g)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 12c3-2 7-2 10 0s7 2 8-1" stroke="#4f8cff" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
            <defs>
              <linearGradient id="g" x1="3" y1="16" x2="21" y2="14" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4f8cff"/><stop offset="1" stopColor="#00d4aa"/>
              </linearGradient>
            </defs>
          </svg>
          <span>RailTrack</span>
          <span className="tag">Train Management</span>
        </div>
        <div className="links">
          <Link className="link" href="/">Home</Link>
          <Link className="link" href="/trains">Trains</Link>
          <Link className="link" href="/schedules">Schedules</Link>
        </div>
      </div>
    </nav>
  );
}
