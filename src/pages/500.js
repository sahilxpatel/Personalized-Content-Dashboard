export default function Custom500() {
  return (
    <html>
      <body style={{background: '#0f1724', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{fontSize: 48}}>500</h1>
          <p style={{opacity: 0.9}}>Something went wrong on our end.</p>
        </div>
      </body>
    </html>
  );
}
