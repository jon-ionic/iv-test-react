import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { initialize } from './util/session-vault';

const container = document.getElementById('root');
const root = createRoot(container!);
initialize().then(() => root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
));