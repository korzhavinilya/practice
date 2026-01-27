import  { useState } from 'react';
import './PerformanceDemo.css';

// Генерируем "тяжелый" контент, чтобы браузеру было больно пересчитывать Layout
const HeavyContent = () => (
  <div className="heavy-content">
    {Array.from({ length: 1000 }).map((_, i) => (
      <span key={i} className="heavy-item">Item {i} </span>
    ))}
  </div>
);

export const PerformanceDemo = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="demo-container">
      <h1>Layout (Width) vs Composite (Transform)</h1>
      <button 
        className="toggle-btn"
        onClick={() => setIsToggled(!isToggled)}
      >
        Запустить анимацию
      </button>

      <button onClick={() => console.log('console log')}>console log</button>

      <button onClick={() => {
        setTimeout(() => {
          console.log('marco task');
        }, 0);
      }}>marco task</button>
      
      <button onClick={() => {
        Promise.resolve().then(() => {
          console.log('micro task');
        });
      }}>micro task</button>

      <div className="comparison-wrapper">
        {/* ❌ BAD: Изменяем WIDTH */}
        <div className="case-block">
          <h3>1. Main Thread Killer (Width)</h3>
          <p>При изменении ширины браузер пересчитывает положение каждого из 1000 элементов внутри.</p>
          <div className={`box width-box ${isToggled ? 'shrink-width' : ''}`}>
            <HeavyContent />
          </div>
        </div>

        {/* ✅ GOOD: Изменяем TRANSFORM */}
        {/* <div className="case-block">
          <h3>2. GPU Friendly (Transform)</h3>
          <p>При трансформации браузер делает "снимки" и просто сжимает картинку. Текст искажается, но 0 лагов.</p>
          <div className={`box transform-box ${isToggled ? 'shrink-transform' : ''}`}>
            <HeavyContent />
          </div>
        </div> */}
      </div>
    </div>
  );
};