// src/app/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{padding: '50px', color: 'white', textAlign: 'center'}}>
      <h2 style={{color: '#ff6b6b'}}>SYSTEM FAILURE</h2>
      <p>Ordis has encountered an error:</p>
      <pre style={{background: '#222', padding: '20px', borderRadius: '5px', display:'inline-block', textAlign:'left'}}>
        {error.message}
      </pre>
      <br />
      <button 
        onClick={() => reset()} 
        style={{marginTop: '20px', padding: '10px 20px', background: '#d4af37', border: 'none', cursor: 'pointer', fontWeight:'bold'}}
      >
        REBOOT SYSTEM
      </button>
    </div>
  );
}