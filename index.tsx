import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
} else {
    try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
    } catch (e) {
        console.error("Failed to mount React application:", e);
        rootElement.innerHTML = '<div style="color:red; padding: 20px;">Failed to load application. Check console for details.</div>';
    }
}