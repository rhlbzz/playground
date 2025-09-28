import 'virtual:uno.css'; // Importa gli stili generati da UnoCSS
import '@unocss/reset/tailwind-compat.css'; // Importa il reset CSS di UnoCSS (opzionale)
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import routes from './routes'; // Importa l'array di rotte

import './styles/main.scss'; 

// Crea il router
const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
} else throw new Error("Root element not found");
