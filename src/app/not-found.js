// src/app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: 'white', 
      textAlign: 'center'
    }}>
      <h1 style={{fontSize: '40px', color: '#d4af37'}}>404 - ORDIS NOT FOUND</h1>
      <p>Operator, this coordinates do not exist.</p>
      <Link href="/" style={{marginTop:'20px', color:'#3b82f6', textDecoration:'underline'}}>
        Return to Orbiter (Home)
      </Link>
    </div>
  );
}