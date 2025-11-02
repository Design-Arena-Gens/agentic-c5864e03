import '../styles/globals.css';

export const metadata = {
  title: 'RailTrack - Train Management',
  description: 'Manage trains and schedules across mobile and web',
  themeColor: '#0b1220',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
