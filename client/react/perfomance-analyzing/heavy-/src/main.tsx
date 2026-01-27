import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PerformanceDemo } from './PerformanceDemo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceDemo />
  </StrictMode>,
)
