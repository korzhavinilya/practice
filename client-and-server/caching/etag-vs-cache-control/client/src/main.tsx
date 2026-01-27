import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import FetchApp from './FetchApp.tsx';
import AxiosApp from './AxiosApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* axios почему-то не отображает статус 304, а выводит 200 */}
    {/* Напоминание себе в будущее: 
    Это нормально что при 304 возвращается ничего, нужно реализовывать логику проверки, если результат пустой, использовать предыдущую версию ответа. 
    Но блин, если у нас и правда пропали данные в базе, я буду думать что всё ок? */}
    {/* <FetchApp /> */}
    {/* Axios же возвращает закэшированные данные, а не пустой ответ */}
    <AxiosApp />
  </StrictMode>
);
