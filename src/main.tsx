import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './App.tsx';
import IslandPreview from './IslandPreview.tsx';
import './index.css';
import 'uplot/dist/uPlot.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ConvexClientProvider from './components/ConvexClientProvider.tsx';

const preview = import.meta.env.VITE_ISLAND_PREVIEW === 'true';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {preview ? <IslandPreview /> : <ConvexClientProvider><Home /></ConvexClientProvider>}
  </React.StrictMode>,
);
