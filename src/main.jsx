import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Mematikan Service Worker agar tidak terjadi bug layar blank / cache nyangkut
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister();
      console.log('Service Worker berhasil dilepas (unregister)');
    }
  });
}