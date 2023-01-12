import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Hello from './Hello';

const container = document.getElementById('app');
// const root = cretaeRoot(container);
const root = hydrateRoot(container);
root.render(<Hello />);
