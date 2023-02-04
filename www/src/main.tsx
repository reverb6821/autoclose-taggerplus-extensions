import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// function onWindowClose() {
//   Neutralino.app.exit();
// }

// Neutralino.init();
// Neutralino.events.on("windowClose", onWindowClose);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)